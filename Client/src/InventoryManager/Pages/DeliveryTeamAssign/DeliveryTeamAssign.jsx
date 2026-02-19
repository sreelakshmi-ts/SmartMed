import React from 'react'
import style from './DeliveryTeamAssign.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const DeliveryTeamAssign = () => {
    const [deliveryTeam, setDeliveryTeam] = useState([]);
    const { bookid } = useParams();


       useEffect(() => {
    axios.get(`http://localhost:5000/AllDeliveryTeam/`)
      .then(res => {  
      setDeliveryTeam(res.data.deliveryTeams)
      })
      .catch(err => console.log(err));
  }, []);


      const handleassignDelivery = (bookid, deliveryteamId) => {
        axios.put(`http://localhost:5000/AssignDelivery/${bookid}`, {
          deliveryteamId
        })
        .then(res => alert("Delivery Assigned"))
        .catch(err => console.log(err));
      };


   

  return (

  <div className={style.TeamPage}>

<h2 className={style.PageTitle}>Delivery Team</h2>

<div className={style.TeamList}>

{/* Single Member Card */}
{deliveryTeam.map((member, index) => (
  <div key={member._id} className={style.TeamCard}>

  <div className={style.Profile}>

    <div>
      <h4>{member.deliverName}</h4>
      <p>Vechicle No.: {member.deliverVehicleNo}</p>
    </div>
  </div>

  <div className={style.Location}>
    <p>Place: {member.placeId ?.placeName ||"Unknown"}</p>
    <p>District: {member.placeId?.districtId?.districtName || "Unknown"}</p>
  </div>

    <button
    className={style.AssignBtn}
    onClick={() => handleassignDelivery(bookid, member._id)}>
    Assign Delivery
    </button>


</div>
))}

{/* map team here */}

</div>

</div>

  )
}

export default DeliveryTeamAssign