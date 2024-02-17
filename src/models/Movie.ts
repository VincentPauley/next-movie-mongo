import mongoose from 'mongoose'

export interface Movies extends mongoose.Document {
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
  seasonality: string[],
  directors: string[]
}

const MovieSchema = new mongoose.Schema<Movies>({
  title: {
    type: String,
    required: [true, 'Movie title must be provided']
  },
  year: {
    type: Number,
    required: [true, 'Year of release must be provided']
  },
  rated: {
    type: String,
    required: [true, 'Movie must have value for rated']
  },
  genres: [{
    name: {
      type: String,
      required: [true, 'Movie genre must have a name']
    },
    level: {
      type: Number,
      required: [true, 'Movie genre must have a level']
    }
  }],
  ratings: [{
    reviewer: {
      type: String,
      required: [true, 'Movie reviewer must have a value']
    },
    rating: {
      type: Number,
      required: [true, 'Movie rating must have a numeric value']
    }
  }],
  synopsis: {
    type: String,
  },
  seasonality: [
    { type: String }
  ],
  directors: [
    { type: String }
  ]
})

export default mongoose.models.Movie || mongoose.model<Movies>("Movie", MovieSchema);
