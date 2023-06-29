#! /bin/node
import * as _queue_manager from './../../queuelite.mjs'
import * as _fsmanager from './../../filesystem/manager.mjs'

const _path_lexer = "./defs/lexer/lexer.def"

const lexer = (query, lexer_tree) => {
    let query_commands = query.trim().split(";");

    let command_split = query_commands.map((item) => {

    })

    // query.trim().replaceAll(', ', ',').replace(";", "").split(" ")

    return command_split.map((item) => {
        return { "command": "", "roles": "roles" };
    })
}

const command_rules = () => {
    let lexer_string = _fsmanager.read(_path_lexer).replace(" ", "").replace(/(\r\n|\n|\r)/gm, "")
    
    let lexer_split = lexer_string.substring(lexer_string.lastIndexOf("#") + 1, lexer_string.lastIndexOf(";")).split(";")

    return lexer_split.map((item) => {
        let command = item.substring(0, item.indexOf(':'))
        let rules = item.substring(item.indexOf(':') + 1).split("|")    
        return { "command": command  , "rules": rules };
    })
}

const convert_command = (query_lexer, lexer_tree) => {
    let command_lexer = lexer_tree.filter(x => x.command == query_lexer[0]);
}

export const parse_command = (query) => {
    let query_lexer = lexer(query)
    let lexer_tree = command_rules()

    return convert_command(query_lexer, lexer_tree);
}

