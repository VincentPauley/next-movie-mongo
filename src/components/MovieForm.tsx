import { useForm } from 'react-hook-form'
import { TextField, Typography } from "@mui/material";

interface Inputs {
  title: string;
}

const MovieForm = () => {

  const {register, handleSubmit} = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {

    const { title } = data


    console.log({ title })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">New Movie</Typography>
      <TextField {...register('title')} label="Title" name="title"/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MovieForm