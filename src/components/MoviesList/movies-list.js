import { Component } from 'react'
import { Flex } from 'antd'

import MovieCard from '../MovieCard'
import MoviesApi from '../../services/movies-api'

export default class MoviesList extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
    }

    MoviesApi.a = new MoviesApi()

    this.cardsUpdate = () => {
      MoviesApi.a.getMoviesList(1)
        .then((res) => {
          const newData = res.results.slice(0, 6)
          this.setState({
            data: newData,
          })
        })
    }
    this.cardsUpdate()
  }

  render() {
    const { data } = this.state
    let moviesCards
    if (data.length === 0) {
      moviesCards = null
    } else {
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
          />,
        )
      }
    }
    return (
      <Flex wrap="wrap" justify="center" gap={36}>
        {moviesCards}
      </Flex>
    )
  }
}
