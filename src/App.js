import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Userlogin/Login';
import Signup from './Userlogin/Signup';
import Quranpage from './Quranpage';
import { useEffect, useState } from 'react';
import About from './about/About';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {

  const [loginstate , setloginstate] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth , (currentUser)=>{
        if(currentUser){
         setloginstate(true);
         setUser(currentUser);
        }
        else{
          setloginstate(false);
          setUser(null);
        }
  }) 
},[]) 

  if(user===undefined)return "loading..."

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Quranpage loginstate={loginstate}  setloginstate={setloginstate}/>} />
          <Route path="/login" element={<Login setloginstate={setloginstate}/>} />
          <Route path="/signup" element={<Signup setloginstate={setloginstate}/>} />
          <Route path= "/about" element={ <About/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
