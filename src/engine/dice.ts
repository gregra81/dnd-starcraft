import type { DiceCheck, GameState, RollResult } from '../types'

/** הטלת קוביה בודדת (1..sides). */
export function rollDie(sides: 6 | 20): number {
  return 1 + Math.floor(Math.random() * sides)
}

/**
 * מבצע בדיקת קוביה מול מצב השחקן.
 * הנוסחה: הטלה + ערך המדד הרלוונטי >= סף ההצלחה.
 */
export function resolveCheck(state: GameState, check: DiceCheck): RollResult {
  const rolled = rollDie(check.dice)
  const bonus = check.stat ? state.stats[check.stat] : 0
  const total = rolled + bonus
  return {
    dice: check.dice,
    rolled,
    bonus,
    total,
    target: check.target,
    success: total >= check.target,
    label: check.label,
  }
}

/**
 * סיכוי ההצלחה בבדיקה נתונה, לפי המדדים הנוכחיים.
 * משמש להצגת המידע לשחקן לפני שהוא בוחר.
 */
export function successChance(state: GameState, check: DiceCheck): number {
  const bonus = check.stat ? state.stats[check.stat] : 0
  const needed = check.target - bonus
  const winning = Math.min(check.dice, check.dice - needed + 1)
  return Math.max(0, Math.min(1, winning / check.dice))
}
