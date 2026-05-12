import * as React from "react"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckedState = boolean | "indeterminate"

export interface CheckboxProps {
  checked?: CheckedState
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

const Checkbox = ({
  className,
  checked = false,
  onCheckedChange,
  disabled,
  id,
}: CheckboxProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = checked === "indeterminate"
    }
  }, [checked])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked)
  }

  const isChecked = checked === true
  const isIndeterminate = checked === "indeterminate"

  return (
    <div className="relative inline-flex items-center justify-center">
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-slate-300 transition-all",
          "checked:bg-[#1677ff] checked:border-[#1677ff]",
          "hover:border-[#1677ff] hover:checked:bg-[#4096ff]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677ff]/30 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
      <Check
        className={cn(
          "absolute h-3 w-3 text-white opacity-0 transition-opacity pointer-events-none",
          isChecked && !isIndeterminate && "opacity-100"
        )}
        strokeWidth={3}
      />
      <Minus
        className={cn(
          "absolute h-3 w-3 text-white opacity-0 transition-opacity pointer-events-none",
          isIndeterminate && "opacity-100"
        )}
        strokeWidth={3}
      />
    </div>
  )
}
Checkbox.displayName = "Checkbox"

export { Checkbox }
