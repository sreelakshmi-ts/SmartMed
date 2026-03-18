import React, { useEffect, useState, useRef } from 'react';
import style from './RepresentativeReg.module.css';
import axios from 'axios';

const RepresentativeReg = () => {
  const [name, setName] = useState('');
  const [empid, setEmpId] = useState('');
  const [idProof, setIdproof] = useState(null);
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState('');
  const [place, setPlace] = useState([]);
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState('');
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/District")
      .then(res => setDistrict(res.data.district))
      .catch(console.error);
  }, []);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = "Name is required";
    if (!empid.trim()) newErrors.empid = "Employee ID is required";
    if (!idProof) newErrors.idProof = "ID Proof is required";
    if (!contact.trim() || !/^\d{10}$/.test(contact)) newErrors.contact = "Enter a valid 10-digit contact number";
    if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = "Enter a valid email address";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!districtId) newErrors.districtId = "Please select a district";
    if (!placeId) newErrors.placeId = "Please select a place";
    if (!photo) newErrors.photo = "Profile photo is required";
    if (!password.trim() || password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if there are errors

    const fd = new FormData();
    fd.append('repName', name);
    fd.append('repEmpId', empid);
    fd.append('repIdProof', idProof);
    fd.append('repContact', contact);
    fd.append('repEmail', email);
    fd.append('repAddress', address);
    fd.append('placeId', placeId);
    fd.append('repPhoto', photo);
    fd.append('repPassword', password);

    axios.post("http://localhost:5000/Representative", fd)
      .then(res => {
        alert(res.data.message);

        // Reset form
        setName("");
        setEmpId("");
        setIdproof(null);
        setContact("");
        setEmail("");
        setAddress("");
        setDistrictId("");
        setPlaceId("");
        setPhoto(null);
        setPassword("");
        setErrors({});
        if (fileRef.current) fileRef.current.value = "";
      })
      .catch(err => console.error(err));
  };

  return (
    <div className={style.repRegPage}>
      <form className={style.repForm} onSubmit={handleSubmit}>
        <h2>Medical Representative Registration</h2>
        <p className={style.subtitle}>Register representative details</p>

        <div className={style.grid}>
          <div className={style.field}>
            <label>Representative Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            {errors.name && <small className={style.error}>{errors.name}</small>}
          </div>

          <div className={style.field}>
            <label>Employee ID</label>
            <input type="text" value={empid} onChange={e => setEmpId(e.target.value)} />
            {errors.empid && <small className={style.error}>{errors.empid}</small>}
          </div>

          <div className={style.field}>
            <label>ID Proof (Upload)</label>
            <input type="file" ref={fileRef} accept=".pdf,.jpg,.jpeg,.png" onChange={e => setIdproof(e.target.files[0])} />
            {errors.idProof && <small className={style.error}>{errors.idProof}</small>}
          </div>

          <div className={style.field}>
            <label>Contact Number</label>
            <input type="tel" value={contact} onChange={e => setContact(e.target.value)} />
            {errors.contact && <small className={style.error}>{errors.contact}</small>}
          </div>

          <div className={style.field}>
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <small className={style.error}>{errors.email}</small>}
          </div>

          <div className={style.field}>
            <label>Address</label>
            <textarea rows="3" value={address} onChange={e => setAddress(e.target.value)} />
            {errors.address && <small className={style.error}>{errors.address}</small>}
          </div>

          <div className={style.field}>
            <label>District</label>
            <select value={districtId} onChange={e => setDistrictId(e.target.value)}>
              <option value="">Select District</option>
              {district.map(d => <option key={d._id} value={d._id}>{d.districtName}</option>)}
            </select>
            {errors.districtId && <small className={style.error}>{errors.districtId}</small>}
          </div>

          <div className={style.field}>
            <label>Place</label>
            <select value={placeId} onChange={e => setPlaceId(e.target.value)} disabled={!districtId}>
              <option value="">Select Place</option>
              {place.map(p => <option key={p._id} value={p._id}>{p.placeName}</option>)}
            </select>
            {errors.placeId && <small className={style.error}>{errors.placeId}</small>}
          </div>

          <div className={style.field}>
            <label>Profile Photo</label>
            <input type="file" ref={fileRef} onChange={e => setPhoto(e.target.files[0])} />
            {errors.photo && <small className={style.error}>{errors.photo}</small>}
          </div>

          <div className={style.field}>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            {errors.password && <small className={style.error}>{errors.password}</small>}
          </div>
        </div>

        <div className={style.actions}>
          <input type="submit" value="Register" className={style.submit} />
          <input type="reset" value="Cancel" className={style.cancel} onClick={() => setErrors({})} />
        </div>
      </form>
    </div>
  );
};

export default RepresentativeReg;