import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

import { Typography } from '@mui/material'
// import hello from './api/hello'
// ^ don't need to be importing here at all, just call the route dummy
// hello < test that with env stuff.
import GenreList from '@/components/GenreList'

// const genres = [
//   {"name":"Drama","level":1},
//   {"name":"Christmas","level":2},
//   {"name":"Thriller","level":1},
//   {"name":"Science Fiction","level":1},
//   {"name":"Horror","level":1},
//   {"name":"Action","level":1},
//   {"name":"Elite Trash","level":3},
//   {"name":"Comedy","level":1},
//   {"name":"Romantic Comedy","level":1},
//   {"name":"War","level":1},
//   {"name":"Noir","level":1},
//   {"name":"Dark Comedy","level":1},
//   {"name":"Adventure","level":1},
//   {"name":"Crime","level":2},
//   {"name":"Fantasy","level":1},
//   {"name":"Animation","level":2},
//   {"name":"Disaster","level":2},
//   {"name":"Satire","level":2},
//   {"name":"Monster","level":2},
//   {"name":"Western","level":1},
//   {"name":"Historical","level":2},
//   {"name":"Musical","level":2},
//   {"name":"Kids","level":2},
//   {"name":"Mystery","level":2},
//   {"name":"Slasher","level":2},
//   {"name":"Biographical","level":2},
//   {"name":"Epic","level":2},
//   {"name":"Family","level":2},
//   {"name":"Romance","level":1},
//   {"name":"Super Hero","level":2},
//   {"name":"Sports","level":2},
//   {"name":"Teen","level":2},
//   {"name":"Spy","level":2},
//   {"name":"Coming of Age","level":2},
//   {"name":"Survival","level":2},
//   {"name":"Raunchy","level":2},
//   {"name":"Cars/Racing","level":3},
//   {"name":"Light-Hearted","level":3},
// ]

interface HomePageProps {
  message: string
}

export default function Home({ message }: HomePageProps) {
  // fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/hello')
  //   .then(async(x) => {
  //     const data =  await x.json()
  //     console.log(data)
  //   })
  //   .catch(e => {
  //     console.log({ e })
  //   })

  // POST works find
  // fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/genres', { method: 'POST', body: JSON.stringify({ name, level }) })
  // .then(async(x) => {
  //   const data =  await x.json()
  //   console.log('response from POST?', data)
  // })
  // .catch(e => {
  //   console.log({ e })
  // })
  
  fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/genres')
    .then(async(x) => {
      const data =  await x.json()
      console.log('response from GET genres?', data)
    })
    .catch(e => {
      console.log({ e })
    })

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <Typography variant='h1'>Movie Mongo Bash</Typography>
        <Typography>{message}</Typography>
        <GenreList/>
      </QueryClientProvider>
    </main>
  )
}

export async function getServerSideProps() {
  return { props: { message: 'Hello Vinnie' } }
}