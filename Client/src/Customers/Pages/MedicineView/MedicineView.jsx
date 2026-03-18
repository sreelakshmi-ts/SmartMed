import React from 'react'
import style from './MedicineView.module.css'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const MedicineView = () => {
  const[medicine,setMedicine]=useState(null);
      
  const { id } = useParams();

    const getMedicine =()=>{
        axios.get(`http://localhost:5000/Medicine/${id}`)
        .then(res => setMedicine(res.data.medicine))
        .catch(console.error);
    };
     useEffect(() =>{
       getMedicine();
     },[id]);

     if (!medicine) return <p>Loading...</p>;
      const addToCart = () => {

      const customerId = sessionStorage.getItem("cid");

      if (!customerId) {
        alert("Please login first");
        return;
      }

      axios.post("http://localhost:5000/AddToCart", {
        customerId: customerId,
        medicineId: medicine._id,
        quantity: 1
      })
      .then(res => {
        alert("Added to cart");
      })
      .catch(err => console.log(err));
      };

      const isExpiringSoon = () => {
        if (!medicine.expiryDate) return false;

        const today = new Date();
        const expiry = new Date(medicine.expiryDate);

        const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

        return diffDays <= 30; // within 30 days
      };

  return (
   <div className={style.ProductDetailPage}>
  <div className={style.ProductCard}>

    {/* LEFT: IMAGE */}
    <div className={style.ImageSection}>
      <img
        src={`http://localhost:5000${medicine.medicinePhoto}`}
        alt="Medicine"
        className={style.ProductImage}
      />
    </div>

    {/* RIGHT: DETAILS */}
    <div className={style.DetailsSection}>
      <h2 className={style.ProductName}>{medicine.medicineName}</h2>

      <div className={style.Meta}>
        <span className={style.Brand}>{medicine.brand ?.brandName || "Unknown"}</span>
        <span className={style.Category}>{medicine.category ?.categoryName || "Unknown"}</span>
        <span className={style.Category}>{medicine.type ?.typeName || "Unknown"}</span>
      </div>
     <div className={style.Price}>
       {medicine.medicinePrice} <span>/ strip</span>
      </div>
      <p className={style.Description}>
            {medicine.medicineDistription}
      </p>
      <div className={style.DateSection}>
        <p>
          <strong>Manufacture Date:</strong>{" "}
          {medicine.manufactureDate || "Not Available"}
        </p>
        <p className={isExpiringSoon() ? style.expiryWarning : ""}>
        <strong>Expiry Date:</strong>{" "}
        {medicine.expiryDate || "Not Available"}
      </p>
      </div>

<div className={style.Actions}>

  {medicine?.stockQuantity > 0 ? (

    <button
      className={style.AddToCart}
      onClick={addToCart}
    >
      Add to Cart
    </button>

  ) : (

    <button
      className={style.outOfStock}
      disabled
    >
      Out of Stock
    </button>

  )}

</div>
    </div>

  </div>
</div>
  )
}

export default MedicineView