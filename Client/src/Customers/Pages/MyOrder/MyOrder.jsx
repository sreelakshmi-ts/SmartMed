import React, { useEffect, useState } from 'react'
import style from './MyOrder.module.css'
import axios from 'axios'

const MyOrder = () => {

  const [orders, setOrders] = useState([]);

 
  const customerId = sessionStorage.getItem("cid");
 


 useEffect(() => {

    if (!customerId) return;   

    axios.get(`http://localhost:5000/booking-details/${customerId}`)
      .then(res => {
       setOrders(res.data.bookings|| []);
      })
      .catch(err => console.log(err));

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
                  src={`http://localhost:5000/${item.medicinePhoto}`}
                  alt={item.medicineName}
                />
              </div>

              {/* DETAILS */}
              <div className={style.OrderDetails}>
                <h4>{item.medicineName}</h4>
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


export default MyOrder;
