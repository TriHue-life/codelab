// ══════════════════════════════════════════════════════════════
//  PYTHON INTERPRETER  (Pure JavaScript, không cần thư viện)
// ══════════════════════════════════════════════════════════════

const PyInterp = (() => {

// ─── Token types ───────────────────────────────────────────
const KW = new Set(['False','None','True','and','as','assert','break','class',
  'continue','def','del','elif','else','except','finally','for','from','global',
  'if','import','in','is','lambda','nonlocal','not','or','pass','raise','return',
  'try','while','with','yield']);

// ─── Tokenizer ─────────────────────────────────────────────
function tokenize(src) {
  const toks = [];
  // Normalize Unicode line separators before tokenizing
  src = src.replace(/\u2028|\u2029/g, '\n').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = src.split('\n');
  const indStack = [0];
  let parenD = 0, lineNo = 0;

  for (let li = 0; li < lines.length; li++) {
    lineNo = li + 1;
    let line = lines[li].replace(/\r$/,'');
    const trim = line.trimStart();
    if (!trim || trim[0] === '#') continue;

    // Indentation
    if (parenD === 0) {
      let ind = 0;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === ' ') ind++;
        else if (line[i] === '\t') ind = ((ind >> 3)+1) << 3;
        else break;
      }
      const top = indStack[indStack.length-1];
      if (ind > top) { indStack.push(ind); toks.push({t:'INDENT',ln:lineNo}); }
      else if (ind < top) {
        while (indStack.length > 1 && indStack[indStack.length-1] > ind) { indStack.pop(); toks.push({t:'DEDENT',ln:lineNo}); }
      }
    }

    // Scan tokens on line
    let pos = 0;
    while (pos < line.length && (line[pos]===' '||line[pos]==='\t')) pos++;
    while (pos < line.length) {
      const c = line[pos];
      if (c===' '||c==='\t') { pos++; continue; }
      if (c==='#') break;
      if (c==='\\' && pos===line.length-1) { pos++; break; } // line continuation

      // String
      if (c==='"'||c==="'") {
        const [tok,np] = rdStr(line,pos,lineNo,lines,li,'');
        toks.push(tok); if(np.nl!==undefined){li=np.nl;pos=np.p;if(li<lines.length)line=lines[li].replace(/\r$/,'');}else pos=np;
        continue;
      }
      // Prefixed string: f, r, b, fr, rf, rb, br
      if (/^[frFRbB]/.test(c) && pos+1<line.length && (line[pos+1]===String.fromCharCode(39)||line[pos+1]===String.fromCharCode(34))) {
        const pfx=c.toLowerCase();
        const [tok,np]=rdStr(line,pos+1,lineNo,lines,li,pfx);
        toks.push(tok); if(np&&np.nl!==undefined){li=np.nl;pos=np.p;if(li<lines.length)line=lines[li].replace(/\r$/,'');}else pos=np; continue;
      }
      if (/^[frFRbB]{2}/.test(line.slice(pos,pos+2)) && pos+2<line.length && (line[pos+2]===String.fromCharCode(39)||line[pos+2]===String.fromCharCode(34))) {
        const pfx=(c+line[pos+1]).toLowerCase();
        const [tok,np]=rdStr(line,pos+2,lineNo,lines,li,pfx);
        toks.push(tok); if(np&&np.nl!==undefined){li=np.nl;pos=np.p;if(li<lines.length)line=lines[li].replace(/\r$/,'');}else pos=np; continue;
      }
      // Number
      if (c>='0'&&c<='9'||(c==='.'&&pos+1<line.length&&line[pos+1]>='0'&&line[pos+1]<='9')) {
        const [tok,np]=rdNum(line,pos,lineNo); toks.push(tok); pos=np; continue;
      }
      // Name/keyword
      if (c==='_'||/[a-zA-Z]/.test(c)) {
        let e=pos+1; while(e<line.length&&/[\w]/.test(line[e]))e++;
        const w=line.slice(pos,e);
        toks.push(KW.has(w)?{t:w,v:w,ln:lineNo}:{t:'NAME',v:w,ln:lineNo}); pos=e; continue;
      }
      // Operators
      const [tok,np]=rdOp(line,pos,lineNo);
      if(tok){if('([{'.includes(tok.t))parenD++;if(')]}'.includes(tok.t))parenD--;toks.push(tok);}
      pos=np;
    }
    if(parenD===0){const last=toks[toks.length-1];if(last&&last.t!=='NEWLINE'&&last.t!=='INDENT'&&last.t!=='DEDENT')toks.push({t:'NEWLINE',ln:lineNo});}
  }
  while(indStack.length>1){indStack.pop();toks.push({t:'DEDENT',ln:lineNo});}
  toks.push({t:'NEWLINE',ln:lineNo});toks.push({t:'EOF',ln:lineNo});
  return toks;
}

function rdStr(line,pos,lineNo,allLines,li,pfx){
  const q=line[pos++]; let isTr=false,str='';
  if(pos+1<line.length&&line[pos]===q&&line[pos+1]===q){isTr=true;pos+=2;}
  const isFStr=pfx.includes('f');
  if(isTr){
    while(li<allLines.length){
      while(pos<line.length){
        if(line[pos]===q&&line[pos+1]===q&&line[pos+2]===q)return[{t:'STRING',v:str,f:isFStr,ln:lineNo},{nl:li,p:pos+3}];
        if(line[pos]==='\\'){str+=unesc(line[pos+1]);pos+=2;}else str+=line[pos++];
      }
      str+='\n';li++;line=li<allLines.length?allLines[li].replace(/\r$/,''):'';pos=0;
    }
    throw new PyErr('SyntaxError','Unterminated triple-quoted string');
  }
  while(pos<line.length&&line[pos]!==q){
    if(line[pos]==='\\'){str+=unesc(line[pos+1]);pos+=2;}else str+=line[pos++];
  }
  return [{t:'STRING',v:str,f:isFStr,ln:lineNo},pos+1];
}

function unesc(c){return{n:'\n',t:'\t',r:'\r','\\':'\\','\'':'\'','"':'"','0':'\0',a:'\x07',b:'\x08',f:'\x0C',v:'\x0B'}[c]??('\\'+c);}

function rdNum(line,pos,lineNo){
  let e=pos;
  if(line[e]==='0'&&e+1<line.length){
    const nx=line[e+1].toLowerCase();
    if(nx==='x'){e+=2;while(e<line.length&&/[0-9a-fA-F_]/.test(line[e]))e++;return[{t:'NUMBER',v:parseInt(line.slice(pos,e).replace(/_/g,''),16),ln:lineNo},e];}
    if(nx==='o'){e+=2;while(e<line.length&&/[0-7_]/.test(line[e]))e++;return[{t:'NUMBER',v:parseInt(line.slice(pos+2,e).replace(/_/g,''),8),ln:lineNo},e];}
    if(nx==='b'){e+=2;while(e<line.length&&/[01_]/.test(line[e]))e++;return[{t:'NUMBER',v:parseInt(line.slice(pos+2,e).replace(/_/g,''),2),ln:lineNo},e];}
  }
  let isF=false;
  while(e<line.length&&(line[e]>='0'&&line[e]<='9'||line[e]==='_'))e++;
  if(e<line.length&&line[e]==='.'){isF=true;e++;while(e<line.length&&(line[e]>='0'&&line[e]<='9'||line[e]==='_'))e++;}
  if(e<line.length&&(line[e]==='e'||line[e]==='E')){isF=true;e++;if(e<line.length&&(line[e]==='+'||line[e]==='-'))e++;while(e<line.length&&line[e]>='0'&&line[e]<='9')e++;}
  const s=line.slice(pos,e).replace(/_/g,'');
  return [{t:'NUMBER',v:isF?parseFloat(s):parseInt(s,10),ln:lineNo},e];
}

function rdOp(line,pos,lineNo){
  const t3=line.slice(pos,pos+3), t2=line.slice(pos,pos+2);
  for(const op of['**=','//=','>>=','<<='])if(t3===op)return[{t:op,ln:lineNo},pos+3];
  for(const op of['==','!=','<=','>=','**','//',':=','+=','-=','*=','/=','%=','&=','|=','^=','->','<<','>>'])if(t2===op)return[{t:op,ln:lineNo},pos+2];
  if('+-*/%<>=!&|^~()[]{},:;.@'.includes(line[pos]))return[{t:line[pos],ln:lineNo},pos+1];
  return[null,pos+1];
}

// ─── Error / Signals ───────────────────────────────────────
class PyErr extends Error{constructor(t,m,ln){super(m);this.et=t;this.msg=m;this.ln=ln;this.name='PyErr';}toString(){return`${this.et}: ${this.msg}${this.ln?' (dòng '+this.ln+')':''}`;}}
class BreakSig{}
class ContSig{}
class RetSig{constructor(v){this.v=v;}}
class ExcSig{constructor(e){this.e=e;}}

