import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Movie Records by Year',
    },
  },
};

import { MoviesByYear } from '@/services/stats'

const MoviesByYearPage = () => {
  const { data: yearStats, isError, isLoading } = useQuery({ queryKey: ['MoviesByYear'], queryFn: () => MoviesByYear() });

  if (isLoading) {
    return <div>Loading...</div>
  }

  const labels = yearStats.result.map((record: any) => record._id)

  const data = {
    labels,
    datasets: [{
      label: 'Tracked Movies',
      data: yearStats.result.map((record: any) => record.count),
      backgroundColor: 'dodgerblue'
    }]
  }

  return (
    <Container>
      movies by year...
      <Bar options={options} data={data}/>
    </Container>
  )
}

export default MoviesByYearPage
