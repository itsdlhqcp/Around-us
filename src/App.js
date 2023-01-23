import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

 const App =()=> {
    return (
      <div>
        <Router>
        <Navbar/>
        <Routes>
            <Route exact path="/" element={<News key="general" country="in" category="all"/>}></Route>
            <Route exact path="/business" element={<News key="business" country="in" category="business"/>}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" country="in" category="entertainment"/>}></Route>
            <Route exact path="/national" element={<News key="national" country="in" category="national"/>}></Route>
            <Route exact path="/politics" element={<News key="politics" country="in" category="politics"/>}></Route>
            <Route exact path="/science" element={<News key="science" country="in" category="science"/>}></Route>
            <Route exact path="/sports"element={<News key="sports" country="in" category="sports"/>}></Route>
            <Route exact path="/technology"element={<News key="technology" country="in" category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
}

export default App

