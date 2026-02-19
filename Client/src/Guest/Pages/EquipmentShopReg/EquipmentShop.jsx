import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import style from './EquipmentShop.module.css'

const EquipmentShop = () => {
    const[sName,setSname]=useState('');
    const[regNo,setRegNo]=useState('');
    const[salesLic,setSalesLic]=useState(null);
    const[oName,setOname]=useState('');
    const[placeId,setPlaceId]=useState('');
    const[address,setAddress]=useState('');
    const[contact,setContact]=useState('');
    const[email,setEmail]=useState('');
    const[username,setUsername]=useState('');
    const[pswd,setPswd]=useState('');
    const[place,setPlace]=useState([]);
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
        p => String(p.districtId._id) === String(districtId));
        setPlace(filteredPlaces);
    })
    .catch(console.error);
    }, [districtId]);

    const handleSubmit=(e) =>{
        e.preventDefault();
        const fd=new FormData();
        fd.append('customerStoreName',sName);
        fd.append('customerStoreRegNo',regNo);
        if(salesLic) fd.append('SalesLicense',salesLic);
        fd.append('ownerName',oName);
        fd.append('placeId',placeId);
        fd.append('customerAddress',address);
        fd.append('customerContact',contact);
        fd.append('customerEmail',email);
        fd.append('customerUsername',username);
        fd.append('customerPassword',pswd);
        
        axios.post("http://localhost:5000/EquipmentCustomer",fd)
            .then(res => {
            setSname("");
            setRegNo("");
            setSalesLic("");
            setOname("");
            setPlaceId("");
            setAddress("");
            setContact("");



            alert(res.data.message)
            }
        ).catch(console.error)
    }


  return (
  <div>
   <div className={style.regmaindiv}>
     <form className={style.regform}>
       <h1>Equipment Customer Registration</h1>
 
      
       <div>
         <label>Store Name</label>
         <input
           type="text"
           placeholder="Enter store name"
           value={sName}
           onChange={e=>setSname(e.target.value)}
           required
         />
       </div>
 
      
       <div>
         <label>Store Registration No</label>
         <input
           type="text"
           placeholder="Enter registration number"
            onChange={e=>setRegNo(e.target.value)}
           required
         />
       </div>
 
       <div>
         <label>Sales Licence</label>
         <input
           type="file"
           accept=".jpg,.png,.jpeg"
           onChange={e=>setSalesLic(e.target.files[0])}
           required
         />
       </div>
 
  
       <div>
         <label>Owner Name</label>
         <input
           type="text"
           placeholder="Enter owner name"
           onChange={e=>setOname(e.target.value)}
           required
         />
       </div>
 
             <div>
         <label>District</label>
         <select required   value={districtId} onChange={e => setDistrictId(e.target.value)} >
           <option value="">--- Select District ---</option>
                {district.map((row)=>(
               <option key={row._id} value={row._id}>{row.districtName}</option>
             ))}
         </select>
       </div>
 
    
       <div>
         <label>Place</label>
         <select required onChange={e=>setPlaceId(e.target.value)} disabled={!districtId}>
           <option value="">--- Select Place ---</option>
                 {place.map((row)=>(
                  <option key={row._id} value={row._id}>{row.placeName}</option>
               ))}
         </select>
       </div>
 
       
       <div className={style.inaddress}>
         <label>Address</label>
         <textarea
           placeholder="Enter full address"
           onChange={e=>setAddress(e.target.value)}
           required
         ></textarea>
       </div>
 
      
       <div>
         <label>Contact Number</label>
         <input
           type="tel"
           placeholder="Enter contact number"
           onChange={e=>setContact(e.target.value)}
           required
         />
       </div>
 
    
       <div>
         <label>Email</label>
         <input
           type="email"
           placeholder="Enter email"
           onChange={e=>setEmail(e.target.value)}
           required
         />
       </div>
 
     
       <div>
         <label>Username</label>
         <input
           type="text"
           placeholder="Create username"
           onChange={e=>setUsername(e.target.value)}
           required
         />
       </div>
 
      
       <div>
         <label>Password</label>
         <input
           type="password"
           placeholder="Create password"
           onChange={e=>setPswd(e.target.value)}
           required
         />
       </div>
 
       <div className={style.insubmit}>
         <input type="submit" value="Register" onClick={handleSubmit} />
       </div>
     </form>
   </div>
 </div>
  )
}

export default EquipmentShop