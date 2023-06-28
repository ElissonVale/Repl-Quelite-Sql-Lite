#! /bin/node

import * as _quelite from './src/queuelite.mjs'
import * as _repl from './repl.mjs'
import * as _parser from './src/defs/parser/parser.mjs'


_repl.init((query) => {

    _parser.lexer()
    // _quelite.show_databases()

    // _quelite.create_database("quelite")

    // _quelite.drop_database("quelite")

    // _quelite.show_tables("quelite")

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
}); 


