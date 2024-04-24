import { Box, Grid, Typography, TextField, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import MovieRecord from '@/interfaces/MovieRecord';
import { UpdateMovie } from '@/services/movies';

type FormValues = {
  vinnierating: string;
  hollyrating: string;
}

export default function RateMovieForm({ movie }: { movie: MovieRecord }) {
  const form = useForm<FormValues>({
    defaultValues: {
      vinnierating: '',
      hollyrating: ''
    }
  });

  const { register, handleSubmit } = form

  const updateMovie: any = useMutation({
    mutationFn: (params: any) => UpdateMovie(params),
    onSuccess: () => {
      console.log('Updated Movie!')
    },
    onError: (e: any) => {
      console.log('update movie error: ', e)
    }
  })

  const onSubmit = (fields: FormValues) => {
    const { vinnierating, hollyrating } = fields
    const ratings = [];

    if (vinnierating) {
      ratings.push({ reviewer: 'vinnie', rating: parseInt(vinnierating)})
    }

    if (hollyrating) {
      ratings.push({ reviewer: 'holly', rating: parseInt(hollyrating) })
    }

    updateMovie.mutate({ ...movie, ratings })
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Rate Movie Form</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Vinnie Rating"
              select
              fullWidth
              defaultValue={''}
              {...register('vinnierating')}
            >
              <MenuItem value="100">A+</MenuItem>
              <MenuItem value="95">A</MenuItem>
              <MenuItem value="92">A-</MenuItem>
              <MenuItem value="88">B+</MenuItem>
              <MenuItem value="85">B</MenuItem>
              <MenuItem value="80">B-</MenuItem>
              <MenuItem value="75">C</MenuItem>
              <MenuItem value="60">D</MenuItem>
              <MenuItem value="50">F</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Holly Rating"
              select
              fullWidth
              defaultValue={''}
              {...register('hollyrating')}
            >
              <MenuItem value="100">A+</MenuItem>
              <MenuItem value="95">A</MenuItem>
              <MenuItem value="92">A-</MenuItem>
              <MenuItem value="88">B+</MenuItem>
              <MenuItem value="85">B</MenuItem>
              <MenuItem value="80">B-</MenuItem>
              <MenuItem value="75">C</MenuItem>
              <MenuItem value="60">D</MenuItem>
              <MenuItem value="50">F</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <button>Submit Rating(s)</button>
      </form>
    </Box>
  );
}