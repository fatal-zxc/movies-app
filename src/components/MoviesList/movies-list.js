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
      empty: false,
    }

    MoviesApi.list = new MoviesApi()

    this.onError = () => {
      this.setState({
        error: true,
      })
    }

    this.cardsUpdate = (page) => {
      const { search } = this.props
      this.setState({
        loading: true,
        empty: false,
      })
      if (!search) {
        MoviesApi.list
          .getMoviesList(Math.ceil(page / 2))
          .then((res) => {
            const newData = res.results
            if (newData.length === 0) {
              this.setState({
                empty: true,
                loading: false,
              })
            } else {
              this.setState({
                data: newData,
                loading: false,
                empty: false,
              })
            }
          })
          .catch(this.onError)
      } else {
        MoviesApi.list
          .getMoviesByName(Math.ceil(page / 2), search)
          .then((res) => {
            const newData = res.results
            if (newData.length === 0) {
              this.setState({
                empty: true,
                loading: false,
              })
            } else {
              this.setState({
                data: newData,
                loading: false,
                empty: false,
              })
            }
          })
          .catch(this.onError)
      }
    }
  }

  componentDidMount() {
    const { page } = this.props
    this.cardsUpdate(page)
  }

  componentDidUpdate(prevProps) {
    const { page, search } = this.props
    if ((page % 2 === 0 && prevProps.page + 1 === page) || (page % 2 === 1 && prevProps.page - 1 === page)) return
    if (page !== prevProps.page) {
      this.cardsUpdate(page)
    }
    if (search !== prevProps.search) {
      this.cardsUpdate(page)
    }
  }

  render() {
    const { data, error, loading, empty } = this.state
    const { page } = this.props

    const errorMessage = error ? (
      <Alert
        type="error"
        message="this service is not available in your country"
      />
    ) : null

    const spiner = loading && !error ? <Spin /> : null

    const emptyMessage = empty ? (
      <Alert
        type="error"
        message="no results for search"
      />
    ) : null

    const newData = page % 2 ? data.slice(0, 10) : data.slice(10, 20)
    const createCards = newData.map((el) => (
      <MovieCard
        title={el.title}
        overview={el.overview}
        poster={el.poster_path}
        release={el.release_date}
        rate={el.vote_average}
        key={el.id}
      />
    ))
    const moviesCondition = !loading && !error && !empty
    const moviesCards = moviesCondition ? createCards : null

    return (
      <Flex
        wrap="wrap"
        className="moviesList"
        justify="center"
        gap={36}
      >
        {moviesCards}
        {spiner}
        {errorMessage}
        {emptyMessage}
      </Flex>
    )
  }
}
