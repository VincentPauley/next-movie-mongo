// get ability to push movies into the DB...
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { title, year, rated, genres, ratings, synopsis, seasonality, directors } = JSON.parse(req.body)
  
      const alreadyExists = await Movie.exists({ title, year })
  
      if (alreadyExists) {
        res.status(400).json({ message: `${title} (${year}): already in database` })
      } else {
        const result = await Movie.create({ 
          title,
          year,
          rated,
          genres,
          ratings,
          synopsis,
          seasonality,
          directors
        })
        res.json({ message: 'Created: ' + result.id })
      }
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Server could not save movie document' })
  }
  

  // if (req.method === 'GET') {
  //   const result = await Genre.find({})

  //   res.json({ data: result })
  //   // RUN FIND
  // }

  // res.status(200).json({ teams })
}
