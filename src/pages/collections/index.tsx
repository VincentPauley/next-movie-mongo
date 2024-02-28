import { Button, Container } from '@mui/material'
import { ExportMovies } from '@/services/movies'

import { useQuery } from '@tanstack/react-query'

const Collections = () => {

  const { data: movies, isError, isLoading, refetch } = useQuery({
    queryKey: ['exportMovies'],
    queryFn: () => ExportMovies(),
    enabled: false
  });

  const exportMovieRecords = async() => {
    const response = await refetch()

    navigator.clipboard.writeText(JSON.stringify(response.data))
  }

  return (
    <Container>
      <h3>Movie Collection</h3>
      <Button variant="outlined" onClick={() => exportMovieRecords()}>Copy To Clipboard</Button>
    </Container>
  )
}

export default Collections