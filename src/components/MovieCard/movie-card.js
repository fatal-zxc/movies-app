import React, { Component } from 'react'
import { Card, Flex, Typography, Space, Rate } from 'antd'
import { format } from 'date-fns'

import './movie-card.css'
import MoviesApi from '../../services/movies-api'
import { MoviesApiConsumer } from '../../services/movies-api-context'

function overviewShorter(text) {
  let space
  if (text === '') return ''
  for (let i = 190; i < text.length; i += 1) {
    if (text[i] === ' ') {
      space = i
      break
    }
  }
  if (text[space - 1] === '.' || space === undefined) return `${text.slice(0, space)}..`
  return `${text.slice(0, space)}...`
}

const { Title, Text } = Typography

export default class MovieCard extends Component {
  constructor() {
    super()

    this.state = {}

    MoviesApi.card = new MoviesApi()

    this.changeRateWrap = (value) => {
      const { sessionId, id, changeRate, onError } = this.props
      MoviesApi.card.addRating(sessionId, id, value).then(changeRate(value, id)).catch(onError)
    }
  }

  render() {
    const mobile = document.body.clientWidth <= 500
    const { title, poster, release, rate, overview, ratedMovies, id, genresIds } = this.props
    const rateRounded = (Math.round(rate * 10) / 10).toFixed(1)
    const overviewShort = overviewShorter(overview)

    const genresElements = genresIds.map((genreId) => (
      <MoviesApiConsumer key={genreId}>
        {(genres) => <Text className="genre">{genres.find((genre) => genre.id === genreId).name}</Text>}
      </MoviesApiConsumer>
    ))

    return (
      <Card
        hoverable
        className="card"
        styles={{ body: { padding: 0, overflow: 'hidden' } }}
      >
        <Flex>
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w200${poster}`}
            className="poster"
          />
          <Flex
            vertical
            align="flex-start"
            style={{ marginLeft: 20 }}
          >
            <Title
              level={3}
              style={{ marginTop: 10, marginBottom: 7, fontSize: 20, width: 180 }}
            >
              {title}
            </Title>
            <Text
              type="secondary"
              style={{ marginBottom: 7, fontSize: 12 }}
            >
              {release ? `${format(release, 'MMMM d')}, ${format(release, 'y')}` : 'no data'}
            </Text>
            <Space style={{ marginBottom: 7 }}>{genresElements}</Space>
            {!mobile ? <Text className="overview">{overviewShort}</Text> : null}
            <Rate
              defaultValue={ratedMovies[id]}
              count={10}
              onChange={this.changeRateWrap}
              className="stars"
            />
            <p className="rate">{rateRounded}</p>
          </Flex>
        </Flex>
        {mobile ? <Text className="overview">{overviewShort}</Text> : null}
      </Card>
    )
  }
}
