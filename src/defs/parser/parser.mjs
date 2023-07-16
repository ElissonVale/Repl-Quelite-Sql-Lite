#! /bin/node
import * as _queue_manager from './../../queuelite.mjs'
import * as _lexer from './../lexer/lexer.mjs'

const convert_command = (query) => {
    if(query == '')
        return [];

    let commands_query = query.split(_lexer.lexer_tree.filter(x => x.command === 'finally_command')[0].rules[0]);

    let commands_query_rules = commands_query.map((item) => {
        if(item.length > 0) {
            // Pega o comando principal
            let command = item.substr(0, item.indexOf(" "));
            // Remove o comand principal da query
            item = item.replace(`${command}`, '').trim();
            // Pega os rules para aceitados para o comando
            let rules = _lexer.lexer_tree.filter(x => x.command === command)[0].rules;
            // verifica se os 'rules' tem outras definições mais profundas como '_texto_' ou são palavras esperadas como 'tables'
            if(_lexer.verify_rules(rules)) {
                // caso o comando tenha uma definição mais profunda
            }

            // Converte as arvores de rules em rules esperados para o comando em questão

            // Verifica se a query contém os rules esperados

            // Converte os a string da query nos rules do comando
            let rules_query = _lexer.convert_rules_query(item, rules);

            // Retorna o comando esperado para a query
            return { "command": command, "rules": rules_query };
        }
    });

    return commands_query_rules;
}

export const parse_command = (query) => {

    if(query.includes('lexer()')) {
        query = query.replaceAll('lexer();','').replaceAll('lexer()', '');
        _lexer.reload_lexer();
    }
        
    return convert_command(query);
}

