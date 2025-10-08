import { z } from 'zod'

export const resumeSchema = z.object({
  title: z.string().min(1, 'title required'),
  name: z.string().min(1, 'name required'),
  city: z.string().min(1, 'city required'),
  skills: z.string().min(1, 'skills required'),
  experience: z.string().min(1, 'experience required'),
  education: z.string().optional(),
  summary: z.string().optional(),
})

export type ResumeInput = z.infer<typeof resumeSchema>
