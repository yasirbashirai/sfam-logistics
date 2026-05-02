import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { SubmissionsProvider } from './context/SubmissionsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <SubmissionsProvider>
        <App />
      </SubmissionsProvider>
    </HashRouter>
  </React.StrictMode>
)
