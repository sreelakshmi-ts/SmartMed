import React, { useEffect, useState } from 'react'
import style from './Medicine.module.css'
import axios from 'axios';

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

        const handleSubmit=(e) =>{
             e.preventDefault();
             const fd=new FormData();
             fd.append('medicineName',Mname);
             fd.append('medicinePrice',price);
             fd.append('medicineDistription',discription);
             fd.append('categoryId',categoryId);
             fd.append('typeId',typeId);
             fd.append('brandId',brandId);
             if(photo) fd.append('medicinePhoto',photo);
             axios.post("http://localhost:5000/Medicine",fd)
             .then(res => alert(res.data.message))
             .catch(console.error)
        }

    useEffect(() =>{
        getCategory();
        getType();
        getBrand();
    },[]);

  return (
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
        </div>

        <div className={style.field}>
          <label>Type</label>
          <select value={typeId} onChange={e=>setTypeId(e.target.value)} required>
            <option>Select Type</option>
            {type.map((row)=>(
                 <option key={row._id} value={row._id}>{row.typeName}</option>
              ))}
          </select>
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
        </div>

        <div className={style.field}>
          <label>Medicine Name</label> 
          <input type="text" value={Mname} placeholder="Enter medicine name" onChange={e=>setMname(e.target.value)} required/>
        </div>
      </div>

      <div className={style.field}>
        <label>Medicine Description</label>
        <textarea rows="4" value={discription} placeholder="Enter medicine description"  onChange={e=>setDisciption(e.target.value)}
            required></textarea>
      </div>

      <div className={style.row}>
        <div className={style.field}>
          <label>Price</label>
          <input type="number" value={price} placeholder="Enter price" onChange={e=>setPrice(e.target.value)} required/>
        </div>

        <div className={style.field}>
          <label>Medicine Image</label>
          <input type="file"  onChange={e=>setPhoto(e.target.files[0])} required/>
        </div>
      </div>

      <div className={style.actions}>
        <button className={style.submit} onClick={handleSubmit}>Add Medicine</button>
        <button type="button" className={style.cancel}>Cancel</button>
      </div>

    </form>
  </div>
</div>

  )
}

export default Medicine