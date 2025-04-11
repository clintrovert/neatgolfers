"use client"

import { useEffect, useRef, useState } from "react"
import { GolfBall } from "./icons"

// Golf-related news and updates for the marquee
const marqueeItems = [
  "🍆🍆𓂸𓂸🍌🍌🍌🍌╰⋃╯╰⋃╯╭ᑎ╮╭ᑎ╮🍄🍄🍄🍆🍆𓂸𓂸🍌🍌🍌🍌╰⋃╯╰⋃╯╭ᑎ╮╭ᑎ╮🍄🍄🍄",
]

export function ScrollingMarquee() {
  const [mounted, setMounted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollContent = Array.from(scrollContainer.children)
    const totalWidth = scrollContent.reduce((acc, el) => acc + el.clientWidth, 0)

    let animationId: number
    let currentPosition = 0

    const scroll = () => {
      if (!scrollContainer) return

      currentPosition -= 1 // Adjust speed here (higher = faster)

      // Reset position when content has scrolled the width of one item
      if (currentPosition <= -scrollContent[0].clientWidth) {
        currentPosition += scrollContent[0].clientWidth
        // Move the first item to the end for continuous scrolling
        scrollContainer.appendChild(scrollContainer.children[0])
      }

      scrollContainer.style.transform = `translateX(${currentPosition}px)`
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [mounted])

  if (!mounted) return null

  // Create marquee items with bullet points
  const formattedItems = marqueeItems.map((item, index) => (
    <div key={index} className="mx-8 inline-flex flex-shrink-0 items-center gap-2 whitespace-nowrap">
      {/*<span className="inline-block h-2 w-2 rounded-full bg-[#006747]"></span>*/}
      {item}
    </div>
  ))

  return (
    <div className="relative overflow-hidden bg-[#FFCC00]/10 py-2">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4">
          {/*<GolfBall className="h-5 w-5 text-[#006747]" />*/}
        </div>
        <div className="relative overflow-hidden">
          <div ref={scrollRef} className="flex text-[#006747] font-medium">
            {/* Duplicate items to ensure continuous scrolling */}
            {formattedItems}
          </div>
        </div>
      </div>
    </div>
  )
}
