import { useQuery } from '@tanstack/react-query'
import { GetMovies } from '@/services/movies'

import { Card, Chip } from '@mui/material'

export default function MovieList() {
  const { data: movies, isError, isLoading } = useQuery({ queryKey: ['movies'], queryFn: GetMovies });

  return (
    <div>
      <h2>Total Movies:</h2>
      {/*
      
      TODOS:
      - movie movie list to a route
      - get pagination working
      - single movie page (folder with index)
      - delete movie
      - check docker setup for cleaner future, export db and store it.
      
      */}

      <Chip label={movies?.data?.totalRecords} />
      <ul style={{padding: '1rem'}}>
        {movies?.data?.recordSet?.map(record => {
          return <Card sx={{ marginBottom: '1rem', padding: '1rem' }} key={record._id}>{record.title}</Card>
        })}
      </ul>
    </div>
  );
}
