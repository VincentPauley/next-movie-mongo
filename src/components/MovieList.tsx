import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { GetMovies } from '@/services/movies'
import { useState } from 'react'

import { Badge, Box, Button, Card, CardActions, CardContent, Chip, Pagination, Stack, Typography } from '@mui/material'

import MovieTitleFilter from './MovieTitleFilter'
import AppliedGenres from './AppliedGenres'
import MovieHeading from './MovieHeading'

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

          const { title, year, genres, rated } = record
          return (
            <Card sx={{ marginBottom: '1rem', padding: '1rem' }} key={record._id}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <MovieHeading title={title} year={year}/>
                  <Typography lineHeight={2.5}>{rated}</Typography>
                </Stack>
                
                <AppliedGenres genres={genres} />
                <Stack direction="row-reverse">
                  {record.ratings.length ? (

                    record.ratings.map(rating => {
                      return (
                        <div style={{ marginLeft: '1rem' }} key={record._id + rating.reviewer}>
                          <Badge badgeContent={rating.rating} color="primary"><Chip label={rating.reviewer} /></Badge>
                        </div>)
                    })
                  ) : null}
                </Stack>
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
