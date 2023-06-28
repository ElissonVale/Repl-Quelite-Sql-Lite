#! /bin/node
import * as _queue_manager from './../../queuelite.mjs'
import * as _fsmanager from './../../filesystem/manager.mjs'


var _path_lexer = "./defs/lexer/lexer.def"

const command_rules = () => {
    let lexer_string = _fsmanager.read(_path_lexer).replace(" ", "").replace(/(\r\n|\n|\r)/gm, "")
    
    let lexer_split = lexer_string.substring(lexer_string.lastIndexOf("#") + 1, lexer_string.lastIndexOf(";")).split(";")

    return lexer_split.map((item) => {
        let command = item.substring(0, item.indexOf(':'))
        let rules = item.substring(item.indexOf(':') + 1).split("|")    
        return { "command": command  , "rules": rules };
    })
}


export const lexer = () => {
    command_rules()
}

