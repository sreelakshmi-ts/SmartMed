import React from 'react'
import style from "./Dashboard.module.css";




import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";


const badges = [
  { icon: VerifiedUserIcon, title: "Certified Products", sub: "Verified suppliers" },
  { icon: LocalShippingIcon, title: "Fast Delivery", sub: "Quick dispatch" },
  { icon: AccessTimeIcon, title: "24/7 Support", sub: "Always available" },
];

import medicalsupply from "../../../assets/Landingpage/Langingpageimg1.png";
import { useNavigate } from 'react-router';




const categories = [
  {
    key: "medicine",
    title: "Medicines",
    subtitle: "Pharmacy Stock",
    description:
      "Prescription medicines, OTC drugs, vitamins and pharmacy essentials supplied from certified distributors.",
    count: "50,000+ Products",
    image: "/images/medicine.jpg",
    color: "#2563eb",
  },
  {
    key: "assist",
    title: "Assisting Equipment",
    subtitle: "Mobility & Home Care",
    description:
      "Wheelchairs, walkers, hospital beds and rehabilitation equipment.",
    count: "8,000+ Products",
    image: "/images/assist.jpg",
    color: "#0891b2",
  },
  {
    key: "surgical",
    title: "Surgical Equipment",
    subtitle: "Clinical Supplies",
    description:
      "Sterile surgical tools and operation theatre equipment.",
    count: "12,000+ Products",
    image: "/images/surgical.jpg",
    color: "#059669",
  },
];

// ------------------WHY Section------------------
// import teamImg from "../../assets/team.jpg";

const features = [
  {
    icon:  VerifiedUserIcon,
    title: "Certified Products",
    desc: "All medicines and equipment sourced from verified suppliers.",
  },
  {
    icon: LocalShippingIcon,
    title: "Fast Delivery",
    desc: "Quick dispatch and reliable delivery across locations.",
  },
  {
    icon: FavoriteIcon,
    title: "Trusted Care",
    desc: "Healthcare-focused service built around customer needs.",
  },
  {
    icon: EmojiEventsIcon,
    title: "Licensed Platform",
    desc: "Operating with proper healthcare compliance standards.",
  },
  {
    icon: AutorenewIcon,
    title: "Easy Returns",
    desc: "Simple and transparent return process for products.",
  },
  {
    icon: SupportAgentIcon,
    title: "24/7 Support",
    desc: "Our support team is always available to assist you.",
  },
];

const stats = [
  { value: "200K+", label: "Customers" },
  { value: "60K+", label: "Products" },
  { value: "15+", label: "Years Experience" },
  { value: "150+", label: "Staff Members" },
];