// ─── Parser ────────────────────────────────────────────────
class Parser{
  constructor(toks){this.toks=toks;this.p=0;}
  pk(){return this.toks[this.p];}
  nx(){return this.toks[this.p++];}
  is(t){return this.pk().t===t;}
  isAny(...ts){return ts.includes(this.pk().t);}
  eat(t){const tok=this.nx();if(tok.t!==t)throw new PyErr('SyntaxError',`Mong đợi '${t}', gặp '${tok.t}'`,tok.ln);return tok;}
  opt(t){if(this.is(t))return this.nx();return null;}
  skipNL(){while(this.isAny('NEWLINE','INDENT','DEDENT'))this.nx();}

  parse(){const b=[];this.skipNL();while(!this.is('EOF')){b.push(this.stmt());while(this.is('NEWLINE'))this.nx();}return{t:'Prog',b};}

  block(){
    this.eat('NEWLINE');this.eat('INDENT');
    const b=[];this.skipNL();
    while(!this.isAny('DEDENT','EOF')){b.push(this.stmt());while(this.isAny('NEWLINE','INDENT'))this.nx();}
    this.opt('DEDENT');return{t:'Block',b};
  }

  stmt(){
    const tok=this.pk();
    switch(tok.t){
      case'if':return this.sIf();
      case'while':return this.sWhile();
      case'for':return this.sFor();
      case'def':return this.sDef();
      case'class':return this.sClass();
      case'return':this.nx();let rv=null;if(!this.isAny('NEWLINE','EOF',';'))rv=this.exprList();this.opt('NEWLINE');return{t:'Ret',v:rv,ln:tok.ln};
      case'break':this.nx();this.opt('NEWLINE');return{t:'Break',ln:tok.ln};
      case'continue':this.nx();this.opt('NEWLINE');return{t:'Cont',ln:tok.ln};
      case'pass':this.nx();this.opt('NEWLINE');return{t:'Pass',ln:tok.ln};
      case'global':this.nx();const gns=[this.eat('NAME').v];while(this.is(','))this.nx()&&gns.push(this.eat('NAME').v);return{t:'Global',ns:gns};
      case'nonlocal':this.nx();while(!this.isAny('NEWLINE','EOF'))this.nx();return{t:'Pass',ln:tok.ln};
      case'del':this.nx();const dt=[this.expr()];while(this.is(','))this.nx()&&dt.push(this.expr());return{t:'Del',ts:dt};
      case'import':{this.nx();const mn=this.eat('NAME').v;let alias=mn;if(this.is('as'))this.nx()&&(alias=this.eat('NAME').v);while(!this.isAny('NEWLINE','EOF'))this.nx();return{t:'Import',mn,alias,ln:tok.ln};}
      case'from':{while(!this.isAny('NEWLINE','EOF'))this.nx();return{t:'Pass',ln:tok.ln};}
      case'try':return this.sTry();
      case'raise':this.nx();let re=null;if(!this.isAny('NEWLINE','EOF'))re=this.expr();return{t:'Raise',e:re};
      case'assert':this.nx();const at=this.expr();let am=null;if(this.is(','))this.nx()&&(am=this.expr());return{t:'Assert',test:at,msg:am,ln:tok.ln};
      case'NEWLINE':this.nx();return{t:'Pass',ln:tok.ln};
      default:return this.sExpr();
    }
  }

  sIf(){
    const ln=this.pk().ln;this.eat('if');const test=this.expr();this.eat(':');const body=this.block();
    let chain=[];
    while(this.is('elif')){const el=this.pk().ln;this.nx();const et=this.expr();this.eat(':');chain.push({t:'If',test:et,body:this.block(),els:[],ln:el});}
    if(this.is('else')){this.nx();this.eat(':');const eb=this.block();
      if(chain.length)chain[chain.length-1].els=[eb];else chain=[eb];
    }
    // chain elif
    for(let i=chain.length-2;i>=0;i--)if(chain[i].t==='If')chain[i].els=[chain[i+1]];
    return{t:'If',test,body,els:chain.length?[chain[0]]:[],ln};
  }
  sWhile(){const ln=this.pk().ln;this.eat('while');const test=this.expr();this.eat(':');const body=this.block();let eb=null;if(this.is('else'))this.nx()&&this.eat(':')&&(eb=this.block());return{t:'While',test,body,eb,ln};}
  sFor(){const ln=this.pk().ln;this.eat('for');const tgt=this.forTarget();this.eat('in');const iter=this.expr();this.eat(':');const body=this.block();let eb=null;if(this.is('else'))this.nx()&&this.eat(':')&&(eb=this.block());return{t:'For',tgt,iter,body,eb,ln};}
  forTarget(){const ts=[this.primary()];while(this.is(','))this.nx()&&ts.push(this.is('in')?ts.pop():this.primary());return ts.length===1?ts[0]:{t:'Tuple',e:ts};}

  sDef(){
    const ln=this.pk().ln;this.eat('def');const name=this.eat('NAME').v;this.eat('(');
    const args=[];while(!this.is(')')){
      let star=0;if(this.is('*'))this.nx()&&(star=1);else if(this.is('**'))this.nx()&&(star=2);
      const n=this.eat('NAME').v;if(this.is(':'))this.nx()&&this.expr();
      let df=null;if(this.is('='))this.nx()&&(df=this.expr());
      args.push({n,s:star,d:df});if(!this.is(')'))this.eat(',');
    }
    this.eat(')');if(this.is('->'))this.nx()&&this.expr();this.eat(':');
    return{t:'Def',name,args,body:this.block(),ln};
  }

  sClass(){const ln=this.pk().ln;this.eat('class');const name=this.eat('NAME').v;if(this.is('('))this.nx()&&this.expr()&&this.eat(')');this.eat(':');return{t:'Class',name,body:this.block(),ln};}

  sTry(){
    this.eat('try');this.eat(':');const body=this.block();const hs=[];
    while(this.is('except')){this.nx();let et=null,en=null;if(!this.is(':'))et=this.expr();if(this.is('as'))this.nx()&&(en=this.eat('NAME').v);this.eat(':');hs.push({et,en,body:this.block()});}
    let eb=null;if(this.is('else'))this.nx()&&this.eat(':')&&(eb=this.block());
    let fb=null;if(this.is('finally'))this.nx()&&this.eat(':')&&(fb=this.block());
    return{t:'Try',body,hs,eb,fb};
  }

  sExpr(){
    const ln=this.pk().ln;const e=this.exprList();
    if(this.is('=')){
      const ts=[e];while(this.is('='))this.nx()&&ts.push(this.exprList());
      const v=ts.pop();this.opt('NEWLINE');return{t:'Asgn',ts,v,ln};
    }
    const augOps=['+=','-=','*=','/=','//=','%=','**=','&=','|=','^='];
    for(const op of augOps)if(this.is(op)){this.nx();const v=this.expr();this.opt('NEWLINE');return{t:'AugAsgn',tgt:e,op,v,ln};}
    this.opt('NEWLINE');return{t:'Expr',e,ln};
  }

  exprList(){
    const e=this.expr();if(!this.is(','))return e;
    const es=[e];while(this.is(','))this.nx()&&(this.isAny('NEWLINE','EOF',')','in',':','=','DEDENT')||es.push(this.expr()));
    return{t:'Tuple',e:es};
  }

  expr(){return this.lamb();}
  lamb(){
    if(this.is('lambda')){
      this.nx();const as=[];while(!this.is(':')){as.push({n:this.eat('NAME').v,s:0,d:null});if(!this.is(':'))this.eat(',');}
      this.eat(':');return{t:'Lambda',as,body:this.expr()};
    }
    return this.tern();
  }
  tern(){let l=this.eor();if(this.is('if')){this.nx();const t=this.eor();this.eat('else');return{t:'Tern',test:t,b:l,o:this.tern()};}return l;}
  eor(){let l=this.eand();while(this.is('or'))this.nx()&&(l={t:'BoolOp',op:'or',l,r:this.eand()});return l;}
  eand(){let l=this.enot();while(this.is('and'))this.nx()&&(l={t:'BoolOp',op:'and',l,r:this.enot()});return l;}
  enot(){if(this.is('not'))return this.nx()&&{t:'UnOp',op:'not',v:this.enot()};return this.cmp();}
  cmp(){
    let l=this.bor();
    while(true){
      let op=null;
      if(this.isAny('==','!=','<','>','<=','>='))op=this.nx().t;
      else if(this.is('in')){op='in';this.nx();}
      else if(this.is('not')&&this.toks[this.p+1]?.t==='in'){this.nx();this.nx();op='not in';}
      else if(this.is('is')&&this.toks[this.p+1]?.t==='not'){this.nx();this.nx();op='is not';}
      else if(this.is('is')){this.nx();op='is';}
      else break;
      l={t:'Cmp',op,l,r:this.bor()};
    }
    return l;
  }
  bor(){let l=this.bxor();while(this.is('|'))this.nx()&&(l={t:'Bin',op:'|',l,r:this.bxor()});return l;}
  bxor(){let l=this.band();while(this.is('^'))this.nx()&&(l={t:'Bin',op:'^',l,r:this.band()});return l;}
  band(){let l=this.shl();while(this.is('&'))this.nx()&&(l={t:'Bin',op:'&',l,r:this.shl()});return l;}
  shl(){let l=this.add();while(this.isAny('<<','>>')){const op=this.nx().t;l={t:'Bin',op,l,r:this.add()};}return l;}
  add(){let l=this.mul();while(this.isAny('+','-')){const op=this.nx().t;l={t:'Bin',op,l,r:this.mul()};}return l;}
  mul(){let l=this.unary();while(this.isAny('*','/','//', '%')){const op=this.nx().t;l={t:'Bin',op,l,r:this.unary()};}return l;}
  unary(){if(this.isAny('+','-','~'))return{t:'UnOp',op:this.nx().t,v:this.unary()};return this.pow();}
  pow(){let l=this.postfix();if(this.is('**'))this.nx()&&(l={t:'Bin',op:'**',l,r:this.unary()});return l;}

