'use client'

import { Leaderboard } from "@/components/leaderboard"
import { LeaderboardAverage } from "@/components/leaderboard-average"
import { MastersHeader } from "@/components/masters-header"
import {useEffect, useState} from "react";
import {Player, TournamentData, TournamentRoot} from "@/model/masters/model";

export default function Home() {
  const [data, setData] = useState<NormalizedResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    fetch('https://www.masters.com/en_US/scores/feeds/2025/scores.json')
      .then((res) => res.json())
      .then((json) => {
        const parsed: TournamentData = json.data
        setData(normalize(parsed))
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <MastersHeader />
      <marquee style={{behavior: "alternate", fontSize: "large"}}>🍆🍆🍆𓂸𓂸𓂸🍌🍌🍌╰⋃╯╰⋃╯╰⋃╯🍄🍄🍄╭ᑎ╮╭ᑎ╮╭ᑎ╮🍆🍆🍆𓂸𓂸𓂸🍌🍌🍌╰⋃╯╰⋃╯╰⋃╯🍄🍄🍄╭ᑎ╮╭ᑎ╮╭ᑎ╮</marquee>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <Leaderboard data={data} />
          <LeaderboardAverage data={data} />
        </div>
      </div>
    </main>
  )
}

function normalize(tournament: TournamentData): NormalizedResponse {
  const clint = { name: '🍆 Clint 🍆', picks: ["Bryson DeChambeau", "Rory McIlroy", "Viktor Hovland", "Min Woo Lee", "Jordan Spieth", "Dustin Johnson"] }
  const shane = { name: '𓂸 Shane 𓂸', picks: ["Brooks Koepka", "Ludvig Åberg", "Hideki Matsuyama", "Tommy Fleetwood", "Tom Kim", "Tony Finau"] }
  const craig = { name: '🍌 Craig 🍌', picks: [ 'Scottie Scheffler', 'Collin Morikawa', 'Justin Thomas', 'Shane Lowry', 'Cameron Smith', 'Russell Henley'] }
  const matt = { name: '🍄 Matt 🍄', picks: ["Jon Rahm", "Xander Schauffele", "Patrick Cantlay", "Joaquín Niemann", "Akshay Bhatia", "Will Zalatoris"] }

  const theBoys = [clint, shane, craig, matt]

  let normalized= new NormalizedResponse();

  theBoys.forEach(boy => {
    let normalizedBoy = new NormalizedBoy();
    normalizedBoy.name = boy.name;

    boy.picks.forEach(pick => {
      const matched = tournament.player.find(player => player.full_name === pick)
      if (matched) {
        if (matched.pos.includes('T')) {
          matched.posint = parseInt(matched.pos.replace('T', ''))
        } else {
          matched.posint = parseInt(matched.pos)
        }

        matched.boy = boy.name;
        normalizedBoy.picks.push(matched)
      }
    });

    normalized.boys.push(normalizedBoy); // <-- missing line
  });

  console.log("normalized", normalized);

  return normalized
}

export class NormalizedResponse {
  boys: NormalizedBoy[] = []
}

export class NormalizedBoy {
  name: string = ''
  picks: Player[] = []
}