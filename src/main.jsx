import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import LoadingProvider from './contexts/LoadingContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <UserProvider>
  <LoadingProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </LoadingProvider>
  </UserProvider>
  </React.StrictMode>
)
