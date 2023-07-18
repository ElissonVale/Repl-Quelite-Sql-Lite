#! /bin/node

import * as _repl from './repl.mjs'
import * as _command from './src/command.mjs'

/// Inicia um console repl que captura a query string e passa para o Queuelite fazer o lexer e parser e executar 
_repl.init(_command.execute); 


