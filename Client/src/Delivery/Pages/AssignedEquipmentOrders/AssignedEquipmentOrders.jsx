import React from 'react'
import style from './AssignedEquipmentOrders.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const AssignedEquipmentOrders = () => {
    const[equipmentdelivery, setEquipmentDelivery] = useState([]);
    const deliveryId = sessionStorage.getItem("did");
    
const fetchAssignedOrders = () => {
  axios.get(`http://localhost:5000/AssignedEquipmentOrder/${deliveryId}`)
    .then((res) => {
      setEquipmentDelivery(res.data.assignedOrders);
    })
    .catch((err) => console.log(err));
};
useEffect(() => {
  fetchAssignedOrders();
}, []);

const handleAccept = (bookingId) => {
  axios.put(`http://localhost:5000/UpdateDeliveryStatus/${bookingId}`)
    .then(() => {
      alert("Delivery accepted successfully!");
      fetchAssignedOrders(); 
    })
    .catch(console.error);
};

const handleDelivered = (bookingId) => {
  axios.put(`http://localhost:5000/CompleteDelivery/${bookingId}`)
  .then(() => {
    alert("Marked as delivered!");
    fetchAssignedOrders(); 
  })
  .catch(console.error);
}
const groupedDeliveries = equipmentdelivery.reduce((acc, item) => {
  if (!acc[item.bookingId]) acc[item.bookingId] = [];
  acc[item.bookingId].push(item);
  return acc;
}, {});
  return (
 <div className={style.DeliveryPage}>
 
 <h2 className={style.PageTitle}>Assigned Deliveries</h2>
 
 <div className={style.DeliveryList}>
 
   {/* CARD – STATUS = 3 */}
   {Object.entries(groupedDeliveries).map(([bookingId, items]) => {
   const booking = items[0]; // common info
 
   return (
     <div className={style.DeliveryCard} key={bookingId}>
 
       <div className={style.BookingHeader}>
         <p><strong>Shop:</strong> {booking.customerStoreName}</p>
         <p><strong>Address:</strong> {booking.customerAddress}</p>
         <p><strong>Contact:</strong> {booking.customerPhone}</p>
         <p><strong>Date:</strong> {new Date(booking.bookingDate).toDateString()}</p>
       </div>
 
       <div className={style.ItemsList}>
 
         {items.map(equ => (
           <div className={style.ItemRow} key={equ.cartId}>
 
             <img
               src={`http://localhost:5000/${equ.equipmentPhoto}`}
                alt={equ.equipmentName}
               className={style.ProductImg}
             />
 
             <div className={style.Info}>
               <h4>{equ.equipmentName}</h4>
               <span>Qty: {equ.quantity}</span>
               <span className={style.Price}>₹{equ.itemAmount}</span>
             </div>
 
           </div>
         ))}
 
       </div>
 
       {booking.bookStatus === 3 && (
         <button
           className={style.AcceptBtn}
           onClick={() => handleAccept(bookingId)}
         >
           Accept Delivery
         </button>
       )}
 
       {booking.bookStatus === 4 && (
         <button className={style.DeliveredBtn} onClick={() => handleDelivered(bookingId)}>
           Delivered Now
         </button>
       )}
 
     </div>
   );
 })}
 
 
 
 </div>
 
 </div>
  )
}

export default AssignedEquipmentOrders