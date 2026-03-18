const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const { status } = require("init");
const { type } = require("os");
const { ref } = require("process");
const port = 5000;
const mailer = require('nodemailer');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.listen(port, () => {
    try {
        console.log(`Server is running ${port}`);
        mongoose.connect(
            "mongodb+srv://sreelakshmits:sreelakshmits@cluster0.hsk4yoa.mongodb.net/db_smartmed"
        );
        console.log("db connection established");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});



var transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "smartmed26@gmail.com", //from email Id
        pass: "zgryidvxpwrnwhxe", // App password created from google account
    },
});
function sendEmail(to, content) {
    const mailOptions = {
        from: "smartmed26@gmail.com", //from email Id for recipient can view
        to,
        subject: "Verification",
        html: content,

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sented");
        }
    });
}

//------Contact form email message---------
function sendContactEmail(name, email, message) {

    const mailOptions = {
        from: "smartmed26@gmail.com",   // sender (your system)
        to: "smartmed26@gmail.com",     // receiver (admin inbox)
        subject: "New Contact Message - SmartMed",

        html: `
            <h2>New Message from SmartMed Website</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>

            <h3>Message:</h3>
            <p>${message}</p>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Contact email sent successfully");
        }
    });
}

//------------File Upload----------------

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "./public/uploads";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });




const districtSchemaStructure = new mongoose.Schema({
    districtName: {
        type: String,
        required: true,
    }
});
const District = mongoose.model("districtCollection", districtSchemaStructure);

app.post("/District", async (req, res) => {
    try {
        const { districtName } = req.body;

        let district = await District.findOne({ districtName });
               if (district) {
            return res.status(400).json({ message: "District already exists" });
        }
        district = new District({
            districtName
        });

        await district.save();

        res.json({ message: "District inserted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
//---------------------------District Get-----------------------------------
app.get("/District", async (req, res) => {
    try {
        const district = await District.find();
        if (district.length === 0) {
            return res.send({ message: "Districts not found", district: [] });
        } else {
            res.status(200).json({ district });
        }
    } catch (err) {
        console.error("Error finiding district:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// -------------------------------District Delete------------------------------------------
app.delete("/District/:id", async (req, res) => {
    try {
        const districtId = req.params.id;
        const deletedDistrict = await District.findByIdAndDelete(districtId);

        if (!deletedDistrict) {
            return res.json({ message: "District not found" });
        } else {
            res.json({ message: "District deleted successfully", deletedDistrict });
        }
    } catch (err) {
        console.error("Error deleting district:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
//-------------------Edit District-------------------------------------------
app.put("/District/:id", async (req, res) => {
    try {
        const districtId = req.params.id;


        const { districtName } = req.body;

        let district = await District.findByIdAndUpdate(districtId, { districtName }, { new: true });

        if (!district) {
            return res.json({ message: "District not found" });
        } else {
            res.json({ message: "District updated", district });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//Place
const placeSchemaStructure = new mongoose.Schema({
    placeName: {
        type: String,
        required: true
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "districtCollection",
        required: true
    }
});

const Place = mongoose.model("placeCollection", placeSchemaStructure);
//----------------------------POST Place----------------------------------

app.post("/Place", async (req, res) => {
    try {
        const { placeName, districtId } = req.body;

        let place = await Place.findOne({ placeName });

        if (place) {
            return res.json({ message: "Place already exists" });
        }

        place = new Place({
            placeName,
            districtId
        });

        await place.save();

        res.json({ message: "Place inserted succesfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//-----------------------place get-------------------------------------------
app.get("/Place", async (req, res) => {
    try {
        const place = await Place.find().populate("districtId");

        if (place.length === 0) {
            return res.send({ message: "place not found", place: [] });
        } else {
            res.send({ place }).status(200);
        }
    } catch (err) {
        console.error("Error finding place:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
//-------------------------------Delete Place----------------------------------
app.delete("/Place/:id", async (req, res) => {

    try {
        const placeId = req.params.id;
        const deletedPlace = await Place.findByIdAndDelete(placeId);

        if (!deletedPlace) {
            return res.json({ message: "Place not found" });
        } else {
            res.json({ message: "Place deleted successfully", deletedPlace });
        }
    }
    catch (err) {
        console.error("Error deleting place:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});

//-------------------------Edit Place----------------------------------------------
app.put("/Place/:id", async (req, res) => {
    try {
        const placeId = req.params.id;
        const { placeName, districtId } = req.body;

        const updatedPlace = await Place.findByIdAndUpdate(
            placeId,
            { placeName, districtId },
            { new: true }
        );

        if (!updatedPlace) {
            return res.json({ message: "Place not found" });
        }

        res.json({ message: "Place updated successfully", place: updatedPlace });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


//---------------------------category-----------------------------------------------

const categorySchemaStructure = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    }
});
const Category = mongoose.model("categoryCollection", categorySchemaStructure);

app.post("/Category", async (req, res) => {
    try {
        const { categoryName } = req.body;
        let category = await Category.findOne({ categoryName })
        if (category) {
            return res.status(400).json({ message: "Category already exists" });
        }
        category = new Category({
            categoryName
        });
        await category.save();
        res.json({ message: "Category inserted successfully" })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//----------------------------------Get Category-------------------------------------------

app.get("/Category", async (req, res) => {
    try {
        const category = await Category.find();
        if (category.length === 0) {
            return res.send({ message: "Category not found", category: [] });
        } else {
            res.send({ category }).status(200);
        }

    }
    catch (err) {
        console.error("Error finiding category:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});

//------------------------------------Delete Category------------------------------------------

app.delete("/Category/:id", async (req, res) => {

    try {
        const categoryId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.json({ message: "Category not found" });
        } else {
            res.json({ message: "Category deleted successfully", deletedCategory });
        }
    }
    catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});

//-------------------------------Edit category(put)--------------------------------------------
app.put("/Category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { categoryName } = req.body;

        let category = await Category.findByIdAndUpdate(categoryId, { categoryName }, { new: true });

        if (!category) {
            return res.json({ message: "Category not found" });
        } else {
            res.json({ message: "Category updated", category });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


//----------Equipment Category------------------------
const equipmentcategorySchemaStructure = new mongoose.Schema({
    equcategoryName: {
        type: String,
        required: true,
    }
});
const Equipmentcate = mongoose.model("equipmentcategoryCollection", equipmentcategorySchemaStructure);

//---------------------POST Equipment------------------------------------------
app.post("/Equipmentcate", async (req, res) => {
    try {
        const { equcategoryName } = req.body;
        let equcategory = await Category.findOne({ equcategoryName })
        if (equcategory) {
            return res.status(400).json({ message: "Equipment Category already exists" });
        }
        equcategory = new Equipmentcate({
            equcategoryName
        });
        await equcategory.save();
        res.json({ message: "Equipment Category inserted successfully" })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//------------------------GET Equipment----------------------------------------------
app.get("/Equipmentcate", async (req, res) => {
    try {
        const equcategory = await Equipmentcate.find();
        if (equcategory.length === 0) {
            return res.send({ message: "Equipment Category not found", equcategory: [] });
        } else {
            res.send({ equcategory }).status(200);
        }

    }
    catch (err) {
        console.error("Error finiding category:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});

//-------------------------------------------DELETE Equipment Category--------------------------------------------

app.delete("/Equipmentcate/:id", async (req, res) => {

    try {
        const equicategoryId = req.params.id;
        const deletedEquiCategory = await Equipmentcate.findByIdAndDelete(equicategoryId);

        if (!deletedEquiCategory) {
            return res.json({ message: "Equipment Category not found" });
        } else {
            res.json({ message: "Equipment Category deleted successfully", deletedEquiCategory });
        }
    }
    catch (err) {
        console.error("Error deleting Equipment category:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});

//--------------------------------------PUT Equipment-----------------------------------------
app.put("/Equipmentcate/:id", async (req, res) => {
    try {
        const equicategoryId = req.params.id;
        const { equcategoryName } = req.body;

        let equcategory = await Equipmentcate.findByIdAndUpdate(equicategoryId, { equcategoryName }, { new: true });

        if (!equcategory) {
            return res.json({ message: "Equipment Category not found" });
        } else {
            res.json({ message: "Equipment Category updated", equcategory });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


//--------------------------Brand----------------------------------------
const brandSchemaStructure = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
    }
});
const Brand = mongoose.model("brandCollection", brandSchemaStructure);
//-----------------------------------Post Brand-------------------------------

app.post("/Brand", async (req, res) => {

    try {
        const { brandName } = req.body;
        let brand = await Brand.findOne({ brandName })
        if (brand) {
            return res.status(400).json({ message: "Brand already exists" });
        }
        brand = new Brand({
            brandName
        });
        await brand.save();
        res.json({ message: "Brand inserted successfully" })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//------------------------------Get Brand-----------------------------------------

app.get("/Brand", async (req, res) => {
    try {
        const brand = await Brand.find();

        if (brand.length === 0) {
            return res.send({ message: "Brand not found", brand: [] });
        } else {
            res.send({ brand }).status(200);
        }

    }
    catch (err) {
        console.error("Error finiding brand:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});

//--------------------------------Delete Brand------------------------------------

app.delete("/Brand/:id", async (req, res) => {

    try {
        const brandId = req.params.id;
        const deletedBrand = await Brand.findByIdAndDelete(brandId);


        if (!deletedBrand) {
            return res.json({ message: "Brand not found" });
        } else {
            res.json({ message: "Brand deleted successfully", deletedBrand });
        }
    }
    catch (err) {
        console.error("Error deleting brand:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});
//-----------------------Edit Brand(PUT)---------------------

app.put("/Brand/:id", async (req, res) => {
    try {
        const brandId = req.params.id;
        const { brandName } = req.body;

        let brand = await Brand.findByIdAndUpdate(brandId, { brandName }, { new: true });

        if (!brand) {
            return res.json({ message: "Brand not found" });
        } else {
            res.json({ message: "Brand updated", brand });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//------------------Type--------------------------------
const typeSchemaStructure = new mongoose.Schema({
    typeName: {
        type: String,
        required: true,
    }
});
const Type = mongoose.model("typeCollection", typeSchemaStructure);
//--------------------------post Type------------------------------------------
app.post("/Type", async (req, res) => {

    try {
        const { typeName } = req.body;
        let type = await Type.findOne({ typeName })
        if (type) {
        return res.status(400).json({ message: "Type already exists" });
        }
        type = new Type({
            typeName
        });
        await type.save();
        res.json({ message: "Type inserted successfully" })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


//----------------------------------Get Type-------------------------------------
app.get("/Type", async (req, res) => {
    try {
        const type = await Type.find();

        if (type.length === 0) {
            return res.send({ message: "Type not found", type: [] });
        } else {
            res.send({ type }).status(200);
        }

    }
    catch (err) {
        console.error("Error finiding type:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});
//--------------------Delete Type ---------------------------------------------
app.delete("/Type/:id", async (req, res) => {

    try {
        const typeId = req.params.id;
        const deletedType = await Type.findByIdAndDelete(typeId);

        if (!deletedType) {
            return res.json({ message: "Type not found" });
        } else {
            res.json({ message: "Type deleted successfully", deletedType });
        }
    }
    catch (err) {
        console.error("Error deleting type:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});


//-----------------------------------Edit Type(PUT)-------------------------------------
app.put("/Type/:id", async (req, res) => {
    try {
        const typeId = req.params.id;
        const { typeName } = req.body;

        let type = await Type.findByIdAndUpdate(typeId, { typeName }, { new: true });

        if (!type) {
            return res.json({ message: "Type not found" });
        } else {
            res.json({ message: "Type updated", type });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


//-----------------------Customer------------------------------
const customerSchemaStructure = new mongoose.Schema({
    customerStoreName: {
        type: String,
        required: true,
    },
    customerStoreRegNo: {
        type: String,
        required: true,
    },

    DrugLicence: {
        type: String,
        required: true,

    },

    ownerName: {
        type: String,
        required: true,
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "placeCollection",
        required: true
    },

    customerAddress: {
        type: String,
        required: true,
    },



    customerContact: {
        type: String,
        required: true,

    },

    customerEmail: {
        type: String,
        required: true,

    },

    customerPassword: {
        type: String,
        required: true,
    },

    customerStatus: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"

    }


});
const Customer = mongoose.model("customerCollection", customerSchemaStructure);

//------------------------Post Customer-----------------------------------------
app.post("/Customer", upload.single("DrugLicence"), async (req, res) => {
    try {


        const { customerStoreName, customerStoreRegNo, ownerName, customerAddress, placeId,
            customerContact, customerEmail, customerPassword } = req.body;
        const DrugLicence = req.file ? `/uploads/${req.file.filename}` : "";

        await Customer.create({
            customerStoreName, customerStoreRegNo, DrugLicence, ownerName, customerAddress, placeId,
            customerContact, customerEmail, customerPassword
        });
        res.json({ message: "Customer Registration successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

});
//----------Get customer email check-------------------
app.post("/MedCustomerCheckEmail", async (req, res) => {
    try {
        const { customerEmail } = req.body;

        if (!customerEmail) {
            return res.status(400).json({ message: "Email required" });
        }


        const admin = await Admin.findOne({ adminEmail: customerEmail });
        const representative = await Representative.findOne({ representativeEmail: customerEmail });
        const inventory = await InManager.findOne({ inventoryEmail: customerEmail });
        const delivery = await Delivery.findOne({ deliveryEmail: customerEmail });
        const equipmentCustomer = await EquipmentCustomer.findOne({ customerEmail: customerEmail });
        const medicineCustomer = await Customer.findOne({ customerEmail: customerEmail });

        if (
            admin ||
            representative ||
            inventory ||
            delivery ||
            equipmentCustomer ||
            medicineCustomer
        ) {
            return res.json({
                exists: true,
                message: "Email already registered"
            });
        }

        res.json({
            exists: false,
            message: "Email available"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//------------------------GET Customer----------------------------------

app.get("/Customer", async (req, res) => {
    try {

        const customer = await Customer.find()
            .populate({
                path: "placeId",
                populate: {
                    path: "districtId"
                }
            });

        res.json({ customer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//----------------------------Get Customer (Profile)-------------------------------------

app.get("/Customer/:id", async (req, res) => {
    try {

        const data = await Customer.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },

            {
                $lookup: {
                    from: "placecollections",
                    localField: "placeId",
                    foreignField: "_id",
                    as: "place"
                }
            },

            {
                $unwind: "$place",


            },
            {
                $lookup: {
                    from: "districtcollections",
                    localField: "place.districtId",
                    foreignField: "_id",
                    as: "district"

                }
            },
            {
                $unwind: "$district",

            },
            {
                $project: {
                    customerId: "$_id",
                    customerStoreName: 1,
                    customerStoreRegNo: 1,
                    DrugLicence: 1,
                    ownerName: 1,
                    placeId: "$place._id",
                    placeName: "$place.placeName",
                    districtId: "$district._id",
                    districtName: "$district.districtName",
                    customerAddress: 1,
                    customerContact: 1,
                    customerEmail: 1,
                    customerUsername: 1,
                    customerPassword: 1,
                    customerStatus: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    _id: 0
                }
            },


        ]);
        if (!data.length) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json({ data: data[0] });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//-----------------------------Update Profile----------------------------------------------

app.put("/Customer/:id", async (req, res) => {
    const { ownerName, customerEmail, customerContact, customerAddress } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, { ownerName, customerEmail, customerContact, customerAddress });
    res.json({ message: "Updated Medicine Customer Profile Succesfully" });
});

//--------------------Put status-------------------------------------
app.put("/CustomerStatus/:id", async (req, res) => {
    try {
        const customerId = req.params.id;
        const { customerStatus } = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { $set: { customerStatus } },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // 👉 Send email based on status
        if (customerStatus == "Accepted") {
            const content = `
        <h2>Account Approved ✅</h2>
        <p>Dear ${updatedCustomer.customerStoreName || "Customer"},</p>
        <p>Your account has been <b>approved</b>. You can now access SmartMed services.</p>
        <p>Thank you!</p>
      `;
            sendEmail(updatedCustomer.customerEmail, content);
        }
        else if (customerStatus === "Rejected") {
            const content = `
        <h2>Account Rejected ❌</h2>
        <p>Dear ${updatedCustomer.customerStoreName || "Customer"},</p>
        <p>We regret to inform you that your account request has been <b>rejected</b>.</p>
        <p>Please contact support for more details.</p>
      `;
            sendEmail(updatedCustomer.customerEmail, content);
        }

        res.status(200).json({
            message: `Customer status updated successfully`,
            customer: updatedCustomer
        });

    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

//-----------------Equipment Customer-----------------------

const EquipmentCustomerSchemaStructure = new mongoose.Schema({
    customerStoreName: {
        type: String,
        required: true,
    },
    customerStoreRegNo: {
        type: String,
        required: true,
    },

    SalesLicense: {
        type: String,
        required: true,

    },

    ownerName: {
        type: String,
        required: true,
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "placeCollection",
        required: true
    },

    customerAddress: {
        type: String,
        required: true,
    },



    customerContact: {
        type: String,
        required: true,

    },

    customerEmail: {
        type: String,
        required: true,

    },


    customerPassword: {
        type: String,
        required: true,
    },

    customerStatus: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"

    }

})
const EquipmentCustomer = mongoose.model("EquipmentcustomerCollection", EquipmentCustomerSchemaStructure);

//-----------------------------------POST Equipment Customer--------------------------------------------
app.post("/EquipmentCustomer", upload.single("SalesLicense"), async (req, res) => {
    try {

        const { customerStoreName, customerStoreRegNo, ownerName, customerAddress, placeId,
            customerContact, customerEmail, customerPassword } = req.body;
        const SalesLicense = req.file ? `/uploads/${req.file.filename}` : "";

        await EquipmentCustomer.create({
            customerStoreName, customerStoreRegNo, SalesLicense, ownerName, customerAddress, placeId,
            customerContact, customerEmail, customerPassword
        });
        res.json({ message: " Equipment Customer Registration successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

});

//----------Get customer email check-------------------
app.post("/EquiCustomerCheckEmail", async (req, res) => {
    try {
        const { customerEmail } = req.body;

        if (!customerEmail) {
            return res.status(400).json({ message: "Email required" });
        }


        const admin = await Admin.findOne({ adminEmail: customerEmail });
        const representative = await Representative.findOne({ repEmail: customerEmail });
        const inventory = await InManager.findOne({ inManagerEmail: customerEmail });
        const delivery = await Delivery.findOne({ deliverEmail: customerEmail });
        const equipmentCustomer = await EquipmentCustomer.findOne({ customerEmail: customerEmail });
        const medicineCustomer = await Customer.findOne({ customerEmail: customerEmail });

        if (
            admin ||
            representative ||
            inventory ||
            delivery ||
            equipmentCustomer ||
            medicineCustomer
        ) {
            return res.json({
                exists: true,
                message: "Email already registered"
            });
        }

        res.json({
            exists: false,
            message: "Email available"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


//------------------------GET Equipment Customer--------------------------------

app.get("/EquipmentCustomer", async (req, res) => {
    try {

        const equipmentcustomer = await EquipmentCustomer.find().populate({
            path: "placeId",
            populate: { path: "districtId" }
        })
            ;
        if (equipmentcustomer.length === 0) {
            return res.send({ message: "Equipment Customer not found", equipmentcustomer: [] });
        } else {
            res.send({ equipmentcustomer }).status(200);
        }

    } catch (err) {
        console.error("Error finiding Equipment Customer:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});

//------------------------------------Get Profile Equipment Customer-------------------------------
app.get("/EquipmentCustomer/:id", async (req, res) => {
    try {

        const data = await EquipmentCustomer.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },

            {
                $lookup: {
                    from: "placecollections",
                    localField: "placeId",
                    foreignField: "_id",
                    as: "place"
                }
            },

            {
                $unwind: "$place",


            },
            {
                $lookup: {
                    from: "districtcollections",
                    localField: "place.districtId",
                    foreignField: "_id",
                    as: "district"

                }
            },
            {
                $unwind: "$district",

            },
            {
                $project: {
                    customerId: "$_id",
                    customerStoreName: 1,
                    customerStoreRegNo: 1,
                    SalesLicense: 1,
                    ownerName: 1,
                    placeId: "$place._id",
                    placeName: "$place.placeName",
                    districtId: "$district._id",
                    districtName: "$district.districtName",
                    customerAddress: 1,
                    customerContact: 1,
                    customerEmail: 1,
                    customerUsername: 1,
                    customerPassword: 1,
                    customerStatus: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    _id: 0
                }
            },


        ]);
        if (!data.length) {
            return res.status(404).json({ message: "Equipment Customer not found" });
        }
        res.json({ data: data[0] });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//-----------------------------UpdateProfile----------------------------------------------

app.put("/EquipmentCustomer/:id", async (req, res) => {
    const { ownerName, customerEmail, customerContact, customerAddress } = req.body;
    await EquipmentCustomer.findByIdAndUpdate(req.params.id, { ownerName, customerEmail, customerContact, customerAddress });
    res.json({ message: "Updated Equipment Customer Profile Succesfully" });
});


//--------------------------------Put status----------------------------------------
app.put("/EquipmentCustomerStatus/:id", async (req, res) => {
    try {
        const { customerStatus } = req.body;

        const updatedCustomer = await EquipmentCustomer.findByIdAndUpdate(
            req.params.id,
            { customerStatus },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Equipment Customer not found" });
        }

        // 👉 Send email based on status
        if (customerStatus === "Accepted") {
            const content = `
                <h2>Account Approved ✅</h2>
                <p>Dear ${updatedCustomer.ownerName},</p>
                <p>Your equipment store <b>${updatedCustomer.customerStoreName}</b> has been <b>approved</b>.</p>
                <p>You can now access SmartMed services.</p>
                <p>Thank you!</p>
            `;
            sendEmail(updatedCustomer.customerEmail, content);
        }
        else if (customerStatus === "Rejected") {
            const content = `
                <h2>Account Rejected ❌</h2>
                <p>Dear ${updatedCustomer.ownerName},</p>
                <p>We regret to inform you that your equipment store <b>${updatedCustomer.customerStoreName}</b> has been <b>rejected</b>.</p>
                <p>Please contact support for more details.</p>
            `;
            sendEmail(updatedCustomer.customerEmail, content);
        }

        res.json({
            message: `Equipment Customer ${customerStatus} successfully`,
            customer: updatedCustomer
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

//----------------------Medicine-------------------------------
const MedicineSchemaStructure = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true,

    },
    medicinePrice: {
        type: String,
        required: true,
    },
    medicineDistription: {
        type: String,
        required: true,
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryCollection",
        required: true,

    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeCollection",
        required: true,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brandCollection",
        required: true,
    },
    medicinePhoto: {
        type: String,
        required: true,
    },

});
const Medicine = mongoose.model("medicineCollection", MedicineSchemaStructure);


//------------------------------------Post Medicine-----------------------------------
app.post("/Medicine", upload.single("medicinePhoto"), async (req, res) => {
    try {
        const { medicineName, medicinePrice, medicineDistription, categoryId, typeId, brandId } = req.body;
        const medicinePhoto = req.file ? `/uploads/${req.file.filename}` : "";
        // .console.log();

        await Medicine.create({ medicineName, medicinePrice, medicineDistription, categoryId, typeId, brandId, medicinePhoto });
        res.json({ message: "Medicine added successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

});


//---------------------------Inventory Manager-----------------------------

const InventoryManagerSchemaStructure = new mongoose.Schema({
    inManagerName: {
        type: String,
        required: true,
    },
    inMangerEmpId: {
        type: String,
        required: true,
    },
    inManagerContact: {
        type: String,
        required: true,
    },
    ManagerWarehouseName: {
        type: String,
        required: true,

    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "placeCollection",
        required: true
    },

    inManagerPhoto: {
        type: String,
        required: true,

    },

    inManagerEmail: {
        type: String,
        required: true,
    },

    InManagerPassword: {
        type: String,
        required: true,
    },
    InManagerStatus: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

});
const InManager = mongoose.model("inManagerCollection", InventoryManagerSchemaStructure);

//------------------------InventoryPost---------------------------------------------
app.post("/InvetoryManager", upload.single("inManagerPhoto"), async (req, res) => {
    try {
        const { inManagerName, inMangerEmpId, inManagerContact, ManagerWarehouseName, placeId,
            inManagerEmail, InManagerPassword } = req.body;
        const inManagerPhoto = req.file ? `/uploads/${req.file.filename}` : "";
        await InManager.create({ inManagerName, inMangerEmpId, inManagerContact, ManagerWarehouseName, placeId, inManagerPhoto, inManagerEmail, InManagerPassword });
        res.json({ message: "Inventory Manager Register successfully" });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

});

//----------------------Get Profile---------------------------

app.get("/InvetoryManager/:id", async (req, res) => {
    try {

        const data = await InManager.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },

            {
                $lookup: {
                    from: "placecollections",
                    localField: "placeId",
                    foreignField: "_id",
                    as: "place"
                }
            },

            {
                $unwind: "$place",


            },
            {
                $lookup: {
                    from: "districtcollections",
                    localField: "place.districtId",
                    foreignField: "_id",
                    as: "district"

                }
            },
            {
                $unwind: "$district",

            },
            {
                $project: {
                    InManagerId: "$_id",
                    inManagerName: 1,
                    inMangerEmpId: 1,
                    inManagerContact: 1,
                    ManagerWarehouseName: 1,
                    placeId: "$place._id",
                    placeName: "$place.placeName",
                    districtId: "$district._id",
                    districtName: "$district.districtName",
                    inManagerPhoto: 1,
                    inManagerEmail: 1,
                    InManagerPassword: 1,
                    InManagerStatus: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    _id: 0
                }
            },


        ]);
        if (!data.length) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json({ data: data[0] });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//--------------------Get Profile to Admin-------------------------------

app.get("/inventoryManagersAdmin", async (req, res) => {
    try {

        const managers = await InManager.find()
            .populate({
                path: "placeId",
                populate: { path: "districtId" }
            })


        res.json({ success: true, data: managers });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});
//--------------------------------------Update To------------
app.put("/inventoryManagerStatus/:id", async (req, res) => {
    try {

        const { status } = req.body;

        await InManager.findByIdAndUpdate(
            req.params.id,
            { InManagerStatus: status }
        );

        res.json({ success: true, message: "Status Updated" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

//------------------------Medical Rep-------------------------------

const RepresentativeSchemaStructure = new mongoose.Schema({
    repName: {
        type: String,
        required: true,
    },
    repEmpId: {
        type: String,
        required: true,
    },
    repIdProof: {
        type: String,
        required: true,
    },
    repContact: {
        type: String,
        required: true,
    },

    repEmail: {
        type: String,
        required: true,
    },
    repAddress: {
        type: String,
        required: true,
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "placeCollection",
        required: true
    },

    repPhoto: {
        type: String,
        default: "",
    },

    repPassword: {
        type: String,
        required: true,
    },
    repStatus: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

})
const Representative = mongoose.model("representativeCollection", RepresentativeSchemaStructure);

//--------------------------------Rep Post-----------------------------------

app.post(
    "/Representative",
    upload.fields([
        { name: "repIdProof", maxCount: 1 },
        { name: "repPhoto", maxCount: 1 }
    ]),
    async (req, res) => {
        try {
            if (!req.files?.repIdProof || !req.files?.repPhoto) {
                return res.status(400).json({ error: "Files missing" });
            }

            const repIdProof = `/uploads/${req.files.repIdProof[0].filename}`;
            const repPhoto = `/uploads/${req.files.repPhoto[0].filename}`;


            const {
                repName,
                repEmpId,
                repContact,
                repEmail,
                repAddress,
                placeId,
                repPassword
            } = req.body;

            await Representative.create({
                repName,
                repEmpId,
                repIdProof,
                repContact,
                repEmail,
                repAddress,
                placeId,
                repPhoto,
                repPassword,
            });

            res.json({ message: "Representative registered successfully" });

        } catch (err) {
            console.error("SERVER ERROR:", err);
            res.status(500).json({ error: err.message });
        }
    }
);


//----------------------------------------------Rep Get Profile--------------------------------------------------

app.get("/Representative/:id", async (req, res) => {
    try {

        const data = await Representative.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },

            {
                $lookup: {
                    from: "placecollections",
                    localField: "placeId",
                    foreignField: "_id",
                    as: "place"
                }
            },

            {
                $unwind: "$place",


            },
            {
                $lookup: {
                    from: "districtcollections",
                    localField: "place.districtId",
                    foreignField: "_id",
                    as: "district"

                }
            },
            {
                $unwind: "$district",

            },
            {
                $project: {
                    repId: "$_id",
                    repName: 1,
                    repEmpId: 1,
                    repContact: 1,
                    ownerName: 1,
                    placeId: "$place._id",
                    placeName: "$place.placeName",
                    districtId: "$district._id",
                    districtName: "$district.districtName",
                    repAddress: 1,
                    repEmail: 1,
                    repAddress: 1,
                    repPhoto: 1,
                    repPassword: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    _id: 0
                }
            },


        ]);
        if (!data.length) {
            return res.status(404).json({ message: "Representative not found" });
        }
        res.json({ data: data[0] });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//-------------------Rep List to Admin------------------------
app.get("/representativesAdmin", async (req, res) => {
    try {

        const reps = await Representative.find()
            .populate({
                path: "placeId",
                populate: { path: "districtId" }
            })

        res.json({ success: true, data: reps });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});
//--------------------Rep Status Update------------------------
app.put("/representativeStatus/:id", async (req, res) => {
    try {

        const { status } = req.body;

        await Representative.findByIdAndUpdate(
            req.params.id,
            { repStatus: status }
        );

        res.json({
            success: true,
            message: "Representative status updated"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

//--------------------Deliver Team------------------------------
const DeliveryteamSchemaStructure = new mongoose.Schema({
    deliverName: {
        type: String,
        required: true,
    },
    deliverVehicleNo: {
        type: String,
        required: true,
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "placeCollection",
        required: true,
    },

    deliverEmail: {
        type: String,
        required: true,

    },
    deliverContact: {
        type: String,
        required: true,
    },

    deliverPassword: {
        type: String,
        required: true,
    },
    deliverStatus: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

});
const Delivery = mongoose.model("deliveryCollection", DeliveryteamSchemaStructure);

//-------------------------------------Deliver Post------------------------------------------

app.post("/Delivery", async (req, res) => {
    try {
        const { deliverName, deliverVehicleNo, placeId, deliverEmail, deliverContact, deliverPassword } = req.body;

        let delivery = await Delivery.findOne({ deliverName, deliverVehicleNo, placeId, deliverEmail, deliverPassword });
        delivery = new Delivery({
            deliverName,
            deliverVehicleNo,
            placeId,
            deliverEmail,
            deliverContact,
            deliverPassword
        });

        await delivery.save();

        res.json({ message: "Delivery Team Registration successfully" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");

    }
})

//-----------------------Delivery Team GET Profile----------------------------------
app.get("/Delivery/:id", async (req, res) => {
    try {

        const data = await Delivery.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },

            {
                $lookup: {
                    from: "placecollections",
                    localField: "placeId",
                    foreignField: "_id",
                    as: "place"
                }
            },

            {
                $unwind: "$place",


            },
            {
                $lookup: {
                    from: "districtcollections",
                    localField: "place.districtId",
                    foreignField: "_id",
                    as: "district"

                }
            },
            {
                $unwind: "$district",

            },
            {
                $project: {
                    deliveryId: "$_id",
                    deliverName: 1,
                    deliverVehicleNo: 1,
                    deliverEmail: 1,
                    deliverContact: 1,
                    placeId: "$place._id",
                    placeName: "$place.placeName",
                    districtId: "$district._id",
                    districtName: "$district.districtName",
                    deliverPassword: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    _id: 0
                }
            },


        ]);
        if (!data.length) {
            return res.status(404).json({ message: "Delivery Team not found" });
        }
        res.json({ data: data[0] });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//-----------Get Delivery Team List for Admin--------------------------------------------
app.get("/deliveryTeamsAdmin", async (req, res) => {
    try {

        const delivery = await Delivery.find()
            .populate({
                path: "placeId",
                populate: { path: "districtId" }
            })


        res.json({
            success: true,
            data: delivery
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

//-------------------------Update Status of Delivery team-------------------------------
app.put("/deliveryStatus/:id", async (req, res) => {
    try {

        const { status } = req.body;

        await Delivery.findByIdAndUpdate(
            req.params.id,
            { deliverStatus: status }
        );

        res.json({
            success: true,
            message: "Delivery status updated"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});


//-------------------------Stock-------------------------------------------------------
const StockSchemaStructure = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicineCollection",

    },
    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipmentCollection",
    },
    medicineManufactureDate: {
        type: String,
        required: true,
    },
    medicineExpireDate: {
        type: String,
        required: true,

    },

    stockQuantity: {
        type: String,
        required: true,

    },
    stockDate: {
        type: String,
        default: Date.now
    },

});
const Stock = mongoose.model("stockCollection", StockSchemaStructure);
//Get Medicine


//-----------------------------post Medicine Stock--------------------------------------------------------
app.post("/Stock", async (req, res) => {
    try {
        const { medicineId, medicineManufactureDate, medicineExpireDate, stockQuantity } = req.body;
        let stock = await Stock.findOne({ medicineId, medicineManufactureDate, medicineExpireDate, stockQuantity });
        stock = new Stock({
            medicineId,
            medicineManufactureDate,
            medicineExpireDate,
            stockQuantity,

        });
        await stock.save();
        res.json({ message: "Stock Udated successfully" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//-------------------------------Add Stock for Equipment------------------------------
app.post("/EquipmentStock", async (req, res) => {
    try {

        const {
            equipmentId,
            stockQuantity,
            equipmentManufactureDate,
            equipmentExpireDate
        } = req.body;

        const stock = new Stock({
            equipmentId: equipmentId,
            stockQuantity: stockQuantity,
            medicineManufactureDate: equipmentManufactureDate,
            medicineExpireDate: equipmentExpireDate
        });

        await stock.save();

        res.json({ message: "Stock added successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//-------------------------Get Medicine------------------------------
app.get("/Medicine", async (req, res) => {
    try {

        const medicine = await Medicine.find().populate("brandId").populate("categoryId").populate("typeId");
        if (medicine.length === 0) {
            return res.send({ message: "Medicine not found", medicine: [] });
        } else {
            res.send({ medicine }).status(200);
        }

    } catch (err) {
        console.error("Error finiding Medicine:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});
//-------------Medicine details------------------------------------
app.get("/Medicine/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const medicine = await Medicine.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },

            // Join Stock
            {
                $lookup: {
                    from: "stockcollections", // collection name in MongoDB
                    localField: "_id",
                    foreignField: "medicineId",
                    as: "stockDetails"
                }
            },

            // Optional: Get latest stock only
            {
                $unwind: {
                    path: "$stockDetails",
                    preserveNullAndEmptyArrays: true
                }
            },

            // Populate brand
            {
                $lookup: {
                    from: "brandcollections",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand"
                }
            },

            {
                $lookup: {
                    from: "categorycollections",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },

            {
                $lookup: {
                    from: "typecollections",
                    localField: "typeId",
                    foreignField: "_id",
                    as: "type"
                }
            },

            {
                $project: {
                    medicineName: 1,
                    medicinePrice: 1,
                    medicineDistription: 1,
                    medicinePhoto: 1,

                    brand: { $arrayElemAt: ["$brand", 0] },
                    category: { $arrayElemAt: ["$category", 0] },
                    type: { $arrayElemAt: ["$type", 0] },

                    manufactureDate: "$stockDetails.medicineManufactureDate",
                    expiryDate: "$stockDetails.medicineExpireDate",
                    stockQuantity: "$stockDetails.stockQuantity"
                }
            }
        ]);

        if (!medicine.length) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json({ medicine: medicine[0] });

    } catch (err) {
        console.error("Error finding Medicine:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/Medicinedelete/:id", async (req, res) => {
    try {

        await Medicine.findByIdAndDelete(req.params.id);

        res.send({ message: "Medicine deleted successfully" });

    } catch (err) {
        res.status(500).send({ message: "Error deleting medicine" });
    }
})




//Cart
const CartSchemaStructure = new mongoose.Schema({

    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicineCollection",

    },

    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipmentCollection",
    },

    cartQuantity: {
        type: Number,
        required: true
    },

    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookingCollection",
        required: true,
    },
});
const Cart = mongoose.model("cartCollection", CartSchemaStructure);


app.post("/AddToCart", async (req, res) => {

    try {

        let { customerId, medicineId, quantity } = req.body;

        // customerId = new mongoose.Types.ObjectId(customerId);
        // medicineId = new mongoose.Types.ObjectId(medicineId);

        //  Find open booking
        let booking = await Booking.findOne({
            customerId: customerId,
            bookStatus: 0
        });
        // console.log(booking)

        // If not found → create booking
        if (!booking) {

            booking = await Booking.create({
                customerId: customerId,
                bookStatus: 0,
                bookAmount: 0
            });
        }

        //  Create cart item
        await Cart.create({
            customerId: customerId,
            medicineId: medicineId,
            cartQuantity: Number(quantity),
            bookingId: booking._id
        });

        // Recalculate total
        const carts = await Cart.find({ bookingId: booking._id })
            .populate("medicineId");

        let total = 0;

        carts.forEach(item => {
            total += item.cartQuantity * Number(item.medicineId.medicinePrice);
        });

        //  Update booking
        await Booking.findByIdAndUpdate(booking._id, {
            bookAmount: total
        });

        res.json({
            success: true,
            bookingId: booking._id
        });

    } catch (err) {
        console.log("ADD CART ERROR:", err);
        res.status(500).json(err);
    }

});


//Booking
const BookingSchemaStructure = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customerCollection",

    },

    equipmentCustomerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EquipmentcustomerCollection",
    },

    bookAmount: {
        type: Number,
        default: 0
    },

    bookDate: {
        type: Date,


    },
    bookStatus: {
        type: Number,   // 0 = cart , 1 = purchased
        default: 0
    },

    repId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "representativeCollection",

    },
    deliveryteamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deliverycollections",
    },
});
const Booking = mongoose.model("bookingCollection", BookingSchemaStructure);


//Admin 
const AdminSchemaStructure = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
    adminPassword: {
        type: String,
        required: true,
    },
});
const Admin = mongoose.model("adminCollection", AdminSchemaStructure);

app.post("/Admin", async (req, res) => {
    try {
        const { adminName, adminEmail, adminPassword } = req.body;

        let admin = await Admin.findOne({ adminName, adminEmail, adminPassword });
        admin = new Admin({
            adminName,
            adminEmail,
            adminPassword


        });

        await admin.save();

        res.json({ message: "Admin Registration successfully" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");

    }
});
//-------------------Customers Complaint Schema----------------------
const ComplaintSchemaStructure = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customerCollection",
    },
    equipmentCustomerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EquipmentcustomerCollection",
    },
    complaintTitle: {
        type: String,
        required: true,
    },
    complaintContent: {
        type: String,
        required: true,
    },
    complaintDate: {
        type: Date,
        default: Date.now
    },
    complaintReply: {
        type: String,
    },
    complaintStatus: {
        type: String,
        enum: ["Pending", "Resolved"],
        default: "Pending"
    }
});
const Complaint = mongoose.model("ComplaintCollection", ComplaintSchemaStructure);



//--------------------------------Login--------------------------------

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        const admin = await Admin.findOne({
            adminEmail: email,
            adminPassword: password
        });

        if (admin) {
            return res.json({
                role: "admin",
                id: admin._id,
                name: admin.adminName,
                message: "Login successful"
            });
        }
        const customer = await Customer.findOne({
            customerEmail: email,
            customerPassword: password,
            customerStatus: "Accepted",
        });

        if (customer) {
            return res.json({
                role: "customer",
                id: customer._id,
                name: customer.customerStoreName,
                status: "Accepted",
                message: "Login successful"
            });
        }

        const equipmentcustomer = await EquipmentCustomer.findOne({
            customerEmail: email,
            customerPassword: password,
            customerStatus: "Accepted",
        });

        if (equipmentcustomer) {
            return res.json({
                role: "equipmentcustomer",
                id: equipmentcustomer._id,
                name: equipmentcustomer.customerStoreName,
                status: "Accepted",
                message: "Login Successfully"
            });
        }


        const delivery = await Delivery.findOne({
            deliverEmail: email,
            deliverPassword: password,
        });

        if (delivery) {
            return res.json({
                role: "delivery",
                id: delivery._id,
                name: delivery.deliverName,
                status: "Active",
                message: "Login successful"
            });
        }



        const inmanager = await InManager.findOne({
            inManagerEmail: email,
            InManagerPassword: password,
        });
        if (inmanager) {
            return res.json({
                role: "inmanager",
                id: inmanager._id,
                name: inmanager.inManagerName,
                status: "Active",
                message: "Login Successful"
            });
        }

        const rep = await Representative.findOne({
            repEmail: email,
            repPassword: password,
        });
        if (rep) {
            return res.json({
                role: "rep",
                id: rep._id,
                name: rep.repName,
                status: "Active",
                message: "Login Successful"
            });

        }


        return res.status(401).json({ message: "Invalid email or password" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});



//-------------------Get My Cart Items----------------
app.get("/bookingWithCart/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await Booking.aggregate([

            //  Match active booking
            {
                $match: {
                    customerId: new mongoose.Types.ObjectId(userId),
                    bookStatus: 0
                }
            },

            //  Cart items
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },

            { $unwind: "$cartItems" },

            //  Medicine
            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "cartItems.medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },

            { $unwind: "$medicine" },

            //  Brand
            {
                $lookup: {
                    from: "brandcollections",
                    localField: "medicine.brandId",
                    foreignField: "_id",
                    as: "brand"
                }
            },

            //  Category
            {
                $lookup: {
                    from: "categorycollections",
                    localField: "medicine.categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },

            //  Type
            {
                $lookup: {
                    from: "typecollections",
                    localField: "medicine.typeId",
                    foreignField: "_id",
                    as: "type"
                }
            },

            //  Stock
            {
                $lookup: {
                    from: "stockcollections",
                    localField: "medicine._id",
                    foreignField: "medicineId",
                    as: "stock"
                }
            },
            {
                $addFields: {
                    totalStock: {
                        $sum: {
                            $map: {
                                input: "$stock",
                                as: "s",
                                in: { $toInt: "$$s.stockQuantity" }
                            }
                        }
                    }
                }
            },

            //  Group final output
            {
                $group: {
                    _id: "$_id",
                    bookAmount: { $first: "$bookAmount" },
                    bookDate: { $first: "$bookDate" },

                    cartItems: {
                        $push: {
                            cartId: "$cartItems._id",
                            quantity: "$cartItems.cartQuantity",

                            medicineName: "$medicine.medicineName",
                            price: "$medicine.medicinePrice",
                            description: "$medicine.medicineDistription",
                            photo: "$medicine.medicinePhoto",

                            brand: { $arrayElemAt: ["$brand.brandName", 0] },
                            category: { $arrayElemAt: ["$category.categoryName", 0] },
                            type: { $arrayElemAt: ["$type.typeName", 0] },

                            stockQty: "$totalStock",
                        }
                    }
                }
            }

        ]);


        if (!result.length) {
            return res.json({ success: false, message: "Cart empty" });
        }

        res.json({ success: true, data: result[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//-------------------Cart Delete----------------
app.delete("/Cart/:id", async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//-------------------Cart Update Quantity----------------
app.put("/Cart/:id", async (req, res) => {

    try {

        const { cartQuantity } = req.body;

        const updatedItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { cartQuantity },
            { new: true }
        ).populate("medicineId");

        if (!updatedItem) {
            return res.status(404).json({ success: false });
        }

        res.json({ success: true, data: updatedItem });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});


//-------------------Booking update status and amount----------------
app.put("/BookingPutCheck/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { bookAmount, bookStatus } = req.body
        console.log(req.body);


        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            {
                bookAmount,
                bookStatus,
            },
            { new: true }
        );
        console.log(updatedBooking);

        res.json({ updatedBooking });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
//-------------------Get Representative In Place order----------------
app.get("/ViewRep", async (req, res) => {
    try {

        const rep = await Representative.find().populate({
            path: "placeId",
            populate: { path: "districtId" }
        })
            ;
        if (rep.length === 0) {
            return res.send({ message: "Representative not found", rep: [] });
        } else {
            res.send({ rep }).status(200);
        }

    } catch (err) {
        console.error("Error finiding Representative:", err);
        res.status(500).json({ message: "Internal server error" });
    }

})
//-------------------Get Cart by Booking Id----------------
app.get("/Cart/:bookId", async (req, res) => {
    try {
        const bookId = req.params.bookId;


        const data = await Cart.aggregate([
            {
                $match: {
                    bookingId: new mongoose.Types.ObjectId(bookId)

                }
            },
            {
                $lookup: {
                    from: "bookingcollections",
                    localField: "bookingId",
                    foreignField: "_id",
                    as: "bookItems"
                }
            },

            { $unwind: "$bookItems" },



            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },

            { $unwind: "$medicine" },

            {
                $project: {
                    _id: 1,
                    cartQuantity: 1,
                    bookingId: "$bookItems._id",
                    bookAmount: "$bookItems.bookAmount",
                    medicineId: "medicine._id",
                    medicineName: "$medicine.medicineName",
                    medicinePrice: "$medicine.medicinePrice",

                }
            }

        ]);
        // console.log(data);o

        if (!data.length) {

            return res.status(404).json({ message: "Booking Details not found" });
        }


        res.json({ data });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//----------------Booking update Representative----------------
app.put("/BookingPutRep/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { repId } = req.body
        console.log(req.body);


        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            {
                repId,

            },
            { new: true }
        );
        console.log(updatedBooking);

        res.json({ updatedBooking });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//-------------Payment--------------------------------

app.put("/Paymentcomplete/:id", async (req, res) => {
    try {

        const bookingId = req.params.id;

        //  Get booking
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        //  Prevent double payment
        if (booking.bookStatus === 2) {
            return res.json({ message: "Already processed" });
        }

        //  GET CART ITEMS (YOU MISSED THIS)
        const cartItems = await Cart.find({ bookingId });

        if (!cartItems.length) {
            return res.status(404).json({ message: "Cart empty" });
        }

        // Reduce stock
        for (const item of cartItems) {

            let qtyNeeded = parseInt(item.cartQuantity);

            const stocks = await Stock.find({
                medicineId: item.medicineId
            }).sort({ medicineExpireDate: 1 }); // FIFO

            for (const batch of stocks) {

                if (qtyNeeded <= 0) break;

                let batchQty = parseInt(batch.stockQuantity);

                if (batchQty >= qtyNeeded) {
                    batch.stockQuantity = batchQty - qtyNeeded;
                    await batch.save();
                    qtyNeeded = 0;
                } else {
                    qtyNeeded -= batchQty;
                    batch.stockQuantity = 0;
                    await batch.save();
                }
            }

            if (qtyNeeded > 0) {
                return res.status(400).json({
                    message: "Insufficient stock"
                });
            }
        }

        //  Update booking
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                bookStatus: 2,
                bookDate: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            message: "Payment completed & stock updated",
            data: updatedBooking
        });

    } catch (err) {
        console.error("Payment Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
//----------------------Get My Orders--------------------


app.get('/booking-details/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const bookings = await Booking.aggregate([

            //  Match customer
            {
                $match: {
                    customerId: new mongoose.Types.ObjectId(cid),
                    bookStatus: { $in: [2, 3, 4, 5] }
                }
            },

            {
                $sort: { bookDate: -1 }
            },



            //  Cart lookup
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },

            { $unwind: "$cartItems" },
            //  Medicine lookup
            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "cartItems.medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },

            { $unwind: "$medicine" },

            //  Calculate item total
            {
                $addFields: {
                    itemAmount: {
                        $multiply: [
                            "$cartItems.cartQuantity",
                            { $toDouble: "$medicine.medicinePrice" }
                        ]
                    }
                }
            },

            //  Group back booking
            {
                $group: {
                    _id: "$_id",

                    bookDate: { $first: "$bookDate" },
                    bookAmount: { $first: "$bookAmount" },
                    bookStatus: { $first: "$bookStatus" },
                    repId: { $first: "$repId" },

                    cartItems: {
                        $push: {
                            cartId: "$cartItems._id",
                            cartQuantity: "$cartItems.cartQuantity",

                            medicineId: "$medicine._id",
                            medicineName: "$medicine.medicineName",
                            medicinePhoto: "$medicine.medicinePhoto",
                            medicinePrice: "$medicine.medicinePrice",

                            itemAmount: "$itemAmount"
                        }
                    },

                    totalBookingAmount: { $sum: "$itemAmount" }
                }
            },

            //  Final shape
            {
                $project: {
                    _id: 1,
                    bookDate: 1,
                    bookStatus: 1,
                    repId: 1,
                    cartItems: 1,
                    totalBookingAmount: 1
                }
            }

        ]);


        // console.log(bookings);



        res.status(200).json({ success: true, bookings });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

//----------------------Get All Orders To Inventory manager------------------------
app.get("/AllOrders", async (req, res) => {
    try {

        const bookings = await Booking.aggregate([

            {
                $match: { bookStatus: { $in: [2, 3, 4, 5] } }
            },

            {
                $lookup: {
                    from: "customercollections",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },

            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: false
                }
            },

            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },

            {
                $unwind: {
                    path: "$cartItems",
                    preserveNullAndEmptyArrays: false
                }
            },

            // ✅ IMPORTANT: filter only medicine carts
            {
                $match: {
                    "cartItems.medicineId": { $ne: null }
                }
            },

            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "cartItems.medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },

            {
                $unwind: {
                    path: "$medicine",
                    preserveNullAndEmptyArrays: false
                }
            },

            {
                $group: {
                    _id: "$_id",

                    bookingDate: { $first: "$bookDate" },
                    bookStatus: { $first: "$bookStatus" },
                    customerStoreName: { $first: "$customer.customerStoreName" },

                    medicines: {
                        $push: {
                            medicineName: "$medicine.medicineName",
                            medicinePhoto: "$medicine.medicinePhoto",
                            quantity: "$cartItems.cartQuantity"
                        }
                    }
                }
            },

            {
                $project: {
                    _id: 1,
                    bookingDate: 1,
                    customerStoreName: 1,
                    medicines: 1,
                    bookStatus: 1
                }
            }

        ]);

        res.status(200).json({ success: true, bookings });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});
//----------------------Get All Orders details To Inventory manager------------------------
app.get("/AllOrdersDetails/:id", async (req, res) => {
    try {
        const bookingId = req.params.id;

        const bookingDetails = await Booking.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(bookingId)
                }
            },
            {
                $lookup: {
                    from: "customercollections",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            { $unwind: "$customer" },
            {
                $lookup: {
                    from: "representativecollections",
                    localField: "repId",
                    foreignField: "_id",
                    as: "representative"
                }
            },
            { $unwind: { path: "$representative", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            { $unwind: "$cartItems" },
            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "cartItems.medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },
            { $unwind: "$medicine" },
            {
                $project: {
                    _id: 1,
                    bookingDate: "$bookDate",
                    bookAmount: "$bookAmount",
                    bookStatus: "$bookStatus",
                    customerStoreName: "$customer.customerStoreName",
                    customerAddress: "$customer.customerAddress",
                    customerPhone: "$customer.customerContact",
                    representativeName: "$representative.repName",
                    representativeEmpId: "$representative.repEmpId",
                    medicineName: "$medicine.medicineName",
                    medicinePhoto: "$medicine.medicinePhoto",
                    quantity: "$cartItems.cartQuantity",
                    itemAmount: { $multiply: ["$cartItems.cartQuantity", { $toDouble: "$medicine.medicinePrice" }] }
                }
            }
        ]);
        res.status(200).json({ success: true, bookingDetails });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

//----------------------Get All Delivery team To Inventory manager------------------------
app.get("/AllDeliveryTeam", async (req, res) => {
    try {
        const deliveryTeams = await Delivery.find().populate({
            path: "placeId",
            populate: { path: "districtId" }
        });
        res.status(200).json({ success: true, deliveryTeams });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

//----------------------Assign Delivery Team To Order------------------------

app.put("/AssignDelivery/:bookid", async (req, res) => {

    //   console.log("PARAM:", req.params);
    //   console.log("BODY:", req.body);

    const bookid = req.params.bookid;
    const { deliveryteamId } = req.body;

    try {

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookid,
            {
                deliveryteamId,
                bookStatus: 3
            },
            { new: true }
        );

        console.log("UPDATED:", updatedBooking);

        res.status(200).json({ success: true, updatedBooking });

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//----------------------View Assigned Orders To Delivery Team------------------------
app.get("/AssignedOrders/:deliveryId", async (req, res) => {
    try {
        const deliveryId = req.params.deliveryId;

        const assignedOrders = await Booking.aggregate([
            {
                $match: {
                    deliveryteamId: new mongoose.Types.ObjectId(deliveryId),
                    bookStatus: { $in: [3, 4] }

                }
            },
            {
                $lookup: {
                    from: "customercollections",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            { $unwind: "$customer" },

            {
                $lookup: {

                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            { $unwind: "$cartItems" },
            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "cartItems.medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },
            { $unwind: "$medicine" },
            {
                $project: {
                    bookingId: "$_id",
                    cartId: "$cartItems._id",
                    bookingDate: "$bookDate",
                    bookStatus: "$bookStatus",
                    bookAmount: "$bookAmount",
                    customerStoreName: "$customer.customerStoreName",
                    customerAddress: "$customer.customerAddress",
                    customerPhone: "$customer.customerContact",
                    medicineName: "$medicine.medicineName",
                    medicinePhoto: "$medicine.medicinePhoto",
                    quantity: "$cartItems.cartQuantity",
                    itemAmount: { $multiply: ["$cartItems.cartQuantity", { $toDouble: "$medicine.medicinePrice" }] }
                }
            }
        ]);
        res.status(200).json({ success: true, assignedOrders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//----------------------Update Delivery Status (Accept Delivery)------------------------
app.put("/UpdateDeliveryStatus/:bookingId", async (req, res) => {
    const bookid = req.params.bookingId;
    //   const { deliveryStatus } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookid,
            {
                // deliveryStatus,
                bookStatus: 4
            },
            { new: true }
        );

        res.status(200).json({ success: true, updatedBooking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


//----------------------Update Delivery Status (Complete Delivery)------------------------
app.put("/CompleteDelivery/:bookingId", async (req, res) => {
    const bookid = req.params.bookingId;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookid,
            {
                bookStatus: 5

            },
            { new: true }
        );
        res.status(200).json({ success: true, updatedBooking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//----------------------Get Customer Assigned Orders To Representative------------------------
app.get("/RepAssignedOrders/:repId", async (req, res) => {
    try {
        const repId = req.params.repId;
        const assignedOrders = await Booking.aggregate([
            {
                $match: {
                    repId: new mongoose.Types.ObjectId(repId),
                    bookStatus: { $in: [2, 3, 4, 5] }
                }
            },
            {
                $lookup: {
                    from: "customercollections",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            { $unwind: "$customer" },
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            { $unwind: "$cartItems" },
            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "cartItems.medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },
            { $unwind: "$medicine" },
            {
                $project: {
                    bookingId: "$_id",
                    bookingDate: "$bookDate",
                    bookStatus: "$bookStatus",
                    bookAmount: "$bookAmount",
                    customerStoreName: "$customer.customerStoreName",
                    customerAddress: "$customer.customerAddress",
                    customerPhone: "$customer.customerContact",
                    medicineName: "$medicine.medicineName",
                    medicinePhoto: "$medicine.medicinePhoto",
                    quantity: "$cartItems.cartQuantity",
                    itemAmount: {
                        $multiply: [
                            { $toDouble: "$cartItems.cartQuantity" },
                            {
                                $toDouble: {
                                    $ifNull: [
                                        { $trim: { input: "$medicine.medicinePrice" } },
                                        "0"
                                    ]
                                }
                            }
                        ]
                    }
                }
            }
        ]);
        res.status(200).json({ success: true, assignedOrders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


//------------------------------Medical Equipment------------------------------
const EquipmentSchemaStructure = new mongoose.Schema({
    equipmentName: {
        type: String,
        required: true,
    },
    equipmentPrice: {
        type: String,
        required: true,
    },
    equipmentDistription: {
        type: String,
        required: true,
    },
    equcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipmentcategoryCollection",
        required: true,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brandCollection",
        required: true,
    },
    equipmentPhoto: {
        type: String,
        required: true,
    },
});
const Equipment = mongoose.model("equipmentCollection", EquipmentSchemaStructure);

//-------------------------------Post Equipment------------------------------
app.post("/Equipment", upload.single("equipmentPhoto"), async (req, res) => {
    try {
        const { equipmentName, equipmentPrice, equipmentDistription, equcategoryId, brandId } = req.body;
        const equipmentPhoto = req.file ? `/uploads/${req.file.filename}` : "";
        await Equipment.create({ equipmentName, equipmentPrice, equipmentDistription, equcategoryId, brandId, equipmentPhoto });
        res.json({ message: "Equipment added successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//-------------------------------Get Equipment fro Equipment Customer------------------------------
app.get("/ViewEquipment", async (req, res) => {
    try {
        const equipment = await Equipment.find().populate("brandId").populate("equcategoryId");
        if (equipment.length === 0) {
            return res.send({ message: "Equipment not found", equipment: [] });
        } else {
            res.send({ equipment }).status(200);
        }
    } catch (err) {
        console.error("Error finiding Equipment:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
//----------------------------------Delete Equipment---------------------------
app.delete("/DeleteEquipment/:id", async (req, res) => {
    await Equipment.findByIdAndDelete(req.params.id);
    res.send({ message: "Equipment deleted successfully" });
});

//-------------------------------Get Equipment for Add Stock------------------------------
app.get("/EquipmentForStock/:id", async (req, res) => {
    try {
        const equipmentId = req.params.id;
        const equipment = await Equipment.findById(equipmentId).populate("brandId").populate("equcategoryId");
        if (!equipment) {
            return res.send({ message: "Equipment not found", equipment: null });
        } else {
            res.send({ equipment }).status(200);
        }
    } catch (err) {
        console.error("Error finiding Equipment:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

//----------------------------- Equipment Detailed View--------------------------------------------------------
app.get("/EquipmentDetails/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const equipment = await Equipment.aggregate([

            // Match equipment
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },

            // Join stock
            {
                $lookup: {
                    from: "stockcollections",
                    localField: "_id",
                    foreignField: "equipmentId",
                    as: "stock"
                }
            },

            // Simple calculations
            {
                $addFields: {
                    totalStock: {
                        $sum: {
                            $map: {
                                input: "$stock",
                                as: "s",
                                in: { $toInt: "$$s.stockQuantity" }
                            }
                        }
                    },

                    // ✅ Simple min/max (works if date format is proper)
                    expiryDate: { $min: "$stock.medicineExpireDate" },
                    manufactureDate: { $max: "$stock.medicineManufactureDate" }
                }
            },

            // Join brand
            {
                $lookup: {
                    from: "brandcollections",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brandId"
                }
            },
            { $unwind: "$brandId" },

            // Join category
            {
                $lookup: {
                    from: "equipmentcategorycollections",
                    localField: "equcategoryId",
                    foreignField: "_id",
                    as: "equcategoryId"
                }
            },
            { $unwind: "$equcategoryId" },

            // Final output
            {
                $project: {
                    equipmentName: 1,
                    equipmentPrice: 1,
                    equipmentPhoto: 1,
                    equipmentDistription: 1,
                    totalStock: 1,
                    expiryDate: 1,
                    manufactureDate: 1,
                    "brandId.brandName": 1,
                    "equcategoryId.equcategoryName": 1
                }
            }

        ]);

        if (!equipment.length) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        res.status(200).json({ equipmentDetails: equipment[0] });

    } catch (err) {
        console.error("Error finding Equipment:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

//-----------------------------Equipment Add to Cart for Equipment Customer--------------------------------------------------------
app.post("/EquipmentCart", async (req, res) => {
    try {
        let { equipmentCustomerId, equipmentId, quantity } = req.body;
        let booking = await Booking.findOne({ equipmentCustomerId, bookStatus: 0 });
        if (!booking) {
            booking = await Booking.create({
                equipmentCustomerId,
                bookStatus: 0,
                bookAmount: 0
            });
        }
        //  Create cart item
        await Cart.create({
            equipmentCustomerId,
            equipmentId,
            cartQuantity: Number(quantity),
            bookingId: booking._id
        });
        // Recalculate total
        const carts = await Cart.find({ bookingId: booking._id })
            .populate("equipmentId");
        let total = 0;

        carts.forEach(item => {
            total += item.cartQuantity * Number(item.equipmentId.equipmentPrice);
        });

        //  Update booking
        await Booking.findByIdAndUpdate(booking._id, {
            bookAmount: total
        });

        res.json({
            success: true,
            bookingId: booking._id
        });

    } catch (err) {
        console.error("Error adding Equipment to cart:", err);
        res.status(500).json({ error: err.message });
    }
});

//-----------------------------Booking of Equipment with Cart for Equipment Customer--------------------------------------------------------
app.get("/EquipmentBookingWithCart/:userId", async (req, res) => {


    try {
        const userId = req.params.userId;

        const result = await Booking.aggregate([

            //  Match active booking
            {
                $match: {
                    equipmentCustomerId: new mongoose.Types.ObjectId(userId),
                    bookStatus: 0
                }
            },
            //  Cart items
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            {
                $unwind: {
                    path: "$cartItems",

                }
            },
            //  Equipment
            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "cartItems.equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            {
                $unwind: {
                    path: "$equipment",
                    preserveNullAndEmptyArrays: true
                }
            },
            //  Brand
            {
                $lookup: {
                    from: "brandcollections",
                    localField: "equipment.brandId",
                    foreignField: "_id",
                    as: "brand"
                }
            },

            //  Category
            {
                $lookup: {
                    from: "equipmentcategorycollections",
                    localField: "equipment.equcategoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            //Stock
            {
                $lookup: {
                    from: "stockcollections",
                    let: { eqId: "$equipment._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$equipmentId", "$$eqId"] }
                            }
                        },
                        {
                            $group: {
                                _id: "$equipmentId",
                                totalStock: {
                                    $sum: { $toInt: "$stockQuantity" }
                                }
                            }
                        }
                    ],
                    as: "stock"
                }
            },
            // Group final output
            {
                $group: {
                    _id: "$_id",
                    bookAmount: { $first: "$bookAmount" },
                    bookDate: { $first: "$bookDate" },
                    cartItems: {
                        $push: {
                            cartId: "$cartItems._id",
                            quantity: "$cartItems.cartQuantity",
                            equipmentName: "$equipment.equipmentName",
                            price: "$equipment.equipmentPrice",
                            description: "$equipment.equipmentDistription",
                            photo: "$equipment.equipmentPhoto",
                            brand: { $arrayElemAt: ["$brand.brandName", 0] },
                            category: { $arrayElemAt: ["$category.equcategoryName", 0] },
                            stockQty: { $arrayElemAt: ["$stock.totalStock", 0] }
                        }
                    }
                }
            }
        ]);
        // console.log("RESULT:", result);
        if (!result.length) {
            return res.json({ success: false, message: "Cart empty" });
        }
        res.json({ success: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }

});

//-----------------------------Equipment Cart Delete--------------------------------------------------------
app.delete("/EquipmentCart/:id", async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//-----------------------------Equipment Cart Update Quantity--------------------------------------------------------
app.put("/EquipmentCart/:id", async (req, res) => {

    try {
        const { cartQuantity } = req.body;
        const updatedItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { cartQuantity },
            { new: true }
        ).populate("equipmentId");
        if (!updatedItem) {
            return res.status(404).json({ success: false });
        }
        res.json({ success: true, data: updatedItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

//-----------------------------Equipment Booking Update Staus with Amount--------------------------------------------------------

app.put("/EquipmentBookingPutCheck/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { bookAmount, bookStatus } = req.body
        console.log(req.body);

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            {
                bookAmount,
                bookStatus,
            },
            { new: true }
        );
        console.log(updatedBooking);
        res.json({ updatedBooking });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//-----------------------------Get Equipment cart details for Booking--------------------------------------------------------
app.get("/EquipmentCartDetails/:bookId", async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const data = await Cart.aggregate([
            {
                $match: {
                    bookingId: new mongoose.Types.ObjectId(bookId)
                }
            },
            {
                $lookup: {
                    from: "bookingcollections",
                    localField: "bookingId",
                    foreignField: "_id",
                    as: "bookItems"
                }
            },
            { $unwind: "$bookItems" },
            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            { $unwind: "$equipment" },
            {
                $project: {
                    _id: 1,
                    cartQuantity: 1,
                    bookingId: "$bookItems._id",
                    bookAmount: "$bookItems.bookAmount",
                    equipmentId: "$equipment._id",
                    equipmentName: "$equipment.equipmentName",
                    equipmentPrice: "$equipment.equipmentPrice",
                    equipmentPhoto: "$equipment.equipmentPhoto"
                }
            }
        ]);
        if (!data.length) {
            return res.status(404).json({ message: "Booking Details not found" });
        }
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//-----------------------------Equipment Payment--------------------------------------------------------
// app.put("/EquipmentPaymentcomplete/:id", async (req, res) => {
//     try {
//         const bookingId = req.params.id;
//         const updatedBooking = await Booking.findByIdAndUpdate(
//             bookingId,
//             {
//                 bookStatus: 2,
//                 bookDate: new Date()
//             },
//             { new: true }
//         );
//         if (!updatedBooking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }
//         res.json({
//             success: true,
//             data: updatedBooking
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

app.put("/EquipmentPaymentcomplete/:id", async (req, res) => {
    try {

        const bookingId = req.params.id;

        // ✅ Get booking
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // ✅ Prevent duplicate payment
        if (booking.bookStatus === 2) {
            return res.json({ message: "Already processed" });
        }

        // ✅ Get equipment cart items
        const cartItems = await Cart.find({ bookingId });

        if (!cartItems.length) {
            return res.status(404).json({ message: "Cart empty" });
        }

        // ✅ Reduce equipment stock
        for (const item of cartItems) {

            let qtyNeeded = parseInt(item.cartQuantity);

            // FIFO stock deduction
            const stocks = await Stock.find({
                equipmentId: item.equipmentId
            }).sort({ medicineExpireDate: 1 });

            for (const batch of stocks) {

                if (qtyNeeded <= 0) break;

                let batchQty = parseInt(batch.stockQuantity);

                if (batchQty >= qtyNeeded) {
                    batch.stockQuantity = batchQty - qtyNeeded;
                    await batch.save();
                    qtyNeeded = 0;
                } else {
                    qtyNeeded -= batchQty;
                    batch.stockQuantity = 0;
                    await batch.save();
                }
            }

            // ❌ Not enough stock
            if (qtyNeeded > 0) {
                return res.status(400).json({
                    message: "Insufficient equipment stock"
                });
            }
        }

        // ✅ Update booking status
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                bookStatus: 2,
                bookDate: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            message: "Equipment payment completed & stock updated",
            data: updatedBooking
        });

    } catch (err) {
        console.error("Equipment Payment Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


//-----------------------------Get My Equipment Orders--------------------------------------------------------
app.get('/equipment-booking-details/:ecid', async (req, res) => {
    try {
        const { ecid } = req.params;

        const bookings = await Booking.aggregate([
            {
                $match: {
                    equipmentCustomerId: new mongoose.Types.ObjectId(ecid),
                    bookStatus: { $in: [2, 3, 4, 5] }
                }
            },
            {
                $sort: { bookDate: -1 }
            },


            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },

            { $unwind: "$cartItems" },


            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "cartItems.equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            { $unwind: "$equipment" },
            {
                $addFields: {
                    itemAmount: {
                        $multiply: [
                            "$cartItems.cartQuantity",
                            { $toDouble: "$equipment.equipmentPrice" }
                        ]
                    }
                }

            },
            {
                $group: {
                    _id: "$_id",
                    bookDate: { $first: "$bookDate" },
                    bookAmount: { $first: "$bookAmount" },
                    bookStatus: { $first: "$bookStatus" },
                    repId: { $first: "$repId" },
                    cartItems: {
                        $push: {
                            cartId: "$cartItems._id",
                            cartQuantity: "$cartItems.cartQuantity",

                            equipmentId: "$equipment._id",
                            equipmentName: "$equipment.equipmentName",
                            equipmentPhoto: "$equipment.equipmentPhoto",
                            equipmentPrice: "$equipment.equipmentPrice",
                            itemAmount: "$itemAmount"
                        }
                    },
                    totalBookingAmount: { $sum: "$itemAmount" }
                }
            },
            {
                $project: {
                    _id: 1,
                    bookDate: 1,
                    bookAmount: 1,
                    bookStatus: 1,
                    repId: 1,
                    cartItems: "$cartItems",
                    equipment: "$equipment",
                    totalBookingAmount: 1
                }
            }
        ]);
        res.json({ success: true, bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});
//----------------------Get All Equipment Orders To Inventory manager------------------------
app.get("/AllEquipmentOrders", async (req, res) => {
    try {
        const bookings = await Booking.aggregate([
            {
                $match: {
                    bookStatus: { $gte: 2 }
                }
            },

            {
                $lookup: {
                    from: "equipmentcustomercollections",
                    localField: "equipmentCustomerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"

                }
            },
            {
                $unwind: {
                    path: "$cartItems",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $match: {
                    "cartItems.equipmentId": { $ne: null }
                }
            },
            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "cartItems.equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            {
                $unwind: {
                    path: "$equipment",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    bookingDate: { $first: "$bookDate" },
                    bookStatus: { $first: "$bookStatus" },
                    customerStoreName: { $first: "$customer.customerStoreName" },
                    equipment: {
                        $push: {
                            equipmentName: "$equipment.equipmentName",
                            equipmentPhoto: "$equipment.equipmentPhoto",
                            quantity: "$cartItems.cartQuantity"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    bookingDate: 1,
                    customerStoreName: 1,
                    equipment: 1,
                    bookStatus: 1
                }
            }
        ]);
        // console.log("ALL EQUIPMENT ORDERS:", bookings);
        res.status(200).json({ success: true, bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});


//----------------------Get All Equipment Orders details To Inventory manager------------------------
app.get("/AllEquipmentOrdersDetails/:id", async (req, res) => {
    try {
        const bookingId = req.params.id;

        const bookingDetails = await Booking.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(bookingId)
                }
            },
            {
                $lookup: {
                    from: "equipmentcustomercollections",
                    localField: "equipmentCustomerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            { $unwind: "$customer" },
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            { $unwind: "$cartItems" },
            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "cartItems.equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            { $unwind: { path: "$equipment", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    bookingDate: "$bookDate",
                    bookAmount: "$bookAmount",
                    bookStatus: "$bookStatus",
                    customerStoreName: "$customer.customerStoreName",
                    customerAddress: "$customer.customerAddress",
                    customerPhone: "$customer.customerContact",
                    equipmentName: "$equipment.equipmentName",
                    equipmentPhoto: "$equipment.equipmentPhoto",
                    quantity: "$cartItems.cartQuantity",
                    itemAmount: { $multiply: ["$cartItems.cartQuantity", { $toDouble: "$equipment.equipmentPrice" }] }
                }
            }
        ]);
        res.status(200).json({ success: true, bookingDetails });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

//----------------------Assigned Equipment order To Delivery Team ------------------------
app.get("/AssignedEquipmentOrder/:deliveryId", async (req, res) => {
    try {
        const deliveryId = req.params.deliveryId;
        const assignedOrders = await Booking.aggregate([
            {
                $match: {
                    deliveryteamId: new mongoose.Types.ObjectId(deliveryId),
                    bookStatus: { $in: [3, 4] }
                }
            },
            {
                $lookup: {
                    from: "equipmentcustomercollections",
                    localField: "equipmentCustomerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            { $unwind: "$customer" },
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            { $unwind: "$cartItems" },
            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "cartItems.equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            { $unwind: "$equipment" },
            {
                $project: {
                    bookingId: "$_id",
                    cartId: "$cartItems._id",
                    bookingDate: "$bookDate",
                    bookStatus: "$bookStatus",
                    bookAmount: "$bookAmount",
                    customerStoreName: "$customer.customerStoreName",
                    customerAddress: "$customer.customerAddress",
                    customerPhone: "$customer.customerContact",
                    equipmentName: "$equipment.equipmentName",
                    equipmentPhoto: "$equipment.equipmentPhoto",
                    quantity: "$cartItems.cartQuantity",
                    itemAmount: { $multiply: ["$cartItems.cartQuantity", { $toDouble: "$equipment.equipmentPrice" }] }
                }
            }
        ]);
        res.status(200).json({ success: true, assignedOrders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


//----------------------Get Completed Medicine Orders details To Delivery team------------------------
app.get("/CompletedMedicineOrders/:deliveryId", async (req, res) => {
    try {

        const deliveryId = req.params.deliveryId;

        const completedOrders = await Booking.aggregate([

            {
                $match: {
                    deliveryteamId: new mongoose.Types.ObjectId(deliveryId),
                    bookStatus: 5
                }
            },

            {
                $lookup: {
                    from: "customercollections",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            {
                $unwind: "$cartItems"
            },

            // only medicine
            {
                $match: {
                    "cartItems.medicineId": { $ne: null }
                }
            },

            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "cartItems.medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },
            {
                $unwind: "$medicine"
            },

            // ✅ GROUP HERE
            {
                $group: {

                    _id: "$_id",

                    bookingDate: { $first: "$bookDate" },

                    customerStoreName: { $first: "$customer.customerStoreName" },

                    customerAddress: { $first: "$customer.customerAddress" },

                    customerPhone: { $first: "$customer.customerContact" },

                    medicines: {
                        $push: {

                            cartId: "$cartItems._id",

                            medicineName: "$medicine.medicineName",

                            medicinePhoto: "$medicine.medicinePhoto",

                            quantity: "$cartItems.cartQuantity",

                            itemAmount: {
                                $multiply: [
                                    "$cartItems.cartQuantity",
                                    { $toDouble: "$medicine.medicinePrice" }
                                ]
                            }

                        }
                    }

                }
            }

        ]);

        res.json({
            success: true,
            completedOrders
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

//----------------------Get Delivered Equipment Ordetrs To Delivery team------------------------
app.get("/CompletedEquipmentOrders/:deliveryId", async (req, res) => {
    try {
        const deliveryId = req.params.deliveryId;
        const completedOrders = await Booking.aggregate([
            {
                $match: {
                    deliveryteamId: new mongoose.Types.ObjectId(deliveryId),
                    bookStatus: 5
                }
            },
            {
                $lookup: {
                    from: "equipmentcustomercollections",
                    localField: "equipmentCustomerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            {
                $unwind: "$cartItems"
            },
            {
                $match: {
                    "cartItems.equipmentId": { $ne: null }
                }
            },
            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "cartItems.equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            {
                $unwind: {
                    path: "$equipment",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $group: {

                    _id: "$_id",
                    bookingDate: { $first: "$bookDate" },
                    customerStoreName: { $first: "$customer.customerStoreName" },
                    customerAddress: { $first: "$customer.customerAddress" },
                    customerPhone: { $first: "$customer.customerContact" },
                    equipments: {
                        $push: {
                            cartId: "$cartItems._id",
                            equipmentName: "$equipment.equipmentName",
                            equipmentPhoto: "$equipment.equipmentPhoto",
                            quantity: "$cartItems.cartQuantity",
                            itemAmount: {
                                $multiply: [
                                    "$cartItems.cartQuantity",
                                    { $toDouble: "$equipment.equipmentPrice" }
                                ]
                            }
                        }
                    }
                }
            }
        ]);
        res.json({
            success: true,
            completedOrders
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});
//----------------------Get Delivered Equipment Ordetrs To Delivery team------------------------

app.get("/CompletedEquipmentOrders/:deliveryId", async (req, res) => {
    try {
        const deliveryId = req.params.deliveryId;
        const completedOrders = await Booking.aggregate([
            {
                $match: {
                    deliveryteamId: new mongoose.Types.ObjectId(deliveryId),
                    bookStatus: 5
                }
            },
            {
                $lookup: {
                    from: "equipmentcustomercollections",
                    localField: "equipmentCustomerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            {
                $unwind: "$cartItems"
            },
            {
                $match: {
                    "cartItems.equipmentId": { $ne: null }
                }
            },
            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "cartItems.equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            {
                $unwind: {
                    path: "$equipment",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {

                    _id: "$_id",
                    bookingDate: { $first: "$bookDate" },
                    customerStoreName: { $first: "$customer.customerStoreName" },
                    customerAddress: { $first: "$customer.customerAddress" },
                    customerPhone: { $first: "$customer.customerContact" },
                    equipments: {
                        $push: {
                            cartId: "$cartItems._id",
                            equipmentName: "$equipment.equipmentName",
                            equipmentPhoto: "$equipment.equipmentPhoto",
                            quantity: "$cartItems.cartQuantity",
                            itemAmount: {
                                $multiply: [
                                    "$cartItems.cartQuantity",
                                    { $toDouble: "$equipment.equipmentPrice" }
                                ]
                            }
                        }
                    }
                }
            }
        ]);
        res.json({
            success: true,
            completedOrders
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

//-----------------------Medicine Customer Complaints------------------------
app.post("/MedicineCustomerComplaint", async (req, res) => {
    try {
        const { customerId, complaintTitle, complaintContent } = req.body;
        const complaint = await Complaint.create({
            customerId,
            complaintTitle,
            complaintContent
        });
        res.json({ success: true, complaint });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//------------------------Get Compaints of Medicind Customer------------------------
app.get("/MedicineCustomerComplaints/:customerId", async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const complaints = await Complaint.find({ customerId }).sort({ complaintDate: -1 });
        res.json({ success: true, complaints });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//------------------------Eqipment Customer Complaints------------------------
app.post("/EquipmentCustomerComplaint", async (req, res) => {
    try {
        const { equipmentCustomerId, complaintTitle, complaintContent } = req.body;
        const complaint = await Complaint.create({
            equipmentCustomerId,
            complaintTitle,
            complaintContent
        });
        res.json({ success: true, complaint });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//------------------------Get Compaints of Equipment Customer------------------------
app.get("/EquipmentCustomerComplaints/:equipmentCustomerId", async (req, res) => {
    try {
        const equipmentCustomerId = req.params.equipmentCustomerId;
        const complaints = await Complaint
            .find({ equipmentCustomerId })
            .sort({ complaintDate: -1 });
        res.json({ success: true, complaints });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//-----------------------Get all Medicine Complaints To Admin------------------------
app.get("/AllMedicineComplaints", async (req, res) => {
    try {
        const complaints = await Complaint.aggregate([
            {
                $match: {
                    customerId: { $ne: null },
                    complaintStatus: { $in: ["Pending", "Resolved"] }
                }
            },
            {
                $lookup: {
                    from: "customercollections",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    complaintTitle: 1,
                    complaintContent: 1,
                    complaintDate: 1,
                    complaintStatus: 1,
                    customerStoreName: "$customer.customerStoreName",
                    customerEmail: "$customer.customerEmail"
                }
            }
        ]);
        // console.log("ALL MEDICINE COMPLAINTS:", complaints);
        res.json({ success: true, complaints });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});
//------------------------Get Specific Medicine Compalint for Replay------------------------
app.get("/MedicineComplaintDetails/:id", async (req, res) => {
    try {
        const complaintId = req.params.id;
        const complaintDetails = await Complaint.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(complaintId),
                    customerId: { $ne: null }
                }
            },
            {
                $lookup: {
                    from: "customercollections",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    complaintTitle: 1,
                    complaintContent: 1,
                    complaintDate: 1,
                    complaintStatus: 1,
                    customerStoreName: "$customer.customerStoreName",
                    customerEmail: "$customer.customerEmail"
                }
            }
        ]);
        // console.log("MEDICINE COMPLAINT DETAILS:", complaintDetails);
        res.json({ success: true, complaintDetails: complaintDetails[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//-----------------------Update Medicine Complaint  Replay & status------------------------
app.put("/MedicineComplaintReply/:id", async (req, res) => {
    try {
        const complaintId = req.params.id;
        const { complaintReply, complaintStatus } = req.body;
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { complaintReply, complaintStatus },
            { new: true }
        );
        if (!updatedComplaint) {
            return res.status(404).json({ success: false, message: "Complaint not found" });
        }
        // console.log("UPDATED COMPLAINT:", updatedComplaint);
        res.json({ success: true, updatedComplaint });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


//------------------------------Get all Equipment Complaints To Admin------------------------
app.get("/AllEquipmentComplaints", async (req, res) => {
    try {
        const complaints = await Complaint.aggregate([
            {
                $match: {
                    equipmentCustomerId: { $ne: null },
                    complaintStatus: { $in: ["Pending", "Resolved"] }
                }
            },
            {
                $lookup: {
                    from: "equipmentcustomercollections",
                    localField: "equipmentCustomerId",
                    foreignField: "_id",
                    as: "equipmentCustomer"
                }
            },
            {
                $unwind: {
                    path: "$equipmentCustomer",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    complaintTitle: 1,
                    complaintContent: 1,
                    complaintDate: 1,
                    complaintStatus: 1,
                    customerStoreName: "$equipmentCustomer.customerStoreName",

                }
            }
        ]);
        // console.log("ALL EQUIPMENT COMPLAINTS:", complaints);
        res.json({ success: true, complaints });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//-----------------------Get Specific Equipment Customer Complaint for Replay-------------------------------------

app.get('/EquipmentComplaintDetail/:id', async (req, res) => {
    try {
        const complaintId = req.params.id;
        const complaintDetails = await Complaint.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(complaintId),
                    equipmentCustomerId: { $ne: null }
                }
            },
            {
                $lookup: {
                    from: "equipmentcustomercollections",
                    localField: "equipmentCustomerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    complaintTitle: 1,
                    complaintContent: 1,
                    complaintDate: 1,
                    complaintStatus: 1,
                    customerStoreName: "$customer.customerStoreName",
                    customerEmail: "$customer.customerEmail"
                }
            }
        ]);
        // console.log("EQUIPMENT COMPLAINT DETAILS:", complaintDetails);
        res.json({ success: true, complaintDetails: complaintDetails[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//-------------------Update Equipment Complaint Replay and Status---------------------------------------------

app.put("/EquipmentComplaintReply/:id", async (req, res) => {
    try {
        const complaintId = req.params.id;
        const { complaintReply, complaintStatus } = req.body;
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { complaintReply, complaintStatus },
            { new: true }
        );
        if (!updatedComplaint) {
            return res.status(404).json({ success: false, message: "Complaint not found" });
        }
        // console.log("UPDATED COMPLAINT:", updatedComplaint);
        res.json({ success: true, updatedComplaint });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//-------------All medicine order for Admin-------------------------------
app.get("/adminAllMedicineOrders", async (req, res) => {
    try {

        const bookings = await Booking.aggregate([

            {
                $match: { bookStatus: { $in: [2, 3, 4, 5] } }
            },

            // CUSTOMER DETAILS
            {
                $lookup: {
                    from: "customercollections",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            { $unwind: "$customer" },

            // CART ITEMS
            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            { $unwind: "$cartItems" },

            // ONLY MEDICINES
            {
                $match: {
                    "cartItems.medicineId": { $ne: null }
                }
            },

            // MEDICINE DETAILS
            {
                $lookup: {
                    from: "medicinecollections",
                    localField: "cartItems.medicineId",
                    foreignField: "_id",
                    as: "medicine"
                }
            },
            { $unwind: "$medicine" },
            {
                $addFields: {
                    itemAmount: {
                        $multiply: [
                            "$cartItems.cartQuantity",
                            { $toDouble: "$medicine.medicinePrice" }
                        ]
                    }
                }
            },


            // GROUP ORDER
            {
                $group: {
                    _id: "$_id",

                    bookingDate: { $first: "$bookDate" },
                    bookStatus: { $first: "$bookStatus" },
                    totalAmount: { $sum: "$itemAmount" },

                    customerStoreName: {
                        $first: "$customer.customerStoreName"
                    },

                    medicines: {
                        $push: {
                            medicineName: "$medicine.medicineName",
                            medicinePhoto: "$medicine.medicinePhoto",
                            quantity: "$cartItems.cartQuantity",
                            price: "$equipment.equipmentPrice",
                            itemAmount: "$itemAmount"
                        }
                    }
                }
            },

            // SORT NEWEST FIRST
            {
                $sort: { bookingDate: -1 }
            }

        ]);

        res.json({ success: true, bookings });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

//-----------------------------View All Equipment Order To Admin-------------------------
app.get("/adminAllequipmentOrders", async (req, res) => {
    try {

        const bookings = await Booking.aggregate([

            {
                $match: { bookStatus: { $gte: 2 } }
            },

            {
                $lookup: {
                    from: "equipmentcustomercollections",
                    localField: "equipmentCustomerId",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $lookup: {
                    from: "cartcollections",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "cartItems"
                }
            },
            { $unwind: "$cartItems" },

            // equipment carts only
            {
                $match: {
                    "cartItems.equipmentId": { $ne: null }
                }
            },

            {
                $lookup: {
                    from: "equipmentcollections",
                    localField: "cartItems.equipmentId",
                    foreignField: "_id",
                    as: "equipment"
                }
            },
            { $unwind: "$equipment" },
            {
                $addFields: {
                    itemAmount: {
                        $multiply: [
                            "$cartItems.cartQuantity",
                            { $toDouble: "$equipment.equipmentPrice" }
                        ]
                    }
                }
            },

            {
                $group: {
                    _id: "$_id",
                    bookingDate: { $first: "$bookDate" },
                    bookStatus: { $first: "$bookStatus" },
                    totalAmount: { $sum: "$itemAmount" },
                    customerStoreName: { $first: "$customer.customerStoreName" },

                    equipment: {
                        $push: {
                            name: "$equipment.equipmentName",
                            photo: "$equipment.equipmentPhoto",
                            quantity: "$cartItems.cartQuantity",
                            price: { $toDouble: "$equipment.equipmentPrice" },
                            itemAmount: "$itemAmount"
                        }
                    }
                }
            },

            // newest first
            { $sort: { bookingDate: -1 } }

        ]);

        res.json({ success: true, bookings });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

//----------------------------List of All Medicine to Rep------------------------

app.get("/representativeMedicinesList", async (req, res) => {
    try {

        const medicines = await Medicine.find()
            .populate("categoryId", "categoryName")
            .populate("typeId", "typeName")
            .populate("brandId", "brandName")
            .sort({ medicineName: 1 }); // alphabetical

        res.json({
            success: true,
            medicines
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});
//------------------Medicine Customer Change Password--------------------
app.put("/MedCustomerPassword/:id", async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const customer = await Customer.findOne({ _id: req.params.id, customerPassword: oldPassword });
    if (!customer)
        return res.json({ message: "Old password is incorrect" });

    customer.customerPassword = newPassword;
    await customer.save();
    res.json({ message: "Password changed successfully" });
});
//-------Equipment Customer Change Password---------------------------------
app.put("/EquiCustomerPassword/:id", async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const Equicustomer = await EquipmentCustomer.findOne({ _id: req.params.id, customerPassword: oldPassword });
    if (!Equicustomer)
        return res.json({ message: "Old password is incorrect" });

    Equicustomer.customerPassword = newPassword;
    await Equicustomer.save();
    res.json({ message: "Password changed successfully" });
});









//--------------------------------Inventory Medicine Stock Manage----------------------------------
app.get("/inventoryMedicinesManage", async (req, res) => {
    try {

        const medicines = await Medicine.aggregate([

            {
                $lookup: {
                    from: "stockcollections",
                    localField: "_id",
                    foreignField: "medicineId",
                    as: "stock"
                }
            },

            // Convert dates + quantity
            {
                $addFields: {
                    totalStock: {
                        $sum: {
                            $map: {
                                input: "$stock",
                                as: "s",
                                in: { $toInt: "$$s.stockQuantity" }
                            }
                        }
                    },

                    // Convert dates to proper format
                    expiryDates: {
                        $map: {
                            input: "$stock",
                            as: "s",
                            in: { $toDate: "$$s.medicineExpireDate" }
                        }
                    },

                    manufactureDates: {
                        $map: {
                            input: "$stock",
                            as: "s",
                            in: { $toDate: "$$s.medicineManufactureDate" }
                        }
                    }
                }
            },


            {
                $addFields: {
                    earliestExpiry: { $min: "$expiryDates" },
                    latestManufacture: { $max: "$manufactureDates" }
                }
            },

            {
                $lookup: {
                    from: "brandcollections",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "categorycollections",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "typecollections",
                    localField: "typeId",
                    foreignField: "_id",
                    as: "type"
                }
            },
            { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    _id: 1,
                    medicineName: 1,
                    medicinePrice: 1,
                    medicinePhoto: 1,

                    brandName: "$brand.brandName",
                    categoryName: "$category.categoryName",
                    typeName: "$type.typeName",

                    totalStock: 1,


                    expiryDate: "$earliestExpiry",
                    manufactureDate: "$latestManufacture"
                }
            }

        ]);

        res.json({ success: true, medicine: medicines });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//----------------Customer Medicine View----------------------------------
app.get("/customerMedicinesView", async (req, res) => {
    try {

        const medicines = await Medicine.aggregate([

            // ---------- STOCK LOOKUP ----------
            {
                $lookup: {
                    from: "stockcollections",
                    localField: "_id",
                    foreignField: "medicineId",
                    as: "stock"
                }
            },

            // ---------- TOTAL STOCK ----------
            {
                $addFields: {
                    totalStock: {
                        $sum: {
                            $map: {
                                input: "$stock",
                                as: "s",
                                in: { $toInt: "$$s.stockQuantity" }
                            }
                        }
                    }
                }
            },

            // ---------- STOCK STATUS ----------
            {
                $addFields: {
                    stockStatus: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$totalStock", 0] }, then: "OUT_OF_STOCK" },
                                { case: { $lte: ["$totalStock", 10] }, then: "LIMITED" }
                            ],
                            default: "AVAILABLE"
                        }
                    }
                }
            },

            // ---------- BRAND ----------
            {
                $lookup: {
                    from: "brandcollections",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },

            // ---------- CATEGORY ----------
            {
                $lookup: {
                    from: "categorycollections",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

            // ---------- TYPE ----------
            {
                $lookup: {
                    from: "typecollections",
                    localField: "typeId",
                    foreignField: "_id",
                    as: "type"
                }
            },
            { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

            // ---------- FINAL OUTPUT ----------
            {
                $project: {
                    _id: 1,
                    medicineName: 1,
                    medicinePrice: 1,
                    medicinePhoto: 1,
                    medicineDistription: 1,

                    brandName: "$brand.brandName",
                    categoryName: "$category.categoryName",
                    typeName: "$type.typeName",

                    totalStock: 1,
                    stockStatus: 1
                }
            }

        ]);

        res.json({ medicine: medicines });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//------------------------------Inventory equipment managment page-----------------------------
app.get("/inventoryEquipmentManage", async (req, res) => {
    try {

        const equipments = await Equipment.aggregate([

            {
                $lookup: {
                    from: "stockcollections",
                    localField: "_id",
                    foreignField: "equipmentId",
                    as: "stock"
                }
            },

            {
                $addFields: {
                    // Total stock
                    totalStock: {
                        $sum: {
                            $map: {
                                input: "$stock",
                                as: "s",
                                in: { $toInt: "$$s.stockQuantity" }
                            }
                        }
                    },

                    // ✅ SIMPLE: directly get min/max
                    expiryDate: { $min: "$stock.medicineExpireDate" },
                    manufactureDate: { $max: "$stock.medicineManufactureDate" }
                }
            },

            {
                $lookup: {
                    from: "brandcollections",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brandId"
                }
            },
            { $unwind: "$brandId" },

            {
                $lookup: {
                    from: "equipmentcategorycollections",
                    localField: "equcategoryId",
                    foreignField: "_id",
                    as: "equcategoryId"
                }
            },
            { $unwind: "$equcategoryId" },

            {
                $project: {
                    equipmentName: 1,
                    equipmentPhoto: 1,
                    equipmentPrice: 1,
                    totalStock: 1,

                    expiryDate: 1,
                    manufactureDate: 1,

                    "brandId.brandName": 1,
                    "equcategoryId.equcategoryName": 1
                }
            }

        ]);

        res.json({ success: true, equipment: equipments });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//-------------------Equipment customer View----------------------------
app.get("/customerEquipmentView", async (req, res) => {
    try {

        const equipments = await Equipment.aggregate([

            {
                $lookup: {
                    from: "stockcollections",
                    localField: "_id",
                    foreignField: "equipmentId",
                    as: "stock"
                }
            },

            {
                $addFields: {
                    totalStock: {
                        $sum: {
                            $map: {
                                input: "$stock",
                                as: "s",
                                in: { $toInt: "$$s.stockQuantity" }
                            }
                        }
                    }
                }
            },

            {
                $addFields: {
                    stockStatus: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$totalStock", 0] }, then: "OUT_OF_STOCK" },
                                { case: { $lte: ["$totalStock", 5] }, then: "LIMITED" }
                            ],
                            default: "AVAILABLE"
                        }
                    }
                }
            },

            {
                $lookup: {
                    from: "brandcollections",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brandId"
                }
            },
            { $unwind: "$brandId" },

            {
                $lookup: {
                    from: "equipmentcategorycollections",
                    localField: "equcategoryId",
                    foreignField: "_id",
                    as: "equcategoryId"
                }
            },
            { $unwind: "$equcategoryId" },

            {
                $project: {
                    equipmentName: 1,
                    equipmentPhoto: 1,
                    equipmentPrice: 1,
                    totalStock: 1,
                    stockStatus: 1,
                    "brandId.brandName": 1,
                    "equcategoryId.equcategoryName": 1
                }
            }

        ]);

        res.json({ success: true, equipment: equipments });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//-------Function mail from gest to smartMed-------------
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        sendContactEmail(name, email, message);

        res.json({ message: "Message sent successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending message" });
    }
});
