import { useForm } from 'react-hook-form'
import { Box, Button, TextField, Typography } from "@mui/material";

interface Inputs {
  title: string;
  year: string;
}

const MovieForm = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    const { title, year } = data

    console.log({ title, year })
  }

  const onErrors = (errors: any) => console.error(errors)

  // [X] - title: string;
  // [ ] - year: number;
  // [ ] - rated: string;
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
      <TextField
        {...register('title', { required: "Title is required" })}
        label="Title"
        name="title"
        helperText={errors?.title ? errors.title.message : null}
      />
      <TextField
        {...register('year', { required: "Year is required", pattern: { value: /[0-9]{4}/, message: 'Invalid Year' } })}
        label="Year"
        name="year"
        helperText={errors?.year ? errors.year.message : null}
      />
      <Box>
        <Button variant="outlined">Clear</Button>
        <Button type="submit" variant="outlined">Submit</Button>
      </Box>

    </form>
  );
}

export default MovieForm