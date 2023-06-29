import * as _db_manager from './base/manager.mjs'

var _database = "root";

export const use_database = (database) => {
    
    _database = database;

    show("message", `changed database '${database}'`)
};

export const show_databases = () => {

    let dataset = _db_manager.get_dataset()

    let tables = dataset["databases"].map((result) => { return { "database": result["name"] } })

    show("table", tables);
}

export const create_database = (database) => {

    let result = _db_manager.create_database(database)

    show("message", result.message)
}

export const drop_database = (database) => {

    _db_manager.drop_database(database)

    show("message", `database [${database}] deleted!`)
}

export const show_tables = () => {

    let databases = _db_manager.get_database(_database)

    let tables = databases[0]['tables'].map(result => { return { table: result['name'], schema: result['schema'] } })

    show("table", tables)
}

export const create_table = (table, data) => {
    
    let databases = _db_manager.get_database(data['database'])

    let tables = databases[0]['tables'].filter(result => result["name"] === table)

    if(tables.length > 0) {
        return show("message", `table [${data["database"]}].[db].[${table}] already exists!`)        
    }

    databases[0]['tables'].push({ 
        "schema": "db",
        "name": table,
        "columns": data['columns'],
        "data": []
    });

    _db_manager.save_database(databases[0]);

    show("message", `table [${data["database"]}].[db].[${table}] created!`)
    show("table", data['columns'].map((result) => { return { coluna: result } }))
}

export const drop_table = (table, data) => {

    let databases = _db_manager.get_database(_database)

    let _table = databases[0]["tables"].filter((result) => result["name"] === table);
    
    let index = databases[0]["tables"].indexOf(_table[0]);

    if(index < 0) {
        show("message", `table [${table}] not exists!`);
        return
    }
        
    databases[0]["tables"].splice(index, 1);

    _db_manager.save_database(databases[0]);

    show("message", `table [${data["database"]}].[db].[${table}] deleted!`)
}

export const insert_table = (table, data) => {

    let databases = _db_manager.get_database(_database)

    let table_set = databases[0]['tables'].filter(result => result["name"] === table)

    let table_index = databases[0]['tables'].indexOf(table_set[0])

    let row = {};

    table_set[0]["columns"].forEach((item) => {
        if(item === 'id') { 
            row[item] = table_set[0].data.length++
        } else {
            row[item] = !!data.values[data.columns.indexOf(item)] ? data.values[data.columns.indexOf(item)] : null
        }
    })

    table_set[0].data.push(row)

    databases[0]['tables'][table_index] = table_set[0]

    _db_manager.save_database(databases[0])

    show("message", "1 rows afected!")
}

export const select_table = (table, data) => {

    let database = _db_manager.get_database(_database)
    
    let _table = database.tables.filter((result) => result["name"] === table);
    
}

export const update_table = (table, data) => {

    let database = _db_manager.get_database(_database)
    
    let _table = database.tables.filter((result) => result["name"] === table);
    
}

export const delete_table = (table, data) => {

    let database = _db_manager.get_database(_database)
    
    let _table = database.tables.filter((result) => result["name"] === table);
    
}

export const show = (type, result) => {
    
    let execute = {
        table: (response) => { console.table(response) },
        message: (response) => { console.log(response) },
        error: (response) => { console.error(response) },
        warning: (response) => { console.warn(response) },
    }

    execute[type](result);
}