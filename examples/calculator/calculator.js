/*
    generated by jscc, an LALR(1) parser generator made by hadroncfy.
    template for typescript, written by hadroncfy, aussi.
*/

'use strict';
var Mathx = {};
function Quaternion(a, b, c, d){
    // this = a + bi + cj + dk
    this.a = a;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 0;
}
Quaternion.prototype.toString = function(){
    return [this.a, this.b + 'i', this.c + 'j', this.d + 'k'].join(' + ');
}
Quaternion.prototype.neg = function(){
    return new Quaternion(-this.a, -this.b, -this.c, -this.d);
}
Quaternion.prototype.dagger = function(){
    return new Quaternion(this.a, -this.b, -this.c, -this.d);
}
Quaternion.prototype.inv = function(){
    var m2 = this.module2().a;
    return new Quaternion(this.a / m2, -this.b / m2, -this.c / m2, -this.d / m2);
}
Quaternion.prototype.module2 = function(){
    return new Quaternion(this.a * this.a + this.b * this.b + this.c * this.c + this.d * this.d);
}
Quaternion.prototype.module = function(){
    return new Quaternion(Math.sqrt(this.module2().a));
}
Mathx.Quaternion = Quaternion;

Quaternion.addQ = function(x, y){
    return new Quaternion(x.a + y.a, x.b + y.b, x.c + y.c, x.d + y.d);
}
Quaternion.minusQ = function(x, y){
    return new Quaternion(x.a - y.a, x.b - y.b, x.c - y.c, x.d - y.d);
}
Quaternion.multiQ = function(x, y){
    return new Quaternion(
        x.a * y.a - x.b * y.b - x.c * y.c - x.d * y.d,
        x.a * y.b + x.b * y.a + x.c * y.d - x.d * y.c,
        x.a * y.c - x.b * y.d + x.c * y.a + x.d * y.b,
        x.a * y.d + x.b * y.c - x.c * y.b + x.d * y.a
    );
}
Quaternion.exp = function(x){
    var fc = Math.exp(x.a);
    var mod2 = Math.sqrt(x.b * x.b + x.c * x.c + x.d * x.d);
    return new Quaternion(
        fc * Math.cos(mod2),
        fc * x.b * Math.sin(mod2) / mod2,
        fc * x.c * Math.sin(mod2) / mod2,
        fc * x.d * Math.sin(mod2) / mod2
    );
}

function cut(s){
    return s.substr(0, s.length - 1);
}

