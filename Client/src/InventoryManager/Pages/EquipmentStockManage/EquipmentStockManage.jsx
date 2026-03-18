import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './EquipmentStockManage.module.css'
import axios from 'axios';
import { Link } from 'react-router';

const EquipmentStockManage = () => {
const [equipment, setEquipment] = useState([]);

   const getEquipment=() =>{
        axios.get(`http://localhost:5000/inventoryEquipmentManage`)
        .then(res => setEquipment(res.data.equipment))
        .catch(console.error);
    }

    useEffect(() =>{
      getEquipment(); 
    }
    ,[])

    const isExpiringSoon = (expiryDate) => {
      if (!expiryDate) return false;

      const today = new Date();
      const expiry = new Date(expiryDate);

      const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

      return diffDays <= 30; // within 30 days
    };

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
               Stock Available: <strong>{data.totalStock || 0}</strong>
            </div>

            <div className={styles.meta}>
              <span>Manufacture Date:</span>{" "}
              {data.manufactureDate
                ? new Date(data.manufactureDate).toLocaleDateString()
                : "N/A"}
            </div>

            <div className={`${styles.meta} ${isExpiringSoon(data.expiryDate) ? styles.expiryWarning : ""}`}>
              <span>Expiry Date:</span>{" "}
              {data.expiryDate
                ? new Date(data.expiryDate).toLocaleDateString()
                : "N/A"}
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