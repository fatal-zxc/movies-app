import React, { Component } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

import './search-panel.css'

export default class SearchPanel extends Component {
  constructor() {
    super()

    this.state = {
      text: '',
    }

    this.searchChange = (e) => {
      this.setState({
        text: e.target.value,
      })
      this.searchChangeDebounce()
    }

    this.searchSubmit = () => {
      const { text } = this.state
      const { searchSend } = this.props
      searchSend(text)
    }

    this.searchChangeDebounce = debounce(this.searchSubmit, 400)
  }

  componentDidMount() {
    const { searchText } = this.props
    this.setState({
      text: searchText,
    })
  }

  render() {
    const { text } = this.state

    return (
      <Input
        size="large"
        className="search"
        placeholder="Type to search..."
        onChange={this.searchChange}
        value={text}
        onPressEnter={this.searchSubmit}
      />
    )
  }
}
