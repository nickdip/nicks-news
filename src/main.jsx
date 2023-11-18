import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import LoadingProvider from './contexts/LoadingContext.jsx'
import { CookiesProvider } from 'react-cookie'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
  <UserProvider>
  <LoadingProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </LoadingProvider>
  </UserProvider>
  </CookiesProvider>
  </React.StrictMode>
)
