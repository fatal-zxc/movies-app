import React, { Component } from 'react'
import { ConfigProvider, Pagination } from 'antd'

import './footer.css'
import MoviesApi from '../../services/movies-api'

export default class Footer extends Component {
  constructor() {
    super()

    this.state = {
      totalPages: 10000,
    }

    MoviesApi.footer = new MoviesApi()

    this.updatePages = () => {
      const { search } = this.props
      if (search) {
        MoviesApi.footer.getMoviesByName(1, search).then((res) => {
          const newTotalPages = res.total_pages * 20
          if (res.total_results % 20 !== 0 && res.total_results % 20 <= 10) {
            this.setState({
              totalPages: newTotalPages - 10,
            })
          } else {
            this.setState({
              totalPages: newTotalPages,
            })
          }
        })
      } else {
        this.setState({
          totalPages: 10000,
        })
      }
    }
  }

  componentDidMount() {
    this.updatePages()
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props
    if (search !== prevProps.search) {
      this.updatePages()
    }
  }

  render() {
    const { totalPages } = this.state
    const { pageUpdate } = this.props
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffffff',
          },
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          className="pagintaion"
          itemActiveBg="#1890FF"
          size="small"
          defaultCurrent={1}
          total={totalPages}
          showSizeChanger={false}
          onChange={pageUpdate}
        />
      </ConfigProvider>
    )
  }
}
