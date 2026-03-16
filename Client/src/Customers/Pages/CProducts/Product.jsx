import React, { useState, useEffect } from 'react'
import sty from './Product.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { AddShoppingCart, FavoriteBorderOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router';

const Product = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [medicine, setMedicine] = useState([]);

  const getMedicine = () => {
    axios.get(`http://localhost:5000/customerMedicinesView`)
      .then(res => setMedicine(res.data.medicine))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getMedicine();
  }, []);

  // Filter medicines based on search
  const filteredMedicines = medicine.filter((item) =>
    item.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brandId?.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className={sty.productPage}>

        <h2>Search Medicines</h2>
        <p className={sty.subtitle}>
          Find medicines by name, brand, or composition
        </p>

        {/* Search Box */}
        <div className={sty.searchBox}>
          <SearchIcon className={sty.searchIcon} />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Result Text */}
        <div className={sty.results}>
          {searchTerm && (
            <p>
              Showing results for <strong>"{searchTerm}"</strong>
            </p>
          )}
        </div>

        {/* Medicine Cards */}
        <div className={sty.cardsContainer}>
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((data) => (
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
                            {data.stockStatus !== "AVAILABLE" && (
                        <Typography
                          sx={{
                            color:
                              data.stockStatus === "OUT_OF_STOCK" ? "red" : "orange",
                            fontWeight: "bold",
                            mt: 1
                          }}
                        >
                          {data.stockStatus === "OUT_OF_STOCK"
                            ? "Out of Stock"
                            : "Limited Stock"}
                        </Typography>
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
                        ₹{data.medicinePrice}
                      </Box> / strip
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
                      to={`/customer/cproductsView/${data._id}`}
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
               No medicines found
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Product