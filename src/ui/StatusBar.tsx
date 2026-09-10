import { useState } from 'react'
import { RACES, STAT_INFO, STAT_LABELS, visibleStats } from '../data/races'
import { ITEM_INFO, KEY_ITEMS } from '../data/items'
import { RACE_THEME } from './theme'
import type { GameState } from '../types'

interface Props {
  state: GameState
  onNewGame: () => void
  onOpenSaveCode: () => void
  onOpenHelp: () => void
}

/**
 * שורת מצב עליונה נצמדת. החלונית הנפתחת מסבירה מה כל מדד עושה,
 * ומה כל פריט במלאי שווה בפועל.
 */
export function StatusBar({ state, onNewGame, onOpenSaveCode, onOpenHelp }: Props) {
  const [open, setOpen] = useState(false)
  if (!state.raceId) return null

  const race = RACES[state.raceId]
  const theme = RACE_THEME[race.id]

  return (
    <div className="bg-void-950/90 border-void-700 sticky top-0 z-30 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex flex-1 items-center gap-2 text-right"
        >
          <span className={`text-lg font-extrabold ${theme.text}`}>{race.name}</span>
          <span className="text-ink-dim text-xs">{open ? 'סגור מדדים ▲' : 'מדדים ומלאי ▼'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenHelp}
          aria-label="איך משחקים"
          className="border-void-600 text-ink-dim active:bg-void-800 rounded-lg border px-3 py-1.5 text-xs"
        >
          איך משחקים
        </button>

        <button
          type="button"
          onClick={onNewGame}
          className="border-void-600 text-ink-dim active:bg-void-800 rounded-lg border px-3 py-1.5 text-xs"
        >
          משחק חדש
        </button>
      </div>

      {open && (
        <div className="animate-fade-in border-void-800 mx-auto w-full max-w-xl border-t px-4 py-4">
          <h2 className="text-ink-dim mb-1 text-xs font-semibold">מדדים</h2>
          <p className="text-ink-dim mb-3 text-xs">
            כל מדד מתווסף להטלת הקוביה בבדיקות מהסוג שלו. ההטלה ועוד המדד צריכות להגיע לסף ההצלחה.
          </p>
          <dl className="flex flex-col gap-2">
            {visibleStats(state.stats).map(([stat, value]) => (
              <div key={stat} className={`rounded-xl ${theme.bgSoft} px-3 py-2`}>
                <div className="flex items-center justify-between text-sm">
                  <dt className="font-semibold">{STAT_LABELS[stat]}</dt>
                  <dd className={`font-bold ${theme.text}`}>{value}</dd>
                </div>
                <p className="text-ink-dim mt-1 text-xs leading-relaxed">{STAT_INFO[stat]}</p>
              </div>
            ))}
          </dl>

          <h2 className="text-ink-dim mt-4 mb-1 text-xs font-semibold">מלאי</h2>
          {state.inventory.length === 0 ? (
            <p className="text-ink-dim text-sm">התיק ריק.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {state.inventory.map((item) => (
                <li key={item} className="border-void-700 bg-void-800/60 rounded-xl border px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{item}</span>
                    {KEY_ITEMS.has(item) && (
                      <span className={`shrink-0 text-xs ${theme.text}`}>🔑 מפתח</span>
                    )}
                  </div>
                  {ITEM_INFO[item] && (
                    <p className="text-ink-dim mt-1 text-xs leading-relaxed">{ITEM_INFO[item]}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
          <p className="text-ink-dim mt-2 text-xs leading-relaxed">
            פריט המסומן כמפתח פותח בחירה כלשהי בהמשך העלילה. השאר הם רקע לסיפור.
          </p>

          <button
            type="button"
            onClick={onOpenSaveCode}
            className="border-void-600 bg-void-800 active:bg-void-700 mt-4 w-full rounded-xl border px-4 py-3 text-sm"
          >
            קוד שמירה למכשיר אחר
          </button>
        </div>
      )}
    </div>
  )
}
