import React, { useEffect, useState } from 'react'
import style from './AssignedDelivery.module.css';
import axios from 'axios';

const AssignedDelivery = () => {
  const[delivery, setDelivery] = useState([]);
  const deliveryId = sessionStorage.getItem("did");



  useEffect(() => {
    axios.get(`http://localhost:5000/AssignedOrders/${deliveryId}`).then((res) => {
      setDelivery(res.data.assignedOrders);
    }).catch((err) => console.log(err));
  }, []);

const handleAccept = (bookingId) => {
  axios.put(`http://localhost:5000/UpdateDeliveryStatus/${bookingId}`)
  .then(() => alert("Delivery accepted successfully!"))
  .catch(console.error);
};

const handleDelivered = (bookingId) => {
  axios.put(`http://localhost:5000/CompleteDelivery/${bookingId}`)
  .then(() => alert("Marked as delivered!"))
  .catch(console.error);
}



  // GROUP BY bookingId
const groupedDeliveries = delivery.reduce((acc, item) => {
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

        {items.map(med => (
          <div className={style.ItemRow} key={med.cartId}>

            <img
              src={`http://localhost:5000/${med.medicinePhoto}`}
              className={style.ProductImg}
            />

            <div className={style.Info}>
              <h4>{med.medicineName}</h4>
              <span>Qty: {med.quantity}</span>
              <span className={style.Price}>₹{med.itemAmount}</span>
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

export default AssignedDelivery
