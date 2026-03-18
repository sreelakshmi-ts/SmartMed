import React, { useEffect, useState } from 'react'
import style from './AddEquipments.module.css'
import axios from 'axios';
import { useRef } from 'react';

const AddEquipments = () => {
    const[Ename,setEname]=useState('');
    const[price,setPrice]=useState('');
    const[discription,setDisciption]=useState('');
    const [equcategoryId, setEqucategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const[eqcategory,setEquipmentCategory]=useState([]);
    const[brand,setBrand]=useState([]);
    const[photo,setPhoto]=useState(null);
     const fileRef = useRef(null);
     const [equipment, setEquipment] = useState([]);
     const [errors, setErrors] = useState({});



     const validateForm = () => {
  let newErrors = {};

  // Equipment Name
  if (!Ename.trim()) {
    newErrors.Ename = "Equipment name is required";
  } else if (!/^[A-Za-z0-9\s]+$/.test(Ename)) {
    newErrors.Ename = "Only letters and numbers allowed";
  }

  // Description
  if (!discription.trim()) {
    newErrors.discription = "Description required";
  } else if (discription.length < 10) {
    newErrors.discription = "Minimum 10 characters required";
  }

  // Price
  if (!price) {
    newErrors.price = "Price is required";
  } else if (price <= 0) {
    newErrors.price = "Price must be greater than 0";
  }

  // Brand
  if (!brandId) {
    newErrors.brandId = "Select brand";
  }

  // Category
  if (!equcategoryId) {
    newErrors.equcategoryId = "Select equipment category";
  }

  // Image validation
  if (!photo) {
    newErrors.photo = "Equipment image required";
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(photo.type)) {
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
                fd.append('equipmentName',Ename);
                fd.append('equipmentPrice',price);
                fd.append('equipmentDistription',discription);
                fd.append('equcategoryId',equcategoryId);
                fd.append('brandId',brandId);
                if(photo) fd.append('equipmentPhoto',photo);
                axios.post("http://localhost:5000/Equipment",fd)
                .then(res =>{
                    alert(res.data.message)
                    setEname('');
                    setPrice('');
                    setDisciption('');
                    setEqucategoryId('');
                    setBrandId('');
                    setPhoto(null);
                    if(fileRef.current){
                      fileRef.current.value = "";
                    }
                    
                    getEquipment();
                    console.log(res.data.message);
                })
                
        }

        const getCategory =() =>{
            axios.get("http://localhost:5000/Equipmentcate").then((res)=>{
                setEquipmentCategory(res.data.equcategory)
            });
            }

            const getBrand =() =>{
            axios.get("http://localhost:5000/Brand").then((res)=>{
                setBrand(res.data.brand)
            });
            }
        useEffect(() =>{
            getCategory();
            getBrand();
            getEquipment();
        },[]);

    const getEquipment = () => {
      axios.get("http://localhost:5000/ViewEquipment")
      .then((res)=>{
        setEquipment(res.data.equipment);
      });
    };
  const deleteEquipment = (id) => {
    axios.delete(`http://localhost:5000/DeleteEquipment/${id}`)
    .then((res)=>{
      alert(res.data.message);
      getEquipment(); 
    });
  };
  return (
    <>
    <div className={style.productPage}>
  <div className={style.card}>

    <h2>Add New Equipment</h2>

    <p className={style.subtitle}>
      Enter equipment details
    </p>

    <form className={style.form}>

      {/* BRAND + EQUIPMENT CATEGORY */}
      <div className={style.row}>

        <div className={style.field}>
          <label>Brand</label>
              <select value={brandId} onChange={e => setBrandId(e.target.value)}>
        
            <option>Select Brand</option>
            {brand.map((b) => (
              <option key={b._id} value={b._id}>{b.brandName}</option>
            ))}
          </select>
          {errors.brandId && <small className={style.error}>{errors.brandId}</small>}
        </div>

        <div className={style.field}>
          <label>Equipment Category</label>
         <select value={equcategoryId} onChange={e => setEqucategoryId(e.target.value)}>
            <option>Select Equipment Category</option>
            {eqcategory.map((c) => (
              <option key={c._id} value={c._id}>{c.equcategoryName}</option>
            ))}
          </select>
          {errors.equcategoryId && (<small className={style.error}>{errors.equcategoryId}</small>)}
        </div>

      </div>

      {/* EQUIPMENT NAME */}
      <div className={style.field}>
        <label>Equipment Name</label>
        <input type="text" placeholder="Enter equipment name" value={Ename} onChange={e => setEname(e.target.value)}/>
        {errors.Ename && <small className={style.error}>{errors.Ename}</small>}
      </div>

      {/* DESCRIPTION */}
      <div className={style.field}>
        <label>Equipment Description</label>
        <textarea rows="4" placeholder="Enter equipment description" value={discription} onChange={e => setDisciption(e.target.value)}></textarea>
        {errors.discription && (<small className={style.error}>{errors.discription}</small>)}
      </div>

      {/* PRICE + IMAGE */}
      <div className={style.row}>

        <div className={style.field}>
          <label>Equipment Price</label>
          <input type="number" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)}/>
          {errors.price && <small className={style.error}>{errors.price}</small>}
        </div>

        <div className={style.field}>
          <label>Equipment Image</label>
          <input type="file" ref={fileRef} onChange={e => setPhoto(e.target.files[0])}/>
          {errors.photo && <small className={style.error}>{errors.photo}</small>}
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className={style.actions}>
        <button className={style.submit} onClick={handleSubmit}>Add Equipment</button>
        <button type="button" className={style.cancel}>Cancel</button>
      </div>

    </form>

  </div>
</div>

    <div className={style.listCard}>

  <h2 className={style.tableTitle}>Equipment List</h2>

  <table className={style.table}>
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Brand</th>
        <th>Category</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {equipment.map((row)=>(
        <tr key={row._id}>

          <td>
            <img
              src={`http://localhost:5000${row.equipmentPhoto}`}
              className={style.equipmentImg}
              alt=""
            />
          </td>

          <td>{row.equipmentName}</td>
          <td>{row.brandId?.brandName}</td>
          <td>{row.equcategoryId?.equcategoryName}</td>
          <td>₹{row.equipmentPrice}</td>

          <td>
            <button
              className={style.deleteBtn}
              onClick={()=>deleteEquipment(row._id)}
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

export default AddEquipments