/*
    constants
*/
var jjlf = '\n'.charCodeAt(0);
var jjcr = '\r'.charCodeAt(0);
/*
    dfa table definations
*/
var jjlexpnext0 = [ 
         1,     2,     3,     4,     5,     6,     7,     8,     9,    21,
        20,    18,    12,    10,     1,    13,    11,     9,    14,    15,
        16,    17,    14,    19,    14,    15,    16,    17,    14,    19,
        14,    15,    16,    17,    14,    12,    14,    15,    16,    17,
        14,    20,    -1,    15,    16,    17,
]; 
var jjlexdisnext0 = [ 
         0,    14,   -17,   -17,   -17,   -17,   -17,     4,   -17,     9,
        -4,   -17,    27,    21,     2,   -17,   -17,   -17,    -5,    15,
        33,   -17,
]; 
var jjlexchecknext0 = [ 
         0,     0,     0,     0,     0,     0,     0,     0,     0,    18,
        14,    10,     7,     0,     1,     9,     0,     9,     9,     9,
         9,     9,     9,    19,    19,    19,    19,    19,    19,    13,
        13,    13,    13,    13,    13,    12,    12,    12,    12,    12,
        12,    20,    -1,    20,    20,    20,
]; 
var jjlexclassTable0 = [ 
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,     0,
         0,    -1,    -1,     0,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,     0,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
         1,     2,     3,     4,    -1,     5,     6,     7,     8,     8,
         8,     8,     8,     8,     8,     8,     8,     8,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,     9,
        -1,    -1,    -1,    10,    11,    12,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        -1,    13,    -1,    -1,    -1,    10,    11,    12,    -1,    -1,
        -1,    -1,    14,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
        15,    -1,    -1,    -1,    16,    -1,    -1,    -1,    -1,    -1,
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
var jjlexunicodeClassTable0 = [ 
    
]; 
var jjlexisEnd0 = [ 
    0,1,1,1,1,1,1,0,1,1,0,1,1,1,0,
    1,1,1,0,1,1,1,
]; 
var jjlexhasArc0 = [ 
    1,1,0,0,0,0,0,1,0,1,1,0,1,1,1,
    0,0,0,1,1,1,0,
]; 
var jjlextable0 = {
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
var jjdfaTables = [
    jjlextable0,
];
/*
    find unicode class
*/
function jjfindUnicodeClass(uc, c){
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
var jjlexTokens0 = [ 
        -1,    -1,    11,    12,     8,     6,     7,    -1,     9,     2,
        -1,    10,     2,     2,    -1,     3,     4,     5,    -1,     2,
         2,    13,
]; 

var jjstateCount = 31;
var jjtokenCount = 14;
var jjactERR = 32;
/*
    compressed action table: action = jjpact[jjdisact[STATE-NUM] + TOKEN]
    when action > 0, shift the token and goto state (action - 1);
    when action < 0, reduce with rule (1-action);
    when action = 0, do default action.
*/
var jjpact = [ 
         4,     5,     6,     7,    11,    12,    18,    19,    14,    13,
        15,     9,     4,     5,     6,     7,    11,    12,    18,    19,
        14,    13,    10,     9,     4,     5,     6,     7,    11,    12,
         0,     0,    14,    13,     0,     9,     4,     5,     6,     7,
        11,    12,     0,     0,    14,    13,     0,     9,     4,     5,
         6,     7,    11,    12,     0,     0,    14,    13,     0,     9,
         4,     5,     6,     7,    11,    12,     0,     0,    14,    13,
         0,     9,     4,     5,     6,     7,    11,    12,     0,     0,
        14,    13,     0,     9,     4,     5,     6,     7,    11,    12,
         0,     0,    14,    13,     0,     9,     4,     5,     6,     7,
        11,    12,     0,     0,    14,    13,     0,     9,     4,     5,
         6,     7,    16,    17,    18,    19,    14,    13,    31,     9,
        16,    17,    18,    19,    30,    16,    17,    18,    19,     0,
         0,    29,    16,    17,    18,    19,
]; 
/*
    displacement of action table.
*/
var jjdisact = [ 
        94,    22,   126,   -14,   -14,   -14,   -14,   -14,    -1,   -14,
        82,    70,    58,    46,    34,    22,    10,   106,    -2,   -14,
       -14,   119,   114,   106,    10,    -2,   -14,   -14,   -14,   -14,
       -14,
]; 
/*
    used to check if a position in jjpact is out of bouds.
    if jjcheckact[jjdisact[STATE-NUM] + TOKEN] = STATE-NUM, this position is not out of bounds.
*/
var jjcheckact = [ 
        18,    18,    18,    18,    18,    18,    25,    25,    18,    18,
         8,    18,    16,    16,    16,    16,    16,    16,    24,    24,
        16,    16,     1,    16,    15,    15,    15,    15,    15,    15,
         0,     0,    15,    15,     0,    15,    14,    14,    14,    14,
        14,    14,     0,     0,    14,    14,     0,    14,    13,    13,
        13,    13,    13,    13,     0,     0,    13,    13,     0,    13,
        12,    12,    12,    12,    12,    12,     0,     0,    12,    12,
         0,    12,    11,    11,    11,    11,    11,    11,     0,     0,
        11,    11,     0,    11,    10,    10,    10,    10,    10,    10,
         0,     0,    10,    10,     0,    10,     0,     0,     0,     0,
         0,     0,     0,     0,     0,     0,     0,     0,    17,    17,
        17,    17,    23,    23,    23,    23,    17,    17,    23,    17,
        22,    22,    22,    22,    22,    21,    21,    21,    21,     0,
         0,    21,     2,     2,     2,     2,
]; 
/*
    default action table. action = jjdefred[STATE-NUM],
    where action is the number of the rule to reduce with.
*/
var jjdefred = [ 
        -1,    -1,     1,    11,    12,    13,    14,    15,    -1,     0,
        -1,    -1,    -1,    -1,    -1,    -1,    -1,     8,    -1,     6,
         7,    -1,    -1,    -1,     2,     3,     4,     5,     9,    10,
        16,
]; 
/*
    compressed goto table: goto = jjpgoto[jjdisgoto[STATE-NUM] + NON_TERMINAL]
*/
var jjpgoto = [ 
        27,     7,    26,     7,    25,     7,    24,     7,    23,     7,
        22,     7,    21,     7,    20,     7,    19,     7,     1,     2,
         7,
]; 
/*
    displacement of the goto table
*/
var jjdisgoto = [ 
        17,    -4,    -4,    -4,    -4,    -4,    -4,    -4,    -4,    -4,
        14,    12,    10,     8,     6,     4,     2,     0,    -2,    -4,
        -4,    -4,    -4,    -4,    -4,    -4,    -4,    -4,    -4,    -4,
        -4,
]; 
/*
    length of each rule: rule length = jjruleLen[RULE-NUM]
*/
var jjruleLen = [ 
         2,     1,     3,     3,     3,     3,     2,     2,     2,     3,
         3,     1,     1,     1,     1,     1,     4,
]; 
/*
    index of the LHS of each rule
*/
var jjlhs = [ 
         0,     1,     2,     2,     2,     2,     2,     2,     2,     2,
         2,     2,     2,     2,     2,     2,     3,
]; 
/*
    token names
*/
var jjtokenNames = [ 
                   "EOF",             "ERROR",             "CONST",
                     "I",                 "J",                 "K",
                  "PLUS",             "MINUS",             "TIMES",
                "DIVIDE",               "ABS",               "BRA",
                   "KET",               "EXP",
]; 
/*
    token alias
*/
var jjtokenAlias = [ 
                    null,                null,                null,
                    null,                null,                null,
                     "+",                 "-",                 "*",
                     "/",                 "|",                 "(",
                     ")",               "exp",
]; 


function tokenToString(tk){
    return jjtokenAlias[tk] === null ? "<" + jjtokenNames[tk] + ">" : '"' + jjtokenAlias[tk] + '"';
}
function getExpectedTokens(state){
        var dis = jjdisact[state];
        var ret = [];
        function expect(tk){
            var ind = dis + tk;
            if(ind < 0 || ind >= jjpact.length || state !== jjcheckact[ind]){
                return jjdefred[state] !== -1;
            }
            else {
                return true;
            }
        }
        for(var tk = 0; tk < jjtokenCount; tk++){
            expect(tk) && ret.push(tk);
        }
        return ret;
}
// Token kinds
var TokenKind = {
    EOF : 0,
    ERROR : 1,
    CONST : 2,
    I : 3,
    J : 4,
    K : 5,
    PLUS : 6,
    MINUS : 7,
    TIMES : 8,
    DIVIDE : 9,
    ABS : 10,
    BRA : 11,
    KET : 12,
    EXP : 13,

};
function Token(id, val, startLine, startColumn, endLine, endColumn){
    this.id = id;
    this.val = val;
    this.startLine = startLine;
    this.startColumn = startColumn;
    this.endLine = endLine;
    this.endColumn = endColumn;
}
Token.prototype.clone = function(){
    return new Token(
        this.id,
        this.val,
        this.startLine,
        this.startColumn,
        this.endLine,
        this.endColumn
    );
}
Token.prototype.toString = function(){
    return (jjtokenAlias[this.id] === null ? 
        '<' + jjtokenNames[this.id] + '>' :
        '"' + jjtokenAlias[this.id] + '"') + "(" + this.val + ")";
}
var LineTerm = {
    NONE: 1,
    AUTO: 2,
    CR: 3,
    LF: 4,
    CRLF: 5
};

function createParser() {
    //#region parser state variables
    var jjlexState;
    var jjstate;
    var jjlastCR;
    var jjmatched;
    var jjmarker = { state: -1, line: 0, column: 0 };
    var jjbackupCount;
    var jjline;
    var jjcolumn;
    var jjtline;
    var jjtcolumn;

    var jjlrState;
    var jjsematicS;
    //#endregion

    var jjinput;
    var jjsematicVal;
    var jjtokenQueue;
    var jjtoken;
    var jjstop;
    var jjtokenEmitted;
    var jjenableBlock = true;
    var jjlineTerm;

    var jjhandlers = {};

    // extra members, defined by %extra_arg
    
    var out;


    return {
        init: init,
        on: on,
        setLineTerminator: setLineTerminator,
        getLineTerminator: function() { return jjlineTerm; },
        accept: accept,
        end: end,
        load: load,
        nextToken: nextToken,
        halt: halt,
        enableBlocks: enableBlocks,
        disableBlocks: disableBlocks,
        loadParserState: loadParserState,
        getParserState: getParserState,
        parse: parse
    };
    function init(out1){
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

        jjlineTerm = LineTerm.AUTO;
        jjlastCR = false;

        
    out = out1;


        jjtryReduce();
    }
    function load(input){
        if(typeof input === 'string'){
            var i = 0;
            var s = input;
            jjinput = {
                current: function(){ return i < s.length ? s.charCodeAt(i) : null; },
                next: function(){ return i++; },
                isEof: function(){ return i >= s.length; },
                backup: function(t){ return i -= t.length; }
            }
        }
        else {
            jjinput = input;
        }
    }
    function nextToken(){
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
    function setLineTerminator(lt){
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
    function accept(s){
        var i = 0;
        load({
            current: function(){ return i < s.length ? s.charCodeAt(i) : null; },
            next: function(){ return i++; },
            isEof: function(){ return i >= s.length; },
            backup: function(t){ return i -= t.length; }
        });
        while(!jjstop && nextToken().id !== 0);
    }
    /**
     *  tell the compiler that end of file is reached
     *  @api public
     */
    function end(){
        
    }
    function parse(input) {
        load(input);
        var t;
        while(!jjstop){
            t = nextToken();
            if(t === null){
                return false;
            }
            else if(t.id === 0){
                return true;
            }
        }
        return true;
    }
    function halt(){
        jjstop = true;
    }
    function loadParserState(state){
        jjlexState = state.lexState;
        jjlrState = state.lrState;
        jjsematicS = state.sematicS;
    }
    function getParserState() {
        return {
            lexState: jjlexState,
            lrState: jjlrState,
            sematicS: jjsematicS
        };
    }
    /**
     *  set 
     */
    function jjsetImg(s){
        jjmatched = s;
        jjtline = jjline;
        jjtcolumn = jjcolumn;
    }
    function jjprepareToken(tid){
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
    function jjemit(name, a1, a2, a3){
        var cbs = jjhandlers[name];
        if(cbs){
            for(var i = 0; i < cbs.length; i++){
                cbs[i](a1, a2, a3);
            }
        }
    }
    function on(name, cb){
        jjhandlers[name] || (jjhandlers[name] = []);
        jjhandlers[name].push(cb);
    }
    function jjdoLexAction0(jjstaten){
        var jjtk = jjlexTokens0[jjstaten];
        jjtk !== -1 && jjprepareToken(jjtk);
        switch(jjstaten){
            case 1:
                jjsetImg(""); 
                break;
            case 9:
                if(jjenableBlock){ jjsematicVal = new Quaternion(Number(jjtoken.val), 0, 0, 0); }
                break;
            case 12:
                if(jjenableBlock){ jjsematicVal = new Quaternion(Number(jjtoken.val), 0, 0, 0); }
                break;
            case 13:
                if(jjenableBlock){ jjsematicVal = new Quaternion(Number(jjtoken.val), 0, 0, 0); }
                break;
            case 15:
                if(jjenableBlock){ jjsematicVal = new Quaternion(0, Number(cut(jjtoken.val)), 0, 0); }
                break;
            case 16:
                if(jjenableBlock){ jjsematicVal = new Quaternion(0, 0, Number(cut(jjtoken.val)), 0); }
                break;
            case 17:
                if(jjenableBlock){ jjsematicVal = new Quaternion(0, 0, 0, Number(cut(jjtoken.val))); }
                break;
            case 19:
                if(jjenableBlock){ jjsematicVal = new Quaternion(Number(jjtoken.val), 0, 0, 0); }
                break;
            case 20:
                if(jjenableBlock){ jjsematicVal = new Quaternion(Number(jjtoken.val), 0, 0, 0); }
                break;
            default:;
        }
    }
    /**
     *  do a lexical action
     *  @api private
     *  @internal
     */
    function jjdoLexAction(lexstate, state){
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
    function jjconsume(c){
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
    function jjacceptChar(ccode){
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
                    // check for terminate state
                    jjtryLexEnd();
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
                    // emit an error token
                    jjprepareToken(1);
                    jjtokenQueue.length > 0 && jjacceptToken(null);
                    jjstate = 0;
                }
            }
            else {
                jjstate = nstate;
                // character consumed
                jjconsume(ccode);
                // check for terminate state
                jjtryLexEnd();
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
                jjprepareToken(1);
                jjtokenQueue.length > 0 && jjacceptToken(null);
                jjstate = 0;
                return true;
            }
        }
    }
    function jjtryLexEnd(){
        var lexstate = jjlexState[jjlexState.length - 1];
        var ltable = jjdfaTables[lexstate];
        var isEnd = ltable.isEnd[jjstate] === 1;
        var hasArc = ltable.hasArc[jjstate] === 1;
        if(isEnd && !hasArc){
            jjdoLexAction(lexstate, jjstate);
            jjmarker.state = -1;
            jjbackupCount = 0;
            jjstate = 0;
        }
    }
    function jjdoReduction(jjrulenum){
        var jjnt = jjlhs[jjrulenum];
        var jjsp = jjsematicS.length;
        var jjtop = jjsematicS[jjsp - jjruleLen[jjrulenum]] || null;
        switch(jjrulenum){
            case 1:
                /* 1: start => expr */
                var a = jjsematicS[jjsp - 1];
                if(jjenableBlock){ out.val = a; } 
                break;
            case 2:
                /* 2: expr => expr "+" expr */
                var a = jjsematicS[jjsp - 3];
                var b = jjsematicS[jjsp - 1];
                if(jjenableBlock){ jjtop = Quaternion.addQ(a, b); } 
                break;
            case 3:
                /* 3: expr => expr "-" expr */
                var a = jjsematicS[jjsp - 3];
                var b = jjsematicS[jjsp - 1];
                if(jjenableBlock){ jjtop = Quaternion.minusQ(a, b); } 
                break;
            case 4:
                /* 4: expr => expr "*" expr */
                var a = jjsematicS[jjsp - 3];
                var b = jjsematicS[jjsp - 1];
                if(jjenableBlock){ jjtop = Quaternion.multiQ(a, b); } 
                break;
            case 5:
                /* 5: expr => expr "/" expr */
                var a = jjsematicS[jjsp - 3];
                var b = jjsematicS[jjsp - 1];
                if(jjenableBlock){ jjtop = Quaternion.multiQ(a, b.inv()) } 
                break;
            case 6:
                /* 6: expr => "+" expr */
                var a = jjsematicS[jjsp - 1];
                if(jjenableBlock){ jjtop = a; } 
                break;
            case 7:
                /* 7: expr => "-" expr */
                var a = jjsematicS[jjsp - 1];
                if(jjenableBlock){ jjtop = a.neg(); } 
                break;
            case 8:
                /* 8: expr => expr "*" */
                var a = jjsematicS[jjsp - 2];
                if(jjenableBlock){ jjtop = a.dagger(); } 
                break;
            case 9:
                /* 9: expr => "(" expr ")" */
                var a = jjsematicS[jjsp - 2];
                if(jjenableBlock){ jjtop = a; } 
                break;
            case 10:
                /* 10: expr => "|" expr "|" */
                var a = jjsematicS[jjsp - 2];
                if(jjenableBlock){ jjtop = a.module(); } 
                break;
            case 16:
                /* 16: funcs => "exp" "(" expr ")" */
                var a = jjsematicS[jjsp - 2];
                if(jjenableBlock){ jjtop = Quaternion.exp(a); } 
                break;
        }
        jjlrState.length -= jjruleLen[jjrulenum];
        var jjcstate = jjlrState[jjlrState.length - 1];
        jjlrState.push(jjpgoto[jjdisgoto[jjcstate] + jjnt]);

        jjsematicS.length -= jjruleLen[jjrulenum];
        jjsematicS.push(jjtop);
    }
    function jjacceptToken(tk){
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
    function jjsyntaxError(t){
        jjemit("syntaxerror", t, jjlrState[jjlrState.length - 1]);
    }
}


module.exports = function (s, args){
    var parser = createParser();
    var out = { val: null };
    var errMsg = null;
    parser.init(out);
    parser.on('lexicalerror', function(c, line, column){
        errMsg = ('invalid character "' + c + '" at line ' + (line + 1) + ' column ' + (column + 1));
        parser.halt();
    });
    parser.on('syntaxerror', function(msg, token){
        errMsg = ('syntax error: line ' + (token.startLine + 1) + ' column ' + (token.startColumn + 1) + ': ' + msg);
        parser.halt();
    });
    parser.on('accept', function(){
        // console.log('result: ' + out.val);
    });
    parser.parse(s);
    if(errMsg !== null){
        throw errMsg;
    }
    return out.val;
};