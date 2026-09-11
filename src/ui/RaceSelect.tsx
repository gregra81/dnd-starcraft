import { RACE_LIST, STAT_LABELS, visibleStats } from '../data/races'
import { RACE_THEME } from './theme'
import type { RaceId } from '../types'

interface Props {
  onSelect: (raceId: RaceId) => void
  onOpenSaveCode: () => void
  onOpenHelp: () => void
}

/** מסך פתיחה: בחירת דמות/גזע. */
export function RaceSelect({ onSelect, onOpenSaveCode, onOpenHelp }: Props) {
  return (
    <div className="animate-fade-in mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-6 px-4 py-10">
      <header className="text-center">
        <p className="text-ink-dim text-xs tracking-[0.35em]">סקטור קופרולו · 2499</p>
        <h1 className="mt-2 text-4xl font-extrabold">כוכב הנחיל</h1>
        <p className="text-ink-dim mt-3 text-sm leading-relaxed">
          ספר משחק מעולם סטארקראפט. אתה בוחר דמות, ואתה מחליט מה קורה בסיפור. כל החלטה משנה את הסוף.
        </p>
      </header>

      <h2 className="text-ink-dim text-sm font-semibold">בחירת דמות</h2>

      <div className="flex flex-col gap-4">
        {RACE_LIST.map((race) => {
          const theme = RACE_THEME[race.id]
          return (
            <button
              key={race.id}
              type="button"
              onClick={() => onSelect(race.id)}
              className={`bg-void-900/80 active:bg-void-800 w-full rounded-2xl border ${theme.border} p-5 text-right transition-transform duration-150 active:scale-[0.985]`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className={`text-2xl font-extrabold ${theme.text}`}>{race.name}</span>
                <span className="text-ink-dim text-xs">{race.tagline}</span>
              </div>

              <p className="text-ink-dim mt-2 text-sm leading-relaxed">{race.description}</p>

              <dl className="mt-4 flex flex-wrap gap-2">
                {visibleStats(race.stats).map(([stat, value]) => (
                  <div
                    key={stat}
                    className={`flex items-center gap-1.5 rounded-full ${theme.bgSoft} px-3 py-1 text-xs`}
                  >
                    <dt className="text-ink-dim">{STAT_LABELS[stat]}</dt>
                    <dd className={`font-bold ${theme.text}`}>{value}</dd>
                  </div>
                ))}
              </dl>
            </button>
          )
        })}
      </div>

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
        className="text-ink-dim w-full py-2 text-center text-sm underline"
      >
        יש לי קוד שמירה
      </button>
    </div>
  )
}
