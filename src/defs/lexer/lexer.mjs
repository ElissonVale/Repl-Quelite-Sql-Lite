#! /bin/node

import * as _fsmanager from './../../filesystem/manager.mjs'

const _path_lexer_def = "./defs/lexer/lexer.def"
const _path_lexer_tree = "./defs/lexer/lexer_tree.json"

export var lexer_tree = JSON.parse(_fsmanager.read(_path_lexer_tree));

/// Gera a árvore de comandos do lexer com os rules(regras) definidos
export const command_rules = () => {
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
    });

    // Adiciona o interruptor de comando ou finalizador (';') ao lexer
    lexer_array.push({ command: "finally_command", rules: [ ';' ]});

    // return lexer_array.map((item) => {
    //     if(lexer_array['commands'].includes(item.roles)) {

    //     }
    // });

    return lexer_array;
}

/// Verifica se os rules baseados no comando da query posuem definições profundas do tipo _text_ por exemplo
export const verify_rules = (rules) => {
    let response = false;

    rules.forEach(element => {
        if(lexer_tree.filter(x => x.command === element))
            response = true;
    });

    return response; 
}

/// Converte os rules em dos tipos _list_text_ em um formato de regra
export const convert_rules_fy = (rules) => {
   
}

/// Converte os rules de uma query com base no comando
export const convert_rules_query = (query, rules) => {
    let query_rules = [];

    query.split(" ").forEach((token) => {
        let rule_token = rules.filter(x => x === token);
        if(rule_token.length > 0) {
            query_rules.push(rule_token[0]);
        }
    });

    return query_rules;
}

export const reload_lexer = () => {
    lexer_tree = command_rules();
    _fsmanager.write(_path_lexer_tree, JSON.stringify(lexer_tree))
    console.log("Arvore do lexer recarregada:")
    console.log(lexer_tree)
}

export const analiser = (query_commands) => {

};