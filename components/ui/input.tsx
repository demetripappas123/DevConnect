import * as React from "react"

import { cn } from "@/lib/utils"

type BaseInputProps = {
  className?: string
  disabled?: boolean
}

type InputElementProps = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>
type TextareaElementProps = BaseInputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

type InputProps = {
  as?: 'input' | 'textarea'
} & (InputElementProps | TextareaElementProps)

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, as = 'input', ...props }, ref) => {
    if (as === 'textarea') {
      const textareaProps = props as TextareaElementProps
      return (
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...textareaProps}
        />
      )
    }

    const inputProps = props as InputElementProps
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref as React.Ref<HTMLInputElement>}
        {...inputProps}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 