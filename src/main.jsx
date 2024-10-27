import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Entercode from './entercode.jsx';
import './index.css'
import Changepass from './changepass.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App />
  </StrictMode>,
)
