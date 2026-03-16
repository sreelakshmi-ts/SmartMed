
import React, { useState, useEffect } from 'react'
import sty from './ViewEquipments.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { AddShoppingCart, FavoriteBorderOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router';

const ViewEquipments = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [equipment, setEquipment] = useState([]);

  const getEquipment = () => {
    axios.get(`http://localhost:5000/customerEquipmentView`)
      .then(res => setEquipment(res.data.equipment))
      .catch(console.error);
  }

  useEffect(() => {
    getEquipment();
  }, []);

  //  Filter equipment based on search
  const filteredEquipment = equipment.filter((item) =>
    item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brandId?.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className={sty.productPage}>

        <h2>Search Equipments</h2>
        <p className={sty.subtitle}>
          Find equipments by name, brand, or category
        </p>

        {/* Search Box */}
        <div className={sty.searchBox}>
          <SearchIcon className={sty.searchIcon} />
          <input
            type="text"
            placeholder="Search equipments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Search results */}
        <div className={sty.results}>
          {searchTerm && (
            <p>
              Showing results for <strong>"{searchTerm}"</strong>
            </p>
          )}
        </div>

        {/* Equipment Cards */}
        <div className={sty.cardsContainer}>
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((data) => (
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
                    {data.stockStatus === "OUT_OF_STOCK" && (
                          <Typography color="error">Out of Stock</Typography>
                        )}

                        {data.stockStatus === "LIMITED" && (
                          <Typography color="orange">Limited Stock</Typography>
                        )}
                    <Typography variant="body2" color="text.secondary">
                      Price:
                      <Box
                        component="span"
                        sx={{
                          color: "#16a34a",
                          fontWeight: 700,
                          fontSize: "18px",
                          marginLeft: "6px"
                        }}
                      >
                        ₹{data.equipmentPrice}
                      </Box>
                    </Typography>
                  </CardContent>

                  <CardActions className={sty.cardFooter}>

                    <IconButton>
                      <AddShoppingCart />
                    </IconButton>

                    <IconButton>
                      <FavoriteBorderOutlined />
                    </IconButton>

                    <Link
                      to={`/equipmentCustomer/equipmentDetailView/${data._id}`}
                      className={sty.viewDetailsBtn}
                    >
                      View Details
                    </Link>

                  </CardActions>

                </Card>

              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No equipment found
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default ViewEquipments