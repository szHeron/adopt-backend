const express = require('express')
const cors = require('cors')
const routesApp = require('./routes')

const app = express()
const port = 3001

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(routesApp)

app.listen({port: 3001, host: "192.168.100.34"}, () => {
  console.log(`Servidor ativo na porta ${port}`)
})