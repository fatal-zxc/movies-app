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
      loading: true,
      empty: false,
    }

    MoviesApi.list = new MoviesApi()

    this.onEmpty = () => {
      this.setState({
        empty: true,
        loading: false,
      })
    }

    this.cardsUpdate = (page) => {
      const { search, onError, mode, sessionId } = this.props
      this.setState({
        loading: true,
        empty: false,
      })
      if (mode === 'Rated') {
        MoviesApi.list
          .getRatedMovies(sessionId, Math.ceil(page / 2))
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
          .catch(this.onEmpty)
      } else if (!search) {
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
          .catch(onError)
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
          .catch(onError)
      }
    }
  }

  componentDidMount() {
    const { page } = this.props
    this.cardsUpdate(page)
  }

  componentDidUpdate(prevProps) {
    const { page, search, mode } = this.props
    if ((page % 2 === 0 && prevProps.page + 1 === page) || (page % 2 === 1 && prevProps.page - 1 === page)) return
    if (page !== prevProps.page) {
      this.cardsUpdate(page)
    }
    if (search !== prevProps.search) {
      this.cardsUpdate(page)
    }
    if (mode !== prevProps.mode) {
      this.cardsUpdate(page)
    }
  }

  render() {
    const { data, loading, empty } = this.state
    const { page, sessionId, changeRate, onError, ratedMovies } = this.props

    const spiner = loading ? <Spin /> : null

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
        id={el.id}
        sessionId={sessionId}
        changeRate={changeRate}
        onError={onError}
        ratedMovies={ratedMovies}
        genresIds={el.genre_ids}
        key={el.id}
      />
    ))
    const moviesCondition = !loading && !empty
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
        {emptyMessage}
      </Flex>
    )
  }
}
