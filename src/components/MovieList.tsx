import { useQuery } from '@tanstack/react-query'
import { GetMovies } from '@/services/movies'

export default function MovieList() {
  const { data: movies, isError, isLoading } = useQuery({ queryKey: ['movies'], queryFn: GetMovies });

  return (
    <div>
      <h2>Movie List: {movies?.data?.length}</h2>
      <ul>
        {movies?.data.map(record => {
          return <li>{record.title}</li>
        })}
      </ul>
    </div>
  );
}
