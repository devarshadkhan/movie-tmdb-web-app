
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import MoviePage from './pages/MoviePage/MoviePage'
import AllMovies from './pages/AllMovies/AllMovies'
import Search from './pages/Search/Search'

function App() {

  return (
    <>
     

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
