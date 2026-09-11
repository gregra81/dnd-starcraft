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
  { term: 'טראנים', aliases: ['טראן', 'טראנית', 'טראניים'], wikiTitle: 'Terran', gloss: 'בני אדם שהגיעו לחלק הזה של הגלקסיה מזמן' },
  { term: 'זרג', aliases: ['זרגי', 'זרגית', 'זרגיים'], wikiTitle: 'Zerg', gloss: 'גזע של יצורים שחיים כנחיל אחד ובולעים גזעים אחרים' },
  { term: 'פרוטוס', aliases: ['פרוטוסי', 'פרוטוסית', 'פרוטוסים'], wikiTitle: 'Protoss', gloss: 'גזע עתיק וחזק שמדבר במחשבות, מכוכב אייר' },
  { term: 'מאר סארה', wikiTitle: 'Mar Sara', gloss: 'כוכב כרייה קטן בקצה החלל' },
  { term: 'בקוואטר', wikiTitle: 'Backwater Station', gloss: 'תחנה קטנה במאר סארה, שם ראו את הזרג בפעם הראשונה' },
  { term: 'ריינור', aliases: ['ג׳ים ריינור'], wikiTitle: 'Jim Raynor', gloss: 'השריף של מאר סארה, ואחר כך מנהיג של לוחמים' },
  { term: 'מנגסק', aliases: ['ארקטורוס מנגסק'], wikiTitle: 'Arcturus Mengsk', gloss: 'מנהיג המרד, ואחר כך הקיסר של הדומיניון' },
  { term: 'קרייגן', aliases: ['שרה קרייגן'], wikiTitle: 'Sarah Kerrigan', gloss: 'לוחמת של הקונפדרציה שיודעת לקרוא מחשבות' },
  { term: 'הקונפדרציה', aliases: ['קונפדרציה', 'קונפדרלי', 'קונפדרלית'], wikiTitle: 'Terran Confederacy', gloss: 'השלטון של בני האדם, לפני שהכל התפרק' },
  { term: 'בני קורהאל', wikiTitle: 'Sons of Korhal', gloss: 'קבוצת הלוחמים של מנגסק שנלחמת בקונפדרציה' },
  { term: 'הדומיניון', aliases: ['דומיניון', 'דומיניוני'], wikiTitle: 'Terran Dominion', gloss: 'הקיסרות שמנגסק הקים אחרי שהקונפדרציה נפלה' },
  {
    term: 'דיוק',
    aliases: ['אדמונד דיוק'],
    wikiTitle: 'Edmund Duke',
    gloss: 'קצין בכיר בצבא הקונפדרציה',
    exactOnly: true,
  },
  { term: 'הידרליסק', aliases: ['הידרליסקים'], wikiTitle: 'Hydralisk', gloss: 'יצור זרגי עם קשקשים, שיורה קוצים מהגוף שלו' },
  { term: 'זרלינג', aliases: ['זרלינגים'], wikiTitle: 'Zergling', gloss: 'יצור זרגי קטן ומהיר מאוד, עם שיניים גדולות' },
  { term: 'מוטליסק', aliases: ['מוטליסקים'], wikiTitle: 'Mutalisk', gloss: 'יצור זרגי מעופף' },
  { term: 'אוברלורד', aliases: ['אוברלורדים'], wikiTitle: 'Overlord', gloss: 'יצור זרגי גדול שמרחף באוויר ומסתכל למטה' },
  { term: 'אולטרליסקים', aliases: ['אולטרליסק'], wikiTitle: 'Ultralisk', gloss: 'יצור זרגי ענק וכבד, עם להבים במקום ידיים' },
  { term: 'צרברייט', aliases: ['צרברייטים'], wikiTitle: 'Cerebrate', gloss: 'מוח זרגי שמנהל חלק מהנחיל בשביל המוח-העל' },
  { term: 'המוח-העל', aliases: ['מוח-העל'], wikiTitle: 'Overmind', gloss: 'הראש הגדול שמנהל את כל הזרג בגלקסיה' },
  { term: 'דגות׳', wikiTitle: 'Daggoth', gloss: 'הצרברייט הכי ותיק ומנוסה בנחיל' },
  { term: 'הקרום', aliases: ['קרום'], wikiTitle: 'Creep', gloss: 'העור הסגול והחם שהזרג פורשים על האדמה' },
  { term: 'הגולם', aliases: ['גולם'], wikiTitle: 'Chrysalis', gloss: 'התרמיל הקשה שבתוכו נוצרה מלכת הלהבים' },
  { term: 'בריכות לידה', aliases: ['בריכת לידה'], wikiTitle: 'Spawning pool', gloss: 'מקום שבו הזרג מגדלים לוחמים חדשים' },
  { term: 'צ׳אר', wikiTitle: 'Char', gloss: 'כוכב של אש ולבה שהפך לבית של הנחיל' },
  { term: 'אייר', wikiTitle: 'Aiur', gloss: 'כוכב הבית של הפרוטוס' },
  { term: 'טרסוניס', wikiTitle: 'Tarsonis', gloss: 'עיר הבירה של הקונפדרציה' },
  { term: 'אנטיגה פריים', aliases: ['אנטיגה'], wikiTitle: 'Antiga Prime', gloss: 'מושבה שמרדה בקונפדרציה' },
  { term: 'צ׳או סארה', wikiTitle: 'Chau Sara', gloss: 'המושבה הראשונה שהפרוטוס שרפו' },
  { term: 'שאקוראס', wikiTitle: 'Shakuras', gloss: 'הכוכב שבו חיים טמפלרי האופל' },
  { term: 'זראטול', wikiTitle: 'Zeratul', gloss: 'המנהיג של טמפלרי האופל' },
  { term: 'טסאדאר', wikiTitle: 'Tassadar', gloss: 'המפקד של הצי הפרוטוסי' },
  { term: 'אלדריס', wikiTitle: 'Aldaris', gloss: 'שופט בכיר בקונקלייב' },
  { term: 'פניקס', wikiTitle: 'Fenix', gloss: 'לוחם פרוטוסי שחזר לקרב בתוך מכונת דראגון' },
  { term: 'טמפלרי האופל', aliases: ['טמפלר האופל', 'טמפלרי אופל'], wikiTitle: 'Dark Templar', gloss: 'פרוטוסים שגורשו מאייר וניתקו את עצמם מהקאלה' },
  { term: 'הקאלה', aliases: ['קאלה'], wikiTitle: 'Khala', gloss: 'החיבור המחשבתי שמחבר את כל הפרוטוס ביחד' },
  { term: 'הקונקלייב', aliases: ['קונקלייב'], wikiTitle: 'Conclave', gloss: 'המועצה ששולטת בפרוטוס באייר' },
  { term: 'דראגון', wikiTitle: 'Dragoon', gloss: 'מכונת קרב מהלכת, ללוחם שהגוף שלו נפצע קשה מדי' },
  { term: 'זילוטים', aliases: ['זילוט'], wikiTitle: 'Zealot', gloss: 'לוחם פרוטוסי עם שני להבי אנרגיה שיוצאים מהזרועות' },
  { term: 'קריסטל חאידרין', aliases: ['קריסטל חאידרין שבור'], wikiTitle: 'Khaydarin crystal', gloss: 'קריסטל שאוגר בתוכו כוח מחשבה עצום' },
  { term: 'הגאנטריתור', aliases: ['גאנטריתור'], wikiTitle: 'Gantrithor', gloss: 'ספינת הדגל הענקית של טסאדאר' },
  { term: 'ההייפריון', aliases: ['הייפריון'], wikiTitle: 'Hyperion', gloss: 'ספינת הקרב של מנגסק, ואחר כך של ריינור' },
  { term: 'משדר פסיוני', aliases: ['המשדר הפסיוני'], wikiTitle: 'Psi emitter', gloss: 'מכשיר ששולח אות שמושך אליו את הזרג' },
  { term: 'רפאים', aliases: ['רפאית'], wikiTitle: 'Ghost', gloss: 'מרגל טראני שיודע להיעלם ולקרוא מחשבות' },
  { term: 'מרינס', aliases: ['מרינ׳', 'מרינים'], wikiTitle: 'Marine', gloss: 'חייל טראני רגיל, בשריון קרב כבד' },
  { term: 'שער מעבר', aliases: ['שערי המעבר', 'שערי מעבר', 'השער'], wikiTitle: 'Warp gate', gloss: 'שער פרוטוסי שמעביר אותך בין כוכבים ברגע אחד' },
  { term: 'מלכת הלהבים', wikiTitle: 'Queen of Blades', gloss: 'מה שקרייגן הפכה להיות אחרי שהזרג לקחו אותה' },
  { term: 'סקטור קופרולו', wikiTitle: 'Koprulu Sector', gloss: 'אזור החלל שבו קורית כל המלחמה' },
  { term: 'להקה', aliases: ['להקות'], wikiTitle: 'Brood', gloss: 'קבוצה של יצורי נחיל ששייכת לצרברייט אחד' },
  { term: 'צופה', wikiTitle: 'Observer', gloss: 'רחפן ריגול פרוטוסי שאי אפשר לראות אותו' },
  { term: 'קשתות פוטון', aliases: ['קשת פוטון'], wikiTitle: 'Photon cannon', gloss: 'מגדל הגנה פרוטוסי שיורה אנרגיה' },
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
