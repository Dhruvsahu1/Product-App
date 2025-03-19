const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../models/product");

// Handle Image Upload
const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtils(url);

        res.json({ success: true, result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error Occurred" });
    }
};

// Add a new Product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        
        if (!title || !price || !totalStock) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        });

        await newlyCreatedProduct.save();
        res.status(201).json({ success: true, data: newlyCreatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error Occurred" });
    }
};

// Fetch all Products
const fetchAllProducts = async (req, res) => {
    try {
        const productList = await Product.find({});
        res.status(200).json({ success: true, data: productList });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error Occurred" });
    }
};

// Edit a Product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }

        // Update fields only if they are provided
        if (title) findProduct.title = title;
        if (description) findProduct.description = description;
        if (category) findProduct.category = category;
        if (brand) findProduct.brand = brand;
        if (price) findProduct.price = price;
        if (salePrice) findProduct.salePrice = salePrice;
        if (totalStock) findProduct.totalStock = totalStock;
        if (image) findProduct.image = image;

        await findProduct.save();
        res.status(200).json({ success: true, data: findProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error Occurred" });
    }
};

// Delete a Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }

        res.status(200).json({ success: true, message: "Product Deleted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error Occurred" });
    }
};

module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct };
