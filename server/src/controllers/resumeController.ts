import type { Request, Response } from 'express'
import { improveWithLLM, fallbackGenerate } from '../services/llmService'
import { buildDocxFromText } from '../services/docxService'
import { slugify } from '../utils/slugify'
import type { ResumeInput } from '../schemas/resumeSchema'

export async function createResume(req: Request, res: Response) {
  const data = req.body as ResumeInput

  let finalText: string
  try {
    finalText = await improveWithLLM(data)
  } catch (err: any) {
    console.error('LLM error:', err)
    finalText = fallbackGenerate(data)
  }

  const buffer = await buildDocxFromText(finalText, data)

  const fileName = `${slugify(data.name || 'resume')}-resume.docx`
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
  res.send(buffer)
}
