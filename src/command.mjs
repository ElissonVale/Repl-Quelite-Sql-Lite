import * as _parser from './defs/parser/parser.mjs'
import * as _quelite from './queuelite.mjs'

const commands_map = [
    { "select": "" },
    { "update": "" },
    { "delete": "" },
    { "create": "" },
];

export const execute = (query) => {
    
    let command = _parser.parse_command(query);

    // _quelite.use_database("root")

    // _quelite.show_databases()

    // _quelite.show_tables()

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