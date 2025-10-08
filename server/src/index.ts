import express from 'express'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import resumeRouter from './routes/resume'
import { errorHandler } from './middleware/errorHandler'

// Load env explicitly from server/.env to avoid cwd issues
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const app = express()
app.use(helmet())
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json({ limit: '100kb' }))

// rate-limit до 60 запитів на 1 хв
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
  })
)

app.use('/api/resume', resumeRouter)

app.use(errorHandler)

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
