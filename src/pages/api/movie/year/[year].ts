import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      await dbConnect()

      if (req.method === 'GET') {
        const data = await Movie.find({ year: req.query.year })

        res.status(200).json({ data })
      }
    } catch (e) {
      console.error(e)
    }
}