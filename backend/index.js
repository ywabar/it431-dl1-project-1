const express = require("express");
const fs = require("fs-extra");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
const FILE_PATH = "./products.json";

app.use(express.json());
app.use(cors());

//reading files
const readProducts = async () => {
  try {
    return await fs.readJson(FILE_PATH);
  } catch (err) {
    return {};
  }
};

//write to file
const writeProducts = async (courses) => {
  await fs.writeJson(FILE_PATH, courses, { spaces: 2 });
};

//get all products
app.get("/products", async (req, res) => {
  const products = await readProducts();
  res.json({ products, message: "Products fetched successfully" });
});

//get a product
app.get("/products/:id", async (req, res) => {
  const products = await readProducts();
  const product = products[req.params.id];
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({ product, message: "Product fetched successfully" });
});

//create a product
app.post("/products", async (req, res) => {
  const products = await readProducts();
  const id = Object.keys(products).length + 1;
  products[id] = { id, ...req.body, createdAt: new Date().toLocaleString() };
  console.log(products);
  await writeProducts(products);
  res.json({ product: products[id], message: "Product created successfully" });
});

//update a product
app.put("/products/:id", async (req, res) => {
  const products = await readProducts();
  if (!products[req.params.id]) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[req.params.id] = {
    id: req.params.id,
    ...req.body,
    createdAt: products[req.params.id].createdAt,
  };
  await writeProducts(products);
  res.json({ message: "Product updated successfully" });
});

//delete a product
app.delete("/products/:id", async (req, res) => {
  const products = await readProducts();
  if (!products[req.params.id]) {
    return res.status(404).json({ message: "Product not found" });
  }
  delete products[req.params.id];
  await writeProducts(products);
  res.json({ message: "Product deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
