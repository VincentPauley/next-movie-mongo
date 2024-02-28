import { Container } from '@mui/material'
import MovieRecord from '@/interfaces/MovieRecord';
/**
 * 
 * This should take an input of MovieRecord[] and render a list of results to user.  This
 * can be used in Conjunction with pagination but does not control pagination itself.
 * 
 * 
 */
const MovieSearchResults = ({ movies = [] }: { movies: MovieRecord[] }) => {
  return (
    <Container>
      {
        movies.map((movie: MovieRecord) => {
          return <div key={movie._id}>{movie.title}</div>
        })
      }
    </Container>
  );
}

export default MovieSearchResults