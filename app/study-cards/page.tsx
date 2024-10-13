'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CardData {
  question: string
  answer: string
}

export default function StudyCardsPage() {
  const searchParams = useSearchParams()
  const deckID = searchParams.get('deckID') // Get deckID from query parameters
  const router = useRouter()

  const [cardData, setCardData] = useState<CardData | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knowledge, setKnowledge] = useState<number>(0)

  // Fetch card data from backend
  useEffect(() => {
    let isMounted = true // To prevent state updates after unmounting

    if (deckID) {
      // Replace with your actual API endpoint
      fetch(`https://backend.jitlearning.pro/api/v1/get-next-flashcard/${deckID}`)
        .then((response) => response.json())
        .then((data: CardData) => {
          if (isMounted) {
            setCardData(data)
          }
        })
        .catch((error) => {
          console.error('Error fetching card data:', error)
          // Redirect to response-loading page
          router.push('/response-loading')
        })
    } else {
      // If deckID is not available, redirect to response-loading
      router.push('/response-loading')
    }

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [deckID, router])

  const handleKnowledgeLevel = (level: number) => {
    setKnowledge(level)
    setIsFlipped(true)
  }

  const handlePostFlip = (wasRight: boolean) => {
    if (!wasRight) {
      setKnowledge(3) // Set knowledge to 3 if user was wrong
    }
    // Send knowledge level to backend
    fetch(`https://backend.jitlearning.pro/api/v1/study-flashcard/${deckID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deckID,
        knowledge,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Knowledge level updated:', data)
        // Optionally, fetch the next card or handle as needed
      })
      .catch((error) => {
        console.error('Error updating knowledge level:', error)
      })
  }

  if (!cardData) {
    // Don't render anything if cardData is not available
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Card Display */}
        <div
          className={`relative bg-white rounded-lg shadow-md p-6 mb-4 ${
            isFlipped ? 'flipped' : ''
          }`}
        >
          {!isFlipped ? (
            <div className="text-center">
              <p className="text-xl font-bold">{cardData.question}</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl font-bold">{cardData.answer}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        {!isFlipped ? (
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => handleKnowledgeLevel(0)}>
              Easy
            </Button>
            <Button variant="outline" onClick={() => handleKnowledgeLevel(1)}>
              Moderate
            </Button>
            <Button variant="outline" onClick={() => handleKnowledgeLevel(2)}>
              Hard
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            {/* New Deck Button */}
            <Link href="/upload-document">
              <Button variant="outline">New Deck</Button>
            </Link>
            {/* I Was Right / I Was Wrong Buttons */}
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => handlePostFlip(true)}>
                I Was Right
              </Button>
              <Button variant="outline" onClick={() => handlePostFlip(false)}>
                I Was Wrong
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}