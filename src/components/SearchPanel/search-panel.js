import React from 'react'
import { Input } from 'antd'

import './search-panel.css'

function SearchPanel() {
  return (
    <Input size="large" className="search" placeholder="Type to search..." />
  )
}

export default SearchPanel
