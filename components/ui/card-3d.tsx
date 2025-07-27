"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Card3D = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover?: boolean
    tilt?: boolean
  }
>(({ className, hover = true, tilt = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-lg transition-all duration-300",
      "bg-gradient-to-br from-white to-vanilla-50/50",
      "border-vanilla-200/50",
      "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
      hover && ["hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)]", "hover:-translate-y-2", "hover:scale-[1.02]"],
      tilt && "hover:rotate-1",
      className,
    )}
    {...props}
  />
))
Card3D.displayName = "Card3D"

const Card3DHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6 pb-4",
        "bg-gradient-to-r from-vanilla-50 to-vanilla-100/50",
        "border-b border-vanilla-200/50",
        "rounded-t-xl",
        className,
      )}
      {...props}
    />
  ),
)
Card3DHeader.displayName = "Card3DHeader"

const Card3DTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        "bg-gradient-to-r from-vanilla-800 to-vanilla-600 bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  ),
)
Card3DTitle.displayName = "Card3DTitle"

const Card3DDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-vanilla-600", className)} {...props} />,
)
Card3DDescription.displayName = "Card3DDescription"

const Card3DContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-4", className)} {...props} />,
)
Card3DContent.displayName = "Card3DContent"

const Card3DFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", "border-t border-vanilla-200/30 mt-4", className)}
      {...props}
    />
  ),
)
Card3DFooter.displayName = "Card3DFooter"

export { Card3D, Card3DHeader, Card3DFooter, Card3DTitle, Card3DDescription, Card3DContent }
