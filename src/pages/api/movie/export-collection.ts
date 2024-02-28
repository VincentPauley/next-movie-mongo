import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      await dbConnect()
      const records = await Movie.find({})

      res.json({ records })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'failed export' })
    }
}