import express from 'express'
import { routes } from './routes'

const app = express()

// FORMA DE REQUISIÇÃO OU REPOSTA DO SERVER
app.use(express.json())

//ARQUIVO DE ROTAS
app.use(routes)

// PORTA DO SERVER
app.listen(3333, () => {
    console.log('HTPP server running on port!');
})