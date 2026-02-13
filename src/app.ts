import express from 'express'
import helloRouter from './hello/router'
import userRouter from './modules/user/router'
import { InitModules } from './IOC/ContainerModules'
import profileRouter from './modules/profile/router'
import { globalErrorHandler } from './middlewares/GlobalErrorHandler'

const app = express()
const PORT = process.env.PORT || 3000

InitModules();

app.use(express.json())
app.use("/user", userRouter)
app.use("/profile", profileRouter)
app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
})