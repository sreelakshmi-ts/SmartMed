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
      


        setOrders(res.data.bookings);

      })
      .catch(err => console.log(err));

  }, []);

  return (

    <div className={style.MyOrdersPage}>

      <h2 className={style.PageTitle}>My Orders</h2>
    

      {
        orders.map(order => (
          order.cartItems.map(item => (

            <div className={style.OrderCard} key={item.cartId}>

              {/* IMAGE */}
              <div className={style.ImageBox}>
                <img src={`http://localhost:5000/${item.medicinePhoto}`} alt="medicine" />
              </div>

              {/* DETAILS */}
              <div className={style.OrderDetails}>
                <h4>{item.medicineName}</h4>

                <p>Qty: {item.cartQuantity}</p>

                <p className={style.Price}>₹{item.itemAmount}</p>
              </div>

              {/* STATUS */}
              <div className={style.StatusBox}>
                <span className={
                  order.bookStatus === 1
                    ? style.Delivered
                    : style.Pending
                }>
                  {order.bookStatus === 2 ? "Pending" : "In Cart"}
                </span>

                <p>
                  {new Date(order.bookDate).toDateString()}
                </p>
              </div>

            </div>

          ))
        ))
      }

    </div>
  )
}

export default MyOrder;
