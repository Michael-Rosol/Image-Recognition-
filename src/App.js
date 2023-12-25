import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Recognition from './pages/Recognition';
import Api from './pages/Api';






function App() {

  return (
   <Router>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/recognition' element={<Recognition />} />
      <Route path='/api' element={<Api />} />
     </Routes>
    </Router>
  ); 
  
}

export default App;
