import axios from 'axios'

const BASE_ROUTE = process.env.NEXT_PUBLIC_ENDPOINT

export const createEndpoint = (route: string) => {
  return BASE_ROUTE + route
}

const http = {
  get: (route: string) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await axios.get(BASE_ROUTE + route);

        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default http;
