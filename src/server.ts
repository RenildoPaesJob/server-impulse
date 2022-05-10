import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

//QUAIS REQUEST DO FRONT-END PODEM ACESSAR/CONSUMIR OS BACK-END DA APP
app.use(cors(
    //EXAMPLE CODE
    // origin:'http://localhost:3333'
))

// FORMA DE REQUISIÇÃO OU REPOSTA DO SERVER
app.use(express.json())

//ARQUIVO DE ROTAS
app.use(routes)

// PORTA DO SERVER
app.listen(3333, () => {
    console.log('HTPP server running on port!');
})