#! /bin/node

import * as _repl from './repl.mjs'
import * as _command from './src/command.mjs'


_repl.init((query) => {

    _command.execute(query);
    
}); 


