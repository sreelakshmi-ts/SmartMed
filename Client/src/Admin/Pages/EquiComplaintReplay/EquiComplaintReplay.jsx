import React from 'react'
import style from './EquiComplaintReplay.module.css'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const EquiComplaintReplay = () => {
    const[complaint, setComplaint] = useState(null);
    const { id }=useParams();
    const[reply,setReply]=useState('');
    const navigate = useNavigate();

    useEffect(() =>{
      axios.get(`http://localhost:5000/EquipmentComplaintDetail/${id}`)
      .then(res => setComplaint(res.data.complaintDetails))
      .catch(err => console.error(err));
    },[id]);
      if (!complaint) return <p>Loading...</p>;

    const handleSubmit = (e) => {
      e.preventDefault();
      const data={
        complaintReply: reply,
        complaintStatus: "Resolved"
      }

      axios.put(`http://localhost:5000/EquipmentComplaintReply/${id}`,data)
      .then(res => {
        alert("Reply sent successfully");
        setReply('');
      })
      .catch(err => console.error(err));
      navigate('/admin/equiComplaintView');
    };

  return (
     <div className={style.page}>
          <div className={style.card}>
            <h2>Reply to Complaint</h2>
            <p className={style.subtitle}>
              Review the complaint details and send a response to the Equipment customer
            </p>
    
            {/* Complaint details */}
            <div className={style.section}>
              <label>Complaint Title</label>
              <div className={style.readonly}>
                {complaint.complaintTitle}
              </div>
            </div>
    
            <div className={style.section}>
              <label>Complaint Content</label>
              <div className={style.readonly}>
                {complaint.complaintContent}
              </div>
            </div>
    
            {/* Reply */}
            <div className={style.section}>
              <label>Your Reply</label>
              <textarea
                rows="4"
                placeholder="Type your response here..."
                className={style.textarea}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </div>
    
            {/* Actions */}
            <div className={style.actions}>
              <button className={style.send} onClick={handleSubmit}>Send Reply</button>
              <button className={style.cancel}>Cancel</button>
            </div>
          </div>
        </div>
  )
}

export default EquiComplaintReplay