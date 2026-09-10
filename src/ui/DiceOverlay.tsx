import { useEffect, useMemo, useState } from 'react'
import { resolveCheck, rollDie } from '../engine/dice'
import { STAT_LABELS } from '../data/races'
import type { DiceCheck, GameState } from '../types'

interface Props {
  check: DiceCheck
  state: GameState
  /** נקרא כאשר השחקן ממשיך אל הצומת שנפתח לפי תוצאת ההטלה */
  onContinue: (nodeId: string) => void
  onCancel: () => void
}

const ROLL_DURATION_MS = 1100
const TICK_MS = 80

/**
 * חלונית הטלת קוביה: מציגה אנימציית ספרות מתחלפות,
 * ואז את התוצאה הסופית ואת הנתיב שנפתח.
 */
export function DiceOverlay({ check, state, onContinue, onCancel }: Props) {
  // התוצאה מוגרלת פעם אחת בלבד, בכניסה לחלונית.
  const result = useMemo(() => resolveCheck(state, check), [check, state])
  const [rolling, setRolling] = useState(true)
  const [face, setFace] = useState(result.rolled)

  useEffect(() => {
    const ticker = setInterval(() => setFace(rollDie(check.dice)), TICK_MS)
    const timer = setTimeout(() => {
      clearInterval(ticker)
      setFace(result.rolled)
      setRolling(false)
    }, ROLL_DURATION_MS)

    return () => {
      clearInterval(ticker)
      clearTimeout(timer)
    }
  }, [check.dice, result.rolled])

  const nextNodeId = result.success ? check.successNodeId : check.failureNodeId
  const statLabel = check.stat ? STAT_LABELS[check.stat] : null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={check.label}
      className="animate-fade-in bg-void-950/85 fixed inset-0 z-50 flex items-end justify-center backdrop-blur-sm sm:items-center"
    >
      <div className="border-void-700 bg-void-900 w-full max-w-xl rounded-t-3xl border p-6 pb-10 sm:rounded-3xl sm:pb-6">
        <p className="text-ink-dim text-center text-xs tracking-[0.3em]">{check.label}</p>

        <div className="mt-6 flex justify-center">
          <div
            className={`border-void-600 bg-void-800 flex h-28 w-28 items-center justify-center rounded-3xl border-2 text-5xl font-extrabold tabular-nums ${
              rolling ? 'animate-dice-shake' : ''
            }`}
          >
            {face}
          </div>
        </div>

        <p className="text-ink-dim mt-4 text-center text-sm">
          קוביית d{check.dice} · סף הצלחה {check.target}
        </p>

        {rolling ? (
          <p className="mt-6 text-center text-lg font-semibold">מטיל קוביה…</p>
        ) : (
          <div className="animate-node-in mt-6 text-center">
            {/* פירוק החישוב לשדות נפרדים — מונע ערבוב כיווניות של מספרים וטקסט */}
            <dl className="text-ink-dim flex justify-center gap-2 text-xs">
              <div className="bg-void-800 rounded-full px-3 py-1">
                <dt className="inline">הטלה: </dt>
                <dd className="inline font-bold">{result.rolled}</dd>
              </div>
              {statLabel && (
                <div className="bg-void-800 rounded-full px-3 py-1">
                  <dt className="inline">{statLabel}: </dt>
                  <dd className="inline font-bold">{result.bonus}+</dd>
                </div>
              )}
              <div className="bg-void-800 rounded-full px-3 py-1">
                <dt className="inline">סה״כ: </dt>
                <dd className="inline font-bold">{result.total}</dd>
              </div>
            </dl>
            <p
              className={`mt-2 text-2xl font-extrabold ${
                result.success ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {result.success ? 'הצלחה!' : 'כישלון'}
            </p>

            <button
              type="button"
              onClick={() => onContinue(nextNodeId)}
              className="border-void-600 bg-void-800 active:bg-void-700 mt-6 w-full rounded-2xl border px-4 py-4 text-base font-semibold transition-transform duration-150 active:scale-[0.99]"
            >
              המשך
            </button>
          </div>
        )}

        {rolling && (
          <button
            type="button"
            onClick={onCancel}
            className="text-ink-dim mt-6 w-full text-center text-xs underline"
          >
            ביטול
          </button>
        )}
      </div>
    </div>
  )
}
