import { endl } from "../util/io";

export interface Position{
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
}
export interface JNode extends Position{
    val: string;
    ext: any;
}
export function newNode(val: string): JNode{
    return {
        val: val,
        ext: null,
        startLine: -1,
        startColumn: 0,
        endLine: 0,
        endColumn: 0
    };
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
    if(pos.startLine !== -1){
        let ret = `(line ${pos.startLine + 1}, column ${pos.startColumn + 1}):` + endl;
        let line = pos.startLine, col = pos.startColumn;
        ret += lines[line] + endl;
        ret += repeat(' ', col);
        while(line <= pos.endLine && col <= pos.endColumn){
            ret += marker;
            if(col++ >= lines[line].length){
                col = 0;
                line++;
                ret += endl + lines[line] + endl;
            }
        }
        return ret;
    }
    else {
        return '(internal position)';
    }
}