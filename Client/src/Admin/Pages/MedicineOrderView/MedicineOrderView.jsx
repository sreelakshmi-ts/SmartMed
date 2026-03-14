import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./MedicineOrderView.module.css";

const MedicineOrderView = () => {

  const [allOrders, setAllOrders] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  // Load ALL orders first (ONLY ONCE)
  useEffect(() => {
    axios.get(`http://localhost:5000/adminAllMedicineOrders`)
      .then(res => {
        setAllOrders(res.data.bookings);
      })
      .catch(err => console.log(err));
  }, []);

  //  Status text
  const getStatus = (status) => {
    if (status === 5) return "Delivered";
    if (status === 4) return "Shipped";
    if (status === 3) return "Assigned";
    return "Payment Completed";
  };

  //  TODAY PRIORITY SORT
  const today = new Date().toDateString();

  const sortedOrders = [...allOrders].sort((a, b) => {

    const aDate = new Date(a.bookingDate).toDateString();
    const bDate = new Date(b.bookingDate).toDateString();

    // today orders first
    if (aDate === today && bDate !== today) return -1;
    if (aDate !== today && bDate === today) return 1;

    // newest first
    return new Date(b.bookingDate) - new Date(a.bookingDate);
  });

  //  DATE FILTER (Frontend)
  const filteredOrders = filterDate
    ? sortedOrders.filter(order =>
        new Date(order.bookingDate)
          .toISOString()
          .slice(0, 10) === filterDate
      )
    : sortedOrders;

  return (
    <div className={style.page}>

      <h2>Medicine Orders</h2>

      {/* DATE FILTER */}
      <div className={style.filterBox}>
        <label>Filter by Date :</label>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        {/* Reset Filter */}
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

            {/* STATUS */}
            <span className={style.status}>
              {getStatus(order.bookStatus)}
            </span>

            {/* MEDICINES */}
            {order.medicines.map((med, i) => (
              <div className={style.medicineRow} key={i}>

                <img
                  src={`http://localhost:5000/${med.medicinePhoto}`}
                  className={style.image}
                  alt=""
                />

                <div>
                  <h4>{med.name}</h4>
                  <p>Qty : {med.quantity}</p>
                </div>

              </div>
            ))}

            {/* ORDER INFO */}
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

export default MedicineOrderView;