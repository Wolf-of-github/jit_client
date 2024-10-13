import { Loader2 } from "lucide-react"

export default function LoadingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <span className="text-2xl font-bold">JIT Learning</span>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your content.</p>
        </div>
      </main>

      <footer className="border-t py-4 px-4 lg:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © 2024 JIT Learning. All rights reserved.
        </p>
      </footer>
    </div>
  )
}