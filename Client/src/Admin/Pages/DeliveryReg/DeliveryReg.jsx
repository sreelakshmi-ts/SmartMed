import React, { useEffect, useState } from 'react'
import style from './DeliveryReg.module.css'
import axios from 'axios';

const DeliveryReg = () => {

  const [place, setPlace] = useState([]);
  const [district, setDistrict] = useState([]);

  const [name, setName] = useState('');
  const [vehicleno, setVechicleNo] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');

  const [errors, setErrors] = useState({});

  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {
    let newErrors = {};

    // Name
    if (!name.trim()) {
      newErrors.name = "Delivery name required";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Only letters allowed";
    }

    // Vehicle Number (Indian format)
    const vehicleRegex = /^[A-Z]{2}-\d{2}-[A-Z]{1,2}-\d{4}$/;
    if (!vehicleno) {
      newErrors.vehicleno = "Vehicle number required";
    } else if (!vehicleRegex.test(vehicleno.toUpperCase())) {
      newErrors.vehicleno = "Format: KL-00-AB-1234";
    }

    // District
    if (!districtId) {
      newErrors.districtId = "Select district";
    }

    // Place
    if (!placeId) {
      newErrors.placeId = "Select place";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Contact
    if (!contact) {
      newErrors.contact = "Contact number required";
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = "Must be 10 digits";
    }

    // Password
    if (!password) {
      newErrors.password = "Password required";
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = {
      deliverName: name,
      deliverVehicleNo: vehicleno.toUpperCase(),
      placeId: placeId,
      deliverEmail: email,
      deliverPassword: password,
      deliverContact: contact,
    };

    axios.post('http://localhost:5000/Delivery', data)
      .then((res) => {

        alert(res.data.message);

        setName("");
        setVechicleNo("");
        setPlaceId("");
        setDistrictId("");
        setEmail("");
        setContact("");
        setPassword("");
        setErrors({});
      });
  };

  /* ---------------- FETCH DATA ---------------- */

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

  /* ---------------- UI ---------------- */

  return (
    <div className={style.deliverRegPage}>
      <form className={style.deliverForm} onSubmit={handelSubmit}>

        <h2>Delivery Team Registration</h2>
        <p className={style.subtitle}>Register delivery staff details</p>

        <div className={style.grid}>

          {/* NAME */}
          <div className={style.field}>
            <label>Delivery Team Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {errors.name && <small className={style.error}>{errors.name}</small>}
          </div>

          {/* VEHICLE */}
          <div className={style.field}>
            <label>Vehicle Number</label>
            <input
              type="text"
              placeholder="KL-00-AB-1234"
              value={vehicleno}
              onChange={e => setVechicleNo(e.target.value)}
            />
            {errors.vehicleno && <small className={style.error}>{errors.vehicleno}</small>}
          </div>

          {/* DISTRICT */}
          <div className={style.field}>
            <label>District</label>
            <select value={districtId} onChange={e => setDistrictId(e.target.value)}>
              <option value="">Select District</option>
              {district.map(row => (
                <option key={row._id} value={row._id}>
                  {row.districtName}
                </option>
              ))}
            </select>
            {errors.districtId && <small className={style.error}>{errors.districtId}</small>}
          </div>

          {/* PLACE */}
          <div className={style.field}>
            <label>Place</label>
            <select
              value={placeId}
              onChange={e => setPlaceId(e.target.value)}
              disabled={!districtId}
            >
              <option value="">Select Place</option>
              {place.map(row => (
                <option key={row._id} value={row._id}>
                  {row.placeName}
                </option>
              ))}
            </select>
            {errors.placeId && <small className={style.error}>{errors.placeId}</small>}
          </div>

          {/* EMAIL */}
          <div className={style.field}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <small className={style.error}>{errors.email}</small>}
          </div>

          {/* CONTACT */}
          <div className={style.field}>
            <label>Contact Number</label>
            <input
              type="tel"
              value={contact}
              onChange={e => setContact(e.target.value)}
            />
            {errors.contact && <small className={style.error}>{errors.contact}</small>}
          </div>

          {/* PASSWORD */}
          <div className={style.field}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <small className={style.error}>{errors.password}</small>}
          </div>

        </div>

        <div className={style.actions}>
          <button type="submit" className={style.submit}>Register</button>
          <button type="button" className={style.cancel}>Cancel</button>
        </div>

      </form>
    </div>
  );
};

export default DeliveryReg;