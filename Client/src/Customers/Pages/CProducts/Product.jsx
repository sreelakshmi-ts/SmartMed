import React, { useState } from 'react'
import sty from './Product.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddShoppingCart, FavoriteBorderOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useEffect } from 'react';
import { styled } from "@mui/material/styles";
import { Link } from 'react-router';


const Product = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [expanded, setExpanded] = useState(null);
    const [expandedId, setExpandedId] = useState(null);
    const[medicine,setMedicine]=useState([]);

        const ExpandMoreButton = styled(IconButton, {
        shouldForwardProp: (prop) => prop !== "expand",
      })(({ expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        transition: "transform 0.3s ease",
      }));

      const handleExpandClick = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
      };


     const getMedicine=() =>{
        axios.get(`http://localhost:5000/Medicine`)
        .then(res => setMedicine(res.data.medicine))
        .catch(console.error);
    };

    useEffect(() =>{
      getMedicine();
    },[])


  return (
                <div>
                    <div className={sty.productPage}>
                  <h2>Search Medicines</h2>
                  <p className={sty.subtitle}>
                    Find medicines by name, brand, or composition
                  </p>

                  <div className={sty.searchBox}>
                    <SearchIcon className={sty.searchIcon} />
                    <input
                      type="text"
                      placeholder="Search medicines..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Search results placeholder */}
                  <div className={sty.results}>
                    {searchTerm && (
                      <p>
                        Showing results for <strong>"{searchTerm}"</strong>
                      </p>
                    )}
                  </div>
                  <div className={sty.cardsContainer}>
                  {medicine.map((data) => (
                    <div className={sty.productcard} key={data._id}>
                      <Card className={sty.pcards}>
              <CardHeader
                title={data.medicineName}
                subheader={data.brandId?.brandName || "Unknown"}
              />

              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:5000${data.medicinePhoto}`}
                alt={data.medicineName}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Price:{" "}
                  <Box
                    component="span"
                    sx={{ color: "#16a34a", fontWeight: 700, fontSize: "18px" }}
                  >
                    ₹{data.medicinePrice}
                  </Box>{" "}
                  / strip
                </Typography>
              </CardContent>

              <CardActions className={sty.cardFooter}>
                <IconButton>
                  <AddShoppingCart />
                </IconButton>

                <IconButton>
                  <FavoriteBorderOutlined />
                </IconButton>

                <Link to={`/customer/cproductsView/${data._id}`} className={sty.viewDetailsBtn}>
                  View Details
                </Link>
              </CardActions>
            </Card>

        </div>
      ))}
    </div>
    </div>

 





    </div>
  )
}

export default Product