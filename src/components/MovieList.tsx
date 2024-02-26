import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { GetMovies } from '@/services/movies'
import { useState } from 'react'

import { Box, Button, Card, CardActions, CardContent, Chip, Pagination, Typography } from '@mui/material'

export default function MovieList() {
  const [activePageIndex, setActivePageIndex] = useState(0)
  // ^ now use this value to pass to paginate API

  const { data: movies, isError, isLoading } = useQuery({ 
    queryKey: ['movies', activePageIndex],
    queryFn: () => GetMovies(activePageIndex)
  });

  const handlePageChange = (pageNumber: number): void => {
    setActivePageIndex(pageNumber -1)
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
      {/*
      
      TODOS:
        [X] - movie movie list to a route
        [X] - get pagination working
        [X] - single movie page (folder with index)
        [X] - single movie lookup and project on the global route
        [ ] - movie search & filter
        [ ] - delete movie
        [ ] - check docker setup for cleaner future, export db and store it.
      */}

      <Chip label={movies?.data?.totalRecords} />

      <ul style={{padding: '1rem'}}>
        {movies?.data?.recordSet?.map(record => {
          return (
            <Card sx={{ marginBottom: '1rem', padding: '1rem' }} key={record._id}>
              <CardContent>
                <Typography variant="h5">{record.title}</Typography>
                <Typography variant="subtitle1">{record.year} {record.rated}</Typography>
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
