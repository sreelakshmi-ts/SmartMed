import React, { useEffect, useState } from 'react'
import style from './Ccomplaintes.module.css'
import axios from 'axios';

const CComplaints = () => {
  const [title, setTitle] = useState("");
  const [complaint, setComplaint] = useState("");
  const customerId = sessionStorage.getItem("cid");
  const[complaints,setComplaints]=useState([]);

//-------------- Handle Complaint Submission -------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const complaintData = {
      customerId: customerId,
      complaintTitle: title,
      complaintContent: complaint,
    };
   axios.post('http://localhost:5000/MedicineCustomerComplaint', complaintData)
    .then(res => {
      alert("Complaint submitted successfully!");
      setTitle("");
      setComplaint("");
      getComplaints(); 
    })
    .catch(err => {
      alert("Error submitting complaint.");
      console.error(err);
    });
  };

  //-----------------Get Complaints List -------------------
const getComplaints = () => {
  axios.get(`http://localhost:5000/MedicineCustomerComplaints/${customerId}`)
    .then(res => setComplaints(res.data.complaints || []))
    .catch(err => console.error(err));
};
  useEffect(() => {
    getComplaints();
  }, [customerId]);

  return (
    <div className={style.complaintPage}>
      {/* Complaint Form */}
      <div className={style.card}>
        <h2>Raise a Complaint</h2>
        <p className={style.subtitle}>
          Submit your issue. Our support team will respond shortly.
        </p>

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.field}>
            <label>Complaint Title</label>
            <input
              type="text"
              placeholder="Enter complaint title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={style.field}>
            <label>Complaint Details</label>
            <textarea
              rows="4"
              placeholder="Describe your issue..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
            />
          </div>

          <div className={style.actions}>
            <button type="submit" className={style.submit} onClick={handleSubmit}>
              Submit
            </button>
            <button
              type="button"
              className={style.cancel}
              onClick={() => {
                setTitle("");
                setComplaint("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Complaint List (Design Only) */}
      <div className={style.listCard}>
        <h3>My Complaints</h3>

        <table className={style.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Complaint</th>
              <th>Reply</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((comp, index) => (
              <tr key={comp._id}>
                <td>{index + 1}</td>
                <td>{comp.complaintTitle}</td>
                <td>{comp.complaintContent}</td>
                <td>{comp.complaintReply || "Not replied yet"}</td>
                <td>
                  <span
                    className={
                      comp.complaintStatus === "Resolved"
                        ? style.resolved
                        : style.pending
                    }
                  >
                    {comp.complaintStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CComplaints