import { Typography } from '@mui/material'
// import hello from './api/hello'
// ^ don't need to be importing here at all, just call the route dummy
// hello < test that with env stuff.

interface HomePageProps {
  message: string
}

export default function Home({ message }: HomePageProps) {
  fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/hello')
    .then(async(x) => {
      const data =  await x.json()
      
      console.log(data)
    })
    .catch(e => {
      console.log({ e })
    })

  return (
    <main>
      <Typography variant='h1'>Movie Mongo Bash</Typography>
      <Typography>{message}</Typography>
    </main>
  )
}

export async function getServerSideProps() {
  return { props: { message: 'Hello Vinnie' } }
}