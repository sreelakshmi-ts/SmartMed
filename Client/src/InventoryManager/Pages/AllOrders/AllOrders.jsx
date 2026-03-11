import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { Link } from 'react-router'
import axios from 'axios'

const AllOrders = () => {

  const [allOrders, setAllOrders] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  

  useEffect(() => {
    axios.get(`http://localhost:5000/AllOrders`)
      .then(res => {
        
        
        setAllOrders(res.data.bookings)
      })
      .catch(err => console.log(err));
  }, []);

    const today = new Date().toDateString();

    const sortedOrders = [...allOrders].sort((a, b) => {
    const aDate = new Date(a.bookingDate).toDateString();
    const bDate = new Date(b.bookingDate).toDateString();

    if (aDate === today && bDate !== today) return -1;
    if (aDate !== today && bDate === today) return 1;

    return new Date(b.bookingDate) - new Date(a.bookingDate);
    });

    const filteredOrders = filterDate
  ? sortedOrders.filter(order =>
      new Date(order.bookingDate).toISOString().slice(0, 10) === filterDate
    )
  : sortedOrders;

  return (
    <div className={style.OrdersPage}>
              <div className={style.FilterSection}>

          <label>Filter by Date:</label>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className={style.DateFilter}
          />

        </div>

      <h2 className={style.PageTitle}>All Orders</h2>

      <div className={style.OrderList}>
{filteredOrders.map(order => (

  <div className={style.OrderCard} key={order._id}>

    {/* STATUS BADGE */}
    <span
      className={`${style.Status} ${
        order.bookStatus === 5
          ? style.Delivered
          : order.bookStatus === 4
          ? style.Shipped
          : order.bookStatus === 3
          ? style.Assigned
          : style.Pending
      }`}
    >
      {
        order.bookStatus === 5
          ? "Delivered"
        :order.bookStatus === 4
          ? "Shipped"
          : order.bookStatus === 3
          ? "Delivery Assigned"
          : "Payment Completed"
      }
    </span>

    {/* MEDICINES LIST */}
    <div className={style.MedicineList}>

      {order.medicines.map((med, index) => (

        <div className={style.MedicineRow} key={index}>

          <img
            src={`http://localhost:5000/${med.medicinePhoto}`}
            className={style.ProductImg}
          />

          <div className={style.OrderInfo}>
            <h4>{med.medicineName}</h4>
            <p>Qty: {med.quantity}</p>
          </div>

        </div>

      ))}

    </div>

    {/* BOOKING INFO */}
    <div className={style.BookingInfo}>
      <p>Booking Date : {new Date(order.bookingDate).toDateString()}</p>
      <p>Shop : {order.customerStoreName}</p>
    </div>

    <Link
      className={style.ViewBtn}
      to={`/inventory/medicineorders/${order._id}`}
    >
      View Details
    </Link>

  </div>

))}



      </div>

    </div>
  


  )
}

export default AllOrders;
