'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Upload } from "lucide-react"
import Link from "next/link"

export default function UploadDocumentPage() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please select a PDF file.')
      event.target.value = ''
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (file) {
      // Here you would typically send the file to your server
      console.log('Uploading file:', file.name)
      // For now, we'll just show an alert
      alert(`File "${file.name}" uploaded successfully! Generating quiz...`)
    } else {
      alert('Please select a file before submitting.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
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
              <Label htmlFor="document-upload">Select PDF File</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="document-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            {file && (
              <p className="text-sm text-green-600">
                Selected file: {file.name}
              </p>
            )}
            <Button className="w-full" type="submit">
              Upload and Generate Quiz
            </Button>
          </form>
          <div className="text-center text-sm">
            <p className="text-gray-500">
              Our AI will analyze your document and create a personalized quiz to test your understanding.
            </p>
          </div>
        </div>
      </main>
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