export const MoviesByYear = () => {
  return new Promise<any>(async(resolve, reject) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/stats/movies-by-year')
    
    const result = await response.json()

    resolve(result)
  })
}