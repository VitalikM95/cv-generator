import express from 'express'
import serverless from 'serverless-http'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import cors from 'cors'
import resumeRouter from '../src/routes/resume'
import { errorHandler } from '../src/middleware/errorHandler'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })

const app = express()

app.use(helmet())
app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '100kb' }))

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
  })
)

app.use('/api/resume', resumeRouter)
app.use(errorHandler)

export const handler = serverless(app)
