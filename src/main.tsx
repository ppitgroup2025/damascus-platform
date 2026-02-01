import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/globals.css';
import './styles/rtl.scss';

import App from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
