import React, { useEffect, useState } from 'react'
import style from './AddStock.module.css'
import axios from 'axios';
import { useParams } from 'react-router';

const AddStock = () => {
    const[medicine,setMedicine]=useState(null);
    const { id } = useParams();
    const[mnfdate,setMnfdate]=useState('');
    const[expdate,setExpdate]=useState('');
    const[stock,setStock]=useState('');


    const getMedicine =()=>{
        axios.get(`http://localhost:5000/Medicine/${id}`)
        .then(res => setMedicine(res.data.medicine))
         .catch(console.error);
    };
     useEffect(() =>{
       getMedicine();
     },[id])
     if (!medicine) return <p>Loading...</p>;

    const handleSubmit=(e) =>{
    e.preventDefault();
    const data ={
        medicineId: medicine._id,
       medicineManufactureDate:mnfdate,
       medicineExpireDate:expdate,
       stockQuantity:stock,
    }
    axios.post('http://localhost:5000/Stock',data).then((res) => {
            setMnfdate("");
            setExpdate();
            setStock("");
            alert(res.data.message)
            console.log(res.data.message);
        });

    }
  return (
    <div className={style.page}>
      <div className={style.card}>
        <h2>Update Medicine Stock</h2>
        <p className={style.subtitle}>
          Inventory Manager – Stock Management
        </p>

        {/* Medicine Info */}
        <div className={style.infoGrid}>
          <div>
            <label>Medicine Name</label>
            <input type="text" value={medicine.medicineName} disabled />
          </div>

          <div>
            <label>Brand Name</label>
            <input type="text" value={medicine.brandId ?.brandName || "Unknown"} disabled />
          </div>

          <div>
            <label>Medicine Type</label>
            <input type="text" value={medicine.typeId?.typeName || "Unknown"} disabled />
          </div>

          <div>
            <label>Category</label>
            <input type="text" value={medicine.categoryId?.categoryName || "Unknown"} disabled />
          </div>
        </div>

        {/* Stock Form */}
        <div className={style.formGrid}>
          <div>
            <label>Manufacture Date</label>
            <input type="date" value={mnfdate}
            onChange={(e) => setMnfdate(e.target.value)}  />
          </div>

          <div>
            <label>Expiry Date</label>
            <input type="date" value={expdate}
            onChange={(e) => setExpdate(e.target.value)}/>
          </div>

          <div className={style.stock}>
            <label>Stock Quantity</label>
            <input type="number"  value={stock}
            onChange={(e) => setStock(e.target.value)} placeholder="Enter stock count" />
          </div>
        </div>

        {/* Action */}
        <div className={style.actions}>
          <input type="submit" value="Update Stock" className={style.updateBtn} onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  )
}

export default AddStock