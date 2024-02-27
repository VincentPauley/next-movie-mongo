import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
// import Movie from '@/models/Movie'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      await dbConnect()
      res.json({ message: 'received the export request.' })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'failed export' })
    }
}