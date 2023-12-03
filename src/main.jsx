import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Loader_Provider } from './contextApp/LoaderContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Loader_Provider><App />
  </Loader_Provider>
  </React.StrictMode>,
)
