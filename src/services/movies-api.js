// const apiKey = '4ef92935a0f251609d0b4259970b6ced'
const apiToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWY5MjkzNWEwZjI1MTYwOWQwYjQyNTk5NzBiNmNlZCIsInN1YiI6IjY2MzRkY2Y4ZTkyZDgzMDEyMWQyYWQ0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iKx-nvKUdDCNMuSVD6vzkGXnHRJHyMVwgOKmsjMAtX0'
export default class MoviesApi {
  constructor() {
    this.getMoviesList = async (page) => {
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=${page}&sort_by=popularity.desc`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
      }
      const res = await fetch(url, options)
      if (!res.ok) {
        throw new Error(`error: ${res.status}`)
      }
      const json = await res.json()
      return json
    }

    this.getMoviesByName = async (page, name) => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=${page}`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
      }
      const res = await fetch(url, options)
      if (!res.ok) {
        throw new Error(`error: ${res.status}`)
      }
      const json = await res.json()
      return json
    }
  }
}
