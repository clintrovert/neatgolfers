"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NormalizedResponse } from "@/app/page"
import { LeaderboardProps } from "@/components/leaderboard"
import { Player } from "@/model/masters/model"

export class LeaderboardAverageProps {
  data: NormalizedResponse | null
}

export function LeaderboardAverage({ data }: LeaderboardAverageProps) {
  function getLeaderboardAverageResults(): LeaderboardAverageResults {
    const results = new LeaderboardAverageResults()

    data?.boys.forEach((boy) => {
      const avg = calculateAverage(boy.picks)
      const result = new LeaderboardAverageResult()
      result.boy = boy.name
      result.averagePosition = avg
      result.first = boy.picks[0].posint;
      result.second = boy.picks[1].posint;
      result.third = boy.picks[2].posint;
      result.fourth = boy.picks[3].posint;
      result.fifth = boy.picks[4].posint;
      if (boy.picks.length > 5) {
        result.sixth = boy.picks[5].posint;
      }

      results.ranked.push(result)
    })

    // sory by average position
    results.ranked.sort((a, b) => a.averagePosition - b.averagePosition)

    return results
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-[#006747]/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-[#006747]">Leaderboard Average ($200 💵)</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NEATBOY</TableHead>
                <TableHead className="text-right">AVERAGE POS (MC=75)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <>
                {getLeaderboardAverageResults().ranked.map((team) => (
                  <TableRow key={team.boy}>
                    <TableCell className="font-medium">{team.boy}</TableCell>
                    <TableCell className="text-right"><b>{team.averagePosition.toFixed(2)}</b>  ({team.names()})</TableCell>
                  </TableRow>
                ))}
              </>

            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

  )
}

export class LeaderboardAverageResults {
  ranked: LeaderboardAverageResult[] = []
}

export class LeaderboardAverageResult {
  boy: string = ""
  averagePosition: number = 0
  first: number = -1000
  second: number = -1000
  third: number = -1000
  fourth: number = -1000
  fifth: number = -1000
  sixth: number = -1000

  names(): string {
    // this does not sort them, fix it
    // this should sort them by increasing value


    const names = [this.first, this.second, this.third, this.fourth, this.fifth, this.sixth].sort(function(a, b) {
      return a - b;})
    let result = names.join(", ")
    // if result contains 75, put in "missed cut"
    result = result.replaceAll("75", "MC")
    return result
  }
}

function calculateAverage(picks: Player[]): number {
  const total = picks.reduce((sum, player) => sum + player.posint, 0)
  return picks.length ? total / picks.length : 0
}
