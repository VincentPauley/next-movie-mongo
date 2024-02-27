interface MovieRecord {
  _id: string;
  title: string;
  year: number;
  rated: string;
  genres: [
    { level: number, name: string }
  ];
  ratings: [
    { reviewer: string, rating: number }
  ];
  synopsis: string;
  seasonality: string[];
  directors: string[];
}

export const GetMovies = (pageNumber = 0, searchString = '') => {
  return new Promise<{ data:{ recordSet: MovieRecord[], totalRecords: number, pages: number} }>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + `/api/movies/?page=${pageNumber}&searchString=${searchString}`)
    const records = await response.json()

    resolve(records)
  })
}

export const GetMovie = (movieId: string) => {

  console.log('movieId: ', movieId)
  return new Promise<{ data: MovieRecord }>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movie/' + movieId)
    const record = await response.json()

    resolve(record)
  })
}
