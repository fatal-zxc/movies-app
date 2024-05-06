import { Component } from 'react'
import ReactDOM from 'react-dom/client'

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
      <section className="moviesApp">
        <Header mode={mode} />
        <main className="main">
          <SearchPanel />
          <MoviesList page={page} />
          <Footer />
        </main>
      </section>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
