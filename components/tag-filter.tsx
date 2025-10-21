"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface TagFilterProps {
  availableTags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  onClearAll: () => void
}

export function TagFilter({ availableTags, selectedTags, onTagToggle, onClearAll }: TagFilterProps) {
  if (availableTags.length === 0) return null

  return (
    <div className="bg-white border-b py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-600 whitespace-nowrap">タグ:</span>
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <Badge
                    key={tag}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-[#F4C300] text-black hover:bg-[#F4C300]/90 border-[#F4C300]"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => onTagToggle(tag)}
                  >
                    #{tag}
                  </Badge>
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {selectedTags.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm font-bold text-gray-500 hover:text-gray-700 whitespace-nowrap flex items-center gap-1 transition-colors"
            >
              <X className="w-4 h-4" />
              クリア
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
