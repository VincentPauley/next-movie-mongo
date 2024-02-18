import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

import { Typography } from '@mui/material'
// import hello from './api/hello'
// ^ don't need to be importing here at all, just call the route dummy
// hello < test that with env stuff.
import GenreList from '@/components/GenreList'
import MovieList from '@/components/MovieList'

// NOTE: gets the data how I want it to be inserted...
// import movieJSON from '@/services/movie-data'

// const movieRecords = movieJSON as any

// const ammended: any = []

// movieRecords.data.forEach((movie: any) => {
//   const strippedGenres = movie.genres.map((g: any) => ({ name: g.name, level: g.level }))
//   let myMovie = movie

//   myMovie.genres = strippedGenres
//   myMovie.synopsis = 'TODO'

//   ammended.push(myMovie)
// })

// console.log({ ammended })

interface HomePageProps {
  message: string
}

export default function Home({ message }: HomePageProps) {

  // fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movies', { method: 'POST', body: JSON.stringify(record) })
  //     .then(async(x) => {
  //       const data =  await x.json()
  //       console.log('response from POST?', data)
  //     })
  //     .catch(e => {
  //       console.log({ e })
  //     })

  // fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/genres')
  //   .then(async(x) => {
  //     const data =  await x.json()
  //     console.log('response from GET genres?', data)
  //   })
  //   .catch(e => {
  //     console.log({ e })
  //   })

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <Typography variant='h1'>Movies</Typography>
        <MovieList/>
        <GenreList/>
      </QueryClientProvider>
    </main>
  )
}

export async function getServerSideProps() {
  return { props: { message: 'Hello Vinnie' } }
}