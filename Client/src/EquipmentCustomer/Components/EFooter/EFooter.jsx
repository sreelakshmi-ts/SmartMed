import React from 'react'
import style from './EFooter.module.css'



import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const quickLinks = ["Home", "Products", "Offers", "About Us"];
const categories = ["Medicines", "Surgical Equipment", "Assisting Devices"];
const supportLinks = ["Help Center", "Track Order", "Returns", "Contact"];

const EFooter = () => {
  return (
   <footer className={style.footer}>
      <div className={style.container}>

        {/* BRAND */}
        <div className={style.brand}>
          <div className={style.logo}>
            <span className={style.logoBlue}>Smart</span>
            <span className={style.logoWhite}>Med</span>
          </div>

          <p>
            SmartMed provides trusted medicines and medical equipment
            from certified suppliers with fast delivery and reliable support.
          </p>

          <div className={style.contact}>
            <div><PhoneIcon fontSize="small" /> +91 98765 43210</div>
            <div><MailIcon fontSize="small" /> support@smartmed.com</div>
            <div><LocationOnIcon fontSize="small" /> Kochi, Kerala, India</div>
          </div>

          <div className={style.socials}>
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <LinkedInIcon />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h4>Categories</h4>
          <ul>
            {categories.map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4>Support</h4>
          <ul>
            {supportLinks.map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className={style.bottom}>
        <p>© 2026 SmartMed. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default EFooter