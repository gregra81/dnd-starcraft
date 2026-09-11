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
          בבחירה שמסומנת ב-🎲 מטילים קוביה, ומוסיפים לתוצאה את המדד המתאים. אם הסכום מגיע למספר שצריך,
          הסיפור הולך לכיוון אחד. אם לא — הוא הולך לכיוון אחר. כישלון אף פעם לא עוצר את המשחק, אבל הוא
          עולה לך במשהו.
        </p>
        <p className="bg-void-800 mt-2 rounded-xl px-3 py-2 text-sm">
          הכלל: תוצאת הקוביה ועוד המדד צריכות להגיע למספר שצריך, או לעבור אותו.
        </p>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          לפני שבוחרים אפשר לראות איזו קוביה מטילים, איזה מדד נכנס לחשבון, איזה מספר צריך להשיג, ומה
          הסיכוי שלך להצליח באחוזים.
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
          לכל גזע יש מדדי פתיחה משלו, והם משתנים תוך כדי המשחק: החלטות טובות מעלות מדד, פציעות ובריחות
          מורידות. ככל שהמדד גבוה יותר, כך קל יותר להצליח בכל בדיקה שמשתמשת בו.
        </p>

        <h3 className="mt-6 text-sm font-semibold">מלאי</h3>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          פריטים נאספים תוך כדי הסיפור. פריט שכתוב עליו "מפתח" פותח בחירה מסוימת בהמשך — בלעדיו הבחירה
          תופיע נעולה, עם הסבר מה חסר. שאר הפריטים הם חלק מהסיפור בלבד.
        </p>

        <h3 className="mt-6 text-sm font-semibold">בחירות נעולות</h3>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          בחירה נעולה מציגה 🔒 ואת הסיבה: חסר לך פריט, זה שייך לגזע אחר, המדד נמוך מדי, או שלא עשית קודם
          משהו שפותח את הדרך הזאת. ככה אפשר לראות מה היה קורה בדרך אחרת.
        </p>

        <h3 className="mt-6 text-sm font-semibold">מונחון סטארקראפט</h3>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          מילים מעולם סטארקראפט מקושרות לוויקי ונפתחות בלשונית חדשה.
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
