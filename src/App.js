import logo from './logo.svg';
import {
  BrowserRouter as Router, Link, Route, Routes, Routes as Switch,
  
} from "react-router-dom";

import './App.css';
import Room from './Room';
import Login from './Login';
import SignUp from './Signup';
import { useEffect, useState } from 'react';

export default function App() {

 
  return (
  <div className='app'>
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
              <Link to="/room/:email">Room</Link>

            </li>
           
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />

      <Route exact path="/room/:email" element={<Room />} />
      </Routes>
      </div>
    </Router>
  </div>
  );
}

