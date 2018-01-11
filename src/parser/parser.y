%header {
import { GBuilder, TokenRefType } from './gbuilder';
import { Assoc } from '../grammar/token-entry';
import { CompilationError as E, CompilationError } from '../util/E';
import { InputStream } from '../util/io';
import { Context } from '../util/context';
import { LexAction, returnToken, blockAction, pushState, popState, setImg } from '../lexer/action';
}

%extra_arg{
    gb: GBuilder;
    ctx: Context;
    assoc: Assoc;
    lexacts: LexAction[];
}

%lex [
    LETTER = < ['a'-'z', 'A'-'Z', '$', '_'] >
    DIGIT = < ['0'-'9'] >
    HEX = < ['0'-'9', 'a'-'f', 'A'-'F'] >
    ESCAPE_CHAR = < "\\" (['n', 't', 'b', 'r', 'f', '"', "'", "\\"] | <UNICODE>) >
    UNICODE = < ['x', 'u'] <HEX>+ >
    
    < ["\n", "\t", " ", "\r"]+ >: [='']
    < "/*" ([^"*", "/"]|[^"*"]"/"|"*"[^"/"])* "*/" >: [='']
    < "//" [^"\n"]* >: [='']

    < NAME: <LETTER> (<LETTER>|<DIGIT>)* >
//    < NUM: <DIGIT>+ >
    < STRING: 
        '"' ( [^'"', '\n', '\\'] | <ESCAPE_CHAR> )* '"' 
    |   "'" ( [^"'", '\n', '\\'] | <ESCAPE_CHAR> )* "'"
    >
    < OPEN_BLOCK: "{" >
    < CLOSE_BLOCK: "}" >
    < OPT_DIR: "%option" >
    < LEX_DIR: "%lex" >
    < LEFT_DIR: "%left" >
    < RIGHT_DIR: "%right" >
    < NONASSOC_DIR: "%nonassoc" >
    < USE_DIR: "%use" >
    < HEADER_DIR: "%header" >
    < EXTRA_ARG_DIR: "%extra_arg" >
    < EMPTY: "%empty" >
    < GT: ">" >
    < LT: "<" >
    < BRA: "(" >
    < KET: ")" >
    < EQU: "=" >
    < CBRA: "[" >
    < CKET: "]" >
    < QUESTION: "?" >
    < STAR: "*" >
    < PLUS: "+" >
    < DASH: "-" >
    < COLON: ":" >
    < ARROW: "=>" >
    < EOL: ";" >
    < SEPERATOR: "%%" >
    < OR: "|" >
    < WEDGE: "^" >
    < COMMA: "," >
]

%lex <IN_BLOCK> [
    < ANY_CODE: [^"{", "}"]* >
    < OPEN_BLOCK: "{" >
    < CLOSE_BLOCK: "}" >
]

%%

start: options '%%' body '%%';
options: options option | ;
option:
    '%lex' { this.gb.lexBuilder.prepareLex(); } states_ '{' lexBody '}'
|   associativeDir assocTokens
|   '%option' '{' optionBody '}'
|   '%header' b = block { this.gb.setHeader(b.val); }
|   '%extra_arg' b = block { this.gb.setExtraArg(b.val); }
;
associativeDir:
    '%left' { this.assoc = Assoc.LEFT; }
|   '%right' { this.assoc = Assoc.RIGHT; }
|   '%nonassoc' { this.assoc = Assoc.NON; }
;
assocTokens: 
    assocTokens t = tokenRef { this.gb.defineTokenPrec(t.val, this.assoc, t.type, t.startLine); }
|   t = tokenRef { this.gb.defineTokenPrec(t.val, this.assoc, t.type, t.startLine); }
;

optionBody: 
    optionBody name = <NAME> '=' val = <STRING> { this.gb.setOpt(name.val, val.val); }
|   /* empty */ ;

states_: '<' states '>' | { this.gb.lexBuilder.selectState('DEFAULT'); };
states: 
    s = <NAME> { this.gb.lexBuilder.selectState(s.val); }
