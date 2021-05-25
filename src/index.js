import express from 'express'
import apiEntity from './routes/entity'
import apiAccount from './routes/account'
import { config } from './config.js'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use('/api/entity/', apiEntity)
app.use('/api/account/', apiAccount)

app.use((req, res, next) => {
  res.status(404).send('<h1 style="color:red;">La url a que deseas acceder no existe</h1>')
})

const PORT = config.port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})