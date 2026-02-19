import React from 'react'
import style from './ComplaintReplay.module.css'

const ComplaintReplay = () => {
  return (
     <div className={style.page}>
      <div className={style.card}>
        <h2>Reply to Complaint</h2>
        <p className={style.subtitle}>
          Review the complaint details and send a response to the customer
        </p>

        {/* Complaint details */}
        <div className={style.section}>
          <label>Complaint Title</label>
          <div className={style.readonly}>
            {/* Title from complaint view */}
          </div>
        </div>

        <div className={style.section}>
          <label>Complaint Content</label>
          <div className={style.readonly}>
            {/* Complaint content from view */}
          </div>
        </div>

        {/* Reply */}
        <div className={style.section}>
          <label>Your Reply</label>
          <textarea
            rows="4"
            placeholder="Type your response here..."
            className={style.textarea}
          />
        </div>

        {/* Actions */}
        <div className={style.actions}>
          <button className={style.send}>Send Reply</button>
          <button className={style.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ComplaintReplay