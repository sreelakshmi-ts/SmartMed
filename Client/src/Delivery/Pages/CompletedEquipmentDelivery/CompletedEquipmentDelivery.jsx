import React from 'react'
import style from './CompletedEquipmentDelivery.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
const CompletedEquipmentDelivery = () => {
  const[deliveries, setDeliveries] = useState([]);
  const deliveryId = sessionStorage.getItem("did");
  useEffect(() => {
    axios.get(`http://localhost:5000/CompletedEquipmentOrders/${deliveryId}`)
      .then((res) => {
        setDeliveries(res.data.completedOrders || []);
      })
      .catch((err) => console.log(err));
  }, [deliveryId]);

  return (
      <div className={style.CompletedPage}>
   
         <h2 className={style.PageTitle}>Completed Deliveries</h2>
   
         <div className={style.DeliveryList}>
   
           {deliveries.map((booking) => {
   
             // Calculate total amount
             const totalAmount = booking.equipments.reduce(
               (sum, equ) => sum + equ.itemAmount,
               0
             );
   
             return (
   
               <div className={style.DeliveryCard} key={booking._id}>
   
   
                 {/* BOOKING INFO */}
                 <div className={style.BookingHeader}>
   
                   <p><strong>Shop:</strong> {booking.customerStoreName}</p>
   
                   <p><strong>Address:</strong> {booking.customerAddress}</p>
   
                   <p><strong>Contact:</strong> {booking.customerPhone}</p>
   
                   <p>
                     <strong>Delivered on:</strong>{" "}
                     {new Date(booking.bookingDate).toDateString()}
                   </p>
   
                 </div>
   
   
                 {/* MEDICINES */}
                 {booking.equipments.map((equ) => (
   
                   <div key={equ.cartId} className={style.ItemRow}>
   
                     <img
                       src={`http://localhost:5000/${equ.equipmentPhoto}`}
                       alt={equ.equipmentName}
                       className={style.ProductImg}
                     />
   
                     <div className={style.InfoSection}>
   
                       <h3>{equ.equipmentName}</h3>
   
                       <p>Qty: {equ.quantity}</p>
   
                       <p>Amount: ₹{equ.itemAmount}</p>
   
                     </div>
   
                   </div>
   
                 ))}
   
   
                 {/* TOTAL + BUTTON */}
                 <div className={style.Footer}>
   
                   <div className={style.TotalAmount}>
                     Total Amount: ₹{totalAmount}
                   </div>
   
                   <button className={style.DeliveredBtn}>
                     Delivered
                   </button>
   
                 </div>
   
   
               </div>
   
             );
   
           })}
   
         </div>
   
       </div>
  )
}

export default CompletedEquipmentDelivery