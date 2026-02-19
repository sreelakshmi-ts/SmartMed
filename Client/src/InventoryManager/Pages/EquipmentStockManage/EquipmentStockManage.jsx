import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './EquipmentStockManage.module.css'
import axios from 'axios';
import { Link } from 'react-router';

const EquipmentStockManage = () => {
const [equipment, setEquipment] = useState([]);

   const getEquipment=() =>{
        axios.get(`http://localhost:5000/ViewEquipment`)
        .then(res => setEquipment(res.data.equipment))
        .catch(console.error);
    }

    useEffect(() =>{
      getEquipment();
    }
    ,[])



  return (
     <div className={styles.page}>
      <h2 className={styles.heading}>Equipment Inventory</h2>
      <p className={styles.subHeading}>View equipment and manage stock</p>

      <div className={styles.grid}>
        {/* Equipment Card */}
         {equipment.map((data)=>(<div className={styles.card} key={data._id}>
          <img
            src={`http://localhost:5000${data.equipmentPhoto}`}
            alt="Equipment"
            className={styles.image}
          />

          <div className={styles.content}>
            <h3 className={styles.name}>{data.equipmentName}</h3>

            <div className={styles.meta}>
              <span>Category:</span> {data.equcategoryId ?. equcategoryName || "Unknown"}
            </div>

            <div className={styles.meta}>
              <span>Manufacturer:</span> {data.brandId ?.brandName || "Unknown"}
            </div>
            <div className={styles.meta}>
              <span>Price:</span> {data.equipmentPrice}
            </div>
            <div className={styles.stock}>
              Stock Available: <strong>120</strong>
            </div>


            <Link  to={`/inventory/addequipmentstock/${data._id}`} className={styles.addStockBtn}>+Add Stock</Link>
          </div>
        </div>))}
        

        {/* Duplicate cards as needed */}
      </div>
    </div>
  )
}

export default EquipmentStockManage