/**
 * מונחי סטארקראפט שמופיעים בעלילה, עם קישור לערך המתאים בוויקי.
 * הקישור נפתח בלשונית חדשה, ומוצג רק בהופעה הראשונה של המונח בעמוד.
 */
export interface GlossaryEntry {
  /** הצורה הראשית של המונח בעברית */
  term: string
  /** צורות נוספות (נטיות, רבים, שם מלא מול שם משפחה) */
  aliases?: string[]
  /** שם הערך בוויקי האנגלי */
  wikiTitle: string
  /** הסבר קצר לקורא העברי */
  gloss: string
  /**
   * מונח שאסור לזהות עם אות שימוש בתחילתו, כי הצורה המוטה
   * היא מילה עברית רגילה (למשל "בדיוק" מול "דיוק").
   */
  exactOnly?: boolean
}

export const GLOSSARY: GlossaryEntry[] = [
  { term: 'טראנים', aliases: ['טראן', 'טראנית', 'טראניים'], wikiTitle: 'Terran', gloss: 'בני אדם שהוגלו לסקטור קופרולו' },
  { term: 'זרג', aliases: ['זרגי', 'זרגית', 'זרגיים'], wikiTitle: 'Zerg', gloss: 'גזע הנחיל המשתלט על מינים אחרים' },
  { term: 'פרוטוס', aliases: ['פרוטוסי', 'פרוטוסית', 'פרוטוסים'], wikiTitle: 'Protoss', gloss: 'גזע פסיוני עתיק מכוכב אייר' },
  { term: 'מאר סארה', wikiTitle: 'Mar Sara', gloss: 'עולם כרייה בשולי הקונפדרציה' },
  { term: 'בקוואטר', wikiTitle: 'Backwater Station', gloss: 'תחנה במאר סארה שבה התגלתה ההדבקה' },
  { term: 'ריינור', aliases: ['ג׳ים ריינור'], wikiTitle: 'Jim Raynor', gloss: 'מרשל מאר סארה, ולימים מנהיג הפושטים' },
  { term: 'מנגסק', aliases: ['ארקטורוס מנגסק'], wikiTitle: 'Arcturus Mengsk', gloss: 'מנהיג בני קורהאל וקיסר הדומיניון' },
  { term: 'קרייגן', aliases: ['שרה קרייגן'], wikiTitle: 'Sarah Kerrigan', gloss: 'רפאית טלפתית של הקונפדרציה' },
  { term: 'הקונפדרציה', aliases: ['קונפדרציה', 'קונפדרלי', 'קונפדרלית'], wikiTitle: 'Terran Confederacy', gloss: 'המשטר הטראני ששלט בסקטור' },
  { term: 'בני קורהאל', wikiTitle: 'Sons of Korhal', gloss: 'תנועת המרד של מנגסק' },
  { term: 'הדומיניון', aliases: ['דומיניון', 'דומיניוני'], wikiTitle: 'Terran Dominion', gloss: 'הקיסרות שהקים מנגסק אחרי טרסוניס' },
  {
    term: 'דיוק',
    aliases: ['אדמונד דיוק'],
    wikiTitle: 'Edmund Duke',
    gloss: 'קולונל קונפדרלי בכיר',
    exactOnly: true,
  },
  { term: 'הידרליסק', aliases: ['הידרליסקים'], wikiTitle: 'Hydralisk', gloss: 'יצור זרגי יורה קוצי חיטין' },
  { term: 'זרלינג', aliases: ['זרלינגים'], wikiTitle: 'Zergling', gloss: 'יצור תקיפה זרגי מהיר וזול' },
  { term: 'מוטליסק', aliases: ['מוטליסקים'], wikiTitle: 'Mutalisk', gloss: 'יצור מעופף של הנחיל' },
  { term: 'אוברלורד', aliases: ['אוברלורדים'], wikiTitle: 'Overlord', gloss: 'יצור זרגי מרחף המשמש לחישה ולשליטה' },
  { term: 'אולטרליסקים', aliases: ['אולטרליסק'], wikiTitle: 'Ultralisk', gloss: 'יצור זרגי ענק וכבד' },
  { term: 'צרברייט', aliases: ['צרברייטים'], wikiTitle: 'Cerebrate', gloss: 'תודעה זרגית המנהלת נחיל תחת המוח-העל' },
  { term: 'המוח-העל', aliases: ['מוח-העל'], wikiTitle: 'Overmind', gloss: 'התודעה המרכזית של הנחיל כולו' },
  { term: 'דגות׳', wikiTitle: 'Daggoth', gloss: 'הצרברייט הבכיר והוותיק בנחיל' },
  { term: 'הקרום', aliases: ['קרום'], wikiTitle: 'Creep', gloss: 'הרקמה הסגולה שהזרג פורשים על הקרקע' },
  { term: 'הגולם', aliases: ['גולם'], wikiTitle: 'Chrysalis', gloss: 'תרמיל החיטין שבו נוצרה מלכת הלהבים' },
  { term: 'בריכות לידה', aliases: ['בריכת לידה'], wikiTitle: 'Spawning pool', gloss: 'מבנה זרגי שבו נולדים לוחמים חדשים' },
  { term: 'צ׳אר', wikiTitle: 'Char', gloss: 'עולם געשי שהפך למרכז הנחיל' },
  { term: 'אייר', wikiTitle: 'Aiur', gloss: 'עולם המולדת של הפרוטוס' },
  { term: 'טרסוניס', wikiTitle: 'Tarsonis', gloss: 'בירת הקונפדרציה הטראנית' },
  { term: 'אנטיגה פריים', aliases: ['אנטיגה'], wikiTitle: 'Antiga Prime', gloss: 'מושבה שמרדה בקונפדרציה' },
  { term: 'צ׳או סארה', wikiTitle: 'Chau Sara', gloss: 'המושבה הראשונה שהפרוטוס טיהרו' },
  { term: 'שאקוראס', wikiTitle: 'Shakuras', gloss: 'עולמם של טמפלרי האופל' },
  { term: 'זראטול', wikiTitle: 'Zeratul', gloss: 'מנהיג טמפלרי האופל' },
  { term: 'טסאדאר', wikiTitle: 'Tassadar', gloss: 'מפקד הצי הפרוטוסי מעל צ׳או סארה' },
  { term: 'אלדריס', wikiTitle: 'Aldaris', gloss: 'שופט בכיר בקונקלייב' },
  { term: 'פניקס', wikiTitle: 'Fenix', gloss: 'לוחם פרוטוסי שחזר לקרב כדראגון' },
  { term: 'טמפלרי האופל', aliases: ['טמפלר האופל', 'טמפלרי אופל'], wikiTitle: 'Dark Templar', gloss: 'פרוטוסים גולים שניתקו את עצמם מהקאלה' },
  { term: 'הקאלה', aliases: ['קאלה'], wikiTitle: 'Khala', gloss: 'הזרם הפסיוני המחבר את הפרוטוס' },
  { term: 'הקונקלייב', aliases: ['קונקלייב'], wikiTitle: 'Conclave', gloss: 'הנהגת הפרוטוס באייר' },
  { term: 'דראגון', wikiTitle: 'Dragoon', gloss: 'מעטפת קרב מהלכת ללוחם פצוע אנושות' },
  { term: 'זילוטים', aliases: ['זילוט'], wikiTitle: 'Zealot', gloss: 'לוחם פרוטוסי עם להבי פסי' },
  { term: 'קריסטל חאידרין', aliases: ['קריסטל חאידרין שבור'], wikiTitle: 'Khaydarin crystal', gloss: 'קריסטל המרכז אנרגיה פסיונית' },
  { term: 'הגאנטריתור', aliases: ['גאנטריתור'], wikiTitle: 'Gantrithor', gloss: 'ספינת הדגל של טסאדאר' },
  { term: 'ההייפריון', aliases: ['הייפריון'], wikiTitle: 'Hyperion', gloss: 'ספינת הקרב של מנגסק, ולימים של ריינור' },
  { term: 'משדר פסיוני', aliases: ['המשדר הפסיוני'], wikiTitle: 'Psi emitter', gloss: 'מכשיר שמושך אליו את הנחיל' },
  { term: 'רפאים', aliases: ['רפאית'], wikiTitle: 'Ghost', gloss: 'יחידת מודיעין טראנית עם יכולות פסיוניות' },
  { term: 'מרינס', aliases: ['מרינ׳', 'מרינים'], wikiTitle: 'Marine', gloss: 'חייל רגלים טראני בשריון קרב' },
  { term: 'שער מעבר', aliases: ['שערי המעבר', 'שערי מעבר', 'השער'], wikiTitle: 'Warp gate', gloss: 'שער פרוטוסי למעבר מיידי בין עולמות' },
  { term: 'מלכת הלהבים', wikiTitle: 'Queen of Blades', gloss: 'הצורה הזרגית של שרה קרייגן' },
  { term: 'סקטור קופרולו', wikiTitle: 'Koprulu Sector', gloss: 'אזור החלל שבו מתרחשת המלחמה' },
  { term: 'נימה', aliases: ['נימות'], wikiTitle: 'Brood', gloss: 'תת-נחיל שנתון לצרברייט אחד' },
  { term: 'צופה', wikiTitle: 'Observer', gloss: 'רחפן ריגול פרוטוסי בלתי נראה' },
  { term: 'קשתות פוטון', aliases: ['קשת פוטון'], wikiTitle: 'Photon cannon', gloss: 'מגדל הגנה פרוטוסי' },
]

