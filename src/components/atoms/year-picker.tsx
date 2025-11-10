import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface YearPickerProps {
  value?: number
  onChange?: (year: number) => void
  placeholder?: string
  className?: string
  minYear?: number
  maxYear?: number
}

export function YearPicker({
  value,
  onChange,
  placeholder = "Select year",
  className = "",
  minYear = 1990,
  maxYear = new Date().getFullYear(),
}: YearPickerProps) {
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  )

  const handleValueChange = (year: string) => {
    if (onChange) {
      onChange(Number(year));
    }
  };

  return (
    <Select value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className={`bg-white ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function YearPickerDemo() {
  const [selectedYear, setSelectedYear] = React.useState<number>(new Date().getFullYear())

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm space-y-4 p-6 bg-white rounded-lg shadow">
        <div>
          <YearPicker
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="Choose a year"
            minYear={2000}
            maxYear={2030}
          />
        </div>
        <p className="text-center text-gray-600">Selected Year: {selectedYear}</p>
      </div>
    </div>
  )
}