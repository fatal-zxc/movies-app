import { Component } from 'react'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'

import './app.css'
import Header from '../Header'
import MoviesList from '../MoviesList'
import SearchPanel from '../SearchPanel'
import Footer from '../Footer'
import MoviesApi from '../../services/movies-api'
import { MoviesApiProvider } from '../../services/movies-api-context'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      mode: 'Search',
      search: '',
      page: 1,
      sessionId: 0,
      ratedMovies: {},
      error: false,
      genres: 123,
    }

    MoviesApi.app = new MoviesApi()

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

    this.onError = () => {
      this.setState({
        error: true,
      })
    }

    this.createSession = () => {
      MoviesApi.app
        .createGuestSession()
        .then((id) => {
          this.setState({
            sessionId: id,
          })
        })
        .catch(this.onError)
    }

    this.changeMode = (key) => {
      if (key === 1) {
        this.setState({
          mode: 'Search',
        })
      } else if (key === 2) {
        this.setState({
          mode: 'Rated',
        })
      }
    }

    this.changeRate = (value, id) => {
      this.setState(({ ratedMovies }) => {
        const newRatedMovies = JSON.parse(JSON.stringify(ratedMovies))
        if (value === 0) delete newRatedMovies[id]
        else newRatedMovies[id] = value
        return {
          ratedMovies: newRatedMovies,
        }
      })
    }

    this.updateGenres = () => {
      MoviesApi.app
        .getGenres()
        .then((res) => {
          this.setState({
            genres: res,
          })
        })
        .catch(this.onError)
    }
  }

  componentDidMount() {
    this.createSession()
    this.updateGenres()
  }

  render() {
    const { mode, page, search, sessionId, error, ratedMovies, genres } = this.state

    const errorMessage = error ? (
      <Alert
        type="error"
        message="this service is not available in your country"
        style={{ textAlign: 'center' }}
      />
    ) : null

    const searchPanel =
      mode === 'Search' ? (
        <SearchPanel
          searchSend={this.searchSend}
          searchText={search}
        />
      ) : null

    const moviesApp = !error ? (
      <section className="moviesApp">
        <Header changeMode={this.changeMode} />
        <main className="main">
          {searchPanel}
          <MoviesList
            page={page}
            search={search}
            mode={mode}
            sessionId={sessionId}
            onError={this.onError}
            changeRate={this.changeRate}
            ratedMovies={ratedMovies}
          />
          <Footer
            pageUpdate={this.pageUpdate}
            search={search}
            mode={mode}
            sessionId={sessionId}
          />
        </main>
      </section>
    ) : null

    return (
      <>
        <Online>
          <MoviesApiProvider value={genres}>
            {moviesApp}
            {errorMessage}
          </MoviesApiProvider>
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
