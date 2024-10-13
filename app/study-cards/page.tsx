'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Brain, Upload } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export default function StudyCardsPage() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [knowledgeLevel, setKnowledgeLevel] = useState<number>(0)
  const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [shouldSubmit, setShouldSubmit] = useState(false) // To control submission
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('result')

  const fetchNextFlashcard = async () => {
    try {
      const response = await fetch(`https://backend.jitlearning.pro/api/v1/get-next-flashcard/${sessionId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch flashcard')
      }
      const data: Flashcard = await response.json()
      setCurrentFlashcard(data)
      setIsFlipped(false)
      setError(null)
    } catch (error) {
      console.error('Error fetching flashcard:', error)
      setError('Unable to load flashcard. Please try again later.')
    }
  }

  const submitFlashcardStudy = async () => {
    if (!currentFlashcard) {
      console.error('No flashcard selected');
      return;
    }

    try {
      console.log('Submitting with knowledge level:', knowledgeLevel);
      const response = await fetch(`https://backend.jitlearning.pro/api/v1/study-flashcard/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "flashcard_id": currentFlashcard.id,
          "knowledge_level": knowledgeLevel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit flashcard study: ${response.statusText}`);
      }

      await response.json();
      fetchNextFlashcard();
      
    } catch (error) {
        console.error('Error submitting flashcard study:', error);
        setError('Unable to submit answer. Please try again later.');
      }
  }

  // When `shouldSubmit` becomes true, submit the flashcard study
  useEffect(() => {
    if (shouldSubmit) {
      submitFlashcardStudy();
      setShouldSubmit(false); // Reset
    }
  }, [shouldSubmit]); // Trigger when shouldSubmit is true

  useEffect(() => {
    if (sessionId) {
      fetchNextFlashcard()
    }
  }, [sessionId])

  const handleFlip = (level: number) => {
    setKnowledgeLevel(level)
    setIsFlipped(true)
  }

  const handleAnswer = (gotIt: boolean) => {
    if (!gotIt) {
      setKnowledgeLevel(4);  // "Missed It" sets knowledgeLevel to 4
    }
    setShouldSubmit(true);  // Trigger the submission after setting the knowledge level
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold">JIT Learning</span>
        </Link>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="relative w-full aspect-video mb-6">
              <Card className="w-full h-full flex items-center justify-center p-6 cursor-pointer" onClick={() => !isFlipped && handleFlip(1)}>
                <p className="text-2xl font-semibold text-center break-words max-w-full">
                  {isFlipped ? currentFlashcard?.answer : currentFlashcard?.question}
                </p>
              </Card>
            </div>

            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <Button onClick={() => router.back()} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Link href="/upload-document">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> New Deck
                  </Button>
                </Link>
              </div>
              <div className="space-x-2">
                {!isFlipped ? (
                  <>
                    <Button onClick={() => handleFlip(1)} variant="outline">Easy</Button>
                    <Button onClick={() => handleFlip(2)} variant="outline">Moderate</Button>
                    <Button onClick={() => handleFlip(3)} variant="outline">Hard</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleAnswer(true)} variant="outline">Got It</Button>
                    <Button onClick={() => handleAnswer(false)} variant="outline">Missed It</Button>
                  </>
                )}
              </div>
            </div>
          </>
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