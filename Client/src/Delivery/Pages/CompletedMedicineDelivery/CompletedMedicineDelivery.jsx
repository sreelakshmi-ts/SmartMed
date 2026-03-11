import React from 'react'
import style from './CompletedMedicineDelivery.module.css'
import { useState, useEffect } from 'react';

const CompletedMedicineDelivery = () => {

  const [deliveries, setDeliveries] = useState([]);
  const deliveryId = sessionStorage.getItem("did");

  useEffect(() => {

    fetch(`http://localhost:5000/CompletedMedicineOrders/${deliveryId}`)
      .then((res) => res.json())
      .then((data) => {
        setDeliveries(data.completedOrders || []);
      })
      .catch((err) => console.log(err));

  }, [deliveryId]);


  return (

    <div className={style.CompletedPage}>

      <h2 className={style.PageTitle}>Completed Deliveries</h2>

      <div className={style.DeliveryList}>

        {deliveries.map((booking) => {

          // Calculate total amount
          const totalAmount = booking.medicines.reduce(
            (sum, med) => sum + med.itemAmount,
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
              {booking.medicines.map((med) => (

                <div key={med.cartId} className={style.ItemRow}>

                  <img
                    src={`http://localhost:5000/${med.medicinePhoto}`}
                    alt={med.medicineName}
                    className={style.ProductImg}
                  />

                  <div className={style.InfoSection}>

                    <h3>{med.medicineName}</h3>

                    <p>Qty: {med.quantity}</p>

                    <p>Amount: ₹{med.itemAmount}</p>

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

export default CompletedMedicineDelivery