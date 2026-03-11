import React, { useEffect, useState } from "react";
import style from "./DeliveryTeamList.module.css";
import axios from "axios";

const DeliveryTeamList = () => {

  const [delivery, setDelivery] = useState([]);

  const fetchDelivery = () => {
    axios.get("http://localhost:5000/deliveryTeamsAdmin")
      .then(res => setDelivery(res.data.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchDelivery();
  }, []);

  //  Toggle Status
  const updateStatus = async (id, currentStatus) => {

    const newStatus =
      currentStatus === "Active" ? "Inactive" : "Active";

    try {

      await axios.put(
        `http://localhost:5000/deliveryStatus/${id}`,
        { status: newStatus }
      );

      fetchDelivery();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.page}>

      <h2>Delivery Team</h2>

      <div className={style.grid}>

        {delivery.map(member => (

          <div className={style.card} key={member._id}>

            <h3>{member.deliverName}</h3>

            <p>Vehicle : {member.deliverVehicleNo}</p>
            <p>{member.deliverEmail}</p>
            <p>{member.deliverContact}</p>
            <p>{member.placeId?.placeName}</p>

            {/* STATUS */}
            <span
              className={
                member.deliverStatus === "Active"
                  ? style.active
                  : style.inactive
              }
            >
              {member.deliverStatus || "Active"}
            </span>

            {/* ACTION BUTTON */}
            <button
              className={style.actionBtn}
              onClick={() =>
                updateStatus(member._id, member.deliverStatus)
              }
            >
              Set {member.deliverStatus === "Active"
                ? "Inactive"
                : "Active"}
            </button>

          </div>

        ))}

      </div>
    </div>
  );
};

export default DeliveryTeamList;