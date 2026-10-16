import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "neutral" | "outline"
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const variants = {
    accent: "bg-[#e5262c]/10 text-[#e5262c] border-[#e5262c]/20",
    neutral: "bg-black/[0.04] text-[#141414] border-black/[0.08]",
    outline: "bg-transparent text-[#66615b] border-black/10",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
