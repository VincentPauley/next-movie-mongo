import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { GetMovies } from '@/services/movies'
import { useState } from 'react'

import { Box, Button, Card, CardActions, CardContent, Chip, Pagination, Typography } from '@mui/material'

import MovieTitleFilter from './MovieTitleFilter'
import AppliedGenres from './AppliedGenres'

export default function MovieList() {
  const [activePageIndex, setActivePageIndex] = useState(0)
  const [searchString, setSearchString] = useState('')

  const { data: movies, isError, isLoading } = useQuery({ 
    queryKey: ['movies', activePageIndex, searchString],
    queryFn: () => GetMovies(activePageIndex, searchString)
  });

  const handlePageChange = (pageNumber: number): void => {
    setActivePageIndex(pageNumber -1)
  }

  const handleSearchSubmission = (search: string) => {
    setSearchString(search)
  }

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Total Movies:</h2>

      <Chip label={movies?.data?.totalRecords} />

      <MovieTitleFilter emitSearch={handleSearchSubmission}/>

      {
        searchString && (
          <div>{movies?.data?.recordSet.length} results for "{searchString}"</div>
        )
      }

      <ul style={{padding: '1rem'}}>
        {movies?.data?.recordSet?.map(record => {

          const { genres } = record
          return (
            <Card sx={{ marginBottom: '1rem', padding: '1rem' }} key={record._id}>
              <CardContent>
                <Typography variant="h5">{record.title}</Typography>
                <Typography variant="subtitle1">{record.year} {record.rated}</Typography>

                <AppliedGenres genres={genres} />
                {record.ratings.length ? (

                  record.ratings.map(rating => {
                    return <div key={record._id + rating.reviewer}>{rating.reviewer} : <Chip label={rating.rating} /></div>
                  })
                ) : null}
                <CardActions>
                  <Link href={`/movies/${record._id}`}>
                    <Button>Inspect</Button>
                  </Link>
                </CardActions>
              </CardContent>
            </Card>
          )
        })}
      </ul>
      <Box p={4} sx={{display: 'flex', justifyContent: 'space-around'}}>
        <Pagination
          count={movies?.data?.pages}
          shape="rounded"
          page={activePageIndex + 1}
          onChange={(e, value) => handlePageChange(value)}
        />
      </Box>
    </div>
  );
}
