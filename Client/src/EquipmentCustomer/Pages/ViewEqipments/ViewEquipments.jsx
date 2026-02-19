import React, {  useState } from 'react'
import sty from './ViewEquipments.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddShoppingCart, FavoriteBorderOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useEffect } from 'react';
import { styled } from "@mui/material/styles";
import { Link } from 'react-router';


const ViewEquipments = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [expanded, setExpanded] = useState(null);
        const [expandedId, setExpandedId] = useState(null);
        const[equipment,setEquipment]=useState([]);

     const getEquipment=() =>{
        axios.get(`http://localhost:5000/ViewEquipment`)
        .then(res => setEquipment(res.data.equipment))
        .catch(console.error);
    }

    useEffect(() =>{
        getEquipment();
    },[]);

//-------------Expandable Card Logic----------------
    const ExpandMoreButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "expand",
    })(({ expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    transition: "transform 0.3s ease",
    }));

    const handleExpandClick = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
    };


  return (
     <div>
                    <div className={sty.productPage}>
                  <h2>Search Equipments</h2>
                  <p className={sty.subtitle}>
                    Find equipments by name, brand, or category
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
                  {equipment.map((data) => (
                    <div className={sty.productcard} key={data._id}>
                      <Card className={sty.pcards}>
              <CardHeader
                title={data.equipmentName}
                subheader={data.brandId?.brandName || "Unknown"}
              />

              <CardMedia
                component="img"
              
                image={`http://localhost:5000${data.equipmentPhoto}`}
                alt={data.equipmentName}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Price:{" "}
                  <Box
                    component="span"
                    sx={{ color: "#16a34a", fontWeight: 700, fontSize: "18px" }}
                  >
                    ₹{data.equipmentPrice}
                  </Box>{" "}
                  
                </Typography>
              </CardContent>

              <CardActions className={sty.cardFooter}>
                <IconButton>
                  <AddShoppingCart />
                </IconButton>

                <IconButton>
                  <FavoriteBorderOutlined />
                </IconButton>

                <Link to={`/equipmentCustomer/equipmentDetailView/${data._id}`}  className={sty.viewDetailsBtn}>
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

export default ViewEquipments