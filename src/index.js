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
      page: 1,
    }
  }

  render() {
    const { mode, page } = this.state
    return (
      <>
        <Online>
          <section className="moviesApp">
            <Header mode={mode} />
            <main className="main">
              <SearchPanel />
              <MoviesList page={page} />
              <Footer />
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
