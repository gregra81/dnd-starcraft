import { useCallback, useEffect, useReducer, useState } from 'react'
import { RaceSelect } from './ui/RaceSelect'
import { ResumeScreen } from './ui/ResumeScreen'
import { StatusBar } from './ui/StatusBar'
import { StoryView } from './ui/StoryView'
import { DiceOverlay } from './ui/DiceOverlay'
import { SaveCodeDialog } from './ui/SaveCodeDialog'
import { HelpDialog } from './ui/HelpDialog'
import { gameReducer, hasSavedGame, loadState, saveState } from './engine/gameState'
import { getNode } from './data/story'
import type { Choice, DiceCheck, GameState } from './types'

/** המסך הפעיל. 'resume' מוצג רק כשנטען משחק שמור בפתיחת האפליקציה. */
type Screen = 'resume' | 'select' | 'story'

/**
 * שורש האפליקציה: מנתב בין מסך ההמשכה, בחירת הדמות ומסך העלילה,
 * ומנהל את חלונית הקוביה ואת חלונית קוד השמירה.
 */
export default function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadState)
  const [screen, setScreen] = useState<Screen>(() =>
    hasSavedGame(loadState()) ? 'resume' : 'select',
  )
  const [pendingCheck, setPendingCheck] = useState<DiceCheck | null>(null)
  const [saveCodeOpen, setSaveCodeOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  // שמירה אוטומטית: כל שינוי מצב נכתב לאחסון המקומי
  useEffect(() => {
    saveState(state)
  }, [state])

  // גלילה לראש העמוד בכל מעבר צומת
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.nodeId])

  const handleChoice = useCallback((choice: Choice) => {
    if (choice.check) {
      setPendingCheck(choice.check)
    } else if (choice.to) {
      dispatch({ type: 'goTo', nodeId: choice.to })
    }
  }, [])

  const handleNewGame = useCallback(() => {
    setPendingCheck(null)
    setSaveCodeOpen(false)
    dispatch({ type: 'reset' })
    setScreen('select')
  }, [])

  const handleRestore = useCallback((restored: GameState) => {
    dispatch({ type: 'restore', state: restored })
    setSaveCodeOpen(false)
    setScreen(hasSavedGame(restored) ? 'story' : 'select')
  }, [])

  const dialogs = (
    <>
      {saveCodeOpen && (
        <SaveCodeDialog
          state={state}
          onRestore={handleRestore}
          onClose={() => setSaveCodeOpen(false)}
        />
      )}
      {helpOpen && <HelpDialog onClose={() => setHelpOpen(false)} />}
    </>
  )

  if (screen === 'resume' && hasSavedGame(state)) {
    return (
      <>
        <ResumeScreen
          state={state}
          onContinue={() => setScreen('story')}
          onNewGame={handleNewGame}
          onOpenSaveCode={() => setSaveCodeOpen(true)}
          onOpenHelp={() => setHelpOpen(true)}
        />
        {dialogs}
      </>
    )
  }

  if (!hasSavedGame(state)) {
    return (
      <>
        <RaceSelect
          onSelect={(raceId) => {
            dispatch({ type: 'selectRace', raceId })
            setScreen('story')
          }}
          onOpenSaveCode={() => setSaveCodeOpen(true)}
          onOpenHelp={() => setHelpOpen(true)}
        />
        {dialogs}
      </>
    )
  }

  const node = getNode(state.nodeId!)!

  return (
    <div className="min-h-dvh">
      <StatusBar
        state={state}
        onNewGame={handleNewGame}
        onOpenSaveCode={() => setSaveCodeOpen(true)}
        onOpenHelp={() => setHelpOpen(true)}
      />

      <main>
        <StoryView
          node={node}
          state={state}
          onChoose={handleChoice}
          onBack={() => dispatch({ type: 'back' })}
          onRestart={handleNewGame}
        />
      </main>

      {pendingCheck && (
        <DiceOverlay
          check={pendingCheck}
          state={state}
          onCancel={() => setPendingCheck(null)}
          onContinue={(nodeId) => {
            setPendingCheck(null)
            dispatch({ type: 'goTo', nodeId })
          }}
        />
      )}

      {dialogs}
    </div>
  )
}