  postfix(){
    let e=this.primary();
    while(true){
      if(this.is('.')){this.nx();const a=this.eat('NAME').v;e={t:'Attr',o:e,a};}
      else if(this.is('[')){this.nx();const s=this.sliceOrIdx();this.eat(']');e=s.sl?{t:'Slice',o:e,...s}:{t:'Idx',o:e,i:s.v};}
      else if(this.is('(')){this.nx();const {as,kw}=this.callArgs();this.eat(')');e={t:'Call',fn:e,as,kw};}
      else break;
    }
    return e;
  }
  sliceOrIdx(){
    if(this.is(':')){this.nx();const u=this.isAny(']',':')? null:this.expr();let st=null;if(this.is(':'))this.nx()&&(st=this.is(']')?null:this.expr());return{sl:true,lo:null,up:u,st};}
    const v=this.expr();
    if(this.is(':')){this.nx();const u=this.isAny(']',':')? null:this.expr();let st=null;if(this.is(':'))this.nx()&&(st=this.is(']')?null:this.expr());return{sl:true,lo:v,up:u,st};}
    return{sl:false,v};
  }
  callArgs(){
    const as=[],kw={};
    while(!this.is(')')){
      if(this.is('**')){this.nx();as.push({t:'SS',v:this.expr()});}
      else if(this.is('*')){this.nx();as.push({t:'S',v:this.expr()});}
      else if(this.pk().t==='NAME'&&this.toks[this.p+1]?.t==='='){const k=this.nx().v;this.nx();kw[k]=this.expr();}
      else as.push(this.expr());
      if(!this.is(')'))this.eat(',');
    }
    return{as,kw};
  }
  primary(){
    const tok=this.pk();
    switch(tok.t){
      case'NUMBER':this.nx();return{t:'Num',v:tok.v};
      case'STRING':this.nx();return{t:'Str',v:tok.v,f:tok.f};
      case'True':this.nx();return{t:'Bool',v:true};
      case'False':this.nx();return{t:'Bool',v:false};
      case'None':this.nx();return{t:'NoneV'};
      case'NAME':this.nx();return{t:'Name',n:tok.v};
      case'(':{
        this.nx();if(this.is(')'))return this.nx()&&{t:'Tuple',e:[]};
        const e=this.expr();if(this.is(',')){const es=[e];while(this.is(','))this.nx()&&(this.is(')')||es.push(this.expr()));this.eat(')');return{t:'Tuple',e:es};}
        this.eat(')');return e;
      }
      case'[':{
        this.nx();if(this.is(']'))return this.nx()&&{t:'List',e:[]};
        const first=this.expr();if(this.is('for'))return this.listComp(first);
        const es=[first];while(this.is(','))this.nx()&&(this.is(']')||es.push(this.expr()));this.eat(']');return{t:'List',e:es};
      }
      case'{':{
        this.nx();if(this.is('}'))return this.nx()&&{t:'Dict',ps:[]};
        return this.dictOrSet();
      }
      default:throw new PyErr('SyntaxError',`Unexpected '${tok.t}'`,tok.ln);
    }
  }
  listComp(elt){
    const gens=[];while(this.is('for')){
      this.eat('for');const tgt=this.forTarget();this.eat('in');const iter=this.eor();
      const ifs=[];while(this.is('if'))this.nx()&&ifs.push(this.eor());
      gens.push({tgt,iter,ifs});
    }
    this.eat(']');return{t:'ListComp',elt,gens};
  }
  dictOrSet(){
    const first=this.expr();
    if(this.is(':')){
      this.nx();const fv=this.expr();
      // Dict comprehension
      if(this.is('for')){
        const gens=[];while(this.is('for')){this.eat('for');const tgt=this.forTarget();this.eat('in');const iter=this.eor();const ifs=[];while(this.is('if'))this.nx()&&ifs.push(this.eor());gens.push({tgt,iter,ifs});}
        this.eat('}');return{t:'DictComp',k:first,v:fv,gens};
      }
      const ps=[[first,fv]];
      while(this.is(','))this.nx()&&(this.is('}')||(()=>{const k=this.expr();this.eat(':');ps.push([k,this.expr()]);})());
      this.eat('}');return{t:'Dict',ps};
    }
    // Set comprehension
    if(this.is('for')){
      const gens=[];while(this.is('for')){this.eat('for');const tgt=this.forTarget();this.eat('in');const iter=this.eor();const ifs=[];while(this.is('if'))this.nx()&&ifs.push(this.eor());gens.push({tgt,iter,ifs});}
      this.eat('}');return{t:'SetComp',elt:first,gens};
    }
    const es=[first];while(this.is(','))this.nx()&&(this.is('}')||es.push(this.expr()));
    this.eat('}');return{t:'Set',e:es};
  }
}

// ─── Environment ───────────────────────────────────────────
class Env{
  constructor(par=null){this.vs={};this.par=par;this.globals=par?par.globals:this;}
  get(n){
    // Check if declared global in this scope
    if(this.vs['__global__'+n]===true)return this.globals.vs[n];
    if(Object.prototype.hasOwnProperty.call(this.vs,n))return this.vs[n];
    if(this.par)return this.par.get(n);
    throw new PyErr('NameError',`name '${n}' is not defined`);
  }
  set(n,v){this.vs[n]=v;}
  asgn(n,v){
    // Check if declared global in this scope
    if(this.vs['__global__'+n]===true){this.globals.vs[n]=v;return;}
    let e=this;
    while(e){
      if(Object.prototype.hasOwnProperty.call(e.vs,n)&&!e.vs['__global__'+n]){
        e.vs[n]=v;return;
      }
      e=e.par;
    }
    this.vs[n]=v;
  }
  gset(n,v){this.globals.vs[n]=v;}
}

// ─── Interpreter ───────────────────────────────────────────
// mkf: tag an integer as 'float' so pStr shows decimal point (e.g. 3.0)
const mkf=(n)=>{if(Number.isInteger(n)){const o=Object(n);o.__float__=true;o.valueOf=()=>n;return o;}return n;};
class Interp{
  constructor(outCb,inCb){
    this.out=outCb;this.inCb=inCb;
    this.steps=0;this.depth=0;
    this.MAX_STEPS=500000;this.MAX_DEPTH=300;
  }
  step(){if(++this.steps>this.MAX_STEPS)throw new PyErr('RuntimeError','Chương trình chạy quá lâu (>500k bước). Kiểm tra vòng lặp vô hạn.');}

  run(ast){const env=new Env();this.builtins(env);return this.execBlock(ast.b,env);}

