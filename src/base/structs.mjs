

class DataSet {
    constructor() {
        this.databases = [];
    }
}

class Database {
    constructor(name) {
        this.name = name;
        this.tables = []
    }
}

class Table {
    constructor(name, schema = 'db', columns = [], data = []) {
        this.name = name
        this.schema = schema
        this.columns = columns
        this.data = data
    }
}
