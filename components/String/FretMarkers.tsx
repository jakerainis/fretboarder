import clsx from 'clsx'

import css from './String.module.css'

export default function FretMarkers() {
  return (
    <>
      <div className={css.fretRow}>
        <ul className={clsx(css.fretRowSequence, css.fretRowMarkers)}>
          {Array(25)
            .fill(null)
            .map((_, index) => {
              return (
                <li
                  className={clsx(css.fret, css.fretMarker)}
                  key={`markers-${index}`}
                >
                  {[3, 5, 7, 9, 15, 17, 19, 21].includes(index) && <>•</>}
                  {[12, 24].includes(index) && <>••</>}
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}
