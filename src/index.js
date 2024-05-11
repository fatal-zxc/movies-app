import { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'

import './index.css'
import Header from './components/Header'
import MoviesList from './components/MoviesList'
import SearchPanel from './components/SearchPanel'
import Footer from './components/Footer'

class App extends Component {
  constructor() {
    super()

    this.state = {
      mode: 'Search',
      search: '',
      page: 1,
    }

    this.pageUpdate = (newPage) => {
      this.setState({
        page: newPage,
      })
    }

    this.searchSend = (text) => {
      this.setState({
        search: text,
      })
    }
  }

  render() {
    const { mode, page, search } = this.state
    return (
      <>
        <Online>
          <section className="moviesApp">
            <Header mode={mode} />
            <main className="main">
              <SearchPanel searchSend={this.searchSend} />
              <MoviesList
                page={page}
                search={search}
              />
              <Footer
                pageUpdate={this.pageUpdate}
                search={search}
              />
            </main>
          </section>
        </Online>
        <Offline>
          <Alert
            type="error"
            message="you are offline"
            style={{ textAlign: 'center' }}
          />
        </Offline>
      </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
