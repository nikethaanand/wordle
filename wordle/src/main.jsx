import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout.jsx';
import Home from './Home';
import WordValidation from './Components/wordValidation';
import Rules from './Components/rules';
import HardLevel from './Components/hardLevel';
import NormalLevel from './Components/normalLevel';
import Level from './level';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
         <Route path="game/hardLevel" element={<HardLevel/>} />
         <Route path="game/normalLevel" element={<NormalLevel/>} />
         <Route path="rules" element={<Rules/>} />
         <Route path="level" element={<Level/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
