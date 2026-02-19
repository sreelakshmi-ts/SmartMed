import React, { useState } from 'react'
import style from './Ccomplaintes.module.css'

const CComplaints = () => {
    const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
   const handleSubmit = (e) => {
    e.preventDefault();
    // API call later
  };
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className={style.actions}>
            <button type="submit" className={style.submit}>
              Submit
            </button>
            <button
              type="button"
              className={style.cancel}
              onClick={() => {
                setTitle("");
                setMessage("");
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
            {/* Data will be mapped here later */}
            <tr>
              <td colSpan="5" className={style.empty}>
                No complaints submitted yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CComplaints