import { Component } from 'react'
import { Flex, Spin, Alert } from 'antd'

import './movies-list.css'
import MovieCard from '../MovieCard'
import MoviesApi from '../../services/movies-api'

export default class MoviesList extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      error: false,
      loading: true,
    }

    MoviesApi.a = new MoviesApi()

    this.onError = () => {
      this.setState({
        error: true,
      })
    }

    this.cardsUpdate = () => {
      MoviesApi.a
        .getMoviesList(1)
        .then((res) => {
          const newData = res.results.slice(0, 6)
          this.setState({
            data: newData,
            loading: false,
          })
        })
        .catch(this.onError)
    }
    this.cardsUpdate()
  }

  render() {
    const { data, error, loading } = this.state

    const errorMesage = error ? (
      <Alert
        type="error"
        message="this service is not available in your country"
      />
    ) : null
    const spiner = loading && !error ? <Spin /> : null

    let moviesCards = null
    if (loading === false && error === false) {
      moviesCards = []
      for (let i = 0; i < 6; i += 1) {
        moviesCards.push(
          <MovieCard
            title={data[i].title}
            overview={data[i].overview}
            poster={data[i].poster_path}
            release={data[i].release_date}
            rate={data[i].vote_average}
            key={data[i].id}
          />
        )
      }
    }

    return (
      <Flex
        wrap="wrap"
        className="moviesList"
        justify="center"
        gap={36}
      >
        {moviesCards}
        {spiner}
        {errorMesage}
      </Flex>
    )
  }
}
