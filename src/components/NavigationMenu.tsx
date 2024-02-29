import { Box, Link, List, ListItem } from "@mui/material"

const NavigationMenu = () => {
  return (
    <Box sx={{ width: 250, padding: '1rem' }}>
      <List>
        <ListItem>
          <Link href="/movies">Movie Search</Link>
        </ListItem>
        <ListItem>
          <Link href="/movies/add">Add Movie</Link>
        </ListItem>
        <ListItem>
          <Link href="/stats/movies-by-year">Stats: movies by year</Link>
        </ListItem>
      </List>
    </Box>
  )
}

export default NavigationMenu