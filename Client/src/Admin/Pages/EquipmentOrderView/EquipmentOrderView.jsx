import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./EquipmentOrderView.module.css";

const EquipmentOrderView = () => {

  const [allOrders, setAllOrders] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  // Load all orders once
  useEffect(() => {
    axios.get("http://localhost:5000/adminAllequipmentOrders")
      .then(res => setAllOrders(res.data.bookings))
      .catch(console.error);
  }, []);

  // STATUS TEXT
  const getStatus = (status) => {
    if (status === 5) return "Delivered";
    if (status === 4) return "Shipped";
    if (status === 3) return "Assigned";
    return "Payment Completed";
  };

  // TODAY PRIORITY SORT
  const today = new Date().toDateString();

  const sortedOrders = [...allOrders].sort((a, b) => {

    const aDate = new Date(a.bookingDate).toDateString();
    const bDate = new Date(b.bookingDate).toDateString();

    if (aDate === today && bDate !== today) return -1;
    if (aDate !== today && bDate === today) return 1;

    return new Date(b.bookingDate) - new Date(a.bookingDate);
  });

  //  DATE FILTER
  const filteredOrders = filterDate
    ? sortedOrders.filter(order =>
        new Date(order.bookingDate)
          .toISOString()
          .slice(0, 10) === filterDate
      )
    : sortedOrders;

  return (
    <div className={style.page}>

      <h2>Equipment Orders</h2>

      {/* DATE FILTER */}
      <div className={style.filterBox}>
        <label>Filter by Date :</label>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        {filterDate && (
          <button
            className={style.clearBtn}
            onClick={() => setFilterDate("")}
          >
            Clear
          </button>
        )}
      </div>

      <div className={style.orderList}>

        {filteredOrders.map(order => (

          <div className={style.orderCard} key={order._id}>

            <span className={style.status}>
              {getStatus(order.bookStatus)}
            </span>

            {/* EQUIPMENT LIST */}
            {order.equipment.map((eq, i) => (

              <div className={style.itemRow} key={i}>

                <img
                  src={`http://localhost:5000/${eq.photo}`}
                  className={style.image}
                  alt=""
                />

                <div>
                  <h4>{eq.name}</h4>
                  <p>Qty : {eq.quantity}</p>
                </div>

              </div>

            ))}

            <div className={style.info}>
              <p>
                Date :
                {new Date(order.bookingDate).toDateString()}
              </p>

              <p>Shop : {order.customerStoreName}</p>
            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default EquipmentOrderView