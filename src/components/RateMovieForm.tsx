import { Box, Grid, Typography, TextField, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import MovieRecord from '@/interfaces/MovieRecord';
import { UpdateMovie } from '@/services/movies';
import { LensTwoTone } from '@mui/icons-material';
// ^ now can tie the call to a tanstack mutation

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

  // const addMovie: any = useMutation({
  //   mutationFn: (params: any) => AddMovie(params),
  //   onSuccess: (data: any) => {
  //     setCreatedId(data.id)
  //     setSnackbarOpen(true);

  //     queryClient.invalidateQueries({ queryKey: ['movieCount'] })

  //     setTimeout(() => {
  //       setSnackbarOpen(false);
  //     }, 3000)
  //   }
  // });

  const updateMovie: any = useMutation({
    mutationFn: (params: any) => UpdateMovie(params),
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

    // console.log('next step, update the record into the DB.')
    // console.log({ ...movie, reviews })
  }
  // 6627b9b878a5199e83efa84a
  // 6627b9b878a5199e83efa84a

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