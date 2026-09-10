import type { RaceId } from '../types'

/**
 * מחלקות Tailwind מלאות לכל גזע.
 * חשוב: המחלקות כתובות במלואן (ולא מורכבות דינמית) כדי שהסורק של Tailwind יזהה אותן.
 */
export const RACE_THEME: Record<
  RaceId,
  { text: string; border: string; bgSoft: string; gradient: string }
> = {
  terran: {
    text: 'text-terran',
    border: 'border-terran/50',
    bgSoft: 'bg-terran/10',
    gradient: 'from-terran/25',
  },
  zerg: {
    text: 'text-zerg',
    border: 'border-zerg/50',
    bgSoft: 'bg-zerg/10',
    gradient: 'from-zerg/25',
  },
  protoss: {
    text: 'text-protoss',
    border: 'border-protoss/50',
    bgSoft: 'bg-protoss/10',
    gradient: 'from-protoss/25',
  },
}
