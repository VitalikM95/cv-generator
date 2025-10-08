import { Document, Packer, Paragraph, TextRun } from 'docx'
import type { ResumeInput } from '../schemas/resumeSchema'

export async function buildDocxFromText(
  text: string,
  meta: ResumeInput
): Promise<Buffer> {
  const paragraphs = text.split(/\n\s*\n/).map((p, idx) => {
    return new Paragraph({
      children: [new TextRun({ text: p, bold: idx === 0 })],
    })
  })

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [...paragraphs],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  return buffer
}
