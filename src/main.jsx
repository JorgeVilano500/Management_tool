import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { KanbanContextProvider } from './context/KanbanContext.jsx'
import {BrowserRouter} from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    <KanbanContextProvider>
      <App />

    </KanbanContextProvider>
    </BrowserRouter>
  // </StrictMode>
  ,
)
