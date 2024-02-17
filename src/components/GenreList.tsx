import { useQuery } from '@tanstack/react-query'
import { GetGenres } from '@/services/genres'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function GenreList() {
  const { data: genres, isError, isLoading } = useQuery({ queryKey: ['genres'], queryFn: GetGenres })

  if (isError) {
    return <div>Error</div>
  }
  
  return (
    <FormGroup>{
        genres?.data.map(genre => {
          return <FormControlLabel key={genre._id} control={<Switch/>} label={genre.name + ' ' + genre.level}/>
        })  
      }
    </FormGroup>
  )
}