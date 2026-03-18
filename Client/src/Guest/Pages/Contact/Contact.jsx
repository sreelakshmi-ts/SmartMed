import React, { useState } from "react";
import style from "./Contact.module.css";
import axios from "axios";

const Contact = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5000/contact", form);

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: ""
    });

  } catch (error) {
    console.log(error);
    alert("Failed to send message");
    setForm("")
  }
};

  return (
    <div className={style.contactPage}>

      {/* HEADER */}
      <div className={style.header}>
        <h1>Contact SmartMed</h1>
        <p>We are here to support your healthcare distribution needs.</p>
      </div>

      <div className={style.container}>

        {/* LEFT INFO */}
        <div className={style.contactInfo}>
          <h2>Get in Touch</h2>

          <p>
            SmartMed helps medical distributors, pharmacies, and equipment
            suppliers manage inventory and orders efficiently.
          </p>

          <div className={style.infoBox}>
            <h4>Email</h4>
            <p>smartMed26@gmail.com</p>
          </div>

          <div className={style.infoBox}>
            <h4>Support Hours</h4>
            <p>Monday – Saturday</p>
            <p>9:00 AM – 6:00 PM</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <form className={style.form} onSubmit={handleSubmit}>
          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>

      </div>
    </div>
  );
};

export default Contact;