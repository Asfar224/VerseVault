import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Userlogin/Login';
import Signup from './Userlogin/Signup';
import Quranpage from './Quranpage';
import { useEffect, useState } from 'react';

function App() {

  const [loginstate , setloginstate] = useState(false);

  useEffect(()=>{
     console.log(loginstate);   
  },[loginstate])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Quranpage loginstate={loginstate}  setloginstate={setloginstate}/>} />
          <Route path="/login" element={<Login setloginstate={setloginstate}/>} />
          <Route path="/signup" element={<Signup setloginstate={setloginstate}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
