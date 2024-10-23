import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import your components
import Home from "./pages/Home";
import About from "./pages/About";
import Translations from "./pages/Translations";
import TranslationDetail from "./pages/TranslationDetail";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav className='bg-blue-900'>
          <ul className='flex justify-center space-x-4 p-5'>
            <li>
              <Link to='/' className='text-blue-100 hover:underline'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' className='text-blue-100 hover:underline'>
                About
              </Link>
            </li>
            <li>
              <Link
                to='/translations'
                className='text-blue-100 hover:underline'>
                Translations
              </Link>
            </li>
          </ul>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/translations' element={<Translations />} />
          <Route path='/translations/:name' element={<TranslationDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
