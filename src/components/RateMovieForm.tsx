import { Box, Grid, Typography, TextField, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'

import MovieRecord from '@/interfaces/MovieRecord';

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

  const onSubmit = (fields: FormValues) => {
    const { vinnierating, hollyrating } = fields
    const reviews = [];

    if (vinnierating) {
      reviews.push({ reviewer: 'vinnie', rating: parseInt(vinnierating)})
    }

    if (hollyrating) {
      reviews.push({ reviewer: 'holly', rating: parseInt(hollyrating) })
    }

    console.log('next step, update the record into the DB.')
    console.log({ ...movie, reviews })
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
         
        <button>Submit</button>
      </form>
    </Box>
  );
}