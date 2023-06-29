#! /bin/node
import * as _queue_manager from './../../queuelite.mjs'
import * as _fsmanager from './../../filesystem/manager.mjs'

const _path_lexer_def = "./defs/lexer/lexer.def"
const _path_lexer_tree = "./defs/lexer/lexer_tree.json"

var lexer_tree = JSON.parse(_fsmanager.read(_path_lexer_tree));

const caracter_repeat = (string, search) => {

}

export const reload_lexer = () => {
    lexer_tree = command_rules();
    _fsmanager.write(_path_lexer_tree, JSON.stringify(lexer_tree))
    console.log("Arvore do lexer recarregada:")
    console.log(lexer_tree)
}

const command_rules = () => {
    let coments = [], acumulate = '';

    let lexer_string = _fsmanager.read(_path_lexer_def).replaceAll(" ", "").replace(/(\r\n|\n|\r)/gm, "").trim()

    // Acumula os indices de comentários comentários
    lexer_string.split('').map((item) => { 
        if(item === "#" || acumulate.length > 0) 
            acumulate += item;
        if(acumulate.split("#").length >= 3) {
            coments.push(acumulate);
            acumulate = '';
        }
    })

    // Remove os comentários
    coments.map((item) => {
        lexer_string = lexer_string.replace(item, "");
    });
    
    let lexer_split = lexer_string.split(";")

    // Cria a arvore do lexer
    let lexer_array = lexer_split.map((item) => {
        let command = item.substring(0, item.indexOf(':'))
        let rules = item.substring(item.indexOf(':') + 1).split("|")    
        return { "command": command  , "rules": rules };
    })

    // return lexer_array.map((item) => {
    //     if(lexer_array['commands'].includes(item.roles)) {

    //     }
    // });

    return lexer_array;
}

const convert_command = (query) => {

}

export const parse_command = (query) => {

    if(query.includes('lexer()')) {
        reload_lexer();
    }
        
    return convert_command(query);
}

