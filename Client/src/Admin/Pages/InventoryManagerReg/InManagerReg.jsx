import React, { useEffect, useState } from 'react'
import style from './InManagerReg.module.css'
import axios from 'axios';

const InManagerReg = () => {
      const[place,setPlace]=useState([]);
      const[mName,setMname]=useState('');
      const[empId,setEmpId]=useState('');
      const[contact,setContact]=useState('');
      const[wName,setWname]=useState('');
      const[placeId,setPlaceId]=useState('');
      const[photo,setPhoto]=useState(null);
      const[email,setEmail]=useState('');
      const[pswd,setPswd]=useState('');
      const[district,setDistrict]=useState([]);
      const[districtId,setDistrictId]=useState('');

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


      const handleSubmit=(e) =>{
        e.preventDefault();
        const fd=new FormData();
        fd.append('inManagerName',mName);
        fd.append('inMangerEmpId',empId);
        fd.append('inManagerContact',contact);
        fd.append('ManagerWarehouseName',wName);
        fd.append('placeId',placeId);
        if(photo) fd.append('inManagerPhoto',photo);
        fd.append('inManagerEmail',email);
        fd.append('InManagerPassword',pswd);
        axios.post("http://localhost:5000/InvetoryManager",fd)
        .then(res => alert(res.data.message))
        .catch(console.error)
        }


  return (
    <div className={style.imRegPage}>
  <form className={style.imForm}>
    <h2>Inventory Manager Registration</h2>
    <p className={style.subtitle}>Add inventory manager details</p>

    <div className={style.grid}>
      <div className={style.field}>
        <label>Manager Name</label>
        <input type="text" placeholder='Name' 
         onChange={e=>setMname(e.target.value)}
        required />
      </div>

      <div className={style.field}>
        <label>Employee ID</label>
        <input type="text" placeholder="Eployee Id"
         onChange={e=>setEmpId(e.target.value)}
         required />
      </div>

      <div className={style.field}>
        <label>Contact Number</label>
        <input type="tel" placeholder="Phone Number" 
         onChange={(e)=>setContact(e.target.value)}
        required />
      </div>

      <div className={style.field}>
        <label>Warehouse Name</label>
        <input type="text"
        placeholder="Enter Warehouse Name" 
         onChange={e=>setWname(e.target.value)}
        required />
      </div>

      <div className={style.field}>
        <label>District</label>
        <select   value={districtId} onChange={e => setDistrictId(e.target.value)} required>
          <option value="">Select District</option>
               {district.map((row)=>(
              <option key={row._id} value={row._id}>{row.districtName}</option>
            ))}
        </select>
      </div>


      <div className={style.field}>
        <label>Place</label>
        <select   onChange={e=>setPlaceId(e.target.value)} required>
          <option value="">Select Place</option>
            {place.map((row)=>(
              <option key={row._id} value={row._id}>{row.placeName}</option>
              ))}
        </select>
      </div>

      <div className={style.field}>
        <label>Profile Photo</label>
        <input type="file" 
         accept=".jpg,.png,.jpeg"
         onChange={e=>setPhoto(e.target.files[0])}
        />
      </div>

      <div className={style.field}>
        <label>Email</label>
        <input type="Email"
         placeholder="Enter email"
          onChange={e=>setEmail(e.target.value)}
         required />
      </div>

      <div className={style.field}>
        <label>Password</label>
        <input type="password"
        placeholder="Create password"
         onChange={e=>setPswd(e.target.value)}
         required />
      </div>

      {/* <div className={style.field}>
        <label>Status</label>
        <select required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div> */}
    </div>

    <div className={style.actions}>
      <button type="submit" className={style.submit} onClick={handleSubmit} >Register</button>
      <button type="reset" className={style.cancel}>Cancel</button>
    </div>
  </form>
</div>

  )
}

export default InManagerReg