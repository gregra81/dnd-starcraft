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
  tactics: 'תכנון, תזמון וניווט כוחות. מתווספת להטלה בבדיקות של פריצה, נחיתה ופינוי.',
  endurance: 'עמידות תחת אש ובקרב ממושך. מתווספת להטלה כשצריך להחזיק קו או לספוג.',
  psionic: 'עוצמה תודעתית. מתווסף להטלה במגע פסיוני, בחיפוש אחר נסתרים ובקרב פרוטוסי.',
  swarm: 'השליטה שלך בנחיל. מתווספת להטלה כשמציפים, מדביקים או סוגרים מעגל.',
}

/** המדדים הרלוונטיים להצגה לכל גזע (מדד בערך 0 אינו מוצג). */
export const RACES: Record<RaceId, Race> = {
  terran: {
    id: 'terran',
    name: 'טראן',
    tagline: 'מושל מושבה בשולי הקונפדרציה',
    description:
      'בני אדם שהוגלו אל סקטור קופרולו. אתה המושל של מאר סארה: מעט חיילים, הרבה אחריות, ואות מצוקה שאיש אינו מבין.',
    accent: 'terran',
    stats: { tactics: 4, endurance: 3, psionic: 1, swarm: 0 },
    startingItems: ['תג המושל', 'משדר שדה'],
    startNodeId: 'ter_start',
  },
  zerg: {
    id: 'zerg',
    name: 'זרג',
    tagline: 'צרברייט צעיר תחת המוח-העל',
    description:
      'נולדת זה עתה מבשר הנחיל. אין לך גוף משלך, רק רצון קולקטיבי ומיליוני ניבים המצייתים למחשבתך.',
    accent: 'zerg',
    stats: { tactics: 2, endurance: 4, psionic: 2, swarm: 5 },
    startingItems: ['חותם המוח-העל'],
    startNodeId: 'zer_start',
  },
  protoss: {
    id: 'protoss',
    name: 'פרוטוס',
    tagline: 'מפקד משנה בצי של טסאדאר',
    description:
      'בן אייר, קשור בקאלה. הקונקלייב דורש טיהור בכל מחיר, אך טסאדאר מהסס — ואתה עומד בין השניים.',
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
