import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";

interface Inputs {
  title: string;
  year: string;
  rated: string;
}

const MovieForm = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    const { title, year, rated } = data

    console.log({ title, year, rated })
  }

  const onErrors = (errors: any) => console.error(errors)

  // shar: y
  // bridgette R: y
  // brooke T: y

  // [X] - title: string;
  // [X] - year: number;
  // [X] - rated: string;
  // [ ] - genres: [
  //      { level: number, name: string }
  //    ];
  // [ ] - ratings: [
  //   { reviewer: string, rating: number }
  // ];
  // [ ] - synopsis: string;
  // [ ] - seasonality: string[],
  // [ ] - directors: string[]

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <Typography variant="h4">New Movie</Typography>
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
            inputProps={register('rated', {required: 'Rated is required'})}
            helperText={errors?.rated ? errors.rated.message : null}
          >
            <MenuItem selected value="G">G</MenuItem>
            <MenuItem value="PG">PG</MenuItem>
            <MenuItem value="PG-13">PG-13</MenuItem>
            <MenuItem value="R">R</MenuItem>
            <MenuItem value="U">Unrated</MenuItem>  
          </TextField>
        </Grid>
      </Grid>
      
      <Box>
        <Button variant="outlined">Clear</Button>
        <Button type="submit" variant="outlined">Submit</Button>
      </Box>

    </form>
  );
}

export default MovieForm