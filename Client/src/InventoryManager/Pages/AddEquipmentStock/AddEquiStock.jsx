import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import style from './AddEquiStock.module.css'

const AddEquiStock = () => {
    const[equipment,setEquipment]=useState(null); 
    const { id } = useParams();
    const[mnfdate,setMnfdate]=useState('');
    const[expdate,setExpdate]=useState('');
    const[stock,setStock]=useState('');

    const getEquipment =()=>{
        axios.get(`http://localhost:5000/EquipmentForStock/${id}`)
        .then(res => setEquipment(res.data.equipment))
         .catch(console.error);
    }
        useEffect(() =>{
         getEquipment();
         },[id])
            if (!equipment) return <p>Loading...</p>;

            const handleSubmit=(e) =>{
            e.preventDefault();
            const data ={
                equipmentId: equipment._id,
                equipmentManufactureDate:mnfdate,
                equipmentExpireDate:expdate,
                stockQuantity:stock,
            }
            axios.post('http://localhost:5000/EquipmentStock',data).then((res) => {
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
           <h2>Update Equipment Stock</h2>
           <p className={style.subtitle}>
             Inventory Manager – Stock Management
           </p>
   
           {/* Equipment Info */}
           <div className={style.infoGrid}>
             <div>
               <label>Equipment Name</label>
               <input type="text" value={equipment.equipmentName} disabled />
             </div>
   
             <div>
               <label>Brand Name</label>
               <input type="text" value={equipment.brandId ?.brandName || "Unknown"} disabled />
             </div>
   
   
             <div>
               <label>Category</label>
               <input type="text" value={equipment.equcategoryId ?. equcategoryName || "Unknown"} disabled />
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

export default AddEquiStock