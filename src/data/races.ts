import type { Race, RaceId, StatId } from '../types'

/** תוויות המדדים בעברית, לתצוגה בשורת המצב. */
export const STAT_LABELS: Record<StatId, string> = {
  tactics: 'טקטיקה',
  endurance: 'סיבולת',
  psionic: 'כוח פסיוני',
  swarm: 'אנרגיית הנחיל',
}

/** מה כל מדד עושה בפועל: הוא מתווסף להטלת הקוביה בבדיקות מהסוג הזה. */
export const STAT_INFO: Record<StatId, string> = {
  tactics: 'תכנון וניווט. מתווספת להטלה כשצריך לתזמן נכון, לפרוץ פנימה, לנחות או להוציא אנשים.',
  endurance: 'כמה מכות אתה סופג וממשיך. מתווספת להטלה כשצריך להחזיק מעמד בקרב ארוך.',
  psionic: 'כוח המחשבה שלך. מתווסף להטלה כשנוגעים במחשבות של אחרים, כשמחפשים משהו מוסתר, וכשנלחמים כפרוטוס.',
  swarm: 'כמה הנחיל מקשיב לך. מתווספת להטלה כשמציפים מקום ביצורים או סוגרים על מישהו מעגל.',
}

/** המדדים הרלוונטיים להצגה לכל גזע (מדד בערך 0 אינו מוצג). */
export const RACES: Record<RaceId, Race> = {
  terran: {
    id: 'terran',
    name: 'טראן',
    tagline: 'מושל של מושבה קטנה בקצה החלל',
    description:
      'בני אדם שהגיעו לחלק הזה של הגלקסיה מזמן. אתה המושל של מאר סארה: מעט חיילים, הרבה אחריות, ואות מצוקה שאף אחד לא מצליח להבין.',
    accent: 'terran',
    stats: { tactics: 4, endurance: 3, psionic: 1, swarm: 0 },
    startingItems: ['תג המושל', 'משדר שדה'],
    startNodeId: 'ter_start',
  },
  zerg: {
    id: 'zerg',
    name: 'זרג',
    tagline: 'צרברייט צעיר שנולד זה עתה',
    description:
      'נולדת עכשיו מתוך הבשר של הנחיל. אין לך גוף משלך — יש לך מיליוני יצורים שעושים בדיוק מה שאתה חושב.',
    accent: 'zerg',
    stats: { tactics: 2, endurance: 4, psionic: 2, swarm: 5 },
    startingItems: ['חותם המוח-העל'],
    startNodeId: 'zer_start',
  },
  protoss: {
    id: 'protoss',
    name: 'פרוטוס',
    tagline: 'קצין בצי של טסאדאר',
    description:
      'נולדת באייר ומחובר לקאלה. הקונקלייב דורש לשרוף הכל, טסאדאר מהסס, ואתה עומד בדיוק באמצע.',
    accent: 'protoss',
    stats: { tactics: 3, endurance: 3, psionic: 5, swarm: 0 },
    startingItems: ['להב פסיוני', 'מוקד קאלה'],
    startNodeId: 'pro_start',
  },
}

export const RACE_LIST: Race[] = [RACES.terran, RACES.zerg, RACES.protoss]

/** מדדים בעלי משמעות לתצוגה — מסנן מדדים אפסיים. */
export function visibleStats(stats: Record<StatId, number>): [StatId, number][] {
  return (Object.keys(STAT_LABELS) as StatId[])
    .filter((stat) => stats[stat] > 0)
    .map((stat) => [stat, stats[stat]])
}
