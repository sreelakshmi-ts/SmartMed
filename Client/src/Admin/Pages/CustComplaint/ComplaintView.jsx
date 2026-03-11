import React from 'react'
import style from './ComplaintView.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const ComplaintView = () => {
  const[complaints, setComplaints] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/AllMedicineComplaints')
    .then(res => setComplaints(res.data.complaints))
    .catch(err => console.error(err));
  }, []);
  

  const handleReply = (complaintId) => {
    navigate(`/admin/complaintreplay/${complaintId}`);
  }

  return (
    <div>
          <div className={style.page}>
      <div className={style.card}>
        <h2>Medicine Customer Complaints</h2>
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

export default ComplaintView