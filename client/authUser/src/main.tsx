import React from 'react'
import ReactDOM from 'react-dom/client'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCamera} from '@fortawesome/free-solid-svg-icons'
import App from './App.tsx'
import './index.css'

library.add(faCamera);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