  builtins(env){
    const py=this;
    const B={
      print:(...args)=>{
        let sep=' ',end='\n';
        const last=args[args.length-1];
        if(last&&typeof last==='object'&&last.__kw__){const kw=args.pop().__kw__;if('sep'in kw)sep=kw.sep===null?' ':py.pStr(kw.sep);if('end'in kw)end=kw.end===null?'':py.pStr(kw.end);}
        py.out(args.map(a=>py.pStr(a)).join(sep)+end);return null;
      },
      input:(prompt='')=>{py.out(py.pStr(prompt));const v=py.inCb();return v===null||v===undefined?'':String(v);},
      int:(x,base)=>{
        if(x===null)return 0;if(typeof x==='boolean')return x?1:0;
        if(x&&typeof x==='object'&&x.__float__)return Math.trunc(x.valueOf());
        if(typeof x==='number')return Math.trunc(x);
        if(typeof x==='string'){const n=base?parseInt(x.trim(),base):parseInt(x.trim(),10);if(isNaN(n))throw new PyErr('ValueError',`invalid literal for int(): '${x}'`);return n;}
        throw new PyErr('TypeError',`int() không nhận '${py.tname(x)}'`);
      },
      float:(x)=>{if(x===null)return mkf(0);if(typeof x==='boolean')return mkf(x?1:0);if(typeof x==='number')return Number.isInteger(x)?mkf(x):x;if(x&&x.__float__)return x;if(typeof x==='string'){const s=x.trim().toLowerCase();if(s==='inf'||s==='+inf'||s==='infinity'||s==='+infinity')return Infinity;if(s==='-inf'||s==='-infinity')return -Infinity;if(s==='nan')return NaN;const n=parseFloat(s);if(isNaN(n))throw new PyErr('ValueError',`could not convert to float: '${x}'`);return Number.isInteger(n)?mkf(n):n;}throw new PyErr('TypeError','float() needs a number or string');},
      str:(x)=>py.pStr(x),
      bool:(x)=>py.pBool(x),
      list:(x)=>py.toArr(x),
      tuple:(x)=>{const a=py.toArr(x);a.__tup__=true;return a;},
      dict:(x)=>x&&x.__d__?x:{__d__:{},__k__:[]},
      set:(x)=>{const a=py.toArr(x);return{__set__:true,data:new Map(a.map(v=>[py.pRepr(v),v]))};},
      len:(x)=>{if(typeof x==='string')return x.length;if(Array.isArray(x))return x.length;if(x&&x.__d__)return(x.__k__||[]).length;if(x&&x.__set__)return x.data.size;throw new PyErr('TypeError',`object of type '${py.tname(x)}' has no len()`);},
      range:(a,b,s=1)=>{if(b===undefined){b=a;a=0;}return{__rng__:true,a,b,s};},
      enumerate:(it,st=0)=>{return py.toArr(it).map((v,i)=>{const t=[i+st,v];t.__tup__=true;return t;});},
      zip:(...its)=>{const as=its.map(i=>py.toArr(i));const m=Math.min(...as.map(a=>a.length));return Array.from({length:m},(_,i)=>{const t=as.map(a=>a[i]);t.__tup__=true;return t;});},
      map:(fn,it)=>py.toArr(it).map(v=>py.call(fn,[v],{})),
      filter:(fn,it)=>py.toArr(it).filter(v=>fn===null?py.pBool(v):py.pBool(py.call(fn,[v],{}))),
      sorted:(it,...rest)=>{
        let key=null,rev=false;const last=rest[rest.length-1];if(last&&last.__kw__){const kw=rest.pop().__kw__;key=kw.key||null;rev=kw.reverse||false;}
        const arr=[...py.toArr(it)];arr.sort((a,b)=>{const ka=key?py.call(key,[a],{}):a;const kb=key?py.call(key,[b],{}):b;return py.pLt(ka,kb)?-1:py.pLt(kb,ka)?1:0;});if(rev)arr.reverse();return arr;
      },
      reversed:(it)=>[...py.toArr(it)].reverse(),
      abs:(x)=>{const xv=x&&typeof x==='object'&&x.__float__?x.valueOf():x;const r=Math.abs(xv);return(x&&typeof x==='object'&&x.__float__&&Number.isInteger(r))?mkf(r):r;},
      round:(x,n=0)=>{const xv=x&&typeof x==='object'&&x.__float__?x.valueOf():x;if(n===0){const r=Math.round(xv);return(x&&typeof x==='object'&&x.__float__&&Number.isInteger(r))?mkf(r):r;}const f=Math.pow(10,n);const r=Math.round(xv*f)/f;return(x&&typeof x==='object'&&x.__float__&&Number.isInteger(r))?mkf(r):r;},
      pow:(x,y,m)=>{const r=Math.pow(x,y);return m!==undefined?r%m:r;},
      divmod:(a,b)=>{const q=Math.floor(a/b);return[q,a-q*b];},
      min:(...args)=>{let a=args.length===1&&Array.isArray(args[0])?args[0]:args;if(a[a.length-1]&&a[a.length-1].__kw__)a=a.slice(0,-1);return a.reduce((x,y)=>py.pLt(x,y)?x:y);},
      max:(...args)=>{let a=args.length===1&&Array.isArray(args[0])?args[0]:args;if(a[a.length-1]&&a[a.length-1].__kw__)a=a.slice(0,-1);return a.reduce((x,y)=>py.pLt(x,y)?y:x);},
      sum:(it,s=0)=>py.toArr(it).reduce((a,b)=>a+b,s),
      any:(it)=>py.toArr(it).some(v=>py.pBool(v)),
      all:(it)=>py.toArr(it).every(v=>py.pBool(v)),
      type:(x)=>py.tname(x),
      isinstance:(o,c)=>{if(typeof c==='string')return py.tname(o)===c;if(c&&c.__cls__)return o&&o.__inst__&&o.__cls__===c;if(c==='int'||c===B?.int)return typeof o==='number'&&Number.isInteger(o);if(c==='float'||c===B?.float)return typeof o==='number'||(o&&typeof o==='object'&&o.__float__);if(c==='str'||c===B?.str)return typeof o==='string';if(c==='list'||c===B?.list)return Array.isArray(o)&&!o.__tup__;if(c==='bool'||c===B?.bool)return typeof o==='boolean';return false;},
      repr:(x)=>py.pRepr(x),
      chr:(x)=>String.fromCharCode(x),ord:(x)=>x.charCodeAt(0),
      hex:(x)=>'0x'+x.toString(16),bin:(x)=>'0b'+Math.abs(x).toString(2),oct:(x)=>'0o'+x.toString(8),
      format:(v,s='')=>String(v),
      id:(x)=>Math.floor(Math.random()*1e9),
      vars:(o)=>o?o.__d__||{}:{},dir:(o)=>[],
      open:()=>{throw new PyErr('IOError','File I/O không được hỗ trợ trong môi trường này');},
      // Error names - callable exception classes
      ValueError:{__cls__:true,__name__:'ValueError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      TypeError:{__cls__:true,__name__:'TypeError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      IndexError:{__cls__:true,__name__:'IndexError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      KeyError:{__cls__:true,__name__:'KeyError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      NameError:{__cls__:true,__name__:'NameError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      ZeroDivisionError:{__cls__:true,__name__:'ZeroDivisionError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      Exception:{__cls__:true,__name__:'Exception',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      RuntimeError:{__cls__:true,__name__:'RuntimeError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      AttributeError:{__cls__:true,__name__:'AttributeError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      StopIteration:{__cls__:true,__name__:'StopIteration',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      OverflowError:{__cls__:true,__name__:'OverflowError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      // Math module
      math:{
        __mod__:true,
        pi:Math.PI,e:Math.E,
        sqrt:(x)=>{const r=Math.sqrt(x);return Number.isInteger(r)?mkf(r):r;},
        floor:(x)=>Math.floor(x),ceil:(x)=>Math.ceil(x),fabs:(x)=>Math.abs(x),
        sin:(x)=>mkf(Math.sin(x)),cos:(x)=>mkf(Math.cos(x)),tan:(x)=>mkf(Math.tan(x)),
        asin:(x)=>mkf(Math.asin(x)),acos:(x)=>mkf(Math.acos(x)),atan:(x)=>mkf(Math.atan(x)),atan2:(y,x)=>mkf(Math.atan2(y,x)),
        log:(x,b)=>mkf(b?Math.log(x)/Math.log(b):Math.log(x)),
        log2:(x)=>mkf(Math.log2(x)),log10:(x)=>mkf(Math.log10(x)),pow:(x,y)=>mkf(Math.pow(x,y)),exp:(x)=>mkf(Math.exp(x)),
        factorial:(n)=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;},
        gcd:(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;},
        inf:Infinity,nan:NaN,isnan:(x)=>isNaN(x),isinf:(x)=>!isFinite(x),
        trunc:(x)=>Math.trunc(x),degrees:(r)=>mkf(r*180/Math.PI),radians:(d)=>mkf(d*Math.PI/180),
        hypot:(...args)=>mkf(Math.hypot(...args)),
      },
      random:{
        __mod__:true,
        random:()=>Math.random(),
        randint:(a,b)=>Math.floor(Math.random()*(b-a+1))+a,
        randrange:(a,b,s=1)=>{if(b===undefined){b=a;a=0;}const cs=[];for(let i=a;i<b;i+=s)cs.push(i);return cs[Math.floor(Math.random()*cs.length)];},
        choice:(a)=>a[Math.floor(Math.random()*a.length)],
        shuffle:(a)=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return null;},
        uniform:(a,b)=>Math.random()*(b-a)+a,
        sample:(a,k)=>{const c=[...a];for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]];}return c.slice(0,k);},
      },
    };
    Object.entries(B).forEach(([k,v])=>env.set(k,v));
  }

  // ── Statement execution ──────────────────────────────────
  execBlock(stmts,env){
    for(const s of stmts){
      const r=this.execStmt(s,env);
      if(r instanceof RetSig||r instanceof BreakSig||r instanceof ContSig||r instanceof ExcSig)return r;
    }
    return null;
  }

  execStmt(s,env){
    this.step();
    switch(s.t){
      case'Prog':return this.execBlock(s.b,env);
      case'Block':return this.execBlock(s.b,env);
      case'Pass':return null;
      case'Break':return new BreakSig();
      case'Cont':return new ContSig();
      case'Expr':this.eval(s.e,env);return null;
      case'Asgn':{const v=this.eval(s.v,env);for(const t of s.ts)this.setTgt(t,v,env);return null;}
      case'AugAsgn':{const cur=this.eval(s.tgt,env);const v=this.eval(s.v,env);const r=this.augOp(s.op,cur,v);this.setTgt(s.tgt,r,env);return null;}
      case'If':return this.execIf(s,env);
      case'While':return this.execWhile(s,env);
      case'For':return this.execFor(s,env);
      case'Def':{env.set(s.name,{__fn__:true,name:s.name,args:s.args,body:s.body,cl:env});return null;}
      case'Class':return this.execClass(s,env);
      case'Ret':{const v=s.v?this.eval(s.v,env):null;return new RetSig(v);}
      case'Global':{s.ns.forEach(n=>{env.globals.vs[n]=env.globals.vs[n]??null;env.vs['__global__'+n]=true;});return null;}
      case'Import':{try{const mod=env.get(s.mn);env.set(s.alias,mod);}catch(e){/* module not found, ignore */}return null;}
      case'Del':{for(const t of s.ts){if(t.t==='Name')delete env.vs[t.n];else if(t.t==='Idx'){const o=this.eval(t.o,env);const i=this.eval(t.i,env);if(Array.isArray(o))o.splice(i<0?o.length+i:i,1);else if(o&&o.__d__)delete o.__d__[this.pRepr(i)];}}return null;}
      case'Assert':{if(!this.pBool(this.eval(s.test,env)))return new ExcSig(new PyErr('AssertionError',s.msg?this.pStr(this.eval(s.msg,env)):'Assertion failed',s.ln));return null;}
      case'Try':return this.execTry(s,env);
      case'Raise':{
        const ev=s.e?this.eval(s.e,env):null;
        if(!ev)return new ExcSig(new PyErr('RuntimeError',''));
        if(ev instanceof PyErr)return new ExcSig(ev);
        // Instance of exception class (e.g. ValueError("msg"))
        if(ev&&ev.__inst__&&ev.__cls__&&ev.__cls__.__name__){
          const ename=ev.__cls__.__name__;
          const emsg=ev.__attrs__&&ev.__attrs__.msg!==undefined?String(ev.__attrs__.msg):'';
          const pyerr=new PyErr(ename,emsg);
          pyerr.__inst__=ev; // keep original instance for 'as e' binding
          return new ExcSig(pyerr);
        }
        // Exception class itself (e.g. raise ValueError)
        if(ev&&ev.__cls__&&ev.__name__)return new ExcSig(new PyErr(ev.__name__,''));
        return new ExcSig(new PyErr('Exception',this.pStr(ev)));
      }
      default:return null;
    }
  }

  setTgt(t,v,env){
    switch(t.t){
      case'Name':env.asgn(t.n,v);break;
      case'Idx':{const o=this.eval(t.o,env);const i=this.eval(t.i,env);if(Array.isArray(o))o[i<0?o.length+i:i]=v;else if(o&&o.__d__){o.__d__[this.pRepr(i)]=v;if(!(o.__k__||[]).some(k=>this.pEq(k,i))){o.__k__=o.__k__||[];o.__k__.push(i);}}break;}
      case'Attr':{const o=this.eval(t.o,env);if(o&&o.__inst__)o.__attrs__[t.a]=v;else if(o&&typeof o==='object')o[t.a]=v;break;}
      case'Tuple':case'List':{const arr=this.toArr(v);t.e.forEach((tgt,i)=>this.setTgt(tgt,arr[i],env));break;}
    }
  }

  execIf(s,env){
    if(this.pBool(this.eval(s.test,env))){const r=this.execBlock(s.body.b,env);return r;}
    for(const alt of s.els){
      if(alt.t==='If'){const r=this.execStmt(alt,env);if(r)return r;return null;}
      return this.execBlock(alt.b,env);
    }
    return null;
  }

  execWhile(s,env){
    let iter=0;let broke=false;
    while(this.pBool(this.eval(s.test,env))){
      this.step();if(++iter>200000)throw new PyErr('RuntimeError','Vòng while lặp quá nhiều lần');
      const r=this.execBlock(s.body.b,env);
      if(r instanceof BreakSig){broke=true;break;}if(r instanceof ContSig)continue;
      if(r instanceof RetSig||r instanceof ExcSig)return r;
    }
    if(!broke&&s.eb)return this.execBlock(s.eb.b,env);
    return null;
  }

  execFor(s,env){
    const items=this.toArr(this.eval(s.iter,env));
    let broke=false;
    for(const item of items){
      this.step();this.setTgt(s.tgt,item,env);
      const r=this.execBlock(s.body.b,env);
      if(r instanceof BreakSig){broke=true;break;}if(r instanceof ContSig)continue;
      if(r instanceof RetSig||r instanceof ExcSig)return r;
    }
    if(!broke&&s.eb)return this.execBlock(s.eb.b,env);
    return null;
  }

  execClass(s,env){
    const clEnv=new Env(env);this.execBlock(s.body.b,clEnv);
    env.set(s.name,{__cls__:true,__name__:s.name,__m__:clEnv.vs});return null;
  }

  execTry(s,env){
    let r=null;
    let caughtErr=null;
    try{
      r=this.execBlock(s.body.b,env);
    }catch(e){
      // PyErr thrown directly (not via ExcSig)
      if(e instanceof PyErr)caughtErr=e;
      else throw e;
    }
    // Convert thrown PyErr to ExcSig
    if(caughtErr)r=new ExcSig(caughtErr);
    if(r instanceof ExcSig){
      let handled=false;
      for(const h of s.hs){
        const mt=h.et?this.eval(h.et,env):null;
        const errType=r.e&&r.e.et?r.e.et:'Exception';
        // mt can be: null (bare except), string (old style), class object {__cls__,__name__}
        const mtName=mt===null?null:(typeof mt==='string'?mt:(mt&&mt.__cls__&&mt.__name__?mt.__name__:null));
        const matches=!mtName||mtName==='Exception'||errType===mtName||errType.includes(mtName);
        if(matches){
          // Bind exception to variable: prefer original instance, else PyErr
          const bindVal=r.e&&r.e.__inst__?r.e.__inst__:r.e;
          if(h.en)env.set(h.en,bindVal);r=this.execBlock(h.body.b,env);handled=true;break;
        }
      }
      if(!handled){if(s.fb)this.execBlock(s.fb.b,env);return r;}
    } else {
      // No exception: run else clause if present
      if(s.eb)r=this.execBlock(s.eb.b,env);
    }
    if(s.fb)this.execBlock(s.fb.b,env);
    return(r instanceof BreakSig||r instanceof ContSig||r instanceof RetSig)?r:null;
  }

  augOp(op,a,b){
    const af=a&&typeof a==='object'&&a.__float__;const bf=b&&typeof b==='object'&&b.__float__;
    const av=af?a.valueOf():a;const bv=bf?b.valueOf():b;
    const wf=(res)=>(af||bf)&&Number.isInteger(res)?mkf(res):res;
    switch(op){
      case'+=':if(Array.isArray(av)&&Array.isArray(bv)){av.push(...bv);return av;}return wf(av+bv);
      case'-=':return wf(av-bv);case'*=':return wf(av*bv);case'/=':return av/bv;
      case'//=':return wf(Math.floor(av/bv));case'%=':return wf(((av%bv)+bv)%bv);
      case'**=':return wf(Math.pow(av,bv));case'&=':return av&bv;case'|=':return av|bv;case'^=':return av^bv;
    }
  }

  // ── Expression evaluation ────────────────────────────────
  eval(e,env){
    if(!e)return null;
    switch(e.t){
      case'Num':return e.v;
      case'Bool':return e.v;
      case'NoneV':return null;
      case'Str':return e.f?this.evalFStr(e.v,env):e.v;
      case'Name':return env.get(e.n);
      case'List':return e.e.map(x=>this.eval(x,env));
      case'Tuple':{const a=e.e.map(x=>this.eval(x,env));a.__tup__=true;return a;}
      case'Set':{const es=e.e.map(x=>this.eval(x,env));return{__set__:true,data:new Map(es.map(v=>[this.pRepr(v),v]))};}
      case'Dict':{
        const d={__d__:{},__k__:[]};
        for(const[k,v]of e.ps){const kv=this.eval(k,env);const vv=this.eval(v,env);d.__d__[this.pRepr(kv)]=vv;d.__k__.push(kv);}
        return d;
      }
      case'Bin':return this.evalBin(e,env);
      case'UnOp':{const v=this.eval(e.v,env);if(e.op==='-'){const nv=-v;return(v&&typeof v==='object'&&v.__float__&&Number.isInteger(nv))?mkf(nv):nv;}if(e.op==='+'){const pv=+v;return(v&&typeof v==='object'&&v.__float__&&Number.isInteger(pv))?mkf(pv):pv;}if(e.op==='~')return~v;if(e.op==='not')return!this.pBool(v);break;}
      case'BoolOp':{const l=this.eval(e.l,env);if(e.op==='or')return this.pBool(l)?l:this.eval(e.r,env);return!this.pBool(l)?l:this.eval(e.r,env);}
      case'Cmp':{const l=this.eval(e.l,env);const r=this.eval(e.r,env);return this.cmp(e.op,l,r);}
      case'Call':return this.evalCall(e,env);
      case'Attr':{const o=this.eval(e.o,env);return this.getAttr(o,e.a);}
      case'Idx':{const o=this.eval(e.o,env);const i=this.eval(e.i,env);return this.getItem(o,i);}
      case'Slice':{const o=this.eval(e.o,env);const lo=e.lo?this.eval(e.lo,env):null;const up=e.up?this.eval(e.up,env):null;const st=e.st?this.eval(e.st,env):null;return this.getSlice(o,lo,up,st);}
      case'Tern':{return this.pBool(this.eval(e.test,env))?this.eval(e.b,env):this.eval(e.o,env);}
      case'Lambda':{return{__fn__:true,name:'<lambda>',args:e.as,body:{t:'Block',b:[{t:'Ret',v:e.body}]},cl:env};}
      case'ListComp':{const rs=[];this.evalComp(e.gens,0,env,(ie)=>rs.push(this.eval(e.elt,ie)));return rs;}
      case'DictComp':{const d={__d__:{},__k__:[]};this.evalComp(e.gens,0,env,(ie)=>{const k=this.eval(e.k,ie);const v=this.eval(e.v,ie);d.__d__[this.pRepr(k)]=v;if(!(d.__k__||[]).some(x=>this.pEq(x,k)))d.__k__.push(k);});return d;}
      case'SetComp':{const s={__set__:true,data:new Map()};this.evalComp(e.gens,0,env,(ie)=>{const v=this.eval(e.elt,ie);s.data.set(this.pRepr(v),v);});return s;}
      case'S':{const a=this.eval(e.v,env);if(!Array.isArray(a))throw new PyErr('TypeError','* needs iterable');return{__star__:true,vs:a};}
      case'SS':{const d=this.eval(e.v,env);return{__ss__:true,d};}
      default:throw new PyErr('RuntimeError',`Unknown node: ${e.t}`);
    }
  }

  evalComp(gens,idx,env,cb){
    if(idx>=gens.length){cb(env);return;}
    const gen=gens[idx];const items=this.toArr(this.eval(gen.iter,env));
    for(const item of items){const ie=new Env(env);this.setTgt(gen.tgt,item,ie);if(gen.ifs.every(c=>this.pBool(this.eval(c,ie))))this.evalComp(gens,idx+1,ie,cb);}
  }

  evalFStr(tmpl,env){
    return tmpl.replace(/\{([^}]+)\}/g,(_,es)=>{
      const colonIdx=es.indexOf(':');const src=colonIdx>=0?es.slice(0,colonIdx).trim():es.trim();const spec=colonIdx>=0?es.slice(colonIdx+1):'';
      try{const toks=tokenize(src+'\n');const p=new Parser(toks);const ast=p.expr();const v=this.eval(ast,env);
        if(spec){if(/[eEfFgG]/.test(spec)){const prec=parseInt(spec.match(/\.(\d+)/)?.[1]??'6');if(spec.includes('e')||spec.includes('E'))return typeof v==='number'?v.toExponential(prec):String(v);return typeof v==='number'?v.toFixed(prec):String(v);}
          if(spec.includes('d'))return Math.trunc(v).toString();
          if(spec.includes('%')){const prec=parseInt(spec.match(/\.(\d+)/)?.[1]??'2');return typeof v==='number'?(v*100).toFixed(prec)+'%':String(v);}
          const wMatch=spec.match(/^(\d+)$/);if(wMatch){const w=parseInt(wMatch[1]);return this.pStr(v).padStart(w);}
        }
        return this.pStr(v);
      }catch{return`{${es}}`;}  
    });
  }

  evalBin(e,env){
    const l=this.eval(e.l,env);const r=this.eval(e.r,env);
    const lf=l&&typeof l==='object'&&l.__float__;const rf=r&&typeof r==='object'&&r.__float__;
    const lv=lf?l.valueOf():l;const rv=rf?r.valueOf():r;
    const wf=(res)=>(lf||rf)&&Number.isInteger(res)?mkf(res):res;
    switch(e.op){
      case'+':if(Array.isArray(lv)&&Array.isArray(rv))return[...lv,...rv];if(typeof lv==='string'||typeof rv==='string')return this.pStr(lv)+this.pStr(rv);return wf(lv+rv);
      case'-':return wf(lv-rv);
      case'*':if(typeof lv==='string'&&typeof rv==='number')return lv.repeat(Math.max(0,rv));if(typeof rv==='string'&&typeof lv==='number')return rv.repeat(Math.max(0,lv));if(Array.isArray(lv)&&typeof rv==='number'){const a=[];for(let i=0;i<rv;i++)a.push(...lv);return a;}return wf(lv*rv);
      case'/':if(rv===0)throw new PyErr('ZeroDivisionError','division by zero');return lv/rv;
      case'//':if(rv===0)throw new PyErr('ZeroDivisionError','division by zero');return wf(Math.floor(lv/rv));
      case'%':if(rv===0)throw new PyErr('ZeroDivisionError','modulo by zero');if(typeof lv==='string')return this.pyFmt(lv,rv);return wf(((lv%rv)+Math.abs(rv))%Math.abs(rv));
      case'**':return wf(Math.pow(lv,rv));
      case'&':return lv&rv;case'|':return lv|rv;case'^':return lv^rv;
      case'<<':return lv<<rv;case'>>':return lv>>rv;
    }
  }

  pyFmt(fmt,args){
    if(!Array.isArray(args))args=[args];let i=0;
    return fmt.replace(/%([.0-9]*)([dsifr%])/g,(_,sp,tp)=>{
      if(tp==='%')return'%';const v=args[i++];
      if(tp==='d'||tp==='i')return Math.trunc(v).toString();
      if(tp==='f'){const p=parseInt(sp.match(/\.(\d+)/)?.[1]??'6');return Number(v).toFixed(p);}
      if(tp==='s'||tp==='r')return this.pStr(v);return String(v);
    });
  }

  cmp(op,l,r){
    switch(op){
      case'==':return this.pEq(l,r);case'!=':return!this.pEq(l,r);
      case'<':return this.pLt(l,r);case'>':return this.pLt(r,l);
      case'<=':return!this.pLt(r,l);case'>=':return!this.pLt(l,r);
      case'in':return this.pIn(l,r);case'not in':return!this.pIn(l,r);
      case'is':return l===r;case'is not':return l!==r;
    }
  }
  pEq(a,b){
    const av=a&&typeof a==='object'&&a.__float__?a.valueOf():a;
    const bv=b&&typeof b==='object'&&b.__float__?b.valueOf():b;
    if(av===bv)return true;if(av===null||bv===null)return av===bv;
    if(Array.isArray(av)&&Array.isArray(bv))return av.length===bv.length&&av.every((v,i)=>this.pEq(v,bv[i]));
    return av==bv;
  }
  pLt(a,b){
    const av=a&&typeof a==='object'&&a.__float__?a.valueOf():a;
    const bv=b&&typeof b==='object'&&b.__float__?b.valueOf():b;
    if(typeof av==='string'&&typeof bv==='string')return av<bv;
    if(Array.isArray(av)&&Array.isArray(bv)){for(let i=0;i<Math.min(av.length,bv.length);i++){if(this.pLt(av[i],bv[i]))return true;if(this.pLt(bv[i],av[i]))return false;}return av.length<bv.length;}
    return av<bv;
  }
  pIn(x,c){
    if(typeof c==='string')return c.includes(this.pStr(x));
    if(Array.isArray(c))return c.some(v=>this.pEq(v,x));
    if(c&&c.__d__)return(c.__k__||[]).some(k=>this.pEq(k,x));
    if(c&&c.__set__)return c.data.has(this.pRepr(x));
    if(c&&c.__rng__){const r=c;const xv=x&&typeof x==='object'&&x.__float__?x.valueOf():x;if(typeof xv!=='number')return false;if(r.s>0)return xv>=r.a&&xv<r.b&&Number.isInteger((xv-r.a)/r.s);return xv<=r.a&&xv>r.b&&Number.isInteger((r.a-xv)/(-r.s));}
    throw new PyErr('TypeError',`'${this.tname(c)}' is not iterable`);
  }

  evalCall(e,env){
    const fn=this.eval(e.fn,env);
    let args=[];const kw={};
    Object.entries(e.kw||{}).forEach(([k,v])=>kw[k]=this.eval(v,env));
    for(const a of e.as){const v=this.eval(a,env);if(v&&v.__star__)args.push(...v.vs);else if(v&&v.__ss__){const d=v.d;(d.__k__||[]).forEach(k=>kw[this.pStr(k)]=d.__d__[this.pRepr(k)]);}else args.push(v);}
    if(fn===null||fn===undefined)throw new PyErr('TypeError',`'NoneType' is not callable`);
    if(typeof fn!=='function'&&!(fn&&(fn.__fn__||fn.__cls__||fn.__bm__)))throw new PyErr('TypeError',`'${this.tname(fn)}' is not callable`);
    return this.call(fn,args,kw);
  }

  call(fn,args,kw={}){
    if(++this.depth>this.MAX_DEPTH){this.depth--;throw new PyErr('RecursionError','maximum recursion depth exceeded');}
    try{
      if(typeof fn==='function'){return Object.keys(kw).length>0?fn(...args,{__kw__:kw}):fn(...args);}
      if(fn&&fn.__fn__){
        const fe=new Env(fn.cl);let pi=0;
        for(const p of fn.args){
          if(p.s===1){fe.set(p.n,args.slice(pi));pi=args.length;}
          else if(p.s===2){const d={__d__:{},__k__:[]};Object.entries(kw).forEach(([k,v])=>{d.__d__[this.pRepr(k)]=v;d.__k__.push(k);});fe.set(p.n,d);}
          else{const v=p.n in kw?kw[p.n]:pi<args.length?args[pi++]:p.d!==null?this.eval(p.d,fn.cl):null;fe.set(p.n,v);}
        }
        const r=this.execBlock(fn.body.b,fe);
        if(r instanceof RetSig)return r.v;if(r instanceof ExcSig)throw r.e;return null;
      }
      if(fn&&fn.__cls__){
        const inst={__inst__:true,__cls__:fn,__attrs__:{}};
        const init=fn.__m__.__init__;
        if(init){
          if(typeof init==='function'){init(inst,...args);}  // native __init__
          else{this.call({...init,__fn__:true},[inst,...args],kw);}  // user-defined __init__
        }
        return inst;
      }
      if(fn&&fn.__bm__){return this.call(fn.fn,[fn.self,...args],kw);}
      throw new PyErr('TypeError',`'${this.tname(fn)}' is not callable`);
    }finally{this.depth--;}
  }

  // ── Object attribute/item access ──────────────────────────
  getAttr(o,a){
    if(o===null)throw new PyErr('AttributeError',`'NoneType' has no attribute '${a}'`);
    if(typeof o==='string')return this.strMethod(o,a);
    if(Array.isArray(o))return this.listMethod(o,a);
    if(o&&o.__d__!==undefined&&!o.__mod__)return this.dictMethod(o,a);
    if(o&&o.__set__)return this.setMethod(o,a);
    // PyErr object (from except e as err) - expose .msg, .args
    if(o instanceof PyErr){if(a==='msg'||a==='args')return a==='msg'?o.msg:[o.msg];if(a==='__class__')return o.et;return o[a]??null;}
    if(o&&o.__inst__){if(a in o.__attrs__)return o.__attrs__[a];const m=o.__cls__.__m__[a];if(m)return{__bm__:true,fn:m,self:o};throw new PyErr('AttributeError',`'${o.__cls__.__name__}' has no attribute '${a}'`);}
    if(o&&o.__mod__&&a in o)return o[a];
    if(o&&typeof o==='object'&&a in o){const v=o[a];return typeof v==='function'?v:v;}
    throw new PyErr('AttributeError',`'${this.tname(o)}' has no attribute '${a}'`);
  }

  strMethod(s,m){
    const py=this;
    const ms={
      upper:()=>s.toUpperCase(),lower:()=>s.toLowerCase(),
      strip:(c)=>c?s.replace(new RegExp(`^[${c}]+|[${c}]+$`,'g'),''):s.trim(),
      lstrip:(c)=>c?s.replace(new RegExp(`^[${c}]+`),''):s.trimStart(),
      rstrip:(c)=>c?s.replace(new RegExp(`[${c}]+$`),''):s.trimEnd(),
      split:(sep,mx=-1)=>{
        if(sep==null){const p=s.trim().split(/\s+/);return s.trim()===''?[]:p;}
        if(mx===-1)return s.split(sep);
        const ps=[];let str=s;for(let i=0;i<mx;i++){const idx=str.indexOf(sep);if(idx===-1)break;ps.push(str.slice(0,idx));str=str.slice(idx+sep.length);}ps.push(str);return ps;
      },
      splitlines:()=>s.split('\n'),
      join:(it)=>py.toArr(it).map(v=>py.pStr(v)).join(s),
      replace:(old,nw,cnt=-1)=>{if(cnt===-1)return s.replaceAll(old,nw);let r=s,i=0;while(i<cnt){const idx=r.indexOf(old);if(idx===-1)break;r=r.slice(0,idx)+nw+r.slice(idx+old.length);i++;}return r;},
      find:(sub,st=0)=>s.indexOf(sub,st),rfind:(sub)=>s.lastIndexOf(sub),
      index:(sub,st=0)=>{const i=s.indexOf(sub,st);if(i===-1)throw new PyErr('ValueError','substring not found');return i;},
      count:(sub)=>{let c=0,p=0;while((p=s.indexOf(sub,p))!==-1){c++;p+=sub.length||1;}return c;},
      startswith:(pfx)=>Array.isArray(pfx)?pfx.some(p=>s.startsWith(p)):s.startsWith(pfx),
      endswith:(sfx)=>Array.isArray(sfx)?sfx.some(p=>s.endsWith(p)):s.endsWith(sfx),
      isdigit:()=>/^\d+$/.test(s),isalpha:()=>/^[a-zA-Z]+$/.test(s),
      isalnum:()=>/^[a-zA-Z0-9]+$/.test(s),isspace:()=>/^\s+$/.test(s),
      isupper:()=>s===s.toUpperCase()&&/[a-zA-Z]/.test(s),
      islower:()=>s===s.toLowerCase()&&/[a-zA-Z]/.test(s),
      capitalize:()=>s.charAt(0).toUpperCase()+s.slice(1).toLowerCase(),
      title:()=>s.replace(/\b\w/g,c=>c.toUpperCase()),
      center:(w,f=' ')=>s.padStart(Math.floor((w+s.length)/2),f).padEnd(w,f),
      ljust:(w,f=' ')=>s.padEnd(w,f),rjust:(w,f=' ')=>s.padStart(w,f),
      zfill:(w)=>s.padStart(w,'0'),
      format:(...args)=>{
        let i=0;return s.replace(/\{(\d*)(:[^}]*)?\}/g,(_,idx,spec)=>{
          const v=idx!==''?args[parseInt(idx)]:args[i++];
          if(spec){const fs=spec.slice(1);if(fs.includes('f')){const p=parseInt(fs.match(/\.(\d+)/)?.[1]??'6');return typeof v==='number'?v.toFixed(p):String(v);}if(fs.includes('d'))return Math.trunc(v).toString();}
          return py.pStr(v);
        });
      },
      encode:()=>s,decode:()=>s,
      __len__:()=>s.length,__contains__:(x)=>s.includes(x),
    };
    if(m in ms)return ms[m];
    throw new PyErr('AttributeError',`'str' has no attribute '${m}'`);
  }

