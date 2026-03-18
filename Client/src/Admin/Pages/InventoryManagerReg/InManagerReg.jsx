import React, { useEffect, useState, useRef } from 'react'
import style from './InManagerReg.module.css'
import axios from 'axios';

const InManagerReg = () => {

  const [place, setPlace] = useState([]);
  const [district, setDistrict] = useState([]);

  const [mName, setMname] = useState('');
  const [empId, setEmpId] = useState('');
  const [contact, setContact] = useState('');
  const [wName, setWname] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const [districtId, setDistrictId] = useState('');

  const [errors, setErrors] = useState({});

  const fileRef = useRef(null);

  

  const validateForm = () => {
    let newErrors = {};

   
    if (!mName.trim()) {
      newErrors.mName = "Manager name required";
    } else if (!/^[A-Za-z\s]+$/.test(mName)) {
      newErrors.mName = "Only letters allowed";
    }

    
    if (!empId.trim()) {
      newErrors.empId = "Employee ID required";
    } else if (!/^[A-Za-z0-9]+$/.test(empId)) {
      newErrors.empId = "Invalid Employee ID";
    }

   
    if (!contact) {
      newErrors.contact = "Contact number required";
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = "Must be 10 digits";
    }

    
    if (!wName.trim()) {
      newErrors.wName = "Warehouse name required";
    }

  
    if (!districtId) {
      newErrors.districtId = "Select district";
    }

    
    if (!placeId) {
      newErrors.placeId = "Select place";
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

  
    if (!pswd) {
      newErrors.pswd = "Password required";
    } else if (pswd.length < 6) {
      newErrors.pswd = "Minimum 6 characters required";
    }

   
    if (photo) {
      const allowed = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowed.includes(photo.type)) {
        newErrors.photo = "Only JPG, JPEG, PNG allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const fd = new FormData();
    fd.append('inManagerName', mName);
    fd.append('inMangerEmpId', empId);
    fd.append('inManagerContact', contact);
    fd.append('ManagerWarehouseName', wName);
    fd.append('placeId', placeId);
    if (photo) fd.append('inManagerPhoto', photo);
    fd.append('inManagerEmail', email);
    fd.append('InManagerPassword', pswd);

    axios.post("http://localhost:5000/InvetoryManager", fd)
      .then((res) => {

        alert(res.data.message);

        setMname("");
        setEmpId("");
        setContact("");
        setWname("");
        setPlaceId("");
        setDistrictId("");
        setPhoto(null);
        setEmail("");
        setPswd("");
        setErrors({});

        if (fileRef.current) fileRef.current.value = "";
      });
  };



  const getDistrict = () => {
    axios.get("http://localhost:5000/District")
      .then((res) => setDistrict(res.data.district));
  };

  useEffect(() => {
    getDistrict();
  }, []);

  useEffect(() => {
    if (!districtId) {
      setPlace([]);
      setPlaceId('');
      return;
    }

    axios.get("http://localhost:5000/Place")
      .then(res => {
        const filtered = res.data.place.filter(
          p => String(p.districtId._id) === String(districtId)
        );
        setPlace(filtered);
      });

  }, [districtId]);

  return (
    <div className={style.imRegPage}>
      <form className={style.imForm} onSubmit={handleSubmit}>

        <h2>Inventory Manager Registration</h2>
        <p className={style.subtitle}>Add inventory manager details</p>

        <div className={style.grid}>

          <div className={style.field}>
            <label>Manager Name</label>
            <input value={mName} onChange={e=>setMname(e.target.value)} />
            {errors.mName && <small className={style.error}>{errors.mName}</small>}
          </div>

          <div className={style.field}>
            <label>Employee ID</label>
            <input value={empId} onChange={e=>setEmpId(e.target.value)} />
            {errors.empId && <small className={style.error}>{errors.empId}</small>}
          </div>

          <div className={style.field}>
            <label>Contact Number</label>
            <input type="tel" value={contact} onChange={e=>setContact(e.target.value)} />
            {errors.contact && <small className={style.error}>{errors.contact}</small>}
          </div>

          <div className={style.field}>
            <label>Warehouse Name</label>
            <input value={wName} onChange={e=>setWname(e.target.value)} />
            {errors.wName && <small className={style.error}>{errors.wName}</small>}
          </div>

          <div className={style.field}>
            <label>District</label>
            <select value={districtId} onChange={e=>setDistrictId(e.target.value)}>
              <option value="">Select District</option>
              {district.map(row=>(
                <option key={row._id} value={row._id}>{row.districtName}</option>
              ))}
            </select>
            {errors.districtId && <small className={style.error}>{errors.districtId}</small>}
          </div>

          <div className={style.field}>
            <label>Place</label>
            <select value={placeId} onChange={e=>setPlaceId(e.target.value)}>
              <option value="">Select Place</option>
              {place.map(row=>(
                <option key={row._id} value={row._id}>{row.placeName}</option>
              ))}
            </select>
            {errors.placeId && <small className={style.error}>{errors.placeId}</small>}
          </div>

          <div className={style.field}>
            <label>Profile Photo</label>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              ref={fileRef}
              onChange={e=>setPhoto(e.target.files[0])}
            />
            {errors.photo && <small className={style.error}>{errors.photo}</small>}
          </div>

          <div className={style.field}>
            <label>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} />
            {errors.email && <small className={style.error}>{errors.email}</small>}
          </div>

          <div className={style.field}>
            <label>Password</label>
            <input type="password" value={pswd} onChange={e=>setPswd(e.target.value)} />
            {errors.pswd && <small className={style.error}>{errors.pswd}</small>}
          </div>

        </div>

        <div className={style.actions}>
          <button type="submit" className={style.submit}>Register</button>
          <button type="reset" className={style.cancel}>Cancel</button>
        </div>

      </form>
    </div>
  )
}

export default InManagerReg;