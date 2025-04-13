import express from "express";
import { databaseConnection } from "../index.js";

const router = express.Router();

//get all products
router.get("/", async (req, res) => {
  try {
    const products = await databaseConnection
      .collection("products")
      .find({})
      .toArray();
    res.json({ products, message: "Products fetched successfully" });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get a product
router.get("/:id", async (req, res) => {
  try {
    const product = await databaseConnection.collection("products").findOne({
      id: Number(req.params.id),
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product, message: "Product fetched successfully" });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//create a product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing fields are required" });
    }
    const newProduct = await databaseConnection
      .collection("products")
      .insertOne({
        id: Math.floor(Math.random() * 1000000),
        name,
        description,
        price,
        category,
        createdAt: new Date().toLocaleString(),
      });
    res.json({
      product: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//update a product
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing fields are required" });
    }

    const updatedProduct = await databaseConnection
      .collection("products")
      .findOneAndUpdate(
        { id: Number(req.params.id) },
        {
          $set: {
            name,
            description,
            price,
            category,
          },
        },
        { returnOriginal: false }
      );

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete a product
router.delete("/:id", async (req, res) => {
  try {
    const productExists = await databaseConnection
      .collection("products")
      .findOne({ id: Number(req.params.id) });
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }
    await databaseConnection
      .collection("products")
      .findOneAndDelete({ id: Number(req.params.id) });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