  listMethod(arr,m){
    const py=this;
    const ms={
      append:(v)=>{arr.push(v);return null;},
      extend:(v)=>{arr.push(...py.toArr(v));return null;},
      insert:(i,v)=>{arr.splice(i,0,v);return null;},
      pop:(i=-1)=>{const idx=i<0?arr.length+i:i;if(idx<0||idx>=arr.length)throw new PyErr('IndexError','pop index out of range');return arr.splice(idx,1)[0];},
      remove:(v)=>{const i=arr.findIndex(x=>py.pEq(x,v));if(i===-1)throw new PyErr('ValueError','list.remove(x): x not in list');arr.splice(i,1);return null;},
      index:(v,st=0)=>{const i=arr.findIndex((x,j)=>j>=st&&py.pEq(x,v));if(i===-1)throw new PyErr('ValueError',`${py.pRepr(v)} not in list`);return i;},
      count:(v)=>arr.filter(x=>py.pEq(x,v)).length,
      sort:(...args)=>{let key=null,rev=false;const last=args[args.length-1];if(last&&last.__kw__){const kw=args.pop().__kw__;key=kw.key||null;rev=kw.reverse||false;}arr.sort((a,b)=>{const ka=key?py.call(key,[a],{}):a;const kb=key?py.call(key,[b],{}):b;return py.pLt(ka,kb)?-1:py.pLt(kb,ka)?1:0;});if(rev)arr.reverse();return null;},
      reverse:()=>{arr.reverse();return null;},
      clear:()=>{arr.length=0;return null;},
      copy:()=>[...arr],
      __len__:()=>arr.length,__contains__:(x)=>arr.some(v=>py.pEq(v,x)),
    };
    if(m in ms)return ms[m];
    throw new PyErr('AttributeError',`'list' has no attribute '${m}'`);
  }

