import React, { useEffect, useState } from 'react'
import style from './EquipmentDetailView.module.css'
import { useParams } from 'react-router';
import axios from 'axios';

const EquipmentDetailView = () => {
    const[equipment,setEquipment]=useState(null);
    
     const { id } = useParams();
     const getEquipment =()=>{
        axios.get(`http://localhost:5000/EquipmentDetails/${id}`)
        .then(res => setEquipment(res.data.equipmentDetails))
        .catch(console.error);
    };
    useEffect(() =>{
        getEquipment();
    },[id]);
    if (!equipment) return <p>Loading...</p>;

    const addtoCart = () => {

      const equipmentCustomerId = sessionStorage.getItem("ecid");
      if (!equipmentCustomerId) {
        alert("Please login first");
        return;
      }
      axios.post("http://localhost:5000/EquipmentCart", {
         equipmentCustomerId: equipmentCustomerId,
        equipmentId: equipment._id,
        quantity: 1
      })
      .then(res => {
        alert("Equipment added to cart!");
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        alert("Failed to add equipment to cart.");
      });
    };

    const isExpiringSoon = (expiryDate) => {
      if (!expiryDate) return false;

      const today = new Date();
      const expiry = new Date(expiryDate);

      const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

      return diffDays <= 30;
    };

  return (
    <div className={style.ProductDetailPage}>
     <div className={style.ProductCard}>
   
       {/* LEFT: IMAGE */}
       <div className={style.ImageSection}>
         <img
           src={`http://localhost:5000${equipment.equipmentPhoto}`}
           alt="Equipment"
           className={style.ProductImage}
         />
       </div>
   
       {/* RIGHT: DETAILS */}
       <div className={style.DetailsSection}>
         <h2 className={style.ProductName}>{equipment.equipmentName}</h2>
   
         <div className={style.Meta}>
           <span className={style.Brand}>{equipment.brandId ?.brandName || "Unknown"}</span>
           <span className={style.Category}>{equipment.equcategoryId ?. equcategoryName || "Unknown"}</span>
        
         </div>
        <div className={style.Price}>
          {equipment.equipmentPrice} <span>/ piece</span>
         </div>
         <p className={style.Description}>
            {equipment.equipmentDistription}
         </p>
         <div className={style.DateSection}>
            <p>
              <strong>Manufacture Date:</strong>{" "}
              {equipment.manufactureDate
                ? new Date(equipment.manufactureDate).toLocaleDateString()
                : "N/A"}
            </p>

            <p className={isExpiringSoon(equipment.expiryDate) ? style.expiryWarning : ""}>
              <strong>Expiry Date:</strong>{" "}
              {equipment.expiryDate
                ? new Date(equipment.expiryDate).toLocaleDateString()
                : "N/A"}
            </p>
</div>
   
           <div className={style.Actions}>
           <button className={style.AddToCart} onClick={addtoCart} >Add to Cart</button>
         </div>
       </div>
   
     </div>
   </div>
  )
}

export default EquipmentDetailView