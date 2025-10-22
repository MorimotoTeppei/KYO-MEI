"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type CategoryType = "all" | "trending" | "new" | "ending-soon"

interface CategoryTabsProps {
  activeCategory: CategoryType
  onCategoryChange: (category: CategoryType) => void
}

const categories = [
  { value: "all" as const, label: "すべて", icon: "" },
  { value: "trending" as const, label: "注目", icon: "🔥" },
  { value: "new" as const, label: "新着", icon: "⭐" },
  { value: "ending-soon" as const, label: "終了間近", icon: "⏰" },
]

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollArea className="w-full">
          <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as CategoryType)}>
            <TabsList className="inline-flex h-12 items-center justify-start bg-transparent w-full border-b-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-6 pb-3 pt-3 font-bold text-gray-600 shadow-none transition-none data-[state=active]:border-b-[#F4C300] data-[state=active]:text-black data-[state=active]:shadow-none"
                >
                  {category.icon && <span className="mr-2">{category.icon}</span>}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
