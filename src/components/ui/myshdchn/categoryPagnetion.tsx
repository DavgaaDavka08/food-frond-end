"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FoodCategories() {
    const [activeCategory, setActiveCategory] = useState("Appetizers")
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const categories = [
        "Appetizers",
        "Salads",
        "Pizzas",
        "Lunch favorites",
        "Main dishes",
        "Fish & Sea foods",
        "Side dish",
        "Brunch",
        "Desserts",
        "Drinks",
    ]

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef
            const scrollAmount = 300

            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" })
            }
        }
    }

    return (
        <div className="w-full bg-zinc-800 py-6 px-4">
            <h2 className="text-3xl font-bold text-white mb-6">Categories</h2>

            <div className="relative flex items-center">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-8"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant="outline"
                            className={cn(
                                "whitespace-nowrap rounded-full border px-6 py-2 text-sm font-medium",
                                activeCategory === category
                                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-white"
                                    : "bg-white text-zinc-800 border-white hover:bg-zinc-100",
                            )}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

