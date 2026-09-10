import { useState } from 'react'
import { decodeSaveCode, encodeSaveCode } from '../engine/saveCode'
import type { GameState } from '../types'

interface Props {
  state: GameState
  onRestore: (state: GameState) => void
  onClose: () => void
}

/**
 * קוד שמירה נייד: מציג את הקוד הנוכחי להעתקה, ומאפשר להדביק
 * קוד מדפדפן או ממכשיר אחר ולהמשיך את המשחק ממנו.
 */
export function SaveCodeDialog({ state, onRestore, onClose }: Props) {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const code = encodeSaveCode(state)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      setError('הדפדפן חסם את ההעתקה. סמן את הקוד והעתק ידנית.')
    }
  }

  function restore() {
    const restored = decodeSaveCode(input)
    if (!restored) {
      setError('הקוד אינו תקין או שאינו שייך לגרסת העלילה הזו.')
      return
    }
    onRestore(restored)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="קוד שמירה"
      className="animate-fade-in bg-void-950/85 fixed inset-0 z-50 flex items-end justify-center backdrop-blur-sm sm:items-center"
    >
      <div className="border-void-700 bg-void-900 w-full max-w-xl rounded-t-3xl border p-6 pb-10 sm:rounded-3xl sm:pb-6">
        <h2 className="text-lg font-extrabold">קוד שמירה</h2>
        <p className="text-ink-dim mt-2 text-sm leading-relaxed">
          המשחק נשמר אוטומטית בדפדפן הזה. הקוד למטה מאפשר להמשיך את אותו משחק גם בדפדפן או במכשיר אחר.
        </p>

        <textarea
          readOnly
          dir="ltr"
          value={code}
          onFocus={(event) => event.currentTarget.select()}
          className="border-void-600 bg-void-950 mt-4 h-24 w-full rounded-xl border p-3 font-mono text-xs"
        />
        <button
          type="button"
          onClick={copy}
          className="border-void-600 bg-void-800 active:bg-void-700 mt-2 w-full rounded-xl border px-4 py-3 text-sm font-semibold"
        >
          {copied ? 'הקוד הועתק' : 'העתק את הקוד'}
        </button>

        <h3 className="mt-6 text-sm font-semibold">טעינת קוד</h3>
        <textarea
          dir="ltr"
          value={input}
          onChange={(event) => {
            setInput(event.target.value)
            setError(null)
          }}
          placeholder="הדבק כאן קוד שמירה"
          className="border-void-600 bg-void-950 mt-2 h-24 w-full rounded-xl border p-3 font-mono text-xs"
        />
        <button
          type="button"
          onClick={restore}
          disabled={input.trim().length === 0}
          className="border-void-600 bg-void-800 active:bg-void-700 mt-2 w-full rounded-xl border px-4 py-3 text-sm font-semibold disabled:opacity-40"
        >
          טען את המשחק מהקוד
        </button>

        {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}

        <button
          type="button"
          onClick={onClose}
          className="text-ink-dim mt-6 w-full text-center text-sm underline"
        >
          סגור
        </button>
      </div>
    </div>
  )
}
