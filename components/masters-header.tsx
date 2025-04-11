"use client"

import { useEffect, useState } from "react"
import { Flag, GolfBall, GolfIcon } from "@/components/icons"
import { motion } from "framer-motion"

export function MastersHeader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#004d34] via-[#006747] to-[#004d34] text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-[10%] transform -rotate-12">
          <GolfBall className="h-8 w-8 text-white" />
        </div>
        <div className="absolute top-10 left-[25%] transform rotate-12">
          <GolfBall className="h-6 w-6 text-white" />
        </div>
        <div className="absolute top-4 right-[20%] transform rotate-45">
          <Flag className="h-10 w-10 text-white" />
        </div>
        <div className="absolute bottom-2 left-[30%] transform -rotate-12">
          <GolfBall className="h-5 w-5 text-white" />
        </div>
        <div className="absolute bottom-6 right-[35%] transform rotate-12">
          <GolfBall className="h-7 w-7 text-white" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex items-center gap-3">

            <h1 className="bg-[#FFCC00] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
              Neat Golfers
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <GolfIcon className="h-12 w-12 drop-shadow-lg" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Fancy bottom border */}
      <div className="relative h-2">
        <div className="absolute bottom-0 h-2 w-full bg-[#FFCC00]"></div>
        {/*<div className="absolute bottom-0 h-2 w-1/3 animate-pulse bg-white opacity-30"></div>*/}
      </div>
    </div>
  )
}
