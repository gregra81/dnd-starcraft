import { isChoiceAvailable } from '../engine/rules'
import { successChance } from '../engine/dice'
import { STAT_LABELS } from '../data/races'
import { GlossaryParagraphs } from './GlossaryText'
import { RACE_THEME } from './theme'
import { ENDING_COUNT } from '../data/story'
import type { Choice, GameState, StoryNode } from '../types'

interface Props {
  node: StoryNode
  state: GameState
  onChoose: (choice: Choice) => void
  onBack: () => void
  onRestart: () => void
}

/** מסך העלילה: כותרת, פסקאות וכפתורי בחירה בתחתית המסך. */
export function StoryView({ node, state, onChoose, onBack, onRestart }: Props) {
  const theme = state.raceId ? RACE_THEME[state.raceId] : RACE_THEME.terran

  return (
    // key על הצומת מפעיל מחדש את אנימציית המעבר בכל שינוי צומת
    <article key={node.id} className="animate-node-in mx-auto w-full max-w-xl px-4 pt-6 pb-12">
      <div className={`bg-gradient-to-b ${theme.gradient} to-transparent -mx-4 px-4 pb-4`}>
        <h1 className="text-2xl leading-snug font-extrabold">{node.title}</h1>
      </div>

      <div className="mt-4 flex flex-col gap-4 text-[17px] leading-8">
        <GlossaryParagraphs paragraphs={node.text} />
      </div>

      {node.ending ? (
        <div className="mt-10">
          <p className={`text-center text-lg font-extrabold ${theme.text}`}>הסוף</p>
          <p className="text-ink-dim mt-3 text-center text-sm leading-relaxed">
            הגעת לסוף של הסיפור. הסוף הזה הוא תוצאה של הבחירות שלך לאורך הדרך, ובחירות אחרות היו מביאות
            אותך לסוף אחר לגמרי.
            {state.raceId && ` לדמות הזאת יש ${ENDING_COUNT[state.raceId]} סופים שונים, ומצאת אחד מהם.`}
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="border-void-600 bg-void-800 active:bg-void-700 mt-5 w-full rounded-2xl border px-4 py-4 text-base font-semibold"
          >
            שחק שוב ותנסה דרך אחרת
          </button>
        </div>
      ) : (
        <nav className="mt-8 flex flex-col gap-3" aria-label="אפשרויות">
          {node.choices.map((choice, index) => {
            const { available, reason } = isChoiceAvailable(state, choice)
            return (
              <button
                key={index}
                type="button"
                disabled={!available}
                onClick={() => onChoose(choice)}
                className={`w-full rounded-2xl border px-4 py-4 text-right text-base transition-transform duration-150 ${
                  available
                    ? `border-void-600 bg-void-900 active:bg-void-800 active:scale-[0.99]`
                    : 'border-void-800 bg-void-900/40 text-ink-dim cursor-not-allowed'
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span>{choice.text}</span>
                  {choice.check && available && (
                    <span className={`shrink-0 text-xs ${theme.text}`}>
                      🎲 {choice.check.label}
                    </span>
                  )}
                  {!available && <span className="shrink-0 text-xs">🔒</span>}
                </span>
                {choice.check && available && (
                  // פירוט הבדיקה מראש: מה מוטל, איזה מדד נכנס, ומה הסיכוי בפועל
                  <span className="text-ink-dim mt-1 block text-xs">
                    {`קוביית d${choice.check.dice}`}
                    {choice.check.stat
                      ? ` + ${STAT_LABELS[choice.check.stat]} (${state.stats[choice.check.stat]})`
                      : ''}
                    {` · סף ${choice.check.target} · סיכוי ${Math.round(successChance(state, choice.check) * 100)}%`}
                  </span>
                )}
                {!available && reason && (
                  <span className="mt-1 block text-xs opacity-80">{reason}</span>
                )}
              </button>
            )
          })}
        </nav>
      )}

      {state.trail.length > 0 && !node.ending && (
        <button
          type="button"
          onClick={onBack}
          className="text-ink-dim mt-6 w-full py-2 text-center text-sm underline"
        >
          חזור לעמוד הקודם
        </button>
      )}
    </article>
  )
}
