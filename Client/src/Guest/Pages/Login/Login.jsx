import React, { useState } from 'react'
import style from './Login.module.css'
import { useNavigate } from 'react-router';
import axios from 'axios';
import logimg from '../../../assets/Landingpage/loginimg.jpg'

const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', { email, password })
      .then(res => {

        const { role, id, name, message } = res.data;
        alert(message);

        if (role === 'customer') {
          sessionStorage.setItem('cid', id);
          sessionStorage.setItem('customerStoreName', name);
          navigate('/customer/home');
        }

        if(role === 'equipmentcustomer'){
          sessionStorage.setItem('ecid',id);
          sessionStorage.setItem('customerStoreName',name);
          navigate('/equipmentCustomer/');
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

      {/* IMAGE SECTION */}
        <div className={style.imageSection}>

          {/* Background Image */}
          <img
            src={logimg}
            alt="SmartMed"
            className={style.bgImage}
          />

          {/* Gradient Overlay */}
          <div className={style.overlay}></div>

          {/* Content */}
          <div className={style.overlayContent}>
            <h1>SmartMed</h1>
            <p>Healthcare Inventory & Distribution Platform</p>

            <div className={style.featureList}>
              <span>✔ Medicine Distribution</span>
              <span>✔ Equipment Management</span>
              <span>✔ Smart Order Tracking</span>
            </div>
          </div>

        </div>


      {/* LOGIN FORM */}
      <div className={style.loginSection}>

        <form className={style.loginform} onSubmit={handleLogin}>

                <h2>Welcome Back !!</h2>
                <p>Login to SmartMed Business Portal</p>

                <input
                  type="text"
                  placeholder="Email Address"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />

                {/* SIGNUP DROPDOWN */}
                <div className={style.signupRow}>
                  <span>New to SmartMed?</span>

                  <select
                    className={style.signupSelect}
                    onChange={(e)=>{
                      if(e.target.value==="medicine")
                        navigate("/guest/regs");

                      if(e.target.value==="equipment")
                        navigate("/guest/EquipmentShopreg");
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Sign Up As</option>
                    <option value="medicine">Medicine Shop</option>
                    <option value="equipment">Equipment Shop</option>
                  </select>
                </div>

                <button type="submit" className={style.button}>
                  Login
                </button>

        </form>
      </div>

    </div>
  )
}

export default Login