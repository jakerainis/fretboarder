import { create } from 'zustand'

import { Neck, Necks, Note, StringObject } from '@/types'
import { getNoteNStepsBackward, getNoteNStepsForward } from '@/utils/notes'

interface NeckStore {
  necks: Necks
  addNeck: () => void
  addString: (neckId: number) => void
  changeStringRootNote: (
    neckId: number,
    stringId: number,
    newRootNote: Note
  ) => void
  removeNeck: (neckId: number) => void
  removeString: (neckId: number, stringId: number) => void
  reorderStrings: (neckId: number, strings: StringObject[]) => void
}

const defaultNeck: Neck = {
  strings: new Map([
    [0, { id: Note.G }],
    [1, { id: Note.D }],
    [2, { id: Note.A }],
    [3, { id: Note.E }],
  ]),
}

const defaultNecks: Necks = new Map()
defaultNecks.set(0, defaultNeck)

const useNeckStore = create<NeckStore>((set) => ({
  necks: defaultNecks,
  addNeck: () =>
    set((state) => {
      //Copy the last one or use a default
      const newNecks = new Map(state.necks)
      newNecks.set(newNecks.size, defaultNeck)
      return { necks: newNecks }
    }),
  addString: (neckId) =>
    set((state) => {
      const newNecks = new Map(state.necks)
      const newNeck = newNecks.get(neckId) as Neck
      const numberOfStrings = newNeck.strings.size
      const lastStringRootNote = newNeck.strings.has(numberOfStrings - 1)
        ? (newNeck.strings.get(numberOfStrings - 1) as StringObject).id
        : Note.B
      const nextString = { id: getNoteNStepsBackward(lastStringRootNote, 5) }
      newNeck.strings.set(newNeck.strings.size, nextString)
      newNecks.set(neckId, newNeck)

      return { necks: newNecks }
    }),
  changeStringRootNote: (neckId, stringId, newRootNote) =>
    set((state) => {
      const newNecks = new Map(state.necks)
      const newNeck = newNecks.get(neckId) as Neck
      newNeck.strings.set(stringId, { id: newRootNote })
      return { necks: newNecks }
    }),
  removeNeck: (neckId) =>
    set((state) => {
      const newNecks = new Map(state.necks)
      newNecks.delete(neckId)
      return { necks: newNecks }
    }),
  removeString: (neckId, stringId) =>
    set((state) => {
      const newNecks = new Map(state.necks)
      const newNeck = newNecks.get(neckId) as Neck
      newNeck?.strings.delete(stringId)
      newNecks.set(neckId, newNeck)
      return { necks: newNecks }
    }),
  reorderStrings: (neckId: number, strings: StringObject[]) =>
    set((state) => {
      const newNecks = new Map(state.necks)
      const newStrings = strings.map((string, index) => {
        return [index, string]
      }) as [number, StringObject][]
      newNecks.set(neckId, { strings: new Map(newStrings) })
      return { necks: newNecks }
    }),
}))

export default useNeckStore
