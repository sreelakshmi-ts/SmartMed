import React, { useState } from 'react'
import style from './Login.module.css'
import { useNavigate } from 'react-router';
import axios from 'axios';


const Login = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate=useNavigate();

      const handleLogin = (e) => {
         e.preventDefault(); 
      
        axios.post('http://localhost:5000/login', { email, password })
            .then(res => {
                const { role, id, name, message } = res.data;
                console.log(res.data);
                
                alert(message);
                if (role === 'customer') {
                    sessionStorage.setItem('cid', id);
                    sessionStorage.setItem('customerStoreName', name);
                    navigate('/customer/home');
                }

                if(role === 'equipmentcustomer'){
                  sessionStorage.setItem('ecid',id);
                  sessionStorage.setItem('customerStoreName' , name);
                  navigate('/equipmentCustomer/')
                }


                if(role === 'admin'){
                  sessionStorage.setItem('aid', id);
                  sessionStorage.setItem('adminName', name);
                  navigate('/admin');
                }

                if(role === 'delivery'){
                  sessionStorage.setItem('did', id);
                  sessionStorage.setItem('deliverName', name);
                  navigate('/deliveryteam');
                }

                if(role === 'inmanager'){
                  sessionStorage.setItem('mid', id);
                  sessionStorage.setItem('inmanager', name);
                  navigate('/inventory');
                }
                if(role === 'rep'){
                  sessionStorage.setItem('rid', id);
                  sessionStorage.setItem('repName', name);
                  navigate('/reps');
                }
            })
            .catch(() => alert('Login failed'));
    };
  
  return (
   
        <div className={style.logincontainer}>
      {/* Left Section */}
      <div className={style.loginleft}>
        <h2>Hello</h2>
        <p>SmartMed Service</p>

        <form className={style.loginform}>
          <input type="text" placeholder="Username or Email" onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

          <div className={style.formoptions}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          
          <input type="submit" className={style.button} value="Login" onClick={handleLogin} />
        </form>
      </div>

      {/* Right Section */}
      <div className={style.loginright}>
        <h1>SmartMed</h1>
        <span>LOGIN</span>

        <div className={style.icons}>
          
        </div>
      </div>
    </div>
    
  )
}

export default Login