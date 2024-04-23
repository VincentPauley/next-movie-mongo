import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'
import { ConnectingAirportsOutlined } from '@mui/icons-material'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      await dbConnect()

      if (req.method === 'GET') {
        const data = await Movie.find({ _id: req.query.id })

        res.status(200).json({ data: data[0] })
      }

      if (req.method === 'DELETE') {
        const data = await Movie.deleteOne({ _id: req.query.id })

        if (data.deletedCount === 1) {
          res.status(200).json({ message: 'deleted' })
        } else {
          res.status(500).json({ message: 'failed to delete' })
        }
      }

      if (req.method === 'PUT') {
        const json = JSON.parse(req.body)

        const newDoc = { 
          title: json.movie.title,
          year: json.movie.year,
          rated: json.movie.rated,
          genres: json.movie.genres,
          ratings: json.movie.ratings,
          seasonality: json.movie.seasonality,
          directors: json.movie.directors
        }

        const data = await Movie.findOneAndUpdate({ _id: req.query.id }, newDoc, { new: true })

        res.status(200).json({ message: `received update request for: ${req.query.id}`, data })
      }
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'Error Occurred, check logs' })
    }
}