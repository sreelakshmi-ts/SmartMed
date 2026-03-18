import React, { useEffect, useState } from 'react'
import style from './Medicine.module.css'
import axios from 'axios';
import { useRef } from 'react';

const Medicine = () => {
    const[Mname,setMname]=useState('');
    const[price,setPrice]=useState('');
    const[discription,setDisciption]=useState('');
    const [categoryId, setCategoryId] = useState('');
    const [typeId, setTypeId] = useState('');
    const [brandId, setBrandId] = useState('');
    const[category,setCategory]=useState([]);
    const[type,setType]=useState([]);
    const[brand,setBrand]=useState([]);
    const[photo,setPhoto]=useState(null);
    const fileRef = useRef(null);
    const [medicine, setMedicine] = useState([]);
    const [errors, setErrors] = useState({});


    const getCategory =() =>{
        axios.get("http://localhost:5000/Category").then((res)=>{
            setCategory(res.data.category)
        });
        }

        const getType =() =>{
        axios.get("http://localhost:5000/Type").then((res)=>{
            setType(res.data.type)
        });
        }
        const getBrand =() =>{
        axios.get("http://localhost:5000/Brand").then((res)=>{
            setBrand(res.data.brand)
        });
        }

        const validateForm = () => {
  let newErrors = {};

  // Medicine Name
  if (!Mname.trim()) {
    newErrors.Mname = "Medicine name is required";
  } else if (!/^[A-Za-z0-9\s]+$/.test(Mname)) {
    newErrors.Mname = "Only letters and numbers allowed";
  }

  // Price
  if (!price) {
    newErrors.price = "Price is required";
  } else if (price <= 0) {
    newErrors.price = "Price must be greater than 0";
  }

  // Description
  if (!discription.trim()) {
    newErrors.discription = "Description required";
  } else if (discription.length < 10) {
    newErrors.discription = "Minimum 10 characters required";
  }

  // Dropdowns
  if (!brandId) newErrors.brandId = "Select brand";
  if (!typeId) newErrors.typeId = "Select type";
  if (!categoryId) newErrors.categoryId = "Select category";

  // Image
  if (!photo) {
    newErrors.photo = "Medicine image required";
  } else {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(photo.type)) {
      newErrors.photo = "Only JPG, JPEG, PNG allowed";
    }
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

        const handleSubmit=(e) =>{
             e.preventDefault();
              if (!validateForm()) return;
             const fd=new FormData();
             fd.append('medicineName',Mname);
             fd.append('medicinePrice',price);
             fd.append('medicineDistription',discription);
             fd.append('categoryId',categoryId);
             fd.append('typeId',typeId);
             fd.append('brandId',brandId);
             if(photo) fd.append('medicinePhoto',photo);
             axios.post("http://localhost:5000/Medicine",fd)
             .then((res) => {
            alert(res.data.message);
            setMname("");
            setPrice("");
            setDisciption("");
            setCategoryId("");
            setBrandId("");
            setTypeId("");
            setPhoto(null);
            if(fileRef.current){
              fileRef.current.value = "";
            } 
            getMedicine();
            console.log(res.data.message);
        });
        }

    useEffect(() =>{
        getCategory();
        getType();
        getBrand();
        getMedicine();
    },[]);

        const getMedicine = () => {
      axios.get("http://localhost:5000/Medicine")
      .then((res)=>{
        setMedicine(res.data.medicine);
      })
    }

    const deleteMedicine = (id) => {
      axios.delete(`http://localhost:5000/Medicinedelete/${id}`)
      .then((res)=>{
        alert(res.data.message);
        getMedicine(); // refresh list
      })
    }

  return (
    <>
    <div className={style.productPage}>
  <div className={style.card}>
    <h2>Add New Medicine</h2>
    <p className={style.subtitle}>
      Enter medicine details
    </p>

    <form className={style.form}>

      <div className={style.row}>
        <div className={style.field}>
          <label>Brand</label>
          <select value={brandId} onChange={e=>setBrandId(e.target.value)} required>
            <option>Select Brand</option>
            {brand.map((row)=>(
                 <option key={row._id} value={row._id}>{row.brandName}</option>
              ))}
          </select>
          {errors.brandId && <small className={style.error}>{errors.brandId}</small>}
        </div>

        <div className={style.field}>
          <label>Type</label>
          <select value={typeId} onChange={e=>setTypeId(e.target.value)} required>
            <option>Select Type</option>
            {type.map((row)=>(
                 <option key={row._id} value={row._id}>{row.typeName}</option>
              ))}
          </select>
          {errors.typeId && <small className={style.error}>{errors.typeId}</small>}
        </div>
      </div>

      <div className={style.row}>
        <div className={style.field}>
          <label>Category</label>
          <select value={categoryId} required onChange={e=>setCategoryId(e.target.value)}>
            <option>Select Category</option>
             {category.map((row)=>(
                 <option key={row._id} value={row._id}>{row.categoryName}</option>
              ))}
          </select>
          {errors.categoryId && <small className={style.error}>{errors.categoryId}</small>}
        </div>

        <div className={style.field}>
          <label>Medicine Name</label> 
          <input type="text" value={Mname} placeholder="Enter medicine name" onChange={e=>setMname(e.target.value)} required/>
          {errors.Mname && <small className={style.error}>{errors.Mname}</small>}
        </div>
      </div>

      <div className={style.field}>
        <label>Medicine Description</label>
        <textarea rows="4" value={discription} placeholder="Enter medicine description"  onChange={e=>setDisciption(e.target.value)}
            required></textarea>
            {errors.discription && <small className={style.error}>{errors.discription}</small>}
      </div>

      <div className={style.row}>
        <div className={style.field}>
          <label>Price</label>
          <input type="number" value={price} placeholder="Enter price" onChange={e=>setPrice(e.target.value)} required/>
          {errors.price && <small className={style.error}>{errors.price}</small>}
        </div>

        <div className={style.field}>
          <label>Medicine Image</label>
          <input type="file" ref={fileRef}  onChange={e=>setPhoto(e.target.files[0])} required/>
          {errors.photo && <small className={style.error}>{errors.photo}</small>}
        </div>
      </div>

      <div className={style.actions}>
        <button className={style.submit} onClick={handleSubmit}>Add Medicine</button>
        <button type="button" className={style.cancel}>Cancel</button>
      </div>

    </form>

  </div>
  
</div>
<div className={style.listCard}>

  <h2 className={style.tableTitle}>Medicine List</h2>

  <table className={style.table}>
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Brand</th>
        <th>Category</th>
        <th>Type</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {medicine.map((row) => (
        <tr key={row._id}>

          <td>
            <img
              src={`http://localhost:5000${row.medicinePhoto}`}
              className={style.medicineImg}
              alt="medicine"
            />
          </td>

          <td>{row.medicineName}</td>
          <td>{row.brandId?.brandName}</td>
          <td>{row.categoryId?.categoryName}</td>
          <td>{row.typeId?.typeName}</td>
          <td>₹{row.medicinePrice}</td>

          <td>
            <button
              className={style.deleteBtn}
              onClick={() => deleteMedicine(row._id)}
            >
              Delete
            </button>
          </td>

        </tr>
      ))}
    </tbody>
  </table>

</div>
</>

  )
}

export default Medicine