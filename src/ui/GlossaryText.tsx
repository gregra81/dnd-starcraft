import { Fragment } from 'react'
import { GLOSSARY_PATTERN, matchEntry, wikiUrl } from '../data/glossary'

/**
 * מרנדר פסקאות עלילה וממיר מונחי סטארקראפט לקישורים לוויקי.
 * כל מונח מקושר בהופעה הראשונה שלו בעמוד בלבד, כדי לא להעמיס על הקריאה.
 */
export function GlossaryParagraphs({ paragraphs }: { paragraphs: string[] }) {
  const linked = new Set<string>()

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{renderParagraph(paragraph, linked)}</p>
      ))}
    </>
  )
}

function renderParagraph(text: string, linked: Set<string>) {
  const parts: React.ReactNode[] = []
  let cursor = 0

  for (const match of text.matchAll(GLOSSARY_PATTERN)) {
    const entry = matchEntry(match[0])
    if (!entry || linked.has(entry.wikiTitle)) continue

    const start = match.index
    linked.add(entry.wikiTitle)
    parts.push(<Fragment key={`t${start}`}>{text.slice(cursor, start)}</Fragment>)
    parts.push(
      <a
        key={`l${start}`}
        href={wikiUrl(entry)}
        target="_blank"
        rel="noopener noreferrer"
        title={`${entry.gloss} · ויקי סטארקראפט`}
        className="decoration-ink-dim/60 underline decoration-dotted underline-offset-4"
      >
        {match[0]}
      </a>,
    )
    cursor = start + match[0].length
  }

  parts.push(<Fragment key="tail">{text.slice(cursor)}</Fragment>)
  return parts
}
