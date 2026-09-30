import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HobbyCards from './HobbyCards.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HobbyCards />
  </StrictMode>,
)
