import React from "react";
import style from "./About.module.css";
import medicinequi from "../../../assets/Aboutpage/SmartmedAbout.png"

const About = () => {
  return (
    <div className={style.aboutPage}>

      {/* HERO SECTION */}
      <section className={style.hero}>
        <h1>About SmartMed</h1>
        <p>
          SmartMed is a digital platform designed to simplify medicine
          distribution and medical equipment supply between manufacturers,
          distributors, and pharmacies through a secure and efficient system.
        </p>
      </section>

      {/* ABOUT CONTENT */}
      <section className={style.aboutContent}>
        <div className={style.text}>
          <h2>Who We Are</h2>
          <p>
            SmartMed is a modern pharmaceutical supply chain management system
            developed to streamline the ordering, inventory tracking, and
            delivery of medicines and medical equipment. Our platform connects
            pharmacies, representatives, inventory managers, manufacturers,
            and delivery teams in one integrated ecosystem.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to digitize and optimize the healthcare supply chain
            by providing real-time inventory visibility, faster order
            processing, and transparent communication between all stakeholders.
          </p>

          <h2>Our Vision</h2>
          <p>
            To become a reliable and intelligent healthcare logistics platform
            that ensures medicines reach medical stores efficiently, safely,
            and on time.
          </p>
        </div>

        <div className={style.imageBox}>
          <img
            src={medicinequi}
            alt="Medical supply"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className={style.features}>
        <h2>Why Choose SmartMed?</h2>

        <div className={style.featureGrid}>
          <div className={style.card}>
            <h3>📦 Smart Inventory</h3>
            <p>
              Real-time stock monitoring helps prevent shortages and ensures
              smooth medicine availability.
            </p>
          </div>

          <div className={style.card}>
            <h3>🚚 Fast Delivery</h3>
            <p>
              Efficient delivery coordination between inventory managers and
              delivery teams.
            </p>
          </div>

          <div className={style.card}>
            <h3>🔐 Secure Platform</h3>
            <p>
              Role-based authentication ensures secure access for every user.
            </p>
          </div>

          <div className={style.card}>
            <h3>📊 Easy Management</h3>
            <p>
              Simplified order tracking, approval systems, and communication
              tools for better workflow.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <section className={style.footer}>
        <h2>SmartMed</h2>
        <p>
          Empowering healthcare supply chains with smart technology and
          seamless connectivity.
        </p>
      </section>

    </div>
  );
};

export default About;