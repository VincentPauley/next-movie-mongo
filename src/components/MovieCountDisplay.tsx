/**
 * Simple chip that displays how many movies are present in the database.
 */
import { useQuery } from "@tanstack/react-query"
import Chip from "@mui/material/Chip"

import { GetMovieCount } from "@/services/movies"

const MovieCountDisplay = () => {
  const { data: movieCount } = useQuery({ queryKey: ['movieCount'], queryFn: GetMovieCount })

  return (
    <Chip color="success" label={movieCount?.data?.totalMovies}/>
  )
}

export default MovieCountDisplay