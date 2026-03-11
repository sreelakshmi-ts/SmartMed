import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import style from './InventoryManagerList.module.css'

const InventoryManagerList = () => {
     const [managers, setManagers] = useState([]);

  const fetchManagers = () => {
    axios.get("http://localhost:5000/inventoryManagersAdmin")
      .then(res => setManagers(res.data.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchManagers();
  }, []);
  const updateStatus = async (id, currentStatus) => {

    const newStatus =
      currentStatus === "Active" ? "Inactive" : "Active";

    try {
      await axios.put(
        `http://localhost:5000/inventoryManagerStatus/${id}`,
        { status: newStatus }
      );

      fetchManagers(); // refresh list

    } catch (err) {
      console.log(err);
    }
  };
  return (
   <div className={style.page}>

      <h2>Inventory Managers</h2>

      <div className={style.grid}>

        {managers.map((mgr) => (

          <div className={style.card} key={mgr._id}>

            {/* ROUND IMAGE */}
            <img
              src={`http://localhost:5000/${mgr.inManagerPhoto}`}
              className={style.avatar}
              alt="manager"
            />

            <h3>{mgr.inManagerName}</h3>

            <p>ID : {mgr.inMangerEmpId}</p>
            <p>Warehouse : {mgr.ManagerWarehouseName}</p>
            <p>{mgr.placeId?.placeName}</p>
            <p>{mgr.inManagerContact}</p>

            {/* STATUS */}
            <span
              className={
                mgr.InManagerStatus === "Active"
                  ? style.active
                  : style.inactive
              }
            >
              {mgr.InManagerStatus || "Inactive"}
            </span>

            {/* ACTION BUTTON */}
            <button
              onClick={() =>
                updateStatus(mgr._id, mgr.InManagerStatus)
              }
              className={style.actionBtn}
            >
              Set {mgr.InManagerStatus === "Active"
                ? "Inactive"
                : "Active"}
            </button>

          </div>

        ))}

      </div>
    </div>
  )
}

export default InventoryManagerList