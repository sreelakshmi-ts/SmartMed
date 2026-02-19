import React from 'react'
import style from './CustOrders.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { PhoneAndroid } from '@mui/icons-material';

const CustOrders = () => {
  const [orders, setOrders] = useState([]);
  const repId = sessionStorage.getItem("rid");
  useEffect(() => {
    axios.get(`http://localhost:5000/RepAssignedOrders/${repId}`)
      .then(res => {
        setOrders(res.data.assignedOrders);
      })
      .catch(err => console.log(err));
  }, []);

  const grouped = orders.reduce((acc, item) => {
  if (!acc[item.bookingId]) acc[item.bookingId] = [];
  acc[item.bookingId].push(item);
  return acc;
}, {});

  return (
   <div className={style.RepOrdersPage}>

  <h2 className={style.PageTitle}>My Orders</h2>
{Object.values(grouped).map((group, index) => {

  const order = group[0]; // booking info from first item

  return (

    <div key={index} className={style.RepOrderCard}>

      {/* STATUS */}
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
        {order.bookStatus === 2 && "Pending"}
        {order.bookStatus === 3 && "Accepted"}
        {order.bookStatus === 4 && "Shipped"}
        {order.bookStatus === 5 && "Delivered"}
      </span>

      {/* CUSTOMER */}
      <div className={style.CustomerBlock}>
        <h4>{order.customerStoreName}</h4>
        <p>{order.customerAddress}</p>
        <p><PhoneAndroid /> {order.customerPhone}</p>
      </div>

      {/* MEDICINES */}
      {group.map((med, i) => (

        <div key={i} className={style.MedicineRow}>

          <img
            src={`http://localhost:5000/${med.medicinePhoto}`}
            className={style.MedicineImg}
          />

          <div className={style.MedInfo}>
            <strong>{med.medicineName}</strong>
            <p>Qty: {med.quantity}</p>
            <p className={style.Price}>₹{med.itemAmount}</p>
          </div>

        </div>

      ))}

    </div>

  );

})}
    </div>
  )
}

export default CustOrders


  