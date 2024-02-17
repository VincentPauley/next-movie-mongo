interface GenreRecord {
  _id: string;
  name: string;
  level: number;
}

export const GetGenres = () => {
  return new Promise<{data: GenreRecord[]}>(async(resolve, reject) => {
    try {
      const result = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/genres')
      const parsed = await result.json()

      resolve(parsed)
    } catch (e) {
      reject(e)
    }
  });
}
