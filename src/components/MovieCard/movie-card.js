import React, { Component } from 'react'
import { Card, Flex, Typography, Space, Rate } from 'antd'
import { format } from 'date-fns'

import './movie-card.css'

function overviewShorter(text) {
  let space
  for (let i = 270; i < text.length; i += 1) {
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

    const { rate, overview } = this.state

    this.state = {
      rateRounded: (Math.round(rate * 10) / 10).toFixed(1),
      overviewShort: overviewShorter(overview),
    }
  }

  render() {
    const mobile = document.body.clientWidth <= 500
    const { title, poster, release } = this.props
    const { rateRounded, overviewShort } = this.state

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
              {`${format(release, 'MMMM d')}, ${format(release, 'y')}`}
            </Text>
            <Space style={{ marginBottom: 7 }}>
              <Text className="genre">Action</Text>
              <Text className="genre">Drama</Text>
            </Space>
            {!mobile ? <Text className="overview">{overviewShort}</Text> : null}
            <Rate
              allowHalf
              disabled
              defaultValue={rateRounded}
              count={10}
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
