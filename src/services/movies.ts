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

export const GetMovies = () => {
  return new Promise<{ data:{ recordSet: MovieRecord[], totalRecords: number} }>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/movies')
    const records = await response.json()

    resolve(records)
  })
}
