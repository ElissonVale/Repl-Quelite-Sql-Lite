
import * as _fsmanager from './../filesystem/manager.mjs'

const path_database = 'base/base.json'

export const get_dataset = () => {
    return JSON.parse(_fsmanager.read(path_database))
} 

export const get_database = (database_name) => {
    let dataset = get_dataset()

    let database = dataset["databases"].filter(filter => filter.name === database_name)

    if (database.length <= 0)
        throw 'Nenhum banco de dados selecionado!'

    return database;
}

export const save_database = (database) => {
    let dataset = get_dataset()

    let database_set = dataset["databases"].filter(filter => filter.name === database.name)

    let index = dataset["databases"].indexOf(database_set[0])

    dataset["databases"][index] = database

    _fsmanager.write(path_database, JSON.stringify(dataset))
}

export const create_database = (database) => {

    let dataset = get_dataset()

    let databases = dataset["databases"].filter(result => result["name"] === database)

    if(databases.length > 0) 
        return { success: false, message: `database [${database}] already exists!` }

    dataset["databases"].push({
        "name": database,
        "tables": []
    })

    _fsmanager.write(path_database, JSON.stringify(dataset))

    return { success: true, message: `database [${database}] created!` } 
}

export const drop_database = (database) => {

    let dataset = get_dataset()

    let drop = dataset["databases"].filter(result => result["name"] === database)

    let index = dataset["databases"].indexOf(drop[0])

    dataset["databases"].splice(index, 1)

    _fsmanager.write(path_database, JSON.stringify(dataset))
}


