import { Loader2 } from "lucide-react"

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your content.</p>
      </div>
    </div>
  )
}