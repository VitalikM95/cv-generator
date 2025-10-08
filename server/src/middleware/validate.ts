import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const validateBody =
  (schema: z.ZodType<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res
        .status(400)
        .json({ error: 'validation_error', details: result.error.issues })
    }
    req.body = result.data
    next()
  }
