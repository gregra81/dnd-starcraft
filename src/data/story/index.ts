import type { StoryGraph, StoryNode } from '../../types'
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
