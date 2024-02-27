// get ability to push movies into the DB...
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'

const RECORDS_PER_PAGE = 20

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

    // this is going to need params to 
    if (req.method === 'GET') {
      const { page } = req.query
      const { searchString } = req.query

      const pageNumber = parseInt(page as string)

      const query = searchString ? { title: { '$regex': searchString, '$options': 'i' } } : {}

      const recordSet = await Movie.find(query).sort({ _id: -1 }).skip(pageNumber * RECORDS_PER_PAGE).limit(RECORDS_PER_PAGE)
      const totalRecords = await Movie.countDocuments()

      res.json({
        data: {
          totalRecords,
          recordSet,
          pages: Math.ceil(totalRecords / RECORDS_PER_PAGE) 
        }
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Could not perform' })
  }
}
