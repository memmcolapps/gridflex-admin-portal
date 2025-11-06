"use client"

import * as React from "react"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2,'0')
  const day = String(date.getDate()).padStart(2, '0')

  return`${year}-${month}-${day}`
}

interface Props {
  placeHolder: string;
  className?: string;
  value?: string;
  onChange?: (date: string) => void; 
}

export function DatePicker({ placeHolder, className, value: controlledValue, onChange }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(controlledValue || "")
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [month, setMonth] = React.useState<Date | undefined>(new Date())
  
  const today = new Date()
  today.setHours(23, 59, 59, 999) 

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
      if (controlledValue) {
        const parsed = parseDate(controlledValue)
        if (parsed) {
          setDate(parsed)
          setMonth(parsed)
        }
      } else {
        setDate(undefined)
      }
    }
  }, [controlledValue])

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    const formatted = formatDate(selectedDate)
    setValue(formatted)
    setOpen(false)
    
    if (onChange) {
      onChange(formatted)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    
    const parsed = parseDate(newValue)
    if (parsed && parsed <= today) {
      setDate(parsed)
      setMonth(parsed)
      if (onChange) {
        onChange(formatDate(parsed))
      }
    } else if (parsed && parsed > today) {
      setDate(undefined)
      if (onChange) {
        onChange("")
      }
    } else {
      setDate(undefined)
      if (onChange) {
        onChange("")
      }
    }
  }

  return (
    <div className={`flex ${className} flex-col gap-3`}>
      <div className="relative flex items-center">
        <Input
          id="date"
          value={value}
          placeholder={placeHolder}
          className="bg-white h-10 border pl-9"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-0 h-5 w-5"
            >
              <CalendarIcon className="size-4 text-gray-500" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateChange}
              disabled={(date) => date > today}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}