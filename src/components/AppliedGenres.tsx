import { useId } from 'react'
import { Chip, Stack } from '@mui/material'

import GenreRecord from '@/interfaces/GenreRecord'

const AppliedGenres = ({ genres = [] }: { genres: GenreRecord[] }) => {
  const id = useId(); 

  return (
    <Stack direction="row" sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
      {
        genres
          // most prominent genres first
          .sort((a, b) => a.level < b.level ? -1 : 1)
          .map((genre, index) => {
            const key = `${id}_${index}`
            const color = genre.level < 3 ? 'primary' : 'default'
            const variant = genre.level === 2 ? 'outlined' : 'filled'

            return (
              <Chip
                key={key}
                label={genre.name}
                color={color}
                variant={variant}
                sx={{
                  marginRight: '.25rem'
                }}
              />
            )
          })
      }
    </Stack>
  )
}

export default AppliedGenres
