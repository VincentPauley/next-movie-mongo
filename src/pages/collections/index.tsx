import { Button, Container } from '@mui/material'
import { ExportMovies } from '@/services/movies'

import { useQuery } from '@tanstack/react-query'

const Collections = () => {

  const { data: movies, isError, isLoading, refetch } = useQuery({
    queryKey: ['exportMovies'],
    queryFn: () => ExportMovies(),
    enabled: false
  });

  return (
    <Container>
      <h3>Movie Collection</h3>
      <Button onClick={() => refetch()}>Export</Button>
    </Container>
  )
}

export default Collections