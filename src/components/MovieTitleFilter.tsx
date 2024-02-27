import { useState } from 'react'
import { Button, Container, Grid, TextField } from "@mui/material"

const MovieTitleFilter = ({ emitSearch }: { emitSearch: (search: string) => void }) => {

  const [searchString, setSearchString] = useState('')

  const handleChange = (val: any) => {
    setSearchString(val.target.value as string)
  }

  const submitSearch = () => {
    emitSearch(searchString)
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            label="Search Movies"
            placeholder="Ex: Godfather"
            fullWidth
            sx={{ height: '3.5rem' }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            sx={{ height: '3.5rem' }} 
            fullWidth variant="outlined" 
            color="secondary"
            onClick={submitSearch}
          >Search</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MovieTitleFilter