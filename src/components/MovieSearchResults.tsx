import { Button, Card, CardActions, Container, Link, Stack, Typography } from '@mui/material'

import MovieHeading from './MovieHeading';
import MovieRecord from '@/interfaces/MovieRecord';
import AppliedGenres from './AppliedGenres';
import ReviewChip from './ReviewChip'
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
          const { title, year, rated, genres, ratings } = movie

          return (
              <Card sx={{ marginBottom: '1rem', padding: '1rem' }} key={movie._id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <MovieHeading title={title} year={year}/>
                  <Typography lineHeight={2.5}>{rated}</Typography>
                </Stack>
                <AppliedGenres genres={genres} />
                <Stack
                  direction="row-reverse"
                >
                  {
                    ratings.map(rating => {
                      return <ReviewChip key={title + '_' + rating.reviewer} review={rating}/>
                    })
                  }
                </Stack>
                <CardActions>
                  <Link href={`/movies/${movie._id}`}>
                    <Button>Inspect</Button>
                  </Link>
                </CardActions>
              </Card>
            )
        })
      }
    </Container>
  );
}

export default MovieSearchResults