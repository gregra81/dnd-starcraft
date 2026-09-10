/**
 * טיפוסי הליבה של מנוע ספר-המשחק.
 * העלילה מיוצגת כגרף צמתים (Nodes) הניתן להרחבה למאות צמתים
 * מבלי לשנות את המנוע עצמו.
 */

export type RaceId = 'terran' | 'zerg' | 'protoss'

/** מזהי המדדים. כל גזע משתמש בתת-קבוצה משמעותית עבורו. */
export type StatId = 'tactics' | 'endurance' | 'psionic' | 'swarm'

export interface Race {
  id: RaceId
  /** שם הגזע בעברית */
  name: string
  /** שורת תיאור קצרה למסך הבחירה */
  tagline: string
  description: string
  /** מחלקת צבע (Tailwind token) לזיהוי ויזואלי */
  accent: string
  stats: Record<StatId, number>
  startingItems: string[]
  /** מזהה צומת הפתיחה של הגזע */
  startNodeId: string
}

/** תנאי לפתיחת בחירה. כל השדות שמוגדרים חייבים להתקיים יחד. */
export interface Requirement {
  /** פריט שחייב להיות במלאי */
  item?: string
  /** גזע מסוים בלבד */
  race?: RaceId
  /** דגל עלילתי שהופעל בעבר */
  flag?: string
  /** דגל שאסור שיהיה פעיל */
  notFlag?: string
  /** ערך מינימלי במדד */
  minStat?: { stat: StatId; value: number }
}

/** בדיקת קוביה המשובצת ישירות בבחירה. */
export interface DiceCheck {
  dice: 6 | 20
  /** מדד שמתווסף לתוצאת ההטלה (אופציונלי) */
  stat?: StatId
  /** סף ההצלחה: הטלה + מדד >= target */
  target: number
  /** כותרת הבדיקה, למשל "בדיקת מזל" או "בדיקת קרב" */
  label: string
  successNodeId: string
  failureNodeId: string
}

export interface Choice {
  text: string
  /** יעד ישיר. חובה אלא אם קיימת בדיקת קוביה. */
  to?: string
  check?: DiceCheck
  requires?: Requirement
}

/** שינויי מצב המוחלים בכניסה לצומת (פעם אחת לכל ביקור). */
export interface Effects {
  addItems?: string[]
  removeItems?: string[]
  /** שינוי יחסי במדדים, למשל { endurance: -1 } */
  stats?: Partial<Record<StatId, number>>
  addFlags?: string[]
}

export interface StoryNode {
  id: string
  title: string
  /** פסקאות הטקסט של הצומת */
  text: string[]
  choices: Choice[]
  effects?: Effects
  /** צומת סיום — מוצג כסוף פרק עם אפשרות התחלה מחדש */
  ending?: boolean
}

export type StoryGraph = Record<string, StoryNode>

export interface RollResult {
  dice: 6 | 20
  rolled: number
  bonus: number
  total: number
  target: number
  success: boolean
  label: string
}

export interface GameState {
  raceId: RaceId | null
  nodeId: string | null
  stats: Record<StatId, number>
  inventory: string[]
  flags: string[]
  /** מזהי הצמתים שכבר בוקרו — מונע החלה כפולה של אפקטים */
  visited: string[]
  /** מסלול הצמתים שנעברו בפועל, לצורך חזרה צעד אחורה */
  trail: string[]
  /** חותמת הזמן של השמירה האחרונה (מילישניות) */
  updatedAt: number
}
