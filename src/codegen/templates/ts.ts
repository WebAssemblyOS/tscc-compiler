import { TemplateInput, TemplateOutput } from '../def';
import { Item, Action } from '../../grammar/item-set';
import { Rule } from '../../grammar/grammar';
import { TokenDef } from '../../grammar/token-entry';
import { CodeGenerator } from '../code-generator';
import { DFA } from '../../lexer/dfa';
import { LexAction } from '../../lexer/action';
import { State, Arc } from '../../lexer/state';
import { Inf } from '../../util/interval-set';

export default function(input: TemplateInput, output: TemplateOutput){
    echoLine("/*");
    echoLine("    generated by jscc, an LALR(1) parser generator made by hadroncfy.");
    echoLine("    template for typescript, written by hadroncfy, aussi.");
    echoLine("*/");
    echo(input.file.header );
    let prefix = input.file.prefix;
let tab = input.file.opt.tab || '    ';
let opt = input.file.opt;
function ts(s: string, s2?: string){
    return opt.output === 'typescript' ? s : s2 || '';
}
function echo(s: string | number){
    output.write(s);
}
function echoLine(s: string | number){
    output.writeln(s);
}
function leftAlign(s: string, al: number): string{
    function repeat(s: string, t: number){
        let ret = '';
        while(t --> 0) ret += s;
        return ret;
    }
    return (s.length < al ? repeat(' ', al - s.length) : '') + s;
}
function printTable<T>(tname: string, t: T[], align: number, lc: number, mapper: (d: T) => string){
    let count = 1; 
    echoLine("");
    echo("var ");
    echo(prefix + tname );
    echoLine(" = [ ");
    echo(tab); 
    for(let i of t){
        echo(leftAlign(mapper(i), align));
        echo(',');
        count++ >= lc && (count = 1, echo(input.endl + tab));
    } 
    echoLine("");
    echo("]; ");
    } 
function printState(state: State<LexAction[]>){ 
    function arcToString(arc: Arc<LexAction[]>): string{
        let ret: string[] = [];
        arc.chars.forEach((from, to) => {
            if(from === to){
                ret.push(`c === ${from}`);
            }
            else if(from === 0 && to !== Inf.oo){
                ret.push(`c <= ${to}`);
            }
            else if(from !== 0 && to === Inf.oo){
                ret.push(`c >= ${from}`);
            }
            else if(from !== 0 && to !== Inf.oo){
                ret.push(`(c >= ${from} && c <= ${to})`);
            }
            else {
                // this merely happens
                ret.push('true');
            }
        });
        return ret.join(' || ');
    }

    let first = true; 
    echoLine("");
    echo("        case ");
    echo(state.index );
    echoLine(":");
    echo("            ret.hasArc = ");
    echo(state.arcs.length > 0 ? 'true' : 'false' );
    echoLine(";");
    echo("            ret.isEnd = ");
    echo(state.endAction === null ? 'false' : 'true' );
    echo(";");
    if(state.arcs.length === 0){ 
    echoLine("");
    echo("            ret.state = -1;");
    } else if(state.hasDefinate()){ 
    echoLine("");
    echo("            ret.state = ");
    echo(state.arcs[0].to.index );
    echo(";");
    } else {
        for(let arc of state.arcs){ 
    echoLine("");
    echo("            ");
    echo(first ? (first = false, '') : 'else ' );
    echo("if(");
    echo(arcToString(arc) );
    echoLine("){");
    echo("                ret.state = ");
    echo(arc.to.index );
    echoLine(";");
    echo("            }");
    } 
    echoLine("");
    echoLine("            else {");
    echoLine("                ret.state = -1;");
    echo("            } ");
    } 
    echoLine("");
    echo("            break;");
    } 
function printDFA(dfa: DFA<LexAction[]>, n: number){ 
    echoLine("");
    echo("function moveDFA");
    echo(n );
    echoLine("(c: number, ret: { state: number, hasArc: boolean, isEnd: boolean }){");
    echo("    switch(ret.state){");
    for(let state of dfa.states){
        printState(state);
    } 
    echoLine("");
    echoLine("        default:");
    echoLine("            ret.state = -1;");
    echoLine("            ret.hasArc = false;");
    echoLine("    }");
    echo("}");
    }
function printLexTokens(dfa: DFA<LexAction[]>, n: number){
    function getAction(act: LexAction[]): number{
        for(let a of act){
            if(a.token !== -1){
                return a.token;
            }
        }
        return -1;
    }
    printTable<State<LexAction[]>>('lexTokens' + n, dfa.states, 6, 10, (state) => {
        return state.endAction ? getAction(state.endAction.data).toString() : '-1';
    });
} 
    let dfas = input.file.lexDFA; 
    echoLine("");
    echoLine("/*");
    echoLine("    find the next state to go in the dfa");
    echo("*/");
    for(let i = 0, _a = dfas; i < _a.length; i++){
    printDFA(_a[i], i);
} 
    echoLine("");
    echoLine("");
    echoLine("/*");
    echoLine("    all the lexer data goes here.");
    echoLine("*/");
    echo("var ");
    echo(prefix );
    echo("lexers = [");
    for(let i = 0;i < dfas.length;i++){ 
    echoLine("");
    echo("    moveDFA");
    echo(i );
    echo(",");
    } 
    echoLine("");
    echoLine("];");
    echoLine("");
    echoLine("/*");
    echoLine("    tokens that a lexical dfa state can return");
    echo("*/");
    for(let i = 0, _a = dfas; i < _a.length; i++){
    printLexTokens(_a[i], i);
} 
    echoLine("");
    let pt = input.pt; 
    echoLine("");
    echo("var ");
    echo(prefix );
    echo("stateCount = ");
    echo(pt.stateCount );
    echoLine(";");
    echo("var ");
    echo(prefix );
    echo("tokenCount = ");
    echo(input.file.grammar.tokens.length );
    echoLine(";");
    echo("var ");
    echo(prefix );
    echo("actERR = ");
    echo(pt.stateCount + 1 );
    echoLine(";");
    echoLine("/*");
    echo("    compressed action table: action = ");
    echo(prefix );
    echo("pact[");
    echo(prefix );
    echoLine("disact[STATE-NUM] + TOKEN]");
    echoLine("    when action > 0, shift the token and goto state (action - 1);");
    echoLine("    when action < 0, reduce with rule (1-action);");
    echoLine("    when action = 0, do default action.");
    echo("*/");
    printTable<Item>('pact', pt.pact, 6, 10, t => {
    if(t === null){
        return '0';
    }
    else if(t === Item.NULL){
        return String(pt.stateCount + 1);
    }
    else if(t.actionType === Action.SHIFT){
        return (t.shift.stateIndex + 1).toString();
    }
    else if(t.actionType === Action.REDUCE){
        return (-t.rule.index - 1).toString();
    }
}); 
    echoLine("");
    echoLine("/*");
    echoLine("    displacement of action table.");
    echo("*/");
    printTable<number>('disact', pt.disact, 6, 10, t => t.toString()); 
    echoLine("");
    echoLine("/*");
    echo("    used to check if a position in ");
    echo(prefix  );
    echoLine("pact is out of bouds.");
    echo("    if ");
    echo(prefix  );
    echo("checkact[");
    echo(prefix );
    echoLine("disact[STATE-NUM] + TOKEN] = STATE-NUM, this position is not out of bounds.");
    echo("*/");
    printTable<number>('checkact', pt.checkact, 6, 10, t => t === undefined ? '0' : t.toString()); 
    echoLine("");
    echoLine("/*");
    echo("    default action table. action = ");
    echo(prefix );
    echoLine("defred[STATE-NUM],");
    echoLine("    where action is the number of the rule to reduce with.");
    echo("*/");
    printTable<number>('defred', pt.defred, 6, 10, t => t.toString()); 
    echoLine("");
    echoLine("/*");
    echo("    compressed goto table: goto = ");
    echo(prefix  );
    echo("pgoto[");
    echo(prefix );
    echoLine("disgoto[STATE-NUM] + NON_TERMINAL]");
    echo("*/");
    printTable<Item>('pgoto', pt.pgoto, 6, 10, t => {
    if(t === null){
        return '-1';
    }
    else {
        return t.shift.stateIndex.toString();
    }
}); 
    echoLine("");
    echoLine("/*");
    echoLine("    displacement of the goto table");
    echo("*/");
    printTable<number>('disgoto', pt.disgoto, 6, 10, t => t.toString()); 
    echoLine("");
    echoLine("/*");
    echo("    length of each rule: rule length = ");
    echo(prefix );
    echoLine("ruleLen[RULE-NUM]");
    echo("*/");
    printTable<Rule>('ruleLen', pt.g.rules, 6, 10, r => r.rhs.length.toString()); 
    echoLine("");
    echoLine("/*");
    echoLine("    index of the LHS of each rule");
    echo("*/");
    printTable<Rule>('lhs', pt.g.rules, 6, 10, r => r.lhs.index.toString()); 
    echoLine("");
    echoLine("/*");
    echoLine("    token names");
    echo("*/");
    printTable<TokenDef>('tokenNames', pt.g.tokens, 20, 3, t => `"${t.sym}"`); 
    echoLine("");
    echoLine("/*");
    echoLine("    token alias");
    echo("*/");
    printTable<TokenDef>('tokenAlias', pt.g.tokens, 20, 3, t => t.alias ? `"${t.alias}"` : "null"); 
    let className = input.file.opt.className || 'Parser'; 
    echoLine("");
    function printLexActionsFunc(dfa: DFA<LexAction[]>, n: number){
    let codegen = {
        addBlock(b: string, line: number){ 
    echoLine("");
    echo("                ");
    echo(b.replace(/\$token/g, '_token').replace(/\$\$/g, '_sematicVal') );
    },
        pushLexState(n: number){ 
    echoLine("");
    echo("                _lexState.push(");
    echo(n );
    echo(");");
    },
        popLexState(){ 
    echoLine("");
    echo("                _lexState.pop();");
    },
        setImg(n: string){ 
    echoLine("");
    echo("                _setImg(\"");
    echo(n );
    echo("\");");
    },
        returnToken(t: TokenDef){ 
    echoLine("");
    echoLine("                this._token = {");
    echo("                    id: ");
    echo(t.index );
    echoLine(",");
    echoLine("                    val: this._matched.join('')");
    echo("                };");
    }
    }; 
    function hasNormalAction(a: LexAction[]){
        for(let act of a){
            if(act.token === -1){
                return true;
            }
        }
        return false;
    }
    let statevn = prefix + 'staten'; 
    echoLine("");
    echo("    function _doLexAction");
    echo(n );
    echo("(");
    echo(statevn );
    echoLine(": number){");
    echo("        let ");
    echo(prefix );
    echo("tk = ");
    echo(prefix );
    echo("lexTokens");
    echo(n );
    echo("[");
    echo(statevn );
    echoLine("];");
    echo("        ");
    echo(prefix );
    echo("tk !== -1 && _prepareToken(");
    echo(prefix );
    echoLine("tk);");
    echo("        switch(");
    echo(statevn );
    echo("){");
    for(let i = 0, _a = dfa.states; i < _a.length; i++){ 
        if(_a[i].endAction !== null && hasNormalAction(_a[i].endAction.data)){ 
    echoLine("");
    echo("            case ");
    echo(i );
    echo(":");
    for(let act of _a[i].endAction.data){
                act.token === -1 && act.toCode(codegen);
            } 
    echoLine("");
    echo("                break;");
    }
    } 
    echoLine("");
    echoLine("            default:;");
    echoLine("        }");
    echo("    }");
    } 
    echoLine("");
    echoLine("");
    echoLine("function tokenToString(tk: number){");
    echo("    return ");
    echo(prefix );
    echo("tokenAlias[tk] === null ? `<${");
    echo(prefix );
    echo("tokenNames[tk]}>` : `\"${");
    echo(prefix );
    echoLine("tokenAlias[tk]}\"`;");
    echoLine("}");
    echoLine("");
    echoLine("class Token {");
    echoLine("    constructor(");
    echoLine("        public id: number,");
    echoLine("        public val: string,");
    echoLine("        public startLine: number,");
    echoLine("        public startColumn: number,");
    echoLine("        public endLine: number,");
    echoLine("        public endColumn: number");
    echoLine("    ){}");
    echoLine("    clone(){");
    echoLine("        return new Token(");
    echoLine("            this.id,");
    echoLine("            this.val,");
    echoLine("            this.startLine,");
    echoLine("            this.startColumn,");
    echoLine("            this.endLine,");
    echoLine("            this.endColumn");
    echoLine("        );");
    echoLine("    }");
    echoLine("    toString(){");
    echo("        return (");
    echo(prefix );
    echoLine("tokenAlias[this.id] === null ? ");
    echo("            `<${");
    echo(prefix );
    echoLine("tokenNames[this.id]}>` :");
    echo("            `\"${");
    echo(prefix );
    echoLine("tokenAlias[this.id]}\"`) + `(\"${this.val}\")`;");
    echoLine("    }");
    echoLine("}");
    echo("interface ");
    echo(className );
    echoLine("{");
    echo("    init(");
    echo(input.file.initArg );
    echoLine(");");
    echoLine("    accept(s: string);");
    echoLine("    end();");
    echoLine("    halt();");
    echoLine("    on(ent: string, cb: (a1?, a2?, a3?) => any);");
    echo("}");
    let stype = input.file.sematicType || 'any'; 
    echoLine("");
    echo("function createParser(): ");
    echo(className );
    echoLine(" {");
    echoLine("    // members for lexer");
    echoLine("    var _lexState: number[];");
    echoLine("    var _state: number;");
    echoLine("    var _matched: string;");
    echoLine("    var _token: Token;");
    echoLine("    ");
    echoLine("    var _marker: { state: number, line: number, column: number } = { state: -1, line: 0, column: 0 };");
    echoLine("    var _backupCount: number;");
    echoLine("");
    echoLine("    var _line: number;");
    echoLine("    var _column: number;");
    echoLine("    var _tline: number;");
    echoLine("    var _tcolumn: number;");
    echoLine("");
    echoLine("    // members for parser");
    echoLine("    var _lrState: number[] = [];");
    echo("    var _sematicS: ");
    echo(stype );
    echoLine("[] = [];");
    echo("    var _sematicVal: ");
    echo(stype );
    echoLine(";");
    echoLine("");
    echoLine("    var _stop;");
    echoLine("");
    echoLine("    var _handlers: {[s: string]: ((a1?, a2?, a3?) => any)[]} = {};");
    echoLine("");
    echoLine("    // extra members, defined by %extra_arg");
    echo("    ");
    echo(input.file.extraArgs );
    echoLine("");
    echoLine("");
    echoLine("    ");
    echo("    function init(");
    echo(input.file.initArg );
    echoLine("){");
    echoLine("        _lexState = [ 0 ];// DEFAULT");
    echoLine("        _state = 0;");
    echoLine("        _matched = '';");
    echoLine("        _token = new Token(-1, null, 0, 0, 0, 0);");
    echoLine("        _marker.state = -1;");
    echoLine("        _backupCount = 0;");
    echoLine("        _line = _tline = 1;");
    echoLine("        _column = _tcolumn = 1;");
    echoLine("        ");
    echoLine("        _lrState = [ 0 ];");
    echoLine("        _sematicS = [];");
    echoLine("        _sematicVal = null;");
    echoLine("");
    echoLine("        _stop = false;");
    echo("        ");
    echo(input.file.initBody );
    echoLine("");
    echoLine("    }");
    echoLine("    /**");
    echoLine("     *  set ");
    echoLine("     */");
    echoLine("    function _setImg(s: string){");
    echoLine("        _matched = s;");
    echoLine("        _tline = _line;");
    echoLine("        _tcolumn = _column;");
    echoLine("    }");
    echoLine("    function _prepareToken(tid: number){");
    echoLine("        _token.id = tid;");
    echoLine("        _token.val = _matched;");
    echoLine("        _token.startLine = _tline;");
    echoLine("        _token.startColumn = _tcolumn;");
    echoLine("        _token.endLine = _line;");
    echoLine("        _token.endColumn = _column;");
    echoLine("");
    echoLine("        _matched = '';");
    echoLine("        _tline = _line;");
    echoLine("        _tcolumn = _column;");
    echoLine("    }");
    echoLine("    function _returnToken(){");
    echo("        _emit('token', ");
    echo(prefix );
    echoLine("tokenNames[_token.id], _token.val);");
    echoLine("        while(!_stop && !_acceptToken(_token));");
    echoLine("        _token.id = -1;");
    echoLine("    }");
    echoLine("    function _emit(name: string, a1?, a2?, a3?){");
    echoLine("        var cbs = _handlers[name];");
    echoLine("        if(cbs){");
    echoLine("            for(var i = 0; i < cbs.length; i++){");
    echoLine("                cbs[i](a1, a2, a3);");
    echoLine("            }");
    echoLine("        }");
    echoLine("    }");
    echoLine("    function on(name: string, cb: (a1?, a2?, a3?) => any){");
    echoLine("        _handlers[name] || (_handlers[name] = []);");
    echoLine("        _handlers[name].push(cb);");
    echo("    }");
    for(let i = 0, _a = dfas; i < _a.length; i++){
    printLexActionsFunc(_a[i], i);
} 
    echoLine("");
    echoLine("    /**");
    echoLine("     *  do a lexical action");
    echoLine("     *  @api private");
    echoLine("     *  @internal");
    echoLine("     */");
    echoLine("    function _doLexAction(lexstate: number, state: number){");
    echo("        switch(lexstate){");
    for(let i = 0;i < dfas.length;i++){ 
    echoLine("");
    echo("            case ");
    echo(i );
    echoLine(":");
    echo("                _doLexAction");
    echo(i );
    echoLine("(state);");
    echo("                break;");
    } 
    echoLine("");
    echoLine("            default:;");
    echoLine("        }");
    echoLine("        _token.id !== -1 && _returnToken();");
    echoLine("    }");
    echoLine("    function _rollback(): string{");
    echoLine("        let ret = _matched.substr(_matched.length - _backupCount, _backupCount);");
    echoLine("        _matched = _matched.substr(0, _matched.length - _backupCount);");
    echoLine("        _backupCount = 0;");
    echoLine("        _line = _marker.line;");
    echoLine("        _column = _marker.column;");
    echoLine("        _state = _marker.state;");
    echoLine("        _marker.state = -1;");
    echoLine("        return ret;");
    echoLine("    }");
    echoLine("    function _mark(){");
    echoLine("        _marker.state = _state;");
    echoLine("        _marker.line = _line;");
    echoLine("        _marker.column = _column;");
    echoLine("        _backupCount = 0;");
    echoLine("    }");
    echoLine("    function _consume(c: string){");
    echoLine("        c === '\\n' ? (_line++, _column = 0) : (_column++);");
    echoLine("        _matched += c;");
    echoLine("        _marker.state !== -1 && (_backupCount++);");
    echoLine("        return true;");
    echoLine("    }");
    echoLine("    /**");
    echoLine("     *  accept a character");
    echoLine("     *  @return - true if the character is consumed, false if not consumed");
    echoLine("     *  @api private");
    echoLine("     *  @internal");
    echoLine("     */");
    echoLine("    function _acceptChar(c: string){");
    echoLine("        var lexstate = _lexState[_lexState.length - 1];");
    echoLine("        var retn = { state: _state, hasArc: false, isEnd: false };");
    echo("        ");
    echo(prefix );
    echoLine("lexers[lexstate](c.charCodeAt(0), retn);");
    echoLine("        if(retn.isEnd){");
    echoLine("            // if current state is a terminate state, be careful");
    echoLine("            if(retn.hasArc){");
    echoLine("                if(retn.state === -1){");
    echoLine("                    // nowhere to go, stay where we are");
    echoLine("                    _doLexAction(lexstate, _state);");
    echoLine("                    // recover");
    echoLine("                    _marker.state = -1;");
    echoLine("                    _backupCount = 0;");
    echoLine("                    _state = 0;                    ");
    echoLine("                    // character not consumed");
    echoLine("                    return false;");
    echoLine("                }");
    echoLine("                else {");
    echoLine("                    // now we can either go to that new state, or stay where we are");
    echoLine("                    // it is prefered to move forward, but that could lead to errors,");
    echoLine("                    // so we need to memorize this state before move on, in case if ");
    echoLine("                    // an error occurs later, we could just return to this state.");
    echoLine("                    _mark();");
    echoLine("                    _state = retn.state;");
    echoLine("                    return _consume(c);");
    echoLine("                }");
    echoLine("            }");
    echoLine("            else {");
    echoLine("                // current state doesn't lead to any state, just stay here.");
    echoLine("                _doLexAction(lexstate, _state);");
    echoLine("                // recover");
    echoLine("                _marker.state = -1;");
    echoLine("                _backupCount = 0;");
    echoLine("                _state = 0;");
    echoLine("                // character not consumed");
    echoLine("                return false;");
    echoLine("            }");
    echoLine("        }");
    echoLine("        else {");
    echoLine("            if(retn.state === -1){");
    echoLine("                // nowhere to go at current state, error may have occured.");
    echoLine("                // check marker to verify that");
    echoLine("                if(_marker.state !== -1){");
    echoLine("                    // we have a previously marked state, which is a terminate state.");
    echoLine("                    var s = _rollback();");
    echoLine("                    _doLexAction(lexstate, _state);");
    echoLine("                    _state = 0;");
    echoLine("                    accept(s);");
    echoLine("                    // character not consumed");
    echoLine("                    return false;");
    echoLine("                }");
    echoLine("                else {");
    echoLine("                    // error occurs");
    echoLine("                    _emit('lexicalerror', `unexpected character \"${c}\"`, _line, _column);");
    echoLine("                    // force consume");
    echoLine("                    return true;");
    echoLine("                }");
    echoLine("            }");
    echoLine("            else {");
    echoLine("                _state = retn.state;");
    echoLine("                // character consumed");
    echoLine("                return _consume(c);");
    echoLine("            }");
    echoLine("        }");
    echoLine("    }");
    echoLine("    function _acceptEOF(){");
    echoLine("        if(_state === 0){");
    echoLine("            // recover");
    echoLine("            _prepareToken(0);");
    echoLine("            _returnToken();");
    echoLine("            return true;");
    echoLine("        }");
    echoLine("        else {");
    echoLine("            let lexstate = _lexState[_lexState.length - 1];");
    echoLine("            let retn = { state: _state, hasArc: false, isEnd: false };");
    echo("            ");
    echo(prefix );
    echoLine("lexers[lexstate](-1, retn);");
    echoLine("            if(retn.isEnd){");
    echoLine("                _doLexAction(lexstate, _state);");
    echoLine("                _state = 0;");
    echoLine("                _marker.state = -1;");
    echoLine("                return false;");
    echoLine("            }");
    echoLine("            else if(_marker.state !== -1){");
    echoLine("                let s = _rollback();");
    echoLine("                _doLexAction(lexstate, _state);");
    echoLine("                _state = 0;");
    echoLine("                accept(s);");
    echoLine("                return false;");
    echoLine("            }");
    echoLine("            else {");
    echoLine("                _emit('lexicalerror', 'unexpected end of file');");
    echoLine("                return true;");
    echoLine("            }");
    echoLine("        }");
    echoLine("    }");
    echoLine("    /**");
    echoLine("     *  input a string");
    echoLine("     *  @api public");
    echoLine("     */");
    echoLine("    function accept(s: string){");
    echoLine("        for(let i = 0; i < s.length && !_stop;){");
    echoLine("            _acceptChar(s.charAt(i)) && i++;");
    echoLine("        }");
    echoLine("    }");
    echoLine("    /**");
    echoLine("     *  tell the compiler that end of file is reached");
    echoLine("     *  @api public");
    echoLine("     */");
    echoLine("    function end(){");
    echoLine("        while(!_stop && !_acceptEOF());");
    echoLine("        _stop = true;");
    echoLine("    }");
    echoLine("    function halt(){");
    echoLine("        _stop = true;");
    echo("    }");
    function printReduceActions(){
    let codegen = {
        addBlock(b: string, line: number){ 
    echoLine("");
    echo("                {");
    echo(b.replace(/\$\$/g, prefix + 'top') );
    echo("}");
    },
        pushLexState(n: number){ 
    echoLine("");
    echo("                _lexState.push(");
    echo(n );
    echo(");");
    },
        popLexState(){ 
    echoLine("");
    echo("                _lexState.pop();");
    },
        setImg(n: string){ 
    echoLine("");
    echo("                _setImg(\"");
    echo(n );
    echo("\");");
    },
        returnToken(t: TokenDef){ 
    echoLine("");
    echoLine("                _token = {");
    echo("                    id: ");
    echo(t.index );
    echoLine(",");
    echoLine("                    val: _matched.join('')");
    echo("                };");
    }
    };
    for(let rule of input.file.grammar.rules){
        if(rule.action !== null){ 
    echoLine("");
    echo("            case ");
    echo(rule.index );
    echoLine(":");
    echo("                /* ");
    echo(rule.toString() );
    echo(" */");
    for(let uvar in rule.vars){ 
    echoLine("");
    echo("                var ");
    echo(uvar );
    echo(" = _sematicS[");
    echo(prefix );
    echo("sp - ");
    echo(rule.rhs.length - rule.vars[uvar].val );
    echo("];");
    }
            for(let uvar2 in rule.usedVars){ 
    echoLine("");
    echo("                var ");
    echo(uvar2 );
    echo(" = _sematicS[");
    echo(prefix );
    echo("sp - ");
    echo(rule.usedVars[uvar2].val );
    echo("];");
    }
            for(let act of rule.action){
                act.toCode(codegen);
            } 
    echoLine("");
    echo("                break;");
    }
    }
} 
    echoLine("");
    echo("    function _doReduction(");
    echo(prefix );
    echoLine("rulenum: number){");
    echo("        let ");
    echo(prefix );
    echo("nt = ");
    echo(prefix );
    echo("lhs[");
    echo(prefix );
    echoLine("rulenum];");
    echo("        let ");
    echo(prefix );
    echoLine("sp = _sematicS.length;");
    echo("        let ");
    echo(prefix );
    echo("top = _sematicS[");
    echo(prefix );
    echo("sp - ");
    echo(prefix );
    echo("ruleLen[");
    echo(prefix );
    echoLine("rulenum]] || null;");
    echo("        switch(");
    echo(prefix );
    echo("rulenum){");
    printReduceActions(); 
    echoLine("");
    echoLine("        }");
    echo("        _lrState.length -= ");
    echo(prefix );
    echo("ruleLen[");
    echo(prefix );
    echoLine("rulenum];");
    echo("        let ");
    echo(prefix );
    echoLine("cstate = _lrState[_lrState.length - 1];");
    echo("        _lrState.push(");
    echo(prefix );
    echo("pgoto[");
    echo(prefix );
    echo("disgoto[");
    echo(prefix );
    echo("cstate] + ");
    echo(prefix );
    echoLine("nt]);");
    echoLine("");
    echo("        _sematicS.length -= ");
    echo(prefix );
    echo("ruleLen[");
    echo(prefix );
    echoLine("rulenum];");
    echo("        _sematicS.push(");
    echo(prefix );
    echoLine("top);");
    echoLine("    }");
    echoLine("");
    echoLine("    function _acceptToken(t: Token){");
    echoLine("        // look up action table");
    echoLine("        let cstate = _lrState[_lrState.length - 1];");
    echo("        let ind = ");
    echo(prefix );
    echoLine("disact[cstate] + t.id;");
    echoLine("        let act = 0;");
    echo("        if(ind < 0 || ind >= ");
    echo(prefix );
    echo("pact.length || ");
    echo(prefix );
    echoLine("checkact[ind] !== cstate){");
    echo("            act = -");
    echo(prefix );
    echoLine("defred[cstate] - 1;");
    echoLine("        }");
    echoLine("        else {");
    echo("            act = ");
    echo(prefix );
    echoLine("pact[ind];");
    echoLine("        }");
    echo("        if(act === ");
    echo(prefix );
    echoLine("actERR){");
    echoLine("            // explicit error");
    echoLine("            _syntaxError(t);");
    echoLine("            return true;");
    echoLine("        }");
    echoLine("        else if(act > 0){");
    echoLine("            // shift");
    echoLine("            if(t.id === 0){");
    echoLine("                // end of file");
    echoLine("                _stop = true;");
    echoLine("                _emit('accept');");
    echoLine("                return true;");
    echoLine("            }");
    echoLine("            else {");
    echoLine("                _lrState.push(act - 1);");
    echoLine("                _sematicS.push(_sematicVal);");
    echoLine("                _sematicVal = null;");
    echoLine("                // token consumed");
    echoLine("                return true;");
    echoLine("            }");
    echoLine("        }");
    echoLine("        else if(act < 0){");
    echoLine("            _doReduction(-act - 1);");
    echoLine("            return false;");
    echoLine("        }");
    echoLine("        else {");
    echoLine("            // error");
    echoLine("            _syntaxError(t);");
    echoLine("            // force consume");
    echoLine("            return true;");
    echoLine("        }");
    echoLine("    }");
    echoLine("    function _syntaxError(t: Token){");
    echoLine("        let msg = `unexpected token ${t.toString()}, expecting one of the following token(s):\\n`");
    echoLine("        msg += _expected(_lrState[_lrState.length - 1]);");
    echoLine("        _emit(\"syntaxerror\", msg, t);");
    echoLine("    }");
    echoLine("    function _expected(state: number){");
    echo("        let dis = ");
    echo(prefix );
    echoLine("disact[state];");
    echoLine("        let ret = '';");
    echoLine("        function expect(tk: number){");
    echoLine("            let ind = dis + tk;");
    echo("            if(ind < 0 || ind >= ");
    echo(prefix );
    echo("pact.length || state !== ");
    echo(prefix );
    echoLine("checkact[ind]){");
    echo("                return ");
    echo(prefix );
    echoLine("defred[state] !== -1;");
    echoLine("            }");
    echoLine("            else {");
    echoLine("                return true;");
    echoLine("            }");
    echoLine("        }");
    echo("        for(let tk = 0; tk < ");
    echo(prefix );
    echoLine("tokenCount; tk++){");
    echoLine("            expect(tk) && (ret += `    ${tokenToString(tk)} ...` + '\\n');");
    echoLine("        }");
    echoLine("        return ret;");
    echoLine("    }");
    echoLine("    return {");
    echoLine("        init,");
    echoLine("        on,");
    echoLine("        accept,");
    echoLine("        end,");
    echoLine("        halt");
    echoLine("    };");
    echoLine("}");
    echo(input.file.epilogue.val );

}