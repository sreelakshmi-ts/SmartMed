import React, { useEffect, useState } from 'react'
import style from './DeliveryReg.module.css'
import axios from 'axios';

const DeliveryReg = () => {
  const[place,setPlace]=useState([]);
  const[name,setName]=useState('');
  const[vehicleno,setVechicleNo]=useState('');
  const[placeId,setPlaceId]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[district,setDistrict]=useState([]);
  const[districtId,setDistrictId]=useState('');

      const handelSubmit =(e) =>{
        e.preventDefault(); 
          const data={
           deliverName: name,
           deliverVehicleNo:vehicleno,
           placeId:placeId,
           deliverEmail:email ,
           deliverPassword:password,

        }
        axios.post('http://localhost:5000/Delivery',data).then((res) => {
            setName("");
            setVechicleNo();
            setPlaceId("");
            setEmail("");
            setPassword("");
            alert(res.data.message)
            console.log(res.data.message);
        });
      }



    const getPlace=()=>{
    axios.get("http://localhost:5000/Place").then((res)=>{
        setPlace(res.data.place)
    });
  }

  const getDistrict=()=>{
    axios.get("http://localhost:5000/District").then((res)=>{
      setDistrict(res.data.district)
    });
  }

    useEffect(() =>{
      
      getDistrict();
    },[]);

 useEffect(() => {
    if (!districtId) {
      setPlace([]);
      setPlaceId('');
      return;
    }
    axios.get("http://localhost:5000/Place")
    .then(res => {
      const filteredPlaces = res.data.place.filter(
        p => String(p.districtId._id) === String(districtId)
      );
      setPlace(filteredPlaces);
    })
    .catch(console.error);

  }, [districtId]);



    // useEffect(() =>{
    //     getPlace();
    // },[]);

  return (
    <div className={style.deliverRegPage}>
  <form className={style.deliverForm}>
    <h2>Delivery Team Registration</h2>
    <p className={style.subtitle}>
      Register delivery staff details
    </p>

    <div className={style.grid}>
      <div className={style.field}>
        <label>Delivery Team Name</label>
        <input type="text" required value={name} onChange={e=>setName(e.target.value)}/>
      </div>

      <div className={style.field}>
        <label>Vehicle Number</label>
        <input type="text" placeholder="KL-00-AB-1234" required  value={vehicleno} onChange={e=>setVechicleNo(e.target.value)} />
      </div>

       <div className={style.field}>
        <label>District</label>
        <select required  value={districtId} onChange={e => setDistrictId(e.target.value)}>
          <option value="">Select District</option>
               {district.map((row)=>(
              <option key={row._id} value={row._id}>{row.districtName}</option>
            ))}
        </select>
      </div>

      <div className={style.field}>
        <label>Place</label>
        <select required  onChange={e=>setPlaceId(e.target.value)} disabled={!districtId}>
          <option value="">Select Place</option>
           {place.map((row)=>(
              <option key={row._id} value={row._id}>{row.placeName}</option>
              ))}
        </select>
      </div>

      <div className={style.field}>
        <label>Email Address</label>
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>

      {/* <div className={style.field}>
        <label>Username</label>
        <input type="text" required />
      </div> */}

      <div className={style.field}>
        <label>Password</label>
        <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/>
      </div>
    </div>

    <div className={style.actions}>
      <input type="submit" value="Register" className={style.submit} onClick={handelSubmit}/>
      <input type="submit" value="Cancel" className={style.cancel} />
    </div>
  </form>
</div>

  )
}

export default DeliveryReg