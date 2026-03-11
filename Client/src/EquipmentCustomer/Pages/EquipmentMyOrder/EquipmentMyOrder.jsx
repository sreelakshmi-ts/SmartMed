import React, { use } from 'react'
import style from './EquipmentMyOrder.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const EquipmentMyOrder = () => {
    const[orders,setOrders]=useState([]);
    const equipmentCustomerId=sessionStorage.getItem("ecid");
    useEffect(()=>{
        if(!equipmentCustomerId) return;
        axios.get(`http://localhost:5000/equipment-booking-details/${equipmentCustomerId}`)
        .then(res => {
          setOrders(res.data.bookings);
        })
        .catch(err => {
          console.error("Error fetching orders:", err);
        });
    }, []);
    const getStatus = (status) => {
    switch (status) {
      case 2: return "Order Placed";
      case 3: return "Delivery Assigned";
      case 4: return "Shipped";
      case 5: return "Delivered";
      default: return "Unknown";
    }
  };

  return (
      <div className={style.MyOrdersPage}>
    
        <h2 className={style.PageTitle}>My Orders</h2>
    
        {orders.length === 0 && (
          <p>No orders found</p>
        )}
    
        {orders.map(order => (
    
          <div className={style.OrderCard} key={order._id}>
    
            {/* ITEMS LIST */}
            <div className={style.OrderItems}>
    
              {order.cartItems?.map(item => (
    
                <div className={style.ItemRow} key={item.cartId}>
    
                  {/* IMAGE */}
                  <div className={style.ImageBox}>
                    <img
                      src={`http://localhost:5000/${item.equipmentPhoto}`}
                      alt={item.equipmentName}
                    />
                  </div>
    
                  {/* DETAILS */}
                  <div className={style.OrderDetails}>
                    <h4>{item.equipmentName}</h4>
                    <p>Qty: {item.cartQuantity}</p>
                    <p className={style.Price}>₹{item.itemAmount}</p>
                  </div>
    
                </div>
    
              ))}
    
            </div>
    
            {/* STATUS SECTION */}
            <div className={style.StatusBox}>
    
              <span
                className={`${style.Status} ${
                  order.bookStatus === 2
                    ? style.Pending
                    : order.bookStatus === 3
                    ? style.Assigned
                    : order.bookStatus === 4
                    ? style.Shipped
                    : style.Delivered
                }`}
              >
                {getStatus(order.bookStatus)}
              </span>
    
              <p>
                {new Date(order.bookDate).toDateString()}
              </p>
    
              <h4 className={style.Total}>
                Total: ₹{order.totalBookingAmount}
              </h4>
    
            </div>
    
          </div>
    
        ))}
    
      </div>
  )
}

export default EquipmentMyOrder