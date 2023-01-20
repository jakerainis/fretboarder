import { Note } from '@/types'

export const baseNoteSequence = Object.values(Note)

export function getNoteSequence(
  rootNote: Note,
  numberOfFrets = 24, // Standard neck
  goBackwards = false
): Note[] {
  const startingNoteIndex = baseNoteSequence.indexOf(rootNote)
  const stringSequence = Array(numberOfFrets + 1) // Account for open string
    .fill(null)
    .reduce((notes: Note[], _, index: number) => {
      const calculatedIndex = goBackwards
        ? (startingNoteIndex - index) % baseNoteSequence.length
        : (startingNoteIndex + index) % baseNoteSequence.length
      notes.push(baseNoteSequence[calculatedIndex])
      return notes
    }, [])
  return stringSequence
}

export function getNoteNStepsBackward(rootNote: Note, steps: number) {
  return getNoteSequence(rootNote, steps, true).pop() as unknown as Note
}
export function getNoteNStepsForward(rootNote: Note, steps: number) {
  return getNoteSequence(rootNote, steps).pop() as unknown as Note
}
