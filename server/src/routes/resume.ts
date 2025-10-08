import { Router } from 'express'
import { createResume } from '../controllers/resumeController'
import { validateBody } from '../middleware/validate'
import { resumeSchema } from '../schemas/resumeSchema'

const router = Router()

router.post('/', validateBody(resumeSchema), createResume)

export default router
