import { Stack, Typography } from '@mui/material'

interface MovieHeadingProps {
  title: string;
  year: number;
}

const MovieHeading = ({ title, year }: MovieHeadingProps) => {
  return (
    <Stack direction="row">
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          marginRight: '.5rem'
        }}
      >
        {title}
      </Typography>
      <Typography
        color="textSecondary"
        variant="subtitle1"
        lineHeight={2.25}
        gutterBottom
      >
        {year}
      </Typography>
    </Stack>
  )
}

export default MovieHeading