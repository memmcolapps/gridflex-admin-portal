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

  return date.toLocaleDateString("en-Uk", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  })
}

interface Props {
  placeHolder: string;
  className?: string;
}

export function DatePicker({ placeHolder, className }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [month, setMonth] = React.useState<Date | undefined>(new Date())

  return (
    <div className={`flex ${className} flex-col gap-3`}>
      <div className="relative flex items-center">
        <Input
          id="date"
          value={value}
          placeholder={placeHolder}
          className="bg-white h-10 border pl-9"
          onChange={(e) => {
            setValue(e.target.value)
            const parsed = parseDate(e.target.value)
            if (parsed) {
              setDate(parsed)
              setMonth(parsed)
            } else {
              setDate(undefined)
            }
          }}
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
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}