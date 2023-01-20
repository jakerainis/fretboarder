import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

import css from './String.module.css'

import useNeckStore from '@/store/neckStore'
import { Note } from '@/types'
import { baseNoteSequence, getNoteSequence } from '@/utils/notes'

interface StringProps {
  neckId: number
  rootNote: Note
  stringId: number
}

export default function String({ neckId, rootNote, stringId }: StringProps) {
  const changeStringRootNote = useNeckStore(
    ({ changeStringRootNote }) => changeStringRootNote
  )
  const removeString = useNeckStore(({ removeString }) => removeString)

  const stringSequence = getNoteSequence(rootNote)

  return (
    <>
      <div className={css.fretRow}>
        <div className={css.fretRowUtils}>
          <button className={css.reorderFretRow}>
            <Bars2Icon />
          </button>
          <select
            onChange={({ target }) => {
              changeStringRootNote(neckId, stringId, target.value as Note)
            }}
            value={rootNote}
          >
            {baseNoteSequence.map((rootNote) => (
              <option key={rootNote} value={rootNote}>
                {rootNote}
              </option>
            ))}
          </select>
        </div>
        <ul className={css.fretRowSequence} id="nonDraggable">
          {stringSequence.map((note, index) => {
            return (
              <li
                className={clsx(css.fret, `fret--${note}`)}
                key={`neck-${neckId}_string-${stringId}_fret-${index}`}
              >
                {note}
              </li>
            )
          })}
        </ul>
        <div className={css.fretRowUtils}>
          <button
            className={css.removeFretRow}
            onClick={() => {
              removeString(neckId, stringId)
            }}
          >
            <XMarkIcon />
          </button>
        </div>
      </div>
    </>
  )
}
