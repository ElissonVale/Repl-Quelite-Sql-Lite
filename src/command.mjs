import * as _parser from './defs/parser/parser.mjs'
import * as _quelite from './queuelite.mjs'

// Command map deve conter o mapeamento entre o comando do lexer e o método Queuelite onde os parâmetros são diretamente os rules
const _commands_map = [    
    { "insert": "insert_table" },
    { "select": "select_table" },
    { "update": "update_table" },
    { "delete": "delete_table" },
    { "use": "use_database" },
    { "show": { "databases": "show_databases", "tables": "show_tables" } },
    { "create": { "database": "create_database", "table": "create_table" } },
    { "drop": { "database": "drop_database", "table": "drop_table" } },
];

/// Retorna o nome do método no queuelite para ser executado com base no resultado do lexer e do parser
const command_map = (command) => {
    // Pega o nome do método mapeado para o queuelite
    let method = _commands_map.filter(x => x[command.command])[0][command.command];
    // Caso no mapeamento exista uma ambiguidade para um metodo mais simples faz novamente a busca com os rules
    if(typeof(method) != "string")
        method = method[command.rules[0]];
    // Caso o comando não exista no queuelite para ser executado cria a exceção (o analisador lexico deve ser verificado, esse tipo de erro pode ser sintaxe)
    if(!!!_quelite[method]) 
        throw `Erro: o comando ${command.command} não existe ou sua sintaxe está incorreta!`;    
    // Retorna o nome do método
    return method;
}

export const execute = (query) => {
    // Esse é o único tratador de exceção que este app deve conter, todas as exceptions terminam aqui e deven ser criadas apenas com > throw "detalhamento";
    try {
        _parser.parse_command(query).forEach((command) => {
            console.log(command)
            if(!!command)
                _quelite[command_map(command)](command.rules)
        });
    }
    catch(exception) {
        console.log(exception);
    }

    // _quelite.use_database("root")

    // _quelite.create_database("quelite")

    // _quelite.drop_database("quelite")

    // _quelite.create_table("pedidos", { 
    //     "database": "root", 
    //     "columns": [ "id", "name", "quantidade", "valor" ]
    // })

    // _quelite.drop_table("pedidos", { "database":  "root" })

    // _quelite.insert_table("users", {
    //     "database": "root",
    //     "columns": ["name","idade","peso","altura"],
    //     "values": ["Alam Bidanos hovo", 45, 80.88, 1.54 ]
    // })
 
    // _quelite.insert_table("users", {
    //     "database": "root",
    //     "columns": ["name","idade","altura"],
    //     "values": ["Alam Bidanos hovo", 45, 1.54 ]
    // })
}