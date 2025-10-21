"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "お題やタグ、投稿者を検索..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = () => {
    onChange("")
  }

  return (
    <div
      className={`relative max-w-2xl transition-all ${
        isFocused ? "ring-2 ring-[#F4C300] rounded-lg" : ""
      }`}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="pl-10 pr-10 h-11 bg-white border-gray-200 focus-visible:ring-[#F4C300] focus-visible:border-[#F4C300]"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
        >
          <X className="w-4 h-4 text-gray-500" />
        </Button>
      )}
    </div>
  )
}
