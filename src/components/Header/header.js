import { Tabs, Flex } from 'antd'

import './header.css'

const items = [
  {
    key: 1,
    label: 'Search',
  },
  {
    key: 2,
    label: 'Rated',
  },
]

function Header({ changeMode }) {
  return (
    <header className="header">
      <Flex
        gap="small"
        wrap="wrap"
        justify="center"
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={changeMode}
        />
      </Flex>
    </header>
  )
}

export default Header
