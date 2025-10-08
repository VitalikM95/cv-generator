import React, { useState } from 'react'
import axios from 'axios'
import './ResumeForm.css'
import type { ResumeData } from '../types/resume'

const initialData: ResumeData = {
  title: '',
  name: '',
  city: '',
  skills: '',
  experience: '',
  education: '',
  summary: '',
}

export default function ResumeForm() {
  const [formData, setFormData] = useState<ResumeData>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl)
      setFileUrl(null)
    }

    if (
      !formData.title ||
      !formData.name ||
      !formData.city ||
      !formData.skills ||
      !formData.experience
    ) {
      setError('Будь ласка, заповніть усі обов’язкові поля.')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('/api/resume/', formData, {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      setFileUrl(url)
      setSuccess(true)
    } catch (err) {
      setError('Помилка при генерації файлу.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Генератор резюме</h1>

      <form onSubmit={handleSubmit} className="resume-form">
        <input
          type="text"
          name="title"
          placeholder="Заголовок резюме *"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Ім’я та прізвище *"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="Місто *"
          value={formData.city}
          onChange={handleChange}
        />

        <textarea
          name="skills"
          placeholder="Основні навички *"
          value={formData.skills}
          onChange={handleChange}
        />

        <textarea
          name="experience"
          placeholder="Досвід роботи *"
          value={formData.experience}
          onChange={handleChange}
        />

        <textarea
          name="education"
          placeholder="Освіта"
          value={formData.education}
          onChange={handleChange}
        />

        <textarea
          name="summary"
          placeholder="Короткий опис"
          value={formData.summary}
          onChange={handleChange}
        />

        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">Резюме згенеровано успішно!</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Генерація...' : 'Згенерувати резюме'}
        </button>

        <button
          type="button"
          disabled={!success || !fileUrl}
          onClick={() => {
            if (!fileUrl) return
            const link = document.createElement('a')
            link.href = fileUrl
            link.setAttribute('download', 'resume.docx')
            document.body.appendChild(link)
            link.click()
            link.remove()
          }}
        >
          Завантажити резюме
        </button>
      </form>
    </div>
  )
}
