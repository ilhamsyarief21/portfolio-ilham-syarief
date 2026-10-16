import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg" | "icon"
  isIsland?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isIsland = false, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
    
    const variants = {
      primary: "bg-[#e5262c] text-white hover:bg-[#c91e24] shadow-sm",
      secondary: "bg-[#141414] text-white hover:bg-black",
      outline: "border border-black/10 bg-white/60 hover:bg-white text-[#141414] backdrop-blur-sm",
      ghost: "hover:bg-black/5 text-[#141414]",
      danger: "bg-red-600 text-white hover:bg-red-700",
    }

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-full gap-1.5",
      md: "text-sm px-5 py-2.5 rounded-full gap-2",
      lg: "text-base px-7 py-3.5 rounded-full gap-3",
      icon: "w-10 h-10 rounded-full p-0 flex items-center justify-center",
    }

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          isIsland && "ring-4 ring-black/5",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
