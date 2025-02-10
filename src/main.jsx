import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ListaPreferiti from './pages/ListaPreferiti.jsx'
import {FlightProvider} from './context/FlightContext.jsx'
import { FavProvider } from './context/FavContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/Header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlightProvider>
        <FavProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/favs" element={<ListaPreferiti />} />
              </Routes>
            </BrowserRouter>
        </FavProvider>
    </FlightProvider>
  </StrictMode>,
)
