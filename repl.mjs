#!/usr/bin/env node
import promptSync from 'prompt-sync'

export const prompt = promptSync({sigint: true})

export const init = (method) => {
    
    console.log("\n ################ Bem vindo ao Quelite, execute '.exit' ou 'Ctrl + C' pra sair ################\n")
    
    while(true) {
        const query = prompt('Quelite >')
        if(query.toLowerCase() === ".exit")
            break
        method(query.toLowerCase());
    }
}

