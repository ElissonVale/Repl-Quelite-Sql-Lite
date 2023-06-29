#! /bin/node

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


}