  dictMethod(d,m){
    const py=this;const gk=(k)=>py.pRepr(k);
    const ms={
      get:(k,df=null)=>{const r=gk(k);return r in d.__d__?d.__d__[r]:df;},
      keys:()=>[...(d.__k__||[])],values:()=>(d.__k__||[]).map(k=>d.__d__[gk(k)]),
      items:()=>(d.__k__||[]).map(k=>[k,d.__d__[gk(k)]]),
      update:(o)=>{(o.__k__||[]).forEach(k=>{d.__d__[gk(k)]=o.__d__[gk(k)];if(!(d.__k__||[]).some(x=>py.pEq(x,k))){d.__k__=d.__k__||[];d.__k__.push(k);}});return null;},
      pop:(k,df)=>{const r=gk(k);if(r in d.__d__){const v=d.__d__[r];delete d.__d__[r];d.__k__=(d.__k__||[]).filter(x=>!py.pEq(x,k));return v;}if(df!==undefined)return df;throw new PyErr('KeyError',py.pRepr(k));},
      setdefault:(k,df=null)=>{const r=gk(k);if(!(r in d.__d__)){d.__d__[r]=df;d.__k__=d.__k__||[];d.__k__.push(k);}return d.__d__[r];},
      clear:()=>{d.__d__={};d.__k__=[];return null;},copy:()=>({__d__:{...d.__d__},__k__:[...(d.__k__||[])]}),
      __len__:()=>(d.__k__||[]).length,__contains__:(k)=>gk(k) in d.__d__,
    };
    if(m in ms)return ms[m];
    throw new PyErr('AttributeError',`'dict' has no attribute '${m}'`);
  }

