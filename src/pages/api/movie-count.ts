// new route exclusively for fetching the total movie count.

import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'

// create a robust route for getting the count of movies with genre/rating queries

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const totalMovies = await Movie.countDocuments();

      // probably good to always return the full total.
      res.json({
        data: {
          totalMovies
        }
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Could not complete request: /movie-count' })
  }
}