import React, { use } from 'react'
import style from './EquipmentComplaintView.module.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const EquipmentComplaintView = () => {
    const[complaints, setComplaints] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5000/AllEquipmentComplaints')
        .then(res => setComplaints(res.data.complaints))
        .catch(err => console.error(err));
      }, []);

  const handleReply = (complaintId) => {
    navigate(`/admin/equiComplaintReplay/${complaintId}`);
  }

  return (
     <div>
              <div className={style.page}>
          <div className={style.card}>
            <h2>Equipment Customer Complaints</h2>
            <p className={style.subtitle}>
              View and respond to customer complaints
            </p>
    
            <table className={style.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Store</th>
                  <th>Complaint Date</th>
                  <th>Title</th>
                  <th>Complaint</th>
                  <th>Action</th>
                </tr>
              </thead>
    
              <tbody>
               {complaints.map((complaint, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{complaint.customerStoreName}</td>
                  <td>{new Date(complaint.complaintDate).toLocaleDateString()}</td>
                  <td>{complaint.complaintTitle}</td>
                  <td>{complaint.complaintContent}</td>
                  <td>
                  <button
                    className={
                      complaint.complaintStatus === "Resolved"
                        ? style.resolvedBtn
                        : style.btn
                    }
                    onClick={() => handleReply(complaint._id)}
                    disabled={complaint.complaintStatus === "Resolved"}
                  >
                    {complaint.complaintStatus === "Resolved" ? "Resolved" : "Reply"}
                  </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
  )
}

export default EquipmentComplaintView