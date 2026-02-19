import React, { useEffect, useState } from 'react'
import style from './EquipmentDetailView.module.css'
import { useParams } from 'react-router';
import axios from 'axios';

const EquipmentDetailView = () => {
    const[equipment,setEquipment]=useState(null);
    // const [quantity, setQuantity] = useState(1);
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
               {equipment.equipmentDescription}
         </p>
                   {/* <div className={style.QuantityBox}>
             <button onClick={decreaseQty}>−</button>
   
             <input
               type="number"
               value={quantity}
               readOnly
             />
   
     <button onClick={increaseQty}>+</button>
   </div> */}
   
           <div className={style.Actions}>
           <button className={style.AddToCart} >Add to Cart</button>
           <button className={style.BuyNow}>Buy Now</button>
         </div>
       </div>
   
     </div>
   </div>
  )
}

export default EquipmentDetailView