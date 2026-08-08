import { render } from 'preact'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Estadisticas from './Estadisticas.tsx'

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/estadisticas" element={<Estadisticas />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')!
)
