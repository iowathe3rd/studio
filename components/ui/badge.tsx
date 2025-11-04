import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-thin px-2 py-0.5 text-[10px] font-medium transition-smooth focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-foreground text-background shadow-xs",
        secondary:
          "border-border bg-secondary hover:border-foreground/50",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground shadow-xs",
        outline: "border-border text-foreground bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
