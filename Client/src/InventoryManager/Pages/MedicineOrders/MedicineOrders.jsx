import React, { useEffect } from 'react'
import style from './MedicineOrder.module.css'
import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

const MedicineOrders = () => {
   const[orders,setOrders]=useState([]);
   const navigate = useNavigate();
   const { id } = useParams(); 

   useEffect(() => {
    axios.get(`http://localhost:5000/AllOrdersDetails/${id}`)
      .then(res => {  
       setOrders(res.data.bookingDetails)
      })
      .catch(err => console.log(err));
  }, [id]);
// Implement navigation to delivery team page
  const handleViewDeliveryTeam = () => {
    
    navigate(`/inventory/deliveryteamAssign/${id}`);
  };

    if (!orders.length) return null;

  const customer = orders[0];

  return (

    <div className={style.OrderViewPage}>

      <h2 className={style.PageTitle}>Order Details</h2>

      <div className={style.OrderWrapper}>

        {/* LEFT — MEDICINES */}
        <div>

          {
            orders.map((item, index) => (

              <div className={style.MedicineCard} key={index}>

                <img
                  src={`http://localhost:5000/${item.medicinePhoto}`}
                  alt="medicine"
                />

                <h4>{item.medicineName}</h4>

                <p>Quantity: {item.quantity}</p>

                <p className={style.Price}>₹{item.itemAmount}</p>

              </div>

            ))
          }

        </div>

        {/* RIGHT — CUSTOMER + DELIVERY */}
        <div className={style.InfoCard}>

          {/* CUSTOMER */}
          <div className={style.Section}>
            <h3>Customer Details</h3>

            <p><strong>Shop:</strong> {customer.customerStoreName}</p>
            <p><strong>Address:</strong> {customer.customerAddress}</p>
            <p><strong>Contact:</strong> {customer.customerPhone}</p>

            <p>
              <strong>Booking Date:</strong>{" "}
              {new Date(customer.bookingDate).toDateString()}
            </p>

            <p><strong>Total Amount:</strong> ₹{customer.bookAmount}</p>
          </div>

          <hr />

          {/* REPRESENTATIVE */}
          <div className={style.Section}>
            <h3> Representative</h3>

            <p>
              <strong>Name:</strong>{" "}
              {customer.representativeName || "Not Assigned"}
            </p>
            <p><strong>Employee ID:</strong>{customer. representativeEmpId || "Unknown"}</p>

            {customer.bookStatus === 2 && (
              <button className={style.AssignBtn} onClick={handleViewDeliveryTeam}>
                View Delivery Team
              </button>
            )}

            {customer.bookStatus === 3 && (
              <button className={style.PendingBtn} disabled>
                Pending
              </button>
            )}

            {customer.bookStatus === 4 && (
              <button className={style.ShippedBtn} disabled>
                Shipped
              </button>
            )}

            {customer.bookStatus === 5 && (
              <button className={style.DeliveredBtn} disabled>
                Delivered
              </button>
            )}


          </div>

        </div>

      </div>

    </div>

  )
}

export default MedicineOrders