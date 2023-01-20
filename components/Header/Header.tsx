import css from './Header.module.css'

export default function Header() {
  return (
    <header className={css.base}>
      <h1 className={css.title}>Fretboarder</h1>
    </header>
  )
}
