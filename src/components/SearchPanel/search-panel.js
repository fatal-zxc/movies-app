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
      const { searchSend } = this.props
      searchSend(e.target.value)
    }

    this.searchSubmit = () => {
      const { text } = this.state
      const { searchSend } = this.props
      searchSend(text)
    }

    this.searchChangeDebounce = debounce(this.searchChange, 400)
  }

  render() {
    return (
      <Input
        size="large"
        className="search"
        placeholder="Type to search..."
        onChange={this.searchChangeDebounce}
        onPressEnter={this.searchSubmit}
      />
    )
  }
}
