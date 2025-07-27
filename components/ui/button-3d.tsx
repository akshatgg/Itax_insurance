"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const button3dVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden transform-gpu",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-b from-vanilla-500 to-vanilla-600 text-white",
          "shadow-[0_4px_0_0_hsl(var(--vanilla-700)),0_8px_16px_rgba(0,0,0,0.2)]",
          "hover:shadow-[0_2px_0_0_hsl(var(--vanilla-700)),0_4px_8px_rgba(0,0,0,0.3)]",
          "hover:translate-y-[2px]",
          "active:shadow-[0_0px_0_0_hsl(var(--vanilla-700)),0_2px_4px_rgba(0,0,0,0.4)]",
          "active:translate-y-[4px]",
        ],
        destructive: [
          "bg-gradient-to-b from-red-500 to-red-600 text-white",
          "shadow-[0_4px_0_0_hsl(0_84.2%_40.2%),0_8px_16px_rgba(0,0,0,0.2)]",
          "hover:shadow-[0_2px_0_0_hsl(0_84.2%_40.2%),0_4px_8px_rgba(0,0,0,0.3)]",
          "hover:translate-y-[2px]",
          "active:shadow-[0_0px_0_0_hsl(0_84.2%_40.2%),0_2px_4px_rgba(0,0,0,0.4)]",
          "active:translate-y-[4px]",
        ],
        outline: [
          "border-2 border-vanilla-300 bg-gradient-to-b from-white to-vanilla-50 text-vanilla-700",
          "shadow-[0_4px_0_0_hsl(var(--vanilla-300)),0_8px_16px_rgba(0,0,0,0.1)]",
          "hover:shadow-[0_2px_0_0_hsl(var(--vanilla-300)),0_4px_8px_rgba(0,0,0,0.2)]",
          "hover:translate-y-[2px]",
          "active:shadow-[0_0px_0_0_hsl(var(--vanilla-300)),0_2px_4px_rgba(0,0,0,0.3)]",
          "active:translate-y-[4px]",
        ],
        secondary: [
          "bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800",
          "shadow-[0_4px_0_0_hsl(220_13%_70%),0_8px_16px_rgba(0,0,0,0.1)]",
          "hover:shadow-[0_2px_0_0_hsl(220_13%_70%),0_4px_8px_rgba(0,0,0,0.2)]",
          "hover:translate-y-[2px]",
          "active:shadow-[0_0px_0_0_hsl(220_13%_70%),0_2px_4px_rgba(0,0,0,0.3)]",
          "active:translate-y-[4px]",
        ],
        ghost: [
          "bg-transparent text-vanilla-700 hover:bg-vanilla-100",
          "shadow-none hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
          "hover:scale-105",
        ],
        link: "text-vanilla-600 underline-offset-4 hover:underline hover:text-vanilla-700 transition-colors",
        success: [
          "bg-gradient-to-b from-green-500 to-green-600 text-white",
          "shadow-[0_4px_0_0_hsl(142_76%_36%),0_8px_16px_rgba(0,0,0,0.2)]",
          "hover:shadow-[0_2px_0_0_hsl(142_76%_36%),0_4px_8px_rgba(0,0,0,0.3)]",
          "hover:translate-y-[2px]",
          "active:shadow-[0_0px_0_0_hsl(142_76%_36%),0_2px_4px_rgba(0,0,0,0.4)]",
          "active:translate-y-[4px]",
        ],
        warning: [
          "bg-gradient-to-b from-yellow-500 to-yellow-600 text-white",
          "shadow-[0_4px_0_0_hsl(43_96%_46%),0_8px_16px_rgba(0,0,0,0.2)]",
          "hover:shadow-[0_2px_0_0_hsl(43_96%_46%),0_4px_8px_rgba(0,0,0,0.3)]",
          "hover:translate-y-[2px]",
          "active:shadow-[0_0px_0_0_hsl(43_96%_46%),0_2px_4px_rgba(0,0,0,0.4)]",
          "active:translate-y-[4px]",
        ],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface Button3DProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button3dVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const Button3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  ({ className, variant, size, asChild = false, loading, icon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(button3dVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}

        {/* Shine effect */}
        <div className="absolute inset-0 -top-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 transform -skew-x-12" />
      </Comp>
    )
  },
)
Button3D.displayName = "Button3D"

export { Button3D, button3dVariants }
