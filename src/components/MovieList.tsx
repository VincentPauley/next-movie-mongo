import { useQuery } from '@tanstack/react-query'
import { GetMovies } from '@/services/movies'
import { useState } from 'react'

import { Box, Chip, Pagination, } from '@mui/material'

import MovieTitleFilter from './MovieTitleFilter'

import MovieSearchResults from './MovieSearchResults'

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

      <MovieSearchResults movies={movies?.data?.recordSet ?? []}/>

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
