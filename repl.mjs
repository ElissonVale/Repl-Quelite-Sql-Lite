#!/usr/bin/env node
import promptSync from 'prompt-sync'

export const prompt = promptSync({sigint: true})

export const init = (method) => {
    
    console.log("Bem vindo ao Quelite, execute .exit pra sair.")
    
    while(true) {
        const query = prompt('quelite query > ')
        if(query.toLowerCase() === ".exit")
            break
        method(query.toLowerCase());
    }
}

