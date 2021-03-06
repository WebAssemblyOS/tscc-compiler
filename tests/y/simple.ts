/*
    generated by jscc, an LALR(1) parser generator made by hadroncfy.
    template for typescript, written by hadroncfy, aussi.
*/
/*
    constants
*/
var jjlf = '\n'.charCodeAt(0);
var jjcr = '\r'.charCodeAt(0);
interface DFATable{
    pnext: number[];
    disnext: number[];
    checknext: number[];
    maxAsicii: number;
    classTable: number[];
    unicodeClassTable: number[];
    isEnd: number[];
    hasArc: number[];
};
/*
    dfa table definations
*/
var jjlexpnext0: number[] = [ 
    
]; 
var jjlexdisnext0: number[] = [ 
         0,
]; 
var jjlexchecknext0: number[] = [ 
    
]; 
var jjlexclassTable0: number[] = [ 
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,
]; 
var jjlexunicodeClassTable0: number[] = [ 
    
]; 
var jjlexisEnd0: number[] = [ 
    0,
]; 
var jjlexhasArc0: number[] = [ 
    0,
]; 
var jjlextable0: DFATable = {
    pnext: jjlexpnext0,
    disnext: jjlexdisnext0,
    checknext: jjlexchecknext0,
    maxAsicii: 255,
    classTable: jjlexclassTable0,
    unicodeClassTable: jjlexunicodeClassTable0,
    isEnd: jjlexisEnd0,
    hasArc: jjlexhasArc0
};
/*
    dfa tables
*/
var jjdfaTables: DFATable[] = [
    jjlextable0,
];
/*
    find unicode class
*/
function jjfindUnicodeClass(uc: number[], c: number){
    for(var i = 0; i < uc.length; i += 3){
        if(c >= uc[i + 1] && c <= uc[i + 2]){
            return uc[i];
        }
        else if(c < uc[i + 1]){
            return -1;
        }
    }
    return -1;
}
/*
    tokens that a lexical dfa state can return
*/
var jjlexTokens0: number[] = [ 
        -1,
]; 

var jjstateCount = 4;
var jjtokenCount = 2;
var jjactERR = 5;
/*
    compressed action table: action = jjpact[jjdisact[STATE-NUM] + TOKEN]
    when action > 0, shift the token and goto state (action - 1);
    when action < 0, reduce with rule (1-action);
    when action = 0, do default action.
*/
var jjpact: number[] = [ 
         4,     3,
]; 
/*
    displacement of action table.
*/
var jjdisact: number[] = [ 
         0,     0,    -2,    -2,
]; 
/*
    used to check if a position in jjpact is out of bouds.
    if jjcheckact[jjdisact[STATE-NUM] + TOKEN] = STATE-NUM, this position is not out of bounds.
*/
var jjcheckact: number[] = [ 
         1,     0,
]; 
/*
    default action table. action = jjdefred[STATE-NUM],
    where action is the number of the rule to reduce with.
*/
var jjdefred: number[] = [ 
        -1,    -1,     1,     0,
]; 
/*
    compressed goto table: goto = jjpgoto[jjdisgoto[STATE-NUM] + NON_TERMINAL]
*/
var jjpgoto: number[] = [ 
         1,
]; 
/*
    displacement of the goto table
*/
var jjdisgoto: number[] = [ 
        -1,    -2,    -2,    -2,
]; 
/*
    length of each rule: rule length = jjruleLen[RULE-NUM]
*/
var jjruleLen: number[] = [ 
         2,     1,
]; 
/*
    index of the LHS of each rule
*/
var jjlhs: number[] = [ 
         0,     1,
]; 
/*
    token names
*/
var jjtokenNames: string[] = [ 
                   "EOF",               "AAA",
]; 
/*
    token alias
*/
var jjtokenAlias: string[] = [ 
                    null,                null,
]; 


function tokenToString(tk: number){
    return jjtokenAlias[tk] === null ? `<${jjtokenNames[tk]}>` : `"${jjtokenAlias[tk]}"`;
}
class Token {
    constructor(
        public id: number,
        public val: string,
        public startLine: number,
        public startColumn: number,
        public endLine: number,
        public endColumn: number
    ){}
    clone(){
        return new Token(
            this.id,
            this.val,
            this.startLine,
            this.startColumn,
            this.endLine,
            this.endColumn
        );
    }
    toString(){
        return (jjtokenAlias[this.id] === null ? 
            `<${jjtokenNames[this.id]}>` :
            `"${jjtokenAlias[this.id]}"`) + `("${this.val}")`;
    }
}
interface Parser{
    init();
    accept(s: string);
    end();
    load(input: ParserInput);
    nextToken(): Token;

