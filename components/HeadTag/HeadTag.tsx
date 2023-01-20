import Head from 'next/head'

interface HeadTagProps {
  description?: string
  title?: string
}

export default function HeadTag({ description, title }: HeadTagProps) {
  return (
    <Head>
      <title>Fretboarder {title ? ` - ${title}` : ''}</title>
      <meta
        name="description"
        content={
          description ? description : 'Easy Guitar/Bass Fretboard Visualizer'
        }
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
