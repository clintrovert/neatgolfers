"use client"

import { useState } from "react"
import { ArrowUpDown, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {NormalizedResponse} from "@/app/page";
import {Player} from "@/model/masters/model";

export class LeaderboardProps {
  data: NormalizedResponse | null
}

export function Leaderboard({ data }: LeaderboardProps) {
  function getBestPick(players: Player[]): Player {
    return players.reduce((best, current) => {
      return current.posint < best.posint ? current : best;
    }, players[0]);
  }

  function getLeaderboardResults(): sortedLeaderboardResults {
    let results: sortedLeaderboardResults = new sortedLeaderboardResults();

    let players : Player[] = []
    data?.boys.map(boy => {
      players.push(getBestPick(boy.picks))
    })

    let lr :leaderboardResult[] = []
    players.map(player => {
      let result = new leaderboardResult();
      result.rank = player.pos;
      result.neatBoy = player.boy;
      result.player = player.full_name;
      result.score = player.topar == "E" ? "0" : player.topar;
      lr.push(result);
    })

    // sort results by player with lowest score
    lr.sort((a, b) => {
      const scoreA = parseFloat(a.score);
      const scoreB = parseFloat(b.score);
      return scoreA - scoreB;
    });

    results.ranked = lr;
    return results;
  }

  return (
    <>
    <Card className="overflow-hidden">
      <CardHeader className="bg-[#006747]/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-[#006747]">Best Pick ($200 💵)</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NEATBOY</TableHead>
                <TableHead>PLAYER</TableHead>
                <TableHead>POSITION</TableHead>
                <TableHead className="text-right">SCORE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <>
              {getLeaderboardResults().ranked.map((result) => (
                <>
                <TableRow key={result.neatBoy}>
                  <TableCell className="font-medium">{result.neatBoy}</TableCell>
                  <TableCell className="font-medium">{result.player}</TableCell>
                  <TableCell className="font-medium text-center">{result.rank}</TableCell>
                  <TableCell className="font-medium text-right">{result.score}</TableCell>
                </TableRow>
                </>
              ))}
              </>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    </>
  )
}


class sortedLeaderboardResults {
  ranked: leaderboardResult[]
}

class leaderboardResult {
  rank: string
  neatBoy: string
  player: string
  score: string
}
