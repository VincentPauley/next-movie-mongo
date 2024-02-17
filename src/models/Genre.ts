import mongoose from 'mongoose'

export interface Genres extends mongoose.Document {
  name: string;
  level: number;
}

const GenreSchema = new mongoose.Schema<Genres>({
  name: {
    type: String,
    required: [true, 'Genre name must be provided.'],
    unique: true
  },
  level: {
    type: Number,
    required: [true, 'Genre level must be provided.']
  }
})

export default mongoose.models.Genre || mongoose.model<Genres>("Genre", GenreSchema);
