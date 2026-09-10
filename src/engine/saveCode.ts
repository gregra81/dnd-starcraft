import { normalizeState } from './gameState'
import type { GameState } from '../types'

/**
 * קוד שמירה נייד: מצב המשחק כ-JSON בקידוד base64.
 * מאפשר להעביר משחק בין דפדפנים ומכשירים בלי שרת.
 */
export function encodeSaveCode(state: GameState): string {
  const bytes = new TextEncoder().encode(JSON.stringify(state))
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

/** מפענח קוד שמירה. מחזיר null אם הקוד פגום או אינו תואם לעלילה. */
export function decodeSaveCode(code: string): GameState | null {
  try {
    const binary = atob(code.trim())
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    return normalizeState(JSON.parse(new TextDecoder().decode(bytes)))
  } catch {
    return null
  }
}
