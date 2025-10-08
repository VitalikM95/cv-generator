import OpenAI from 'openai'
import type { ResumeInput } from '../schemas/resumeSchema'

// Спроба генерації тексту через AI.
export async function improveWithLLM(data: ResumeInput): Promise<string> {
  const provider = process.env.LLM_PROVIDER ?? 'openai'
  const model = process.env.LLM_MODEL ?? 'gpt-4o-mini'
  const apiKey = process.env.OPENAI_API_KEY

  if (provider !== 'openai' || !apiKey) {
    throw new Error('LLM not configured')
  }

  const openaiClient = new OpenAI({ apiKey })

  const system =
    'You are a professional resume writer. Produce a concise resume text in Ukrainian. Use 3-4 short paragraphs: title line is provided separately by the app, so do NOT repeat it; focus on summary, key experience, and skills. Return only plain text.'

  const user = `Input JSON:\n${JSON.stringify(
    data,
    null,
    2
  )}\n\nReturn only the resume text (no JSON, no labels).`

  let completion: any
  try {
    completion = await (openaiClient as any).chat.completions.create({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.7,
    })
  } catch {
    throw new Error('LLM request failed')
  }

  const content = completion?.choices?.[0]?.message?.content?.trim()
  if (!content) {
    throw new Error('LLM returned no usable text')
  }
  return content
}

//Фолбек: генерація простого шаблонного тексту без AI.
export function fallbackGenerate(data: ResumeInput): string {
  const titleLine = data.title.trim()

  const name = data.name?.trim() || ''
  const city = data.city?.trim() || ''
  const experience = data.experience?.trim() || ''
  const skills = data.skills?.trim() || ''
  const education = data.education?.trim() || ''
  const summary = data.summary?.trim() || ''

  const p1 = titleLine

  const p2 = `${name} проживає у місті ${city}${
    experience
      ? ` та має досвід роботи у сфері ${experience}. За час професійної діяльності продемонстрував(ла) високий рівень компетентності, відповідальність і вміння досягати результатів.`
      : '.'
  }`

  const p3Base = skills
    ? `Основні навички включають ${skills}, що дозволяє ефективно виконувати поставлені завдання та постійно вдосконалювати професійні вміння.`
    : ''

  const educationPart = education
    ? `Має освіту у сфері ${education}, що забезпечує ґрунтовні знання та допомагає застосовувати сучасні підходи у роботі.`
    : ''

  const summaryPart = summary
    ? `${summary}. Це допомагає мені залишатися мотивованим(ою) і розвиватися у вибраній сфері діяльності.`
    : ''

  const p4 = [educationPart, summaryPart].filter(Boolean).join(' ')

  return [p1, p2, p3Base, p4].filter(Boolean).join('\n\n')
}
