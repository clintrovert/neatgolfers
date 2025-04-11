import type React from "react"
import { ClubIcon as LucideGolfIcon, LucideFlag } from "lucide-react"

export function GolfIcon(props: React.SVGProps<SVGSVGElement>) {
  return <LucideFlag {...props} />
}

export function Flag(props: React.SVGProps<SVGSVGElement>) {
  return <LucideFlag {...props} />
}

export function GolfBall(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12a4 4 0 0 0 8 0" />
      <path d="M9 9a1 1 0 0 0 2 0" />
      <path d="M13 9a1 1 0 0 0 2 0" />
    </svg>
  )
}
