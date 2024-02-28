export default interface MovieRecord {
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