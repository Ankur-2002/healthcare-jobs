'use client'

import { useState, useEffect, useRef } from 'react'

interface PostJobModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormState {
  jobTitle: string
  company: string
  location: string
  profession: string
  category: string
  description: string
  applyLink: string
  contactEmail: string
  postedDate: string
}

const PROFESSION_OPTIONS = [
  'Nurse',
  'Doctor',
  'Pharmacist',
  'Lab Technician',
  'Medical Coder',
  'Physiotherapist',
  'Radiologist',
  'Surgeon',
  'Dentist',
  'Dietitian',
  'Other',
]

const CATEGORY_OPTIONS = [
  'Full Time',
  'Part Time',
  'Contract',
  'Internship',
  'Locum / Temporary',
]

const CITY_OPTIONS = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Noida',
  'Gurgaon',
  'Other',
]

const INITIAL_FORM: FormState = {
  jobTitle: '',
  company: '',
  location: '',
  profession: '',
  category: '',
  description: '',
  applyLink: '',
  contactEmail: '',
  postedDate: new Date().toISOString().slice(0, 10),
}

export default function PostJobModal({ isOpen, onClose }: PostJobModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const modalRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return
    firstInputRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!form.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
    if (!form.company.trim()) newErrors.company = 'Company name is required'
    if (!form.location) newErrors.location = 'Location is required'
    if (!form.profession) newErrors.profession = 'Profession is required'
    if (!form.category) newErrors.category = 'Category is required'
    if (!form.description.trim() || form.description.length < 50)
      newErrors.description = 'Please provide at least 50 characters of description'
    if (!form.applyLink.trim() || !/^https?:\/\//.test(form.applyLink))
      newErrors.applyLink = 'Please enter a valid URL starting with http:// or https://'
    if (!form.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail))
      newErrors.contactEmail = 'Please enter a valid email address'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulate submission (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const handleClose = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setSubmitted(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-job-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cyan-950/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl shadow-cyan-900/20 border border-cyan-100"
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-cyan-100 rounded-t-2xl">
          <h2 id="post-job-modal-title" className="text-xl font-heading font-700 text-cyan-900">
            Post a Healthcare Job
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-cyan-500 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-emerald-600" aria-hidden="true">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-700 text-cyan-900 mb-2">Job Submitted!</h3>
            <p className="text-sm text-cyan-600 font-body max-w-xs mb-6">
              Thank you! Your job posting for <strong>{form.jobTitle}</strong> has been received. We'll review and publish it shortly.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-heading font-600 hover:bg-emerald-700 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
            {/* Row: Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-heading font-600 text-cyan-800 mb-1.5">
                Job Title <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                ref={firstInputRef}
                id="jobTitle"
                name="jobTitle"
                type="text"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Senior Staff Nurse – ICU"
                aria-required="true"
                aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm font-body text-cyan-900 placeholder-cyan-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-150 ${
                  errors.jobTitle ? 'border-red-400 bg-red-50' : 'border-cyan-200 hover:border-cyan-300'
                }`}
              />
              {errors.jobTitle && (
                <p id="jobTitle-error" role="alert" className="mt-1 text-xs text-red-600 font-body">
                  {errors.jobTitle}
                </p>
              )}
            </div>

            {/* Row: Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-heading font-600 text-cyan-800 mb-1.5">
                Company / Hospital Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Apollo Hospitals"
                aria-required="true"
                aria-describedby={errors.company ? 'company-error' : undefined}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm font-body text-cyan-900 placeholder-cyan-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-150 ${
                  errors.company ? 'border-red-400 bg-red-50' : 'border-cyan-200 hover:border-cyan-300'
                }`}
              />
              {errors.company && (
                <p id="company-error" role="alert" className="mt-1 text-xs text-red-600 font-body">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Row: Profession + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profession" className="block text-sm font-heading font-600 text-cyan-800 mb-1.5">
                  Profession <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="profession"
                  name="profession"
                  value={form.profession}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.profession ? 'profession-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm font-body text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-150 cursor-pointer ${
                    errors.profession ? 'border-red-400 bg-red-50' : 'border-cyan-200 hover:border-cyan-300'
                  }`}
                >
                  <option value="">Select profession</option>
                  {PROFESSION_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.profession && (
                  <p id="profession-error" role="alert" className="mt-1 text-xs text-red-600 font-body">
                    {errors.profession}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-heading font-600 text-cyan-800 mb-1.5">
                  Job Type <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.category ? 'category-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm font-body text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-150 cursor-pointer ${
                    errors.category ? 'border-red-400 bg-red-50' : 'border-cyan-200 hover:border-cyan-300'
                  }`}
                >
                  <option value="">Select type</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && (
                  <p id="category-error" role="alert" className="mt-1 text-xs text-red-600 font-body">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            {/* Row: Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-heading font-600 text-cyan-800 mb-1.5">
                City / Location <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.location ? 'location-error' : undefined}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm font-body text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-150 cursor-pointer ${
                  errors.location ? 'border-red-400 bg-red-50' : 'border-cyan-200 hover:border-cyan-300'
                }`}
              >
                <option value="">Select city</option>
                {CITY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.location && (
                <p id="location-error" role="alert" className="mt-1 text-xs text-red-600 font-body">
                  {errors.location}
                </p>
              )}
            </div>

            {/* Row: Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-heading font-600 text-cyan-800 mb-1.5">
                Job Description <span className="text-red-500" aria-hidden="true">*</span>
                <span className="ml-2 text-xs text-cyan-400 font-normal">(min. 50 characters)</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, qualifications required, experience needed…"
                aria-required="true"
                aria-describedby={errors.description ? 'description-error' : undefined}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm font-body text-cyan-900 placeholder-cyan-300 bg-white resize-y focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-150 ${
                  errors.description ? 'border-red-400 bg-red-50' : 'border-cyan-200 hover:border-cyan-300'
                }`}
              />
              <div className="flex items-center justify-between mt-1">
                {errors.description ? (
                  <p id="description-error" role="alert" className="text-xs text-red-600 font-body">
                    {errors.description}
                  </p>
                ) : (
                  <span />
                )}
                <span className={`text-xs font-body ${form.description.length < 50 ? 'text-cyan-400' : 'text-emerald-600'}`}>
                  {form.description.length} chars
                </span>
              </div>
            </div>

            {/* Row: Apply Link */}
            <div>
              <label htmlFor="applyLink" className="block text-sm font-heading font-600 text-cyan-800 mb-1.5">
                Apply Link / URL <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="applyLink"
                name="applyLink"
                type="url"
                value={form.applyLink}
                onChange={handleChange}
                placeholder="https://careers.yourhospital.com/job/123"
                aria-required="true"
                aria-describedby={errors.applyLink ? 'applyLink-error' : undefined}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm font-body text-cyan-900 placeholder-cyan-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-150 ${
                  errors.applyLink ? 'border-red-400 bg-red-50' : 'border-cyan-200 hover:border-cyan-300'
                }`}
              />
              {errors.applyLink && (
                <p id="applyLink-error" role="alert" className="mt-1 text-xs text-red-600 font-body">
                  {errors.applyLink}
                </p>
              )}
            </div>

            {/* Row: Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-heading font-600 text-cyan-800 mb-1.5">
                Contact Email <span className="text-red-500" aria-hidden="true">*</span>
                <span className="ml-2 text-xs text-cyan-400 font-normal">(not shown publicly)</span>
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="hr@yourhospital.com"
                aria-required="true"
                aria-describedby={errors.contactEmail ? 'contactEmail-error' : undefined}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm font-body text-cyan-900 placeholder-cyan-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-150 ${
                  errors.contactEmail ? 'border-red-400 bg-red-50' : 'border-cyan-200 hover:border-cyan-300'
                }`}
              />
              {errors.contactEmail && (
                <p id="contactEmail-error" role="alert" className="mt-1 text-xs text-red-600 font-body">
                  {errors.contactEmail}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-lg border border-cyan-200 text-sm font-heading font-600 text-cyan-700 hover:bg-cyan-50 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Cancel
              </button>
              <button
                id="post-job-submit-btn"
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-heading font-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  'Submit Job Posting'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
