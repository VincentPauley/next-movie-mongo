import { Container } from '@mui/material'

import MovieForm from '@/components/MovieForm'

const AddMovie = () => {
  return (
    <Container>
      <p>Add a Movie!</p>
      <MovieForm/>
    </Container>
  )
}

export default AddMovie