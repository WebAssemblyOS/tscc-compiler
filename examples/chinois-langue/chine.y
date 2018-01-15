%lex {
    LETTER = < ['a'-'z', 'A'-'Z', '_', '$'] | %import('es5UnicodeIDStart') >
    DIGIT = < ['0'-'9'] >
    PART = < <DIGIT> | %import('es5UnicodeIDPart') >

    < NAME: <LETTER> (<LETTER>|<PART>)* >
    < NUM: (<DIGIT>+ ('.' <DIGIT>*)?|'.' <DIGIT>+ ) (['e', 'E']<DIGIT>+)? >
    < BEGIN: '开始' >
    < END: '结束' >
    < IF: '如果' >
    < THEN: '那么' >
    < ELSE: '否则' >
    < WHILE: '当' >
    < FOR: '对于' >
    < VAR: '令' >
    < BRA: '（' >
    < KET: '）' >
    < EOL: '。' >
    < COMMA: '，' >

    < ASSIGN: '=' >
    < EQU: '==' >
    < LT: '<' >
    < GT: '>' >
    < LTOE: '<=' >
    < GTOE: '>=' >
    < PLUS: '+' >
    < MINUS: '-' >
    < TIMES: '*' >
    < DIVIDE: '/' >
    < EXP: '**' >

    < AND: '且' >
    < OR: '或' >
    < NOT: '不是' >
}

%left '否则'

%left '或'
%left '且'
%right '不是'
%right '='
%left '==' '>' '<' '>=' '<='
%left '+' '-'
%left '*' '/'
%right '**'
%left UNARY

%%

开始: 外层语句块;
外层语句块: 外层语句块 外层语句 | /* 空 */;
外层语句: 语句;

语句块: 语句块 语句 | /* 空 */;
语句:
    '开始' 语句块 '结束'
|   表达式 '。'
|   '如果' 表达式 '那么' 语句 否则语句
;
否则语句:
    /* 空 */ %prec '否则'
|   '否则' 语句
;
表达式:
    表达式 '或' 表达式
|   表达式 '且' 表达式
|   表达式 '=' 表达式
|   表达式 '==' 表达式
|   表达式 '>=' 表达式
|   表达式 '<=' 表达式
|   表达式 '>' 表达式
|   表达式 '<' 表达式
|   表达式 '+' 表达式
|   表达式 '-' 表达式
|   表达式 '*' 表达式
|   表达式 '/' 表达式
|   表达式 '**' 表达式
|   '（' 表达式 ')'
|   '不是' 表达式
|   '+' 表达式 %prec UNARY
|   '-' 表达式 %prec UNARY
|   <NAME>
|   <NUM>
;

%%