import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30 shadow-inner backdrop-blur-sm",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 to-pink-300/30 animate-pulse" style={{ animationDuration: '2s' }} />
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }