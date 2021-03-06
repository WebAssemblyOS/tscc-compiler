
export interface Position{
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
}
export interface JNode extends Position{
    val: string;
    ext?: any;
}
export function newNode(val: string): JNode{
    return {
        val: val,
        startLine: -1,
        startColumn: 0,
        endLine: 0,
        endColumn: 0
    };
}
export function nodeBetween(from: JNode, to: JNode, val: string): JNode{
    return {
        val: val,
        startLine: from.startLine,
        startColumn: from.startColumn,
        endLine: to.endLine,
        endColumn: to.endColumn
    };
}
export function nodeExtend(n: JNode, to: JNode, val: string){
    n.endLine = to.endLine;
    n.endColumn = to.endColumn;
    n.val = val;
}
export function posToString(pos: Position){
    if(pos.startLine !== -1){
        return `line ${pos.startLine + 1}, column ${pos.startColumn + 1}`;
    }
    else {
        return '<internal-position>';
    }
}
export function markPosition(pos: Position, lines: string[], marker: string = '^'): string{
    function repeat(s: string, t: number){
        let ret = '';
        while(t --> 0){
            ret += s;
        }
        return ret;
    }
    function width(s: string){
        let ret = 0;
        for(let i = 0;i < s.length; i++){
            ret += s.charCodeAt(i) > 0xff ? 2 : 1;
        }
        return ret;
    }
    if(pos.startLine !== -1){
        let ret = `(line ${pos.startLine + 1}, column ${pos.startColumn + 1}):\n`;
        let line = pos.startLine, col = pos.startColumn;
        ret += lines[line] + '\n';
        ret += repeat(' ', col);
        let length = width(lines[line]);
        while(line < pos.endLine || col <= pos.endColumn){
            ret += marker;
            if(col++ >= length){
                col = 0;
                line++;
                ret += '\n' + lines[line] + '\n';
                length = width(lines[line]);
            }
        }
        return ret;
    }
    else {
        return '<internal position>';
    }
}