    setLineTerminator(lt: LineTerm);
    getLineTerminator(): LineTerm;
    halt();
    on(ent: string, cb: (a1?, a2?, a3?) => any);
    enableBlocks();
    disableBlocks();
    loadParserState(state: ParserState);
    getParserState(): ParserState;
}
interface ParserState {
    lexState: number[];
    lrState: number[];
    sematicS: any[];
};
interface ParserInput {
    current(): number;
    next();
    isEof(): boolean;
    backup(s: string);
};
enum LineTerm{
    NONE = 1,
    AUTO,
    CR,
    LF,
    CRLF
};

function createParser(): Parser {
    //#region parser state variables
    var jjlexState: number[];
    var jjstate: number;
    var jjlastCR: boolean;
    var jjmatched: string;
    var jjmarker: { state: number, line: number, column: number } = { state: -1, line: 0, column: 0 };
    var jjbackupCount: number;
    var jjline: number;
    var jjcolumn: number;
    var jjtline: number;
    var jjtcolumn: number;

    var jjlrState: number[];
    var jjsematicS: any[];
    //#endregion

    var jjinput: ParserInput;
    var jjsematicVal: any;
    var jjtokenQueue: Token[];
    var jjtoken: Token;
    var jjstop: boolean;
    var jjtokenEmitted: boolean;
    var jjenableBlock: boolean;
    var jjlineTerm: LineTerm;

    var jjhandlers: {[s: string]: ((a1?, a2?, a3?) => any)[]} = {};

    // extra members, defined by %extra_arg
    

    return {
        init,
        on,
        setLineTerminator,
        getLineTerminator: () => jjlineTerm,
        accept,
        end,
        load,
        nextToken,
        halt,
        enableBlocks,
        disableBlocks,
        loadParserState,
        getParserState
    };
    function init(){
        jjlexState = [ 0 ];// DEFAULT
        jjstate = 0;
        jjmatched = '';
        jjtoken = new Token(-1, null, 0, 0, 0, 0);
        jjmarker.state = -1;
        jjbackupCount = 0;
        jjline = jjtline = 0;
        jjcolumn = jjtcolumn = 0;
        
        jjlrState = [ 0 ];
        jjsematicS = [];
        jjsematicVal = null;
        jjtokenQueue = [];

        jjenableBlock = true;
        jjlineTerm = LineTerm.AUTO;
        jjlastCR = false;

        

        jjtryReduce();
    }
    function load(i: ParserInput){
        jjinput = i;
    }
    function nextToken(): Token{
        jjtokenEmitted = false;
        while(!jjstop && !jjtokenEmitted){
            var c = jjinput.current();
            if(c !== null){
                jjacceptChar(c);
            }
            // null means end of file or no input available at present
            else if(jjinput.isEof()){
                if(jjacceptEOF()){
                    break;
                }
            }
            else {
                return null;
            }
        }
        return jjtoken;
    }
    function setLineTerminator(lt: LineTerm){
        jjlineTerm = lt;
    }
    function enableBlocks(){
        jjenableBlock = true;
    }
    function disableBlocks(){
        jjenableBlock = false;
    }
    /**
     *  input a string
     *  @api public
     *  @deprecated
     */
    function accept(s: string){
        var i = 0;
        load({
            current: () => i < s.length ? s.charCodeAt(i) : null,
            next: () => i++,
            isEof: () => i >= s.length,
            backup: t => i -= t.length
        });
        while(nextToken().id !== 0);
    }
    /**
     *  tell the compiler that end of file is reached
     *  @api public
     */
    function end(){
        
    }
    function halt(){
        jjstop = true;
    }
    function loadParserState(state: ParserState){
        jjlexState = state.lexState;
        jjlrState = state.lrState;
        jjsematicS = state.sematicS;
    }
    function getParserState(): ParserState {
        return {
            lexState: jjlexState,
            lrState: jjlrState,
            sematicS: jjsematicS
        };
    }
    /**
     *  set 
     */
    function jjsetImg(s: string){
        jjmatched = s;
        jjtline = jjline;
        jjtcolumn = jjcolumn;
    }
    function jjprepareToken(tid: number){
        jjtoken.id = tid;
        jjtoken.val = jjmatched;
        jjtoken.startLine = jjtline;
        jjtoken.startColumn = jjtcolumn;
        jjtoken.endLine = jjline;
        jjtoken.endColumn = jjcolumn - 1;

        jjtokenQueue.push(jjtoken);
        jjtokenEmitted = true;

        jjmatched = '';
        jjtline = jjline;
        jjtcolumn = jjcolumn;
    }
    function jjemit(name: string, a1?, a2?, a3?){
        var cbs = jjhandlers[name];
        if(cbs){
            for(var i = 0; i < cbs.length; i++){
                cbs[i](a1, a2, a3);
            }
        }
    }
    function on(name: string, cb: (a1?, a2?, a3?) => any){
        jjhandlers[name] || (jjhandlers[name] = []);
        jjhandlers[name].push(cb);
    }
    function jjdoLexAction0(jjstaten: number){
        var jjtk = jjlexTokens0[jjstaten];
        jjtk !== -1 && jjprepareToken(jjtk);
        switch(jjstaten){
            default:;
        }
    }
    /**
     *  do a lexical action
     *  @api private
     *  @internal
     */
    function jjdoLexAction(lexstate: number, state: number){
        switch(lexstate){
            case 0:
                jjdoLexAction0(state);
                break;
            default:;
        }
        jjtokenQueue.length > 0 && jjacceptToken(null);
    }
    function jjrollback(){
        var ret = jjmatched.substr(jjmatched.length - jjbackupCount, jjbackupCount);
        jjinput.backup(ret);
        jjmatched = jjmatched.substr(0, jjmatched.length - jjbackupCount);
        jjbackupCount = 0;
        jjline = jjmarker.line;
        jjcolumn = jjmarker.column;
        jjstate = jjmarker.state;
        jjmarker.state = -1;
    }
    function jjmark(){
        jjmarker.state = jjstate;
        jjmarker.line = jjline;
        jjmarker.column = jjcolumn;
        jjbackupCount = 0;
    }
    function jjconsume(c: number){
        // c === jjeol ? (jjline++, jjcolumn = 0) : (jjcolumn += c > 0xff ? 2 : 1);
        switch(jjlineTerm){
            case LineTerm.NONE:
                jjcolumn += c > 0xff ? 2 : 1;
                break;
            case LineTerm.CR:
                c === jjcr ? (jjline++, jjcolumn = 0) : (jjcolumn += c > 0xff ? 2 : 1);
                break;
            case LineTerm.LF:
                c === jjlf ? (jjline++, jjcolumn = 0) : (jjcolumn += c > 0xff ? 2 : 1);
                break;
            case LineTerm.CRLF:
                if(jjlastCR){
                    if(c === jjlf){
                        jjline++, jjcolumn = 0;
                        jjlastCR = false;
                    }
                    else {
                        jjcolumn += c > 0xff ? 2 : 1;
                        jjlastCR = c === jjcr;
                    }
                }
                else {
                    jjcolumn += c > 0xff ? 2 : 1;
                    jjlastCR = c === jjcr;
                }
                break;
            case LineTerm.AUTO:
                if(jjlastCR){
                    if(c === jjlf){
                        jjline++, jjcolumn = 0;
                        jjlastCR = false;
                        jjlineTerm = LineTerm.CRLF;
                    }
                    else {
                        jjline++, jjcolumn = 0;
                        jjlineTerm = LineTerm.CR;
                        c === jjcr ? (jjline++, jjcolumn = 0) : (jjcolumn += c > 0xff ? 2 : 1);
                    }
                }
                else if(c === jjlf){
                    jjline++, jjcolumn = 0;
                    jjlineTerm = LineTerm.LF;
                }
                else {
                    jjcolumn += c > 0xff ? 2 : 1;
                    jjlastCR = c === jjcr;
                }
                break;
        }
        jjmatched += String.fromCharCode(c);
        jjmarker.state !== -1 && (jjbackupCount++);
        jjinput.next();
    }
    /**
     *  accept a character
     *  @return - true if the character is consumed, false if not consumed
     *  @api private
     *  @internal
     */
    function jjacceptChar(ccode: number){
        var lexstate = jjlexState[jjlexState.length - 1];
        var ltable = jjdfaTables[lexstate];
        var isEnd = ltable.isEnd[jjstate] === 1;
        var hasArc = ltable.hasArc[jjstate] === 1;
        // get the class of the given character
        var cl = ccode < ltable.maxAsicii ? ltable.classTable[ccode] : jjfindUnicodeClass(ltable.unicodeClassTable, ccode);
        // find the next state to go
        var nstate = -1;
        if(cl !== -1){
            var ind = ltable.disnext[jjstate] + cl;
            if(ind >= 0 && ind < ltable.pnext.length && ltable.checknext[ind] === jjstate){
                nstate = ltable.pnext[ind];
            }
        }
        if(isEnd){
            // if current state is a terminate state, be careful
            if(hasArc){
                if(nstate === -1){
                    // nowhere to go, stay where we are
                    jjdoLexAction(lexstate, jjstate);
                    // recover
                    jjmarker.state = -1;
                    jjbackupCount = 0;
                    jjstate = 0;                    
                    // character not consumed
                }
                else {
                    // now we can either go to that new state, or stay where we are
                    // it is prefered to move forward, but that could lead to errors,
                    // so we need to memorize this state before move on, in case if 
                    // an error occurs later, we could just return to this state.
                    jjmark();
                    jjstate = nstate;
                    jjconsume(ccode);
                }
            }
            else {
                // current state doesn't lead to any state, just stay here.
                jjdoLexAction(lexstate, jjstate);
                // recover
                jjmarker.state = -1;
                jjbackupCount = 0;
                jjstate = 0;
                // character not consumed
            }
        }
        else {
            if(nstate === -1){
                // nowhere to go at current state, error may have occured.
                // check marker to verify that
                if(jjmarker.state !== -1){
                    // we have a previously marked state, which is a terminate state.
                    jjrollback();
                    jjdoLexAction(lexstate, jjstate);
                    jjstate = 0;
                    // accept(s);
                    // character not consumed
                }
                else {
                    // error occurs
                    jjemit('lexicalerror', String.fromCharCode(ccode), jjline, jjcolumn);
                    // force consume
                    jjconsume(ccode);
                }
            }
            else {
                jjstate = nstate;
                // character consumed
                jjconsume(ccode);
            }
        }
    }
    function jjacceptEOF(){
        if(jjstate === 0){
            // recover
            jjprepareToken(0);
            jjacceptToken(null);
            return true;
        }
        else {
            var lexstate = jjlexState[jjlexState.length - 1];
            var ltable = jjdfaTables[lexstate];
            var isEnd = ltable.isEnd[jjstate];
            if(isEnd){
                jjdoLexAction(lexstate, jjstate);
                jjstate = 0;
                jjmarker.state = -1;
                return false;
            }
            else if(jjmarker.state !== -1){
                jjrollback();
                jjdoLexAction(lexstate, jjstate);
                jjstate = 0;
                return false;
            }
            else {
                jjemit('lexicalerror', '', jjline, jjcolumn);
                return true;
            }
        }
    }
    function jjdoReduction(jjrulenum: number){
        var jjnt = jjlhs[jjrulenum];
        var jjsp = jjsematicS.length;
        var jjtop = jjsematicS[jjsp - jjruleLen[jjrulenum]] || null;
        switch(jjrulenum){
        }
        jjlrState.length -= jjruleLen[jjrulenum];
        var jjcstate = jjlrState[jjlrState.length - 1];
        jjlrState.push(jjpgoto[jjdisgoto[jjcstate] + jjnt]);

        jjsematicS.length -= jjruleLen[jjrulenum];
        jjsematicS.push(jjtop);
    }
    function jjacceptToken(tk: Token){
        // look up action table
        var shifted = false;
        tk !== null && jjtokenQueue.push(tk);
        while(!jjstop && jjtokenQueue.length > 0){
            var t = jjtokenQueue[0];
            var cstate = jjlrState[jjlrState.length - 1];
            var ind = jjdisact[cstate] + t.id;
            var act = 0;
            if(ind < 0 || ind >= jjpact.length || jjcheckact[ind] !== cstate){
                act = -jjdefred[cstate] - 1;
            }
            else {
                act = jjpact[ind];
            }
            if(act === jjactERR){
                // explicit error
                jjsyntaxError(t);
                jjtokenQueue.shift();
            }
            else if(act > 0){
                // shift
                if(t.id === 0){
                    // end of file
                    jjstop = true;
                    jjemit('accept');
                    jjtokenQueue.shift();
                }
                else {
                    jjlrState.push(act - 1);
                    jjsematicS.push(jjsematicVal);
                    jjsematicVal = null;
                    jjtryReduce();
                    // token consumed
                    jjtokenQueue.shift();
                }
            }
            else if(act < 0){
                jjdoReduction(-act - 1);
                jjtryReduce();
            }
            else {
                // error
                jjsyntaxError(t);
                // force consume
                jjtokenQueue.shift();
            }
        }
    }
    function jjtryReduce(){
        var cstate = jjlrState[jjlrState.length - 1];
        var act;
        while(jjdisact[cstate] === -jjtokenCount && (act = jjdefred[cstate]) !== -1){
            jjdoReduction(act);
            cstate = jjlrState[jjlrState.length - 1];
        }
    }
    function jjsyntaxError(t: Token){
        var msg = "unexpected token " + t.toString() + ", expecting one of the following token(s):\n"
        msg += jjexpected(jjlrState[jjlrState.length - 1]);
        jjemit("syntaxerror", msg, t);
    }
    function jjexpected(state: number){
        var dis = jjdisact[state];
        var ret = '';
        function expect(tk: number){
            var ind = dis + tk;
            if(ind < 0 || ind >= jjpact.length || state !== jjcheckact[ind]){
                return jjdefred[state] !== -1;
            }
            else {
                return true;
            }
        }
        for(var tk = 0; tk < jjtokenCount; tk++){
            expect(tk) && (ret += "    " + tokenToString(tk) + " ..." + '\n');
        }
        return ret;
    }
}
