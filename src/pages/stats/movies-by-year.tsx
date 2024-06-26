import { useRef } from 'react'
import { useRouter } from 'next/router'
import { Card, Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Bar, getElementAtEvent } from 'react-chartjs-2';
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
  const chartRef = useRef();
  const router = useRouter();

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

  const onClick = (event: any) => {
    const clickedIndex = getElementAtEvent(chartRef.current as any, event)[0].index
    
    router.push('/movies/year/' + yearStats.result[clickedIndex]._id)
  }

  return (
    <Container>
      movies by year...
      <Card sx={{ padding: '1rem' }}>
        <Bar ref={chartRef} options={options} data={data} onClick={onClick}/>
      </Card>
    </Container>
  )
}

export default MoviesByYearPage