const Dashboard = () => {
    const navigate=useNavigate();
  const handleshopnow = async () => {
    navigate('/guest/login');
  }
  return (
    <>
  
    {/* ---------- HERO SECTION ---------- */}
    <section className={style.hero}>
      <div className={style.container}>

        <div className={style.left}>
          <span className={style.trustBadge}>
            <span className={style.dot}></span>
            Trusted by Pharmacies & Equipment Shops
          </span>

          <h1 className={style.title}>
            Smart Medical Supply
            <br />
            <span>For Pharmacy & Equipment Stores</span>
          </h1>

          <p className={style.desc}>
            Manage medicine stock, medical equipment and healthcare supplies
            from certified vendors — all in one powerful platform.
          </p>

          <div className={style.buttons}>
            <button className={style.primaryBtn} onClick={handleshopnow}>
              Shop Now <ArrowForwardIcon fontSize="small" />
            </button>
          </div>

          <div className={style.badges}>
            {badges.map(({ icon: Icon, title, sub }) => (
              <div key={title} className={style.badgeCard}>
                <Icon fontSize="small" />
                <div>
                  <p>{title}</p>
                  <small>{sub}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={style.right}>
          <div className={style.imageWrapper}>
            {/* add real image instead of '#' */}
            <img src={medicalsupply} alt="Medical Supply" />
          </div>
        </div>

      </div>
    </section>

    {/* ---------- CATEGORY SECTION ---------- */}
    <section className={style.section} id="categories">
      <div className={style.categoryContainer}>

        <div className={style.header}>
          <span className={style.badge}>Shop by Category</span>

          <h2>
            Everything You Need <span>for SmartMed Stores</span>
          </h2>

          <p>
            Pharmacy shops and medical equipment suppliers can manage and
            purchase all healthcare products from one platform.
          </p>
        </div>

        <div className={style.grid}>
          {categories.map((cat) => (
            <div key={cat.key} className={style.card}>
              <div className={style.imageBox}>
                <img src={cat.image} alt={cat.title} />

                <span
                  className={style.count}
                  style={{ background: cat.color }}
                >
                  {cat.count}
                </span>

                <div
                  className={style.overlay}
                  style={{
                    background: `linear-gradient(to top, ${cat.color}cc, transparent)`
                  }}
                />

                <div className={style.imageText}>
                  <small>{cat.subtitle}</small>
                  <h3>{cat.title}</h3>
                </div>
              </div>

              <div className={style.body}>
                <p>{cat.description}</p>

                <button
                  className={style.browseBtn}
                  style={{ background: cat.color }}
                >
                  Browse {cat.title}
                  <ArrowForwardIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

   {/* ================= OFFERS SECTION ================= */}

    <div className={style.offerHeader}>
      <h2>
        SmartMed <span>Exclusive Offers</span>
      </h2>
      <p>
        Save more on medicines and medical equipment with limited-time deals
        curated for pharmacies and healthcare providers.
      </p>
    </div>

<section className={style.offersSection}>


  {/* FLASH BAR */}
  <div className={style.flashBar}>
    <div className={style.flashLeft}>
      ⚡ SmartMed Mega Sale — Medicines & Medical Equipments up to 35% OFF!
    </div>

    <button className={style.flashBtn}>
      Shop Now <ArrowForwardIcon fontSize="small" />
    </button>
  </div>

  {/* OFFER GRID */}
  <div className={style.offerGrid}>

    {/* MEDICINE OFFER */}
    <div
      className={style.offerCard}
      style={{ backgroundImage: `` }}
    >
      <div className={style.overlayMedicine}></div>

      <div className={style.offerContent}>
        <span className={style.offerTag}>MEDICINE DEALS</span>

        <h3>Essential Medicines</h3>

        <p>
          Prescription drugs, OTC medicines, vitamins and pharmacy essentials
          at exclusive SmartMed prices.
        </p>

        <button className={style.offerBtn}>
          Shop Medicines <ArrowForwardIcon fontSize="small" />
        </button>
      </div>

      <div className={style.discountBadge}>25% OFF</div>
    </div>

    {/* SURGICAL EQUIPMENT */}
    <div
      className={style.offerCard}
      style={{ backgroundImage: `` }}
    >
      <div className={style.overlayBlue}></div>

      <div className={style.offerContent}>
        <span className={style.offerTag}>LIMITED OFFER</span>

        <h3>Surgical Instruments</h3>

        <p>
          Scalpels, forceps, sterile kits and professional operation theatre
          equipment.
        </p>

        <button className={style.offerBtn}>
          Shop Surgical <ArrowForwardIcon fontSize="small" />
        </button>
      </div>

      <div className={style.discountBadge}>35% OFF</div>
    </div>

    {/* ASSISTING EQUIPMENT */}
    <div
      className={style.offerCard}
      style={{ backgroundImage: `` }}
    >
      <div className={style.overlayGreen}></div>

      <div className={style.offerContent}>
        <span className={style.offerTag}>NEW ARRIVALS</span>

        <h3>Mobility & Assisting Aids</h3>

        <p>
          Wheelchairs, walkers and rehabilitation equipment designed for
          comfort and recovery.
        </p>

        <button className={style.offerBtn}>
          Explore Aids <ArrowForwardIcon fontSize="small" />
        </button>
      </div>

      <div className={style.newBadge}>NEW</div>
    </div>

  </div>
</section>
{/*========================= WHY SECTION================================================ */}
<section className={style.whySection}>
  <div className={style.whyContainer}>

        {/* HEADER */}
         <div className={style.whyHeader}>
          <h2>
            Why Choose <span>SmartMed</span>
          </h2>
          <p>
            Trusted healthcare marketplace delivering quality medicines
            and medical equipment with reliable service.
          </p>
        </div>

        {/* CONTENT */}
        <div className={style.whyContent}>

          {/* FEATURES */}
          <div className={style.whyFeatures}>
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={style.whyFeatureCard}>
                <Icon  className={style.whyIcon} />
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* IMAGE */}
          <div className={style.whyImageBox}>
            <img src='#' alt="SmartMed Team" />
          </div>

        </div>

        {/* STATS */}
        <div className={style.whyStats}>
          {stats.map((s) => (
            <div key={s.value}>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  </>
  )
}

export default Dashboard