|   states ',' s = <NAME> { this.gb.lexBuilder.selectState(s.val); }
;

lexBody: lexBody lexBodyItem | ;
lexBodyItem: 
    v = <NAME> { this.gb.lexBuilder.prepareVar(v.val, v.startLine); } 
    '=' '<' regexp '>' { this.gb.lexBuilder.endVar(); }
|   '<' regexp '>' lexAction_ { this.gb.lexBuilder.end(this.lexacts, '(untitled)'); }
|   '<' tn = <NAME> ':' regexp '>' lexAction_ { 
    let tdef = this.gb.defToken(tn.val, this.gb.lexBuilder.possibleAlias, tn.startLine);
    this.lexacts.push(returnToken(tdef));
    this.gb.lexBuilder.end(this.lexacts, tn.val);
}
;
lexAction_: ':' lexAction | { this.lexacts = []; };
lexAction: 
    { this.lexacts = []; } '[' lexActions ']'
|   b = block { this.lexacts = [blockAction(b.val, b.startLine)]; }
;

lexActions: 
    lexActions ',' it = lexActionItem { this.lexacts.push(it.val); }
|   lexActionItem
;
lexActionItem: 
    '+' vn = <NAME> { this.gb.addPushStateAction(this.lexacts, vn.val, vn.startLine); }
|   '-' { this.lexacts.push(popState()); }
|   b = block { this.lexacts.push(blockAction(b.val, b.startLine)); }
|   '=' s = <STRING> { this.lexacts.push(setImg(s.val)); }
;

regexp: { this.gb.lexBuilder.enterUnion(); } union { this.gb.lexBuilder.leaveUnion(); };
union:
    union '|' simpleRE { this.gb.lexBuilder.endUnionItem(); }
|   simpleRE { this.gb.lexBuilder.endUnionItem(); }
;
simpleRE: simpleRE basicRE | basicRE;
basicRE: 
    { this.gb.lexBuilder.enterSimple(); } primitiveRE 
    suffix = rePostfix { this.gb.lexBuilder.simplePostfix(suffix.val); }
;
rePostfix: '+' | '?' | '*' | { $$.val = ''; };
primitiveRE: 
    '(' regexp ')'
|   '[' inverse_ setRE_ ']'
|   '<' n = <NAME> '>' { this.gb.lexBuilder.addVar(n.val, n.startLine); }
|   s = <STRING> { this.gb.lexBuilder.addString(s); }
;
inverse_: '^' { this.gb.lexBuilder.beginSet(true); } | { this.gb.lexBuilder.beginSet(false); };
setRE_: setRE |;
setRE: setRE ',' setREItem | setREItem;
setREItem: 
    s = <STRING> { this.gb.lexBuilder.addSetItem(s.val, s.val, s.startLine, s.startLine); }
|   from = <STRING> '-' to = <STRING> 
    { this.gb.lexBuilder.addSetItem(from.val, to.val, from.startLine, to.startLine); }
;

body: body bodyItem | bodyItem;
bodyItem: 
    compoundRule
;
compoundRule: <NAME> arrow rules ';';
arrow: ':' | '=>';
rules: rules '|' rule | rule;
rule: ruleHead ruleItems | '%empty';
ruleHead: '%use' '(' varUseList ')' | ;
varUseList: varUseList ',' <NAME> | <NAME>;
ruleItems: ruleItems ruleItem |;
ruleItem: <NAME> | tokenRef | lexAction;
tokenRef: 
    '<' t = <NAME> '>' { $$.val = t.val; $$.type = TokenRefType.TOKEN; } 
|   <STRING> { $$.type = TokenRefType.STRING; }
;

block: [+IN_BLOCK] open = "{" bl = innerBlock [-] close = "}" { 
    $$.val = '{' + bl.val + '}';
    $$.startLine = open.startLine;
    $$.startColumn = open.startColumn;
    $$.endLine = close.endLine;
    $$.endColumn = close.endColumn;
};
innerBlock: innerBlock b = innerBlockItem { $$.val += b.val; } | { $$.val = ''; };
innerBlockItem: <ANY_CODE> | block;

%%