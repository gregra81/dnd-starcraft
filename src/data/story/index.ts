import type { RaceId, StoryGraph, StoryNode } from '../../types'
import { RACE_LIST } from '../races'
import { terranNodes } from './terran'
import { zergNodes } from './zerg'
import { protossNodes } from './protoss'

/**
 * ממיר מערכי צמתים למפת גרף לפי מזהה, ומוודא שאין מזהים כפולים.
 * הוספת מסלול חדש = הוספת קובץ צמתים ושרשורו כאן בלבד.
 */
function buildGraph(...groups: StoryNode[][]): StoryGraph {
  const graph: StoryGraph = {}
  for (const node of groups.flat()) {
    if (graph[node.id]) {
      throw new Error(`מזהה צומת כפול בעלילה: ${node.id}`)
    }
    graph[node.id] = node
  }
  return graph
}

export const STORY: StoryGraph = buildGraph(terranNodes, zergNodes, protossNodes)

export function getNode(id: string): StoryNode | undefined {
  return STORY[id]
}

/**
 * מספר הסופים שאפשר להגיע אליהם מצומת הפתיחה של כל גזע.
 * מחושב מהגרף עצמו, כך שהמספר שמוצג לשחקן נשאר נכון גם כשמוסיפים מערכות.
 */
export const ENDING_COUNT: Record<RaceId, number> = Object.fromEntries(
  RACE_LIST.map((race) => {
    const seen = new Set([race.startNodeId])
    const queue = [race.startNodeId]
    let endings = 0
    while (queue.length) {
      const node = STORY[queue.pop()!]
      if (node.ending) endings++
      for (const choice of node.choices) {
        for (const target of [choice.to, choice.check?.successNodeId, choice.check?.failureNodeId]) {
          if (target && !seen.has(target)) {
            seen.add(target)
            queue.push(target)
          }
        }
      }
    }
    return [race.id, endings]
  }),
) as Record<RaceId, number>
