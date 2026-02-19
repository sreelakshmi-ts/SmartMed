import React, { useEffect, useState } from 'react'
import style from './RepresentativeReg.module.css'
import axios from 'axios';

const RepresentativeReg = () => {
  const[name,setName]=useState('');
  const[empid,setEmpId]=useState('');
  const[idProof,setIdproof]=useState('');
  const[contact,setContact]=useState('');
  const[email,setEmail]=useState('');
  const[address,setAddress]=useState('');
  const[placeId,setPlaceId]=useState('');
  const[photo,setPhoto]=useState('');
  const[password,setPassword]=useState('');
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

    const handleSubmit=(e) =>{
             e.preventDefault();
             const fd=new FormData();
             fd.append('repName',name);
             fd.append('repEmpId',empid);
             if(idProof) fd.append('repIdProof',idProof);
             fd.append('repContact',contact);
             fd.append('repEmail',email);
             fd.append('repAddress',address);
             fd.append('placeId',placeId);
             if(photo) fd.append('repPhoto',photo);
             fd.append('repPassword',password);

             axios.post("http://localhost:5000/Representative",fd)
             .then(res => alert(res.data.message))
             .catch(console.error)


    }


    useEffect(() =>{
    
        getDistrict();
    },[]);

  //   useEffect(() => {
  //     if (!districtId) { setPlace([]); setPlaceId(''); return; }
  //     axios.get(`http://localhost:5000/Place`).then(r => {
  //         setPlace(r.data.place.filter(p => p.districtId === districtId));
          
  //     });
  // }, [districtId]);
//   useEffect(() => {
//   if (!districtId) {
//     setPlace([]);
//     setPlaceId('');
//     return;
//   }

//   axios.get("http://localhost:5000/Place")
//     .then(res => {
//       const filteredPlaces = res.data.place.filter(
//         p => String(p.districtId) === String(districtId)
//       );
//       setPlace(filteredPlaces);
//     })
//     .catch(console.error);

// }, [districtId]);


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

  

  return (
<div className={style.repRegPage}>
  <form className={style.repForm}>
    <h2>Medical Representative Registration</h2>
    <p className={style.subtitle}>
      Register representative details
    </p>

    <div className={style.grid}>
      <div className={style.field}>
        <label>Representative Name</label>
        <input type="text" required value={name} onChange={e=>setName(e.target.value)} />
      </div>

      <div className={style.field}>
        <label>Employee ID</label>
        <input type="text"  required value={empid} onChange={e=>setEmpId(e.target.value)} />
      </div>

      <div className={style.field}>
        <label>ID Proof (Upload)</label>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png"   onChange={e=>setIdproof(e.target.files[0])}  required />
        <small className={style.hint}>
          Upload Aadhaar / PAN / Voter ID
        </small>
      </div>

      <div className={style.field}>
        <label>Contact Number</label>
        <input type="tel" required  value={contact} onChange={e=>setContact(e.target.value)}/>
      </div>

      <div className={style.field}>
        <label>Email Address</label>
        <input type="email" required value={email}  onChange={e=>setEmail(e.target.value)}/>
      </div>

      <div className={style.field}>
        <label>Address</label>
        <textarea rows="3" required value={address}  onChange={e=>setAddress(e.target.value)}/>
      </div>

        <div className={style.field}>
        <label>District</label>
        <select required  value={districtId}  onChange={e => setDistrictId(e.target.value)}>
          <option value="">Select District</option>
            {district.map((row)=>(
              <option key={row._id} value={row._id}>{row.districtName}</option>
            ))}
        </select>
      </div>

      <div className={style.field}>
        <label>Place</label>
        <select required    onChange={e=>setPlaceId(e.target.value)} disabled={!districtId}>
          <option value="">Select Place</option>
            {place.map((row)=>(
              <option key={row._id} value={row._id}>{row.placeName}</option>
            ))}
        </select>
      </div>

      <div className={style.field}>
        <label>Profile Photo</label>
        <input type="file"  required   onChange={e=>setPhoto(e.target.files[0])}/>
      </div>


      <div className={style.field}>
        <label>Password</label>
        <input type="password" required value={password}  onChange={e=>setPassword(e.target.value)}/>
      </div>
    </div>

    <div className={style.actions}>
      
      <input type="submit" value="Register" className={style.submit} onClick={handleSubmit}/>
      <input type="reset" value="Cancel" className={style.cancel} />

    </div>
  </form>
</div>


  )
}

export default RepresentativeReg