import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
=======
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import App from './App.tsx'
>>>>>>> 7cbb7466563614a90fb8dcd4368aac926b57b449

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
<<<<<<< HEAD
  </StrictMode>
)


=======
  </StrictMode>,
)
>>>>>>> 7cbb7466563614a90fb8dcd4368aac926b57b449
