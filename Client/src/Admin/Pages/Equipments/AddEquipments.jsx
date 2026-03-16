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

        const handleSubmit=(e) =>{
                e.preventDefault();
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
    },[]);
  return (
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
        </div>

        <div className={style.field}>
          <label>Equipment Category</label>
         <select value={equcategoryId} onChange={e => setEqucategoryId(e.target.value)}>
            <option>Select Equipment Category</option>
            {eqcategory.map((c) => (
              <option key={c._id} value={c._id}>{c.equcategoryName}</option>
            ))}
          </select>
        </div>

      </div>

      {/* EQUIPMENT NAME */}
      <div className={style.field}>
        <label>Equipment Name</label>
        <input type="text" placeholder="Enter equipment name" value={Ename} onChange={e => setEname(e.target.value)}/>
      </div>

      {/* DESCRIPTION */}
      <div className={style.field}>
        <label>Equipment Description</label>
        <textarea rows="4" placeholder="Enter equipment description" value={discription} onChange={e => setDisciption(e.target.value)}></textarea>
      </div>

      {/* PRICE + IMAGE */}
      <div className={style.row}>

        <div className={style.field}>
          <label>Equipment Price</label>
          <input type="number" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)}/>
        </div>

        <div className={style.field}>
          <label>Equipment Image</label>
          <input type="file" ref={fileRef} onChange={e => setPhoto(e.target.files[0])}/>
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

  )
}

export default AddEquipments