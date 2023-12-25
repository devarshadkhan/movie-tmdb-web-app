
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import MoviePage from './pages/MoviePage/MoviePage'
import AllMovies from './pages/AllMovies/AllMovies'
import Search from './pages/Search/Search'
import { useLoader } from './contextApp/LoaderContext'

function App() {
  const { loader, setLoader } = useLoader();
  return (
    <>
     {loader && (
        <div className="loadingWrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

     <BrowserRouter>
     <Header />
      <Routes>
      
        <Route path='/' element={<Home />}/>
        <Route path='/:mediatype/:id' element={<MoviePage />}/>
        <Route path='/explore/:mediaType' element={<AllMovies />}/>
        <Route path='/search/:query' element={<Search />}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
