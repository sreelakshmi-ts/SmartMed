import React from "react";
import style from "./Service.module.css";
import { useNavigate } from 'react-router';

/* MUI Icons */
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const Services = () => {
  const services = [
    {
      icon: <LocalPharmacyIcon fontSize="large" />,
      title: "Medicine Supply",
      desc: "SmartMed enables pharmacies to order medicines directly from trusted suppliers with real-time availability tracking."
    },
    {
      icon: <Inventory2Icon fontSize="large" />,
      title: "Inventory Management",
      desc: "Manage stock levels efficiently with automated inventory monitoring and low-stock alerts."
    },
    {
      icon: <LocalShippingIcon fontSize="large" />,
      title: "Delivery Coordination",
      desc: "Seamless coordination between inventory managers and delivery teams ensures fast and reliable delivery."
    },
    {
      icon: <VerifiedUserIcon fontSize="large" />,
      title: "Secure Verification",
      desc: "Customer and pharmacy verification system ensures safe and authorized medicine distribution."
    },
    {
      icon: <AnalyticsIcon fontSize="large" />,
      title: "Smart Analytics",
      desc: "Gain insights into orders, sales, and inventory performance through intelligent dashboards."
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: "24/7 Support",
      desc: "Dedicated support system helps users resolve issues quickly and maintain smooth operations."
    }
  ];
      const navigate=useNavigate();
    const handleshopnow = async () => {
      navigate('/guest/login');
    }

  return (
    <div className={style.servicesPage}>

      {/* HERO */}
      <div className={style.hero}>
        <h1>SmartMed Services</h1>
        <p>
          SmartMed provides a complete digital solution for medicine and
          medical equipment supply chain management.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className={style.serviceContainer}>
        {services.map((service, index) => (
          <div key={index} className={style.card}>
            <div className={style.icon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className={style.cta}>
        <h2>Transform Your Medical Supply Management</h2>
        <p>
          Join SmartMed today and experience faster ordering, smarter inventory,
          and efficient delivery management.
        </p>
        <button onClick={handleshopnow}>Get Started</button>
      </div>

    </div>
  );
};

export default Services;