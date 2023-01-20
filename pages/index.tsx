import css from '@/styles/Home.module.css'

import Button from '@/components/Button/Button'
import Header from '@/components/Header/Header'
import HeadTag from '@/components/HeadTag/HeadTag'
import Neck from '@/components/Neck/Neck'
import useNeckStore from '@/store/neckStore'

export default function Home() {
  const necks = useNeckStore(({ necks }) => necks)
  const addNeck = useNeckStore(({ addNeck }) => addNeck)
  return (
    <>
      <HeadTag />
      <Header />
      <main className={css.main}>
        {Array.from(necks).map(([neckId, { strings }]) => (
          <Neck key={neckId} neckId={neckId} strings={strings} />
        ))}
        <section className={css.util}>
          <Button onClick={() => addNeck()}>Add Neck</Button>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
