import { RACES } from '../data/races'
import { getNode } from '../data/story'
import { applyEffects } from './rules'
import type { GameState, RaceId } from '../types'

const STORAGE_KEY = 'starcraft-gamebook:v1'

export const EMPTY_STATE: GameState = {
  raceId: null,
  nodeId: null,
  stats: { tactics: 0, endurance: 0, psionic: 0, swarm: 0 },
  inventory: [],
  flags: [],
  visited: [],
  trail: [],
  updatedAt: 0,
}

export type GameAction =
  | { type: 'selectRace'; raceId: RaceId }
  | { type: 'goTo'; nodeId: string }
  | { type: 'back' }
  | { type: 'restore'; state: GameState }
  | { type: 'reset' }

/**
 * הרדוקסר היחיד של המשחק. כל מעבר צומת מחיל את אפקטי הצומת
 * פעם אחת בלבד (לפי רשימת הצמתים שבוקרו), כדי שחזרה לצומת
 * לא תעניק פריטים או מדדים כפולים.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'selectRace': {
      const race = RACES[action.raceId]
      const initial: GameState = {
        ...EMPTY_STATE,
        raceId: race.id,
        stats: { ...race.stats },
        inventory: [...race.startingItems],
      }
      return enterNode(initial, race.startNodeId)
    }
    case 'goTo':
      return enterNode(state, action.nodeId)
    case 'back':
      return stepBack(state)
    case 'restore':
      return { ...action.state, updatedAt: Date.now() }
    case 'reset':
      return EMPTY_STATE
    default:
      return state
  }
}

/** מעבר לצומת: החלת אפקטים (אם זה ביקור ראשון) ורישום הביקור. */
function enterNode(state: GameState, nodeId: string): GameState {
  const node = getNode(nodeId)
  if (!node) {
    console.error(`צומת עלילה חסר: ${nodeId}`)
    return state
  }

  const firstVisit = !state.visited.includes(nodeId)
  const next = firstVisit ? applyEffects(state, node.effects) : state

  return {
    ...next,
    nodeId,
    visited: firstVisit ? [...next.visited, nodeId] : next.visited,
    trail: state.nodeId ? [...state.trail, state.nodeId] : state.trail,
    updatedAt: Date.now(),
  }
}

/**
 * חזרה צעד אחד אחורה במסלול. הפריטים והמדדים שנצברו נשמרים:
 * המסלול הוא כלי ניווט, לא ביטול של מה שכבר קרה.
 */
function stepBack(state: GameState): GameState {
  if (state.trail.length === 0) return state
  const trail = [...state.trail]
  const previous = trail.pop() as string
  return { ...state, nodeId: previous, trail, updatedAt: Date.now() }
}

/** האם קיים משחק שמור שאפשר להמשיך ממנו. */
export function hasSavedGame(state: GameState): boolean {
  return Boolean(state.raceId && state.nodeId && getNode(state.nodeId))
}

/** אימות מצב שהגיע ממקור חיצוני (אחסון מקומי או קוד שמירה). */
export function normalizeState(input: unknown): GameState | null {
  if (!input || typeof input !== 'object') return null
  const candidate = input as Partial<GameState>
  if (candidate.raceId && !RACES[candidate.raceId]) return null
  if (candidate.nodeId && !getNode(candidate.nodeId)) return null

  return {
    ...EMPTY_STATE,
    ...candidate,
    stats: { ...EMPTY_STATE.stats, ...(candidate.stats ?? {}) },
    inventory: candidate.inventory ?? [],
    flags: candidate.flags ?? [],
    visited: candidate.visited ?? [],
    trail: candidate.trail ?? [],
  }
}

/** טעינת משחק שמור מהאחסון המקומי. */
export function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_STATE
    return normalizeState(JSON.parse(raw)) ?? EMPTY_STATE
  } catch {
    return EMPTY_STATE
  }
}

export function saveState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* אחסון מלא או חסום — המשחק ממשיך ללא שמירה */
  }
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* אין מה לעשות אם האחסון חסום */
  }
}
