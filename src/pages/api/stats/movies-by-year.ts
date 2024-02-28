import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  const result = await Movie.aggregate([{ $group: { _id: '$year', count: {$sum: 1} } }]).sort({ _id: 1 })

  res.json({ result })
}