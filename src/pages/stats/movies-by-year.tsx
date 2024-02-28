import { useRef } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'
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
    // console.log(event)
    console.log(getElementAtEvent(chartRef.current, event)[0].index);

    const clickedIndex = getElementAtEvent(chartRef.current, event)[0].index

    console.log(yearStats.result[clickedIndex]._id)
    
    router.push('/movies/year/' + yearStats.result[clickedIndex]._id)
  }

  return (
    <Container>
      movies by year...
      <Bar ref={chartRef} options={options} data={data} onClick={onClick}/>
    </Container>
  )
}

export default MoviesByYearPage
