import mongoose from 'mongoose'

export interface Teams extends mongoose.Document {
  name: string;
  city: string;
}

const TeamSchema = new mongoose.Schema<Teams>({
  name: {
    type: String,
    required: [true, 'Team name must be provided.']
  },
  city: {
    type: String,
    required: [true, 'Team city must be provided.']
  }
})

export default mongoose.models.Team || mongoose.model<Teams>("Team", TeamSchema);