  setMethod(s,m){
    const py=this;
    const ms={
      add:(v)=>{s.data.set(py.pRepr(v),v);return null;},
      remove:(v)=>{const k=py.pRepr(v);if(!s.data.has(k))throw new PyErr('KeyError',py.pRepr(v));s.data.delete(k);return null;},
      discard:(v)=>{s.data.delete(py.pRepr(v));return null;},
      pop:()=>{const[k,v]=s.data.entries().next().value;s.data.delete(k);return v;},
      clear:()=>{s.data.clear();return null;},copy:()=>({__set__:true,data:new Map(s.data)}),
      union:(o)=>({__set__:true,data:new Map([...s.data,...o.data])}),
      intersection:(o)=>({__set__:true,data:new Map([...s.data].filter(([k])=>o.data.has(k)))}),
      difference:(o)=>({__set__:true,data:new Map([...s.data].filter(([k])=>!o.data.has(k)))}),
      issubset:(o)=>[...s.data.keys()].every(k=>o.data.has(k)),
      issuperset:(o)=>[...o.data.keys()].every(k=>s.data.has(k)),
      __len__:()=>s.data.size,__contains__:(v)=>s.data.has(py.pRepr(v)),
    };
    if(m in ms)return ms[m];
    throw new PyErr('AttributeError',`'set' has no attribute '${m}'`);
  }

