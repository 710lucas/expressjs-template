import express from 'express'
import helloRouter from './hello/router'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/hello", helloRouter)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
})