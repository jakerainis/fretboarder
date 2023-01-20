import { ReactSortable } from 'react-sortablejs'

import css from './Neck.module.css'

import Button from '@/components/Button/Button'
import FretMarkers from '@/components/String/FretMarkers'
import String from '@/components/String/String'
import useNeckStore from '@/store/neckStore'
import { StringMap } from '@/types'

interface NeckProps {
  neckId: number
  strings: StringMap
}

export default function Neck({ neckId, strings }: NeckProps) {
  const addString = useNeckStore(({ addString }) => addString)
  const removeNeck = useNeckStore(({ removeNeck }) => removeNeck)
  const reorderStrings = useNeckStore(({ reorderStrings }) => reorderStrings)

  const stringObjectsArray = Array.from(strings).map(
    ([_stringId, strings]) => strings
  )
  const hasStrings = stringObjectsArray.length > 0

  return (
    <section className={css.neckContainer}>
      <div className={css.neckContents}>
        {hasStrings && (
          <div className={css.neck}>
            <ReactSortable
              animation={200}
              filter="#nonDraggable"
              // ghostClass="opacity-50"
              list={stringObjectsArray}
              setList={(newStringObjectsArray) => {
                reorderStrings(neckId, newStringObjectsArray)
              }}
            >
              {Array.from(strings).map(([stringId, { id: rootNote }]) => (
                <String
                  key={`neck-${neckId}_string-${stringId}`}
                  neckId={neckId}
                  rootNote={rootNote}
                  stringId={stringId}
                />
              ))}
            </ReactSortable>
            <FretMarkers />
          </div>
        )}
        <div className={css.neckUtils}>
          <Button onClick={() => addString(neckId)} variant="secondary">
            Add String
          </Button>
          <Button onClick={() => removeNeck(neckId)} variant="warning">
            Remove Neck
          </Button>
        </div>
      </div>
    </section>
  )
}
