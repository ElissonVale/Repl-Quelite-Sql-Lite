#! /bin/node

import * as _fs from 'fs'
import * as _path from 'path'


var _base_path = './src'

export const read = (path) => {
    return _fs.readFileSync(`${_base_path}/${path}`, 'utf-8')
}

export const write = (path, dataset) => {
    _fs.writeFileSync(`${_base_path}/${path}`, dataset)
}




