import React from 'react'
import style from './ComplaintView.module.css'

const ComplaintView = () => {
  return (
    <div>
          <div className={style.page}>
      <div className={style.card}>
        <h2>Customer Complaints</h2>
        <p className={style.subtitle}>
          View and respond to customer complaints
        </p>

        <table className={style.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Title</th>
              <th>Complaint</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Complaints will be mapped here */}
            <tr>
              <td colSpan="6" className={style.empty}>
                No complaints available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default ComplaintView