const WIKI_BASE = 'https://starcraft.fandom.com/wiki/'

export function wikiUrl(entry: GlossaryEntry): string {
  return WIKI_BASE + encodeURIComponent(entry.wikiTitle.replace(/ /g, '_'))
}

/** כל הצורות שיש לזהות בטקסט, מהארוכה לקצרה כדי שצירופים ינצחו מילה בודדת. */
const VARIANTS: { variant: string; entry: GlossaryEntry }[] = GLOSSARY.flatMap((entry) =>
  [entry.term, ...(entry.aliases ?? [])].map((variant) => ({ variant, entry })),
).sort((a, b) => b.variant.length - a.variant.length)

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const alternation = (items: typeof VARIANTS) => items.map((item) => escape(item.variant)).join('|')

/**
 * הביטוי מוודא שהמונח אינו חלק ממילה עברית ארוכה יותר.
 * אותיות השימוש (ו, ה, ב, ל, מ, ש, כ) מותרות כתחילית,
 * חוץ ממונחים שסומנו exactOnly.
 */
export const GLOSSARY_PATTERN = new RegExp(
  `(?<![א-ת])(?:[והבלמשכ]?(?:${alternation(
    VARIANTS.filter((item) => !item.entry.exactOnly),
  )})|(?:${alternation(VARIANTS.filter((item) => item.entry.exactOnly))}))(?![א-ת])`,
  'g',
)

/** מאתר את הערך המתאים לטקסט שנתפס, גם כשיש אות שימוש בתחילתו. */
export function matchEntry(text: string): GlossaryEntry | undefined {
  const direct = VARIANTS.find((item) => item.variant === text)
  if (direct) return direct.entry
  const trimmed = text.slice(1)
  return VARIANTS.find((item) => item.variant === trimmed)?.entry
}
