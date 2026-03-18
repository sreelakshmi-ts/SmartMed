import React, { useEffect, useState } from 'react'
import style from './RNavbar.module.css'
import { useNavigate } from 'react-router'
import axios from 'axios'

const RNavbar = () => {

  const [open, setOpen] = useState(false)
  const [rep, setRep] = useState("")
  

  const navigate = useNavigate()

  

    useEffect(() => {
    const repId = sessionStorage.getItem('rid');
    if (!repId) return;
    axios.get(`http://localhost:5000/Representative/${repId}`)
    .then(res => setRep(res.data.data))
    .catch(console.error);
}, []);

  const myprofile = () =>{
    navigate('/reps/repmyprofile')
  }

  const logout = () =>{
    sessionStorage.removeItem('rid')
    navigate('/guest/login')
  }

  return (

    <nav className={style.repnavbar}>

      <div className={style.left}>
        <h2 className={style.title}>SmartMed Representative</h2>
      </div>

      <div className={style.right}>

        <span className={style.welcome}>
          Welcome, {rep.repName}
        </span>

        <div
          className={style.profile}
          onClick={() => setOpen(!open)}
        >

          <img
            src={`http://localhost:5000${rep.repPhoto}`}
            alt="profile"
            className={style.avatar}
          />

          <span className={style.name}>{rep.repName}</span>

          {open && (

            <div className={style.dropdown}>

              <button onClick={myprofile}>
                My Profile
              </button>

              {/* <button>
                Edit Profile
              </button> */}

              <button
                onClick={logout}
                className={style.logout}
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </nav>

  )
}

export default RNavbar