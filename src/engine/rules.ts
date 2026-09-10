import { STAT_LABELS } from '../data/races'
import type { Choice, Effects, GameState, Requirement } from '../types'
import { RACES } from '../data/races'

export interface Availability {
  available: boolean
  /** הסבר בעברית מדוע הבחירה נעולה (מוצג לשחקן) */
  reason?: string
}

/**
 * בודק אם תנאי בחירה מתקיים, ומחזיר הסבר בעברית אם לא.
 * כל התנאים שהוגדרו חייבים להתקיים במקביל.
 */
export function checkRequirement(state: GameState, req?: Requirement): Availability {
  if (!req) return { available: true }

  if (req.item && !state.inventory.includes(req.item)) {
    return { available: false, reason: `דרוש פריט: ${req.item}` }
  }
  if (req.race && state.raceId !== req.race) {
    return { available: false, reason: `זמין רק לגזע ${RACES[req.race].name}` }
  }
  if (req.flag && !state.flags.includes(req.flag)) {
    return { available: false, reason: 'הנתיב הזה עדיין לא נפתח' }
  }
  if (req.notFlag && state.flags.includes(req.notFlag)) {
    return { available: false, reason: 'מאוחר מדי לבחור בנתיב הזה' }
  }
  if (req.minStat && state.stats[req.minStat.stat] < req.minStat.value) {
    const label = STAT_LABELS[req.minStat.stat]
    return { available: false, reason: `דרוש ${label} ${req.minStat.value} לפחות` }
  }
  return { available: true }
}

export function isChoiceAvailable(state: GameState, choice: Choice): Availability {
  return checkRequirement(state, choice.requires)
}

/**
 * מחיל אפקטים של צומת על המצב ומחזיר מצב חדש (immutable).
 * מדדים לא יורדים מתחת ל-0.
 */
export function applyEffects(state: GameState, effects?: Effects): GameState {
  if (!effects) return state

  const inventory = [...state.inventory]
  for (const item of effects.addItems ?? []) {
    if (!inventory.includes(item)) inventory.push(item)
  }
  const removed = new Set(effects.removeItems ?? [])

  const stats = { ...state.stats }
  for (const [stat, delta] of Object.entries(effects.stats ?? {})) {
    const key = stat as keyof typeof stats
    stats[key] = Math.max(0, stats[key] + (delta ?? 0))
  }

  const flags = [...new Set([...state.flags, ...(effects.addFlags ?? [])])]

  return {
    ...state,
    inventory: inventory.filter((item) => !removed.has(item)),
    stats,
    flags,
  }
}
