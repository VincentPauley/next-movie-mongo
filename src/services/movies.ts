
// TODO: switch to common export
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

export const GetMovieCount = () => {
  return new Promise<{data: { totalMovies: number }}>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movie-count');
    const records = await response.json()

    resolve(records)
  })
}

export const GetMovies = (pageNumber = 0, searchString = '') => {
  return new Promise<{ data:{ recordSet: MovieRecord[], totalRecords: number, pages: number} }>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + `/api/movies/?page=${pageNumber}&searchString=${searchString}`)
    const records = await response.json()

    resolve(records)
  })
}

export const GetMovie = (movieId: string) => {
  return new Promise<{ data: MovieRecord }>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movie/' + movieId)
    const record = await response.json()

    resolve(record)
  })
}

export const GetMoviesByYear = (year: string) => {
  return new Promise<{ data: MovieRecord[] }>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movie/year/' + year)
    const record = await response.json()

    resolve(record)
  })
}


interface AddMovieParams {
  title: string;
  year: string;
  rated: string;
  genres: {name: string, level: number}[];
}

export const AddMovie = (params: AddMovieParams) => {
  return new Promise<any>(async(resolve, reject) => {

    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movies/', { method: "POST", body: JSON.stringify(params) })

    const result = await response.json();

    console.log('Add Movie Result')
    console.log({ result })

    resolve(result)
  })
}

export const DeleteMovie = (movieId: string) => {
  return new Promise<any>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movie/' + movieId, { method: "DELETE", headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify({ id: movieId }) })
    
    const result = await response.json()

    resolve(result)
  })
}

export const ExportMovies = () => {
  return new Promise(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movie/export-collection')
    const records = await response.json()
    resolve(records)
  })
}