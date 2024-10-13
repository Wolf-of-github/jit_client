'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Zap, Clock, Users, ChevronRight, Github } from "lucide-react"
import Link from "next/link"

export function JitLearningLandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">JIT Learning</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="sm">
              Sign Up
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-foreground">
                  Rapid Upskilling with AI-Powered Learning
                </h1>
                <p className="mx-auto max-w-[700px] text-primary-foreground md:text-xl">
                  Master mission-critical technical skills in record time. From military to medical, law to HVAC - JIT Learning has you covered.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/upload-document">
                  <Button className="bg-background text-primary hover:bg-background/90">Get Started</Button>
                </Link>
                <Link href="#learn-more">
                  <Button variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose JIT Learning?</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Zap className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Rapid Upskilling</h3>
                <p className="text-muted-foreground">Acquire new skills at an unprecedented pace with our AI-driven learning system.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Brain className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">AI-Powered Personalization</h3>
                <p className="text-muted-foreground">Tailored learning experiences that adapt to your unique needs and progress.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Spaced Repetition</h3>
                <p className="text-muted-foreground">Optimize retention with automatically generated flashcards and review schedules.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">1</div>
                <h3 className="text-xl font-bold">Select Your Field</h3>
                <p className="text-muted-foreground">Choose from a wide range of technical fields, from military to medical, law to HVAC.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">2</div>
                <h3 className="text-xl font-bold">AI Assessment</h3>
                <p className="text-muted-foreground">Our AI evaluates your current knowledge and creates a personalized learning plan.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">3</div>
                <h3 className="text-xl font-bold">Rapid Learning</h3>
                <p className="text-muted-foreground">Engage with AI-generated content, quizzes, and spaced repetition flashcards to master your skills.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Accelerate Your Learning?</h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Join JIT Learning today and experience the future of rapid upskilling.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-primary-foreground text-primary"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-background text-primary hover:bg-background/90" type="submit">
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/70">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
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
