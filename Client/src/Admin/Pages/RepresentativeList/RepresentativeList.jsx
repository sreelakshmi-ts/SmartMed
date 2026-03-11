import React, { useEffect, useState } from "react";
import style from "./RepresentativeList.module.css";
import axios from "axios";

const RepresentativeList = () => {

  const [reps, setReps] = useState([]);

  const fetchReps = () => {
    axios.get("http://localhost:5000/representativesAdmin")
      .then(res => setReps(res.data.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchReps();
  }, []);

  // Status Toggle
  const updateStatus = async (id, currentStatus) => {

    const newStatus =
      currentStatus === "Active" ? "Inactive" : "Active";

    try {

      await axios.put(
        `http://localhost:5000/representativeStatus/${id}`,
        { status: newStatus }
      );

      fetchReps();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.page}>

      <h2>Representatives</h2>

      <div className={style.grid}>

        {reps.map(rep => (

          <div className={style.card} key={rep._id}>

            {/* ROUND IMAGE */}
            <img
              src={`http://localhost:5000/${rep.repPhoto}`}
              className={style.avatar}
              alt="rep"
            />

            <h3>{rep.repName}</h3>

            <p>EMP ID : {rep.repEmpId}</p>
            <p>{rep.repEmail}</p>
            <p>{rep.repContact}</p>
            <p>{rep.placeId?.placeName}</p>

            {/* STATUS BADGE */}
            <span
              className={
                rep.repStatus === "Active"
                  ? style.active
                  : style.inactive
              }
            >
              {rep.repStatus || "Active"}
            </span>

            {/* ACTION BUTTON */}
            <button
              className={style.actionBtn}
              onClick={() =>
                updateStatus(rep._id, rep.repStatus)
              }
            >
              Set {rep.repStatus === "Active"
                ? "Inactive"
                : "Active"}
            </button>

          </div>

        ))}

      </div>
    </div>
  );
};

export default RepresentativeList;