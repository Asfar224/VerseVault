import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth , firestore} from '../firebase-config';
import './style.css';
import { useNavigate } from "react-router-dom";
import { addDoc ,collection} from 'firebase/firestore'

function Signup(props) {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const navigate = useNavigate();
  const user_collection = collection(firestore , "bookmarks");

  const addUserBookmark =async(uid)=>{
    const hello =  await addDoc(user_collection , {uid : uid , bookmark : {chapterno : "1" , ayatno : "1"}});
      console.log(hello);
      }


  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      props.setloginstate(true);
      const uid = userCredential.user.uid;
      addUserBookmark(uid);
      navigate('/' , {state : {userid : uid}});
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <div className='signup-card'>
      <h2>Create an Account</h2>
      <div className='signupform'>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setSignupEmail(e.target.value)}
            value={signupEmail}
            required
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setSignupPassword(e.target.value)}
            value={signupPassword}
            required
          />
        </div>
        <div className='form-group'>
          <a href='/login'>Already have an account?</a>
        </div>
        <button type="button" onClick={register}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
