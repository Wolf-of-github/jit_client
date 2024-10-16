'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation' // For programmatic navigation
import LoadingOverlay from '@/components/ui/loadingOverlay' // Import the new LoadingOverlay component

export default function UploadDocumentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [base64File, setBase64File] = useState<string | null>(null)
  const [loading, setLoading] = useState(false) // Add loading state
  const router = useRouter() // Initialize useRouter

  const convertToText = useCallback(async (file: File) => {
    try {
      // Dynamically import pdfToText
      const { default: pdfToText } = await import('react-pdftotext')
      const text = await pdfToText(file)
      // Convert the extracted text to base64
      const b64t = btoa(encodeURIComponent(text))
      setBase64File(b64t)
    } catch (err) {
      console.error('Error converting PDF to text:', err)
      alert('Error processing the PDF. Please try again.')
    }
  }, [])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      convertToText(selectedFile)
    } else {
      alert('Please select a PDF file.')
      event.target.value = ''
    }
  }, [convertToText])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (base64File) {
      try {
        setLoading(true) // Set loading to true before API call
        const response = await fetch('https://backend.jitlearning.pro/api/v1/create-study-session', { // <-- API path here
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "pdf_base64": base64File }), // Send the base64 encoded file
        })

        if (response.ok) {
          const data = await response.json()
          const returnedString = data.session_id
          router.push(`/study-cards?result=${encodeURIComponent(returnedString)}`) // Navigate with query param
        } else {
          alert('Error uploading the file.')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        alert('Error uploading file.')
      } finally {
        setLoading(false) // Set loading to false after API call completes
      }
    } else {
      alert('Please select a file before submitting.')
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">JIT Learning</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Upload Your Document</h1>
            <p className="text-gray-500">Upload your PDF to generate a quiz and test your skills</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  id="document-upload"
                  type="file"
                  accept=".pdf" // Only accept PDF files
                  onChange={handleFileChange}
                  className="flex-1"
                  disabled={loading} // Disable input while loading
                />
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            {file && (
              <p className="text-sm text-green-600">
                Selected file: {file.name}
              </p>
            )}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload and Generate Quiz'}
            </Button>
          </form>
          <div className="text-center text-sm">
            <p className="text-gray-500">
              Our AI will analyze your document and create a personalized quiz to test your understanding.
            </p>
          </div>
        </div>
      </main>

      {/* Use the reusable LoadingOverlay component */}
      {loading && <LoadingOverlay />}

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 JIT Learning. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