  getItem(o,idx){
    const idxv=idx&&typeof idx==='object'&&idx.__float__?idx.valueOf():idx;
    if(typeof o==='string'){const i=idxv<0?o.length+idxv:idxv;if(i<0||i>=o.length)throw new PyErr('IndexError','string index out of range');return o[i];}
    if(Array.isArray(o)){const i=typeof idxv==='number'?(idxv<0?o.length+idxv:idxv):idxv;if(typeof i==='number'&&(i<0||i>=o.length))throw new PyErr('IndexError','list index out of range');return o[i];}
    if(o&&o.__d__!==undefined){const k=this.pRepr(idx);if(!(k in o.__d__))throw new PyErr('KeyError',this.pRepr(idx));return o.__d__[k];}
    if(o&&o.__rng__){const r=o;const i=idx<0?Math.ceil((r.b-r.a)/r.s)+idx:idx;return r.a+i*r.s;}
    throw new PyErr('TypeError',`'${this.tname(o)}' is not subscriptable`);
  }

  getSlice(o,lo,up,st){
    const arr=typeof o==='string'?o.split(''):Array.isArray(o)?o:this.toArr(o);
    const len=arr.length;const step=st===null?1:st;if(step===0)throw new PyErr('ValueError','slice step cannot be zero');
    const start=lo===null?(step<0?len-1:0):(lo<0?Math.max(step<0?-1:0,len+lo):Math.min(len,lo));
    const stop=up===null?(step<0?-1:len):(up<0?Math.max(step<0?-1:0,len+up):Math.min(len,up));
    const res=[];if(step>0)for(let i=start;i<stop;i+=step)res.push(arr[i]);else for(let i=start;i>stop;i+=step)res.push(arr[i]);
    return typeof o==='string'?res.join(''):res;
  }

  toArr(it){
    if(Array.isArray(it))return it;if(typeof it==='string')return it.split('');
    if(it&&it.__rng__){const r=it,res=[];if(r.s>0){for(let i=r.a;i<r.b;i+=r.s)res.push(i);}else{for(let i=r.a;i>r.b;i+=r.s)res.push(i);}return res;}
    if(it&&it.__set__)return[...it.data.values()];
    if(it&&it.__d__)return it.__k__||[];
    if(it===null||it===undefined)throw new PyErr('TypeError',"'NoneType' is not iterable");
    throw new PyErr('TypeError',`'${this.tname(it)}' is not iterable`);
  }

  // ── Type helpers ─────────────────────────────────────────
  pBool(v){
    if(v===null||v===undefined)return false;if(typeof v==='boolean')return v;
    if(typeof v==='number')return v!==0;if(typeof v==='string')return v.length>0;
    if(v&&typeof v==='object'&&v.__float__)return v.valueOf()!==0;
    if(Array.isArray(v))return v.length>0;if(v.__d__!==undefined)return(v.__k__||[]).length>0;
    if(v.__set__)return v.data.size>0;if(v.__rng__)return v.s>0?v.a<v.b:v.a>v.b;return true;
  }
  pStr(v){
    if(v===null)return'None';if(v===true)return'True';if(v===false)return'False';
    // Tagged float object (from mkf)
    if(v&&typeof v==='object'&&v.__float__){
      const n=v.valueOf();
      return Number.isInteger(n)?n+'.0':String(n);
    }
    if(typeof v==='number'){
      if(!isFinite(v))return v>0?'inf':'-inf';if(isNaN(v))return'nan';
      // Python-like float display: match Python's repr for floats
      if(!Number.isInteger(v)){
        const s=String(v);
        // Only trim if JS produces absurdly long strings (>17 significant digits)
        // Python shows 0.30000000000000004 as-is, so we do the same
        if(s.replace('-','').replace('.','').length>18){
          const r=parseFloat(v.toPrecision(15));
          return String(r);
        }
        return s;
      }
      return String(v);
    }
    if(typeof v==='string')return v;
    if(v.__tup__)return`(${v.map(x=>this.pRepr(x)).join(', ')}${v.length===1?',':''})`;
    if(Array.isArray(v))return`[${v.map(x=>this.pRepr(x)).join(', ')}]`;
    if(v.__d__!==undefined){const ps=(v.__k__||[]).map(k=>`${this.pRepr(k)}: ${this.pRepr(v.__d__[this.pRepr(k)])}`);return`{${ps.join(', ')}}`;}
    if(v.__set__)return`{${[...v.data.values()].map(x=>this.pRepr(x)).join(', ')}}`;
    if(v.__rng__)return v.s===1?`range(${v.a}, ${v.b})`:`range(${v.a}, ${v.b}, ${v.s})`;
    if(v.__inst__)return`<${v.__cls__.__name__} object>`;if(v.__cls__)return`<class '${v.__name__}'>`;
    if(v.__fn__)return`<function ${v.name}>`;if(typeof v==='function')return'<built-in function>';
    return String(v);
  }
  pRepr(v){
    if(typeof v==='string')return`'${v.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n').replace(/\t/g,'\\t')}'`;
    if(v===null)return'None';if(v===true)return'True';if(v===false)return'False';
    if(v&&typeof v==='object'&&v.__float__)return this.pStr(v);
    if(typeof v==='number')return this.pStr(v);
    if(v.__tup__)return`(${v.map(x=>this.pRepr(x)).join(', ')}${v.length===1?',':''})`;
    if(Array.isArray(v))return`[${v.map(x=>this.pRepr(x)).join(', ')}]`;
    return this.pStr(v);
  }
  tname(v){
    if(v===null)return'NoneType';if(v===true||v===false)return'bool';
    if(v&&typeof v==='object'&&v.__float__)return'float';
    if(typeof v==='number')return Number.isInteger(v)?'int':'float';if(typeof v==='string')return'str';
    if(v.__tup__)return'tuple';if(Array.isArray(v))return'list';if(v.__d__!==undefined)return'dict';
    if(v.__set__)return'set';if(v.__rng__)return'range';if(v.__inst__)return v.__cls__.__name__;
    if(v.__fn__||v.__bm__)return'function';if(typeof v==='function')return'builtin_function';return'object';
  }
}

// ─── Async runner with input support ───────────────────────
function run(source, outCb, inputResolver){
  return new Promise((resolve)=>{
    let output='';
    const addOut=(s)=>{output+=s;outCb(s,false);};
    let inputQ=[];let waitingInput=false;let inputResolve=null;
    const syncIn=()=>{
      // This uses the callback system - will be resolved externally
      // We use a synchronous blocking mechanism via a shared array (not possible in pure JS)
      // Instead, we collect all inputs needed via prompts
      return inputResolver();
    };
    try{
      const toks=tokenize(source);
      const parser=new Parser(toks);
      const ast=parser.parse();
      const interp=new Interp(addOut,syncIn);
      const r=interp.run(ast);
      if(r instanceof ExcSig){outCb('\n'+r.e.toString()+'\n',true);resolve({ok:false,output});return;}
      if(r instanceof RetSig){outCb('\nSyntaxError: \'return\' outside function\n',true);resolve({ok:false,output});return;}
      resolve({ok:true,output});
    }catch(e){
      const msg=e instanceof PyErr?e.toString():'RuntimeError: '+(e.message||String(e));
      outCb('\n'+msg+'\n',true);
      resolve({ok:false,output});
    }
  });
}

return{run,tokenize,Parser,Interp,PyErr};
})();

