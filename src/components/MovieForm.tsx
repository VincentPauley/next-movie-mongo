import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Container, Modal, Link, Snackbar, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { GetGenres } from '@/services/genres'
import { AddMovie } from '@/services/movies'

import GenreSelector from './GenreSelector';

import {queryClient } from '@/pages/_app'

// import { useQuery, useQueryClient } from '@tanstack/react-query'

// Get QueryClient from the context
// const queryClient = useQueryClient()

interface Inputs {
  title: string;
  year: string;
  rated: string;
  genres: string[];
}

const Checkbox = (props) => (
  <Controller
    {...props}
    render={({ field }) => {

      return (
        <input
          {...field}
          id={props.id}
          type="checkbox"
          value={props.value}
          checked={field.value === props.value}
          onChange={(event) => {
            field.onChange(event.target.checked ? props.value : undefined);
          }}
        />
      );
    }}
  />
);

const MovieForm = () => {
  const {register, handleSubmit, control, setValue, getValues, formState: { errors }} = useForm<Inputs>();
  const { data: genres, isError, isLoading } = useQuery({ queryKey: ['genres'], queryFn: GetGenres });

  const genreData = genres
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [createdId, setCreatedId] = useState('');

  const addMovie: any = useMutation({
    mutationFn: (params: any) => AddMovie(params),
    onSuccess: (data: any) => {
      setCreatedId(data.id)
      setSnackbarOpen(true);

      queryClient.invalidateQueries({ queryKey: ['movieCount'] })

      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000)
    }
  });

  const onSubmit = async(data: Inputs) => {
    const { title, year, rated, genres } = data
    const formattedGenres = genres.filter(g => g)
    const minifiedSet: any[] = genreData?.data?.map(g => ({ name: g.name, level: g.level })) || []
    const actual = minifiedSet.filter(genreOption => formattedGenres.includes(genreOption.name))

    try {
      addMovie.mutate({ title, year, rated, genres: actual });
    } catch (e) {
      console.error(e)
    }
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onErrors = (errors: any) => console.error(errors)

  // [X] - title: string;
  // [X] - year: number;
  // [X] - rated: string;
  // [X] - genres: [
  //      { level: number, name: string }
  //    ];
  // [ ] - ratings: [
  //   { reviewer: string, rating: number }
  // ];
  // [ ] - synopsis: string;
  // [ ] - seasonality: string[],
  // [ ] - directors: string[]

  // make it easier/quicker to add movies:
  // title & year search for existing movies that match so you
  // don't need to go back and forth between pages

  return (
    <Container maxWidth='md'>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              {...register('title', { required: "Title is required" })}
              label="Title"
              name="title"
              helperText={errors?.title ? errors.title.message : null}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              {...register('year', { required: "Year is required", pattern: { value: /[0-9]{4}/, message: 'Invalid Year' } })}
              label="Year"
              name="year"
              helperText={errors?.year ? errors.year.message : null}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              label="Rated"
              defaultValue={''}
              inputProps={register('rated', {required: 'Rated is requilightgray'})}
              helperText={errors?.rated ? errors.rated.message : null}
            >
              <MenuItem selected value="G">G</MenuItem>
              <MenuItem value="PG">PG</MenuItem>
              <MenuItem value="PG-13">PG-13</MenuItem>
              <MenuItem value="R">R</MenuItem>
              <MenuItem value="U">Unrated</MenuItem>  
            </TextField>
          </Grid>

          <Grid item xs={4}>
            {genres?.data?.filter(g => g.level === 1).map((genre, index) => {
              return (
                <li
                  key={genre.name}
                  style={{
                    listStyleType: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '.25rem',
                    borderBottom: '2px solid lightgray'
                  }}
                >
                  <label htmlFor={genre.name}>{genre.name}</label>
                  <Checkbox id={genre.name} control={control} value={genre.name} name={`genres[${index}]`}/>
                </li>
              )
            })}
          </Grid>

          <Grid item xs={4}>
            {genres?.data?.filter(g => g.level === 2).map((genre, index) => {
              return (
                <li
                  key={genre.name}
                  style={{
                    listStyleType: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '.25rem',
                    borderBottom: '2px solid lightgray'
                  }}
                >
                  <label htmlFor={genre.name}>{genre.name}</label>
                  <Checkbox id={genre.name} control={control} value={genre.name} name={`genres[${index}]`}/>
                </li>
              )
            })}
          </Grid>

          <Grid item xs={4}>
            {genres?.data?.filter(g => g.level === 3).map((genre, index) => {
              return (
                <li
                  key={genre.name}
                  style={{
                    listStyleType: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '.25rem',
                    borderBottom: '2px solid lightgray'
                  }}
                >
                  <label htmlFor={genre.name}>{genre.name}</label>
                  <Checkbox id={genre.name} control={control} value={genre.name} name={`genres[${index}]`}/>
                </li>
              )
            })}
          </Grid>
        </Grid>

        { addMovie.isLoading && (
          <div>Saving Movie...</div>
        )}

        { addMovie.isError && (
          <div>There was an error saving movie</div>
        )}

        <Modal
          open={snackbarOpen}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Movie Added!
            </Typography>
            <Link href={`/movies/${createdId}`}>
              <Button>Inspect</Button>
            </Link>
          </Box>
          
        </Modal>

        <Box>
          <Button variant="outlined">Clear</Button>
          <Button type="submit" variant="outlined">Submit</Button>
        </Box>

      </form>
    </Container>
  );
}

export default MovieForm