import { Badge, Chip } from '@mui/material'

interface Review {
  rating: number;
  reviewer: string;
}

const formatRating = (rating: number) => {
  switch (rating) {
    case 100:
      return 'A+'
    case 95:
      return 'A'
    case 92:
        return 'A-'
    case 88:
      return 'B+'
    case 85:
      return 'B'
    case 80:
      return 'B-'
    case 75:
        return 'C'
    case 60:
      return 'D'
    case 50:
        return 'F'
    default:
      return rating
  }
}

const ReviewChip = ({ review }: { review: Review }) => {
  return (
    <Badge
      sx={{ marginLeft: '1rem' }}
      badgeContent={formatRating(review.rating)}
      color="primary"
    >
      <Chip label={review.reviewer.charAt(0).toUpperCase() + review.reviewer.slice(1)} />
    </Badge>
  );
}

export default ReviewChip