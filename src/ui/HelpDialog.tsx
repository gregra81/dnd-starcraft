import { GLOSSARY, wikiUrl } from '../data/glossary'
import { STAT_INFO, STAT_LABELS } from '../data/races'
import type { StatId } from '../types'

/**
 * מסך עזרה: מסביר כיצד המדדים, הפריטים והקוביה משפיעים על המשחק,
 * ומרכז את מונחי סטארקראפט עם קישור לוויקי.
 */
export function HelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="איך משחקים"
      className="animate-fade-in bg-void-950/85 fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm"
    >
      <div className="border-void-700 bg-void-900 mx-auto my-6 w-[calc(100%-1rem)] max-w-xl rounded-3xl border p-6">
        <h2 className="text-xl font-extrabold">איך משחקים</h2>

        <h3 className="mt-6 text-sm font-semibold">בדיקות קוביה</h3>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          בבחירה שמסומנת ב-🎲 מוטלת קוביה, ואליה מתווסף המדד הרלוונטי. אם הסכום מגיע לסף ההצלחה, נפתח נתיב
          אחד בעלילה; אם לא, נפתח נתיב אחר. אין מסלול שנחסם לגמרי בגלל כישלון, אבל המחיר שונה.
        </p>
        <p className="bg-void-800 mt-2 rounded-xl px-3 py-2 text-sm">
          הכלל: תוצאת ההטלה ועוד המדד צריכות להגיע לסף ההצלחה או לעבור אותו.
        </p>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          לפני הבחירה מוצגים סוג הקוביה, המדד שנכנס לחישוב, סף ההצלחה וסיכוי ההצלחה הנוכחי שלך באחוזים.
        </p>

        <h3 className="mt-6 text-sm font-semibold">מדדים</h3>
        <dl className="mt-2 flex flex-col gap-2">
          {(Object.keys(STAT_LABELS) as StatId[]).map((stat) => (
            <div key={stat} className="bg-void-800/60 rounded-xl px-3 py-2">
              <dt className="text-sm font-semibold">{STAT_LABELS[stat]}</dt>
              <dd className="text-ink-dim mt-1 text-sm leading-relaxed">{STAT_INFO[stat]}</dd>
            </div>
          ))}
        </dl>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          לכל גזע מדדי פתיחה משלו, והם משתנים במהלך המשחק: החלטות מוצלחות מעלות מדד, פציעות ונסיגות מורידות.
          מדד גבוה יותר משמעו סיכוי גבוה יותר בכל בדיקה שמשתמשת בו.
        </p>

        <h3 className="mt-6 text-sm font-semibold">מלאי</h3>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          פריטים נאספים תוך כדי העלילה. פריט שמסומן כ"מפתח" הוא תנאי לבחירה כלשהי בהמשך: בלעדיו הבחירה תופיע
          נעולה, עם הסבר מה חסר. פריטים אחרים הם רקע לסיפור ואינם נבדקים.
        </p>

        <h3 className="mt-6 text-sm font-semibold">בחירות נעולות</h3>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          בחירה נעולה מציגה 🔒 ואת הסיבה: פריט חסר, גזע אחר, מדד נמוך מדי, או נתיב שלא נפתח בהחלטות קודמות.
          זו דרך לראות מה הייתם מרוויחים במסלול אחר.
        </p>

        <h3 className="mt-6 text-sm font-semibold">מונחון סטארקראפט</h3>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          מונחים בעלילה מקושרים לוויקי של סטארקראפט ונפתחים בלשונית חדשה.
        </p>
        <ul className="mt-3 flex flex-col gap-1">
          {GLOSSARY.map((entry) => (
            <li key={entry.wikiTitle} className="text-sm">
              <a
                href={wikiUrl(entry)}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-ink-dim/60 font-semibold underline decoration-dotted underline-offset-4"
              >
                {entry.term}
              </a>
              <span className="text-ink-dim"> — {entry.gloss}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onClose}
          className="border-void-600 bg-void-800 active:bg-void-700 mt-6 w-full rounded-2xl border px-4 py-3 text-sm font-semibold"
        >
          סגור
        </button>
      </div>
    </div>
  )
}
