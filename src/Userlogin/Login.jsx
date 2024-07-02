import React ,{useState} from 'react'
import { onAuthStateChanged , signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useNavigate } from "react-router-dom";
function Login(props) {

 const [loginemail , setloginemail] = useState('');
 const [loginpassword , setloginpassword] = useState('');
 const [loading , setloading] = useState(false);
 const navigate = useNavigate(); 

 
 const login =async () => {
  setloading(true);
  try{
      const user = await signInWithEmailAndPassword(auth , loginemail , loginpassword);
      props.setloginstate(true);
      const uid = user.user.uid;
      navigate('/' , {state : {userid : uid}});
   }catch(error){
       alert(error);
   }finally{
    setloading(false);
   }
}

  return (
    <div className='background-container'>
    <div className='signup-card'>
    <h2>Login to your Account</h2>
    <div className='signupform'>
      <div className='form-group'>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setloginemail(e.target.value)}
          value={loginemail}
          required
        />
      </div>
      <div className='form-group'>
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setloginpassword(e.target.value)}
          value={loginpassword}
          required
        />
      </div>
      <div className='form-group'>
        <a href='/signup'>Did'nt have an account?</a>
      </div>
      {loading ? (<button type="button"><l-line-spinner size="24" stroke="2" speed="1" color="white"></l-line-spinner></button>) :
      <button type="button" onClick={login}>LOGIN</button>}
    </div>
  </div>
</div>
  );
};

export default Login;
