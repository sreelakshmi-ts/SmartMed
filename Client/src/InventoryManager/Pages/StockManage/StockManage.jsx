import React, { useState } from 'react'
import styles from './StockManage.module.css'
import { Link } from 'react-router'
import { useEffect } from 'react';
import axios from 'axios';

const StockManage = () => {
  const[medicine,setMedicine]=useState([]);

   const getMedicine=() =>{
        axios.get(`http://localhost:5000/Medicine`)
        .then(res => setMedicine(res.data.medicine))
        .catch(console.error); 
    };
    useEffect(() =>{
      getMedicine();
    },[])
    
  return (
       <div className={styles.page}>
      <h2 className={styles.heading}>Medicine Inventory</h2>
      <p className={styles.subHeading}>View medicines and manage stock</p>

      <div className={styles.grid}>
        {/* Medicine Card */}
         {medicine.map((data)=>(<div className={styles.card} key={data._id}>
          <div className={styles.imageContainer}>
            <img
              src={`http://localhost:5000${data.medicinePhoto}`}
              alt="Medicine"
              className={styles.image}
            />
          </div>


          <div className={styles.content}>
            <h3 className={styles.name}>{data.medicineName}</h3>

            <div className={styles.meta}>
              <span>Category:</span> {data.categoryId ?.categoryName || "Unknown"}
            </div>
            <div className={styles.meta}>
              <span>Medicine Type:</span> {data.typeId ?.typeName || "Unknown"}
            </div>
            <div className={styles.meta}>
              <span>Manufacturer:</span> {data.brandId ?.brandName || "Unknown"}
            </div>
            <div className={styles.meta}>
              <span>Price:</span> {data.medicinePrice}
            </div>
            <div className={styles.stock}>
              Stock Available: <strong>120</strong>
            </div>

            {/* <button className={styles.addStockBtn}>
              + Add Stock
            </button> */}
            <Link className={styles.addStockBtn} to={`/inventory/updatestock/${data._id}`}>+Add Stock</Link>
          </div>
        </div>))}
        

        {/* Duplicate cards as needed */}
      </div>
    </div>
  )
}

export default StockManage