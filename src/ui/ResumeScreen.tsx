import { RACES } from '../data/races'
import { getNode } from '../data/story'
import { RACE_THEME } from './theme'
import { formatLastPlayed } from './time'
import type { GameState } from '../types'

interface Props {
  state: GameState
  onContinue: () => void
  onNewGame: () => void
  onOpenSaveCode: () => void
  onOpenHelp: () => void
}

/** מסך פתיחה למי שכבר התחיל לשחק: המשך מהמקום שבו הפסיק. */
export function ResumeScreen({ state, onContinue, onNewGame, onOpenSaveCode, onOpenHelp }: Props) {
  const race = RACES[state.raceId!]
  const node = getNode(state.nodeId!)
  const theme = RACE_THEME[race.id]

  return (
    <div className="animate-fade-in mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center gap-6 px-4 py-10">
      <header className="text-center">
        <p className="text-ink-dim text-xs tracking-[0.35em]">סקטור קופרולו · 2499</p>
        <h1 className="mt-2 text-4xl font-extrabold">כוכב הנחיל</h1>
      </header>

      <section className={`bg-void-900/80 rounded-2xl border ${theme.border} p-5`}>
        <p className="text-ink-dim text-xs">המשחק השמור שלך</p>
        <p className={`mt-1 text-2xl font-extrabold ${theme.text}`}>{race.name}</p>
        <p className="mt-3 text-base">{node?.title}</p>
        <dl className="text-ink-dim mt-4 flex flex-wrap gap-2 text-xs">
          <div className="bg-void-800 rounded-full px-3 py-1">
            <dt className="inline">שוחק לאחרונה: </dt>
            <dd className="inline">{formatLastPlayed(state.updatedAt)}</dd>
          </div>
          <div className="bg-void-800 rounded-full px-3 py-1">
            <dt className="inline">עמודים שנקראו: </dt>
            <dd className="inline">{state.visited.length}</dd>
          </div>
          <div className="bg-void-800 rounded-full px-3 py-1">
            <dt className="inline">פריטים: </dt>
            <dd className="inline">{state.inventory.length}</dd>
          </div>
        </dl>
      </section>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="border-void-600 bg-void-800 active:bg-void-700 w-full rounded-2xl border px-4 py-4 text-base font-semibold transition-transform duration-150 active:scale-[0.99]"
        >
          המשך מהמקום שבו הפסקת
        </button>
        <button
          type="button"
          onClick={onOpenHelp}
          className="border-void-700 bg-void-900 active:bg-void-800 w-full rounded-2xl border px-4 py-3 text-sm"
        >
          איך משחקים: מדדים, פריטים וקוביה
        </button>
        <button
          type="button"
          onClick={onOpenSaveCode}
          className="border-void-700 bg-void-900 active:bg-void-800 w-full rounded-2xl border px-4 py-3 text-sm"
        >
          קוד שמירה למכשיר אחר
        </button>
        <button
          type="button"
          onClick={onNewGame}
          className="text-ink-dim w-full py-2 text-center text-sm underline"
        >
          התחל משחק חדש
        </button>
      </div>
    </div>
  )
}
