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

    this.cardsUpdate = (page) => {
      MoviesApi.a
        .getMoviesList(Math.ceil(page / 2))
        .then((res) => {
          const newData = res.results
          this.setState({
            data: newData,
            loading: false,
          })
        })
        .catch(this.onError)
    }
  }

  componentDidMount() {
    const { page } = this.props
    this.cardsUpdate(page)
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props
    if ((page % 2 === 0 && prevProps.page + 1 === page) || (page % 2 === 1 && prevProps.page - 1 === page)) return
    if (page !== prevProps.page) {
      this.cardsUpdate(page)
    }
  }

  render() {
    const { data, error, loading } = this.state
    const { page } = this.props

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
      const newData = page % 2 ? data.slice(0, 10) : data.slice(10, 20)
      newData.forEach((el) => {
        moviesCards.push(
          <MovieCard
            title={el.title}
            overview={el.overview}
            poster={el.poster_path}
            release={el.release_date}
            rate={el.vote_average}
            key={el.id}
          />
        )
      })
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
