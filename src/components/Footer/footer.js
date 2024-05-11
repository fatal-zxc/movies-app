import React from 'react'
import { ConfigProvider, Pagination } from 'antd'

import './footer.css'

function Footer({ pageUpdate }) {
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
        total={5000}
        showSizeChanger={false}
        onChange={pageUpdate}
      />
    </ConfigProvider>
  )
}

export default Footer
