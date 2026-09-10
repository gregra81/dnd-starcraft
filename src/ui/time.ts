const ABSOLUTE = new Intl.DateTimeFormat('he-IL', { dateStyle: 'short', timeStyle: 'short' })

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * ניסוח עברי של "מתי שיחקת לאחרונה".
 * כתוב ידנית ולא דרך Intl.RelativeTimeFormat, כי הניסוח שלה בעברית
 * מוסיף מספר בסוגריים ("לפני דקה (1)").
 */
export function formatLastPlayed(timestamp: number): string {
  if (!timestamp) return 'לא ידוע'

  const diff = Date.now() - timestamp
  if (diff < MINUTE) return 'לפני רגע'

  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE)
    if (minutes === 1) return 'לפני דקה'
    if (minutes === 2) return 'לפני שתי דקות'
    return `לפני ${minutes} דקות`
  }

  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR)
    if (hours === 1) return 'לפני שעה'
    if (hours === 2) return 'לפני שעתיים'
    return `לפני ${hours} שעות`
  }

  const days = Math.floor(diff / DAY)
  if (days === 1) return 'אתמול'
  if (days === 2) return 'לפני יומיים'
  if (days < 7) return `לפני ${days} ימים`

  return ABSOLUTE.format(timestamp)
}
