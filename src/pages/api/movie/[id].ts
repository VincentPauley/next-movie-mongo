import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      await dbConnect()
      const data = await Movie.find({ _id: req.query.id })

      res.status(200).json({ data: data[0] })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'Error Occurred, check logs' })
    }
}