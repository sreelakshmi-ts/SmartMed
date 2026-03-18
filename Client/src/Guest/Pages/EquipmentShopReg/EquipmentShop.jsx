import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import style from './EquipmentShop.module.css'
import { useRef } from 'react';

const EquipmentShop = () => {
    const[sName,setSname]=useState('');
    const[regNo,setRegNo]=useState('');
    const[salesLic,setSalesLic]=useState(null);
    const[oName,setOname]=useState('');
    const[placeId,setPlaceId]=useState('');
    const[address,setAddress]=useState('');
    const[contact,setContact]=useState('');
    const[email,setEmail]=useState('');
    const[pswd,setPswd]=useState('');
    const[place,setPlace]=useState([]);
    const[district,setDistrict]=useState([]);
    const[districtId,setDistrictId]=useState('');
    const [emailError, setEmailError] = useState("");
     const fileRef = useRef(null);

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

          const checkEmailAvailability = async () => {
        try {
          const res = await axios.post(
            "http://localhost:5000/EquiCustomerCheckEmail",
            { customerEmail: email }
          );

          if (res.data.exists) {
            setEmailError("Email already registered");
            return false;
          } else {
            setEmailError("");
            return true;
          }

        } catch (err) {
          console.error(err);
          return false;
        }
      };

      const validateForm = () => {
  let isValid = true;

  // Store Name
  if (!sName.trim()) {
    alert("Store Name is required");
    isValid = false;
  }

  // Registration Number
  if (!regNo.trim()) {
    alert("Registration Number is required");
    isValid = false;
  }

  // Owner Name
  if (!oName.trim()) {
    alert("Owner Name is required");
    isValid = false;
  }

  // District
  if (!districtId) {
    alert("Please select a district");
    isValid = false;
  }

  // Place
  if (!placeId) {
    alert("Please select a place");
    isValid = false;
  }

  // Address
  if (!address.trim()) {
    alert("Address is required");
    isValid = false;
  }

  // Contact (Indian format)
  const contactRegex = /^[6-9]\d{9}$/;
  if (!contactRegex.test(contact)) {
    alert("Enter valid 10-digit contact number");
    isValid = false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Enter valid email address");
    isValid = false;
  }

  // Password (min 6 chars + number)
  const passwordRegex = /^(?=.*\d).{6,}$/;
  if (!passwordRegex.test(pswd)) {
    alert("Password must be at least 6 characters and contain a number");
    isValid = false;
  }

  // Sales License file
  if (!salesLic) {
    alert("Please upload Sales License");
    isValid = false;
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(salesLic.type)) {
      alert("Only JPG, JPEG, PNG files are allowed");
      isValid = false;
    }
  }

  return isValid;
};

    const handleSubmit=(e) =>{
        e.preventDefault();
        if (!validateForm()) return;

        checkEmailAvailability().then((available) => {

          if (!available) {
            alert("Email already exists!");
            return;
          }
        const fd=new FormData();
        fd.append('customerStoreName',sName);
        fd.append('customerStoreRegNo',regNo);
        if(salesLic) fd.append('SalesLicense',salesLic);
        fd.append('ownerName',oName);
        fd.append('placeId',placeId);
        fd.append('customerAddress',address);
        fd.append('customerContact',contact);
        fd.append('customerEmail',email);
        
        fd.append('customerPassword',pswd);
        
        axios.post("http://localhost:5000/EquipmentCustomer",fd)
            .then(res => {
            setSname("");
            setRegNo("");
            setSalesLic(null);
            if(fileRef.current){
              fileRef.current.value = "";
            }
            setOname("");
            setPlaceId("");
            setAddress("");
            setContact("");
            setEmail("");
            setPswd("");
            alert(res.data.message)
            }
        ).catch(console.error)
    });
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
           value={regNo}
            onChange={e=>setRegNo(e.target.value)}
           required
         />
       </div>
 
       <div>
         <label>Sales Licence</label>
         <input
           type="file"
           accept=".jpg,.png,.jpeg"
            ref={fileRef}
           onChange={e=>setSalesLic(e.target.files[0])}
           required
         />
       </div>
 
  
       <div>
         <label>Owner Name</label>
         <input
           type="text"
           placeholder="Enter owner name"
           value={oName}
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
         <select required value={placeId} onChange={e=>setPlaceId(e.target.value)} disabled={!districtId}>
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
           value={address}
           onChange={e=>setAddress(e.target.value)}
           required
         ></textarea>
       </div>
 
      
       <div>
         <label>Contact Number</label>
         <input
           type="tel"
           placeholder="Enter contact number"
           value={contact}
           onChange={e=>setContact(e.target.value)}
           required
         />
       </div>
 
    
       <div>
         <label>Email</label>
         <input
           type="email"
           placeholder="Enter email"
           value={email}
           onChange={e=>setEmail(e.target.value)}
           required
         />
            {emailError && (
            <small style={{ color: "red" }}>{emailError}</small>
          )}
       </div>
 
       <div>
         <label>Password</label>
         <input
           type="password"
           placeholder="Create password"
           value={pswd}
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