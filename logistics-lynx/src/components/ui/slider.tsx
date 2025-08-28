import * as React from "react"

interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  onChange?: (value: number) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, defaultValue, min = 0, max = 100, step = 1, disabled = false, className = "", onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      onChange?.(newValue)
    }

    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 ${className}`}
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value || defaultValue || 0) - min) / (max - min) * 100}%, #e5e7eb ${((value || defaultValue || 0) - min) / (max - min) * 100}%, #e5e7eb 100%)`
        }}
        {...props}
      />
    )
  }
)

Slider.displayName = "Slider"

export { Slider }
