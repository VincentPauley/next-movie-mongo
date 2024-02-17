import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Genre from '@/models/Genre'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  if (req.method === 'POST') {
    const { name, level } = JSON.parse(req.body)

    const result = await Genre.create({ name, level })

    res.json({ message: 'Created', id: result.id })
  }

  if (req.method === 'GET') {
    const result = await Genre.find({})

    res.json({ data: result })
    // RUN FIND
  }

  // res.status(200).json({ teams })
}
