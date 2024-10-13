'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Upload, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'

export function Page() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const searchParams = useSearchParams()

  // This would typically come from your backend
  const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
    { question: "What is the chemical symbol for gold?", answer: "Au" },
    { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
  ]

  useEffect(() => {
    if (searchParams.get('retake') === 'true') {
      setCurrentQuestionIndex(0)
      setIsFlipped(false)
      setIsCompleted(false)
    }
  }, [searchParams])

  const currentQuestion = questions[currentQuestionIndex]

  const handleFlip = () => {
    setIsFlipped(true)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleNextQuestion = (difficulty: string) => {
    // Here you would typically send the difficulty rating to your backend
    console.log(`Question rated as: ${difficulty}`)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setIsFlipped(false)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRetake = () => {
    setCurrentQuestionIndex(0)
    setIsFlipped(false)
    setIsCompleted(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-2xl font-bold">JIT Learning</span>
        </Link>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        {!isCompleted ? (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            </div>

            <div className="relative w-full aspect-video">
              <Card className="w-full h-full flex items-center justify-center p-6">
                <p className="text-2xl font-semibold text-center break-words max-w-full">
                  {isFlipped ? currentQuestion.answer : currentQuestion.question}
                </p>
              </Card>
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button onClick={handlePreviousQuestion} variant="outline" disabled={currentQuestionIndex === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <div className="space-x-2">
                {!isFlipped ? (
                  <>
                    <Button onClick={() => handleFlip()} variant="outline">Easy</Button>
                    <Button onClick={() => handleFlip()} variant="outline">Moderate</Button>
                    <Button onClick={() => handleFlip()} variant="outline">Hard</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleNextQuestion('correct')} variant="outline">I was right</Button>
                    <Button onClick={() => handleNextQuestion('incorrect')} variant="outline">I was wrong</Button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-6">Congratulations!</h1>
            <p className="text-xl mb-8">You've completed all the questions.</p>
            <div className="flex space-x-4">
              <Link href="/upload-document">
                <Button size="lg">
                  <Upload className="mr-2 h-4 w-4" /> Upload New Document
                </Button>
              </Link>
              <Button onClick={handleRetake} size="lg" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t py-4 px-4 lg:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © 2024 JIT Learning. All rights reserved.
        </p>
      </footer>
    </div>
  )
}