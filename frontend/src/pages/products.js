import { useParams } from "react-router-dom";
import "../index.css";
import { useProducts } from "../productHooks";
import { useEffect, useState } from "react";

export default function ProductsComponent() {
  const { products, loading } = useProducts();

  // console.log(products);
  console.log(Object.keys(products).length);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center text-black p-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
          All Products
        </h1>
        <div className="flex flex-row mt-10 justify-content-right">
          <button
            className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            onClick={() => (window.location.href = "/products/create")}
          >
            + Create
          </button>
        </div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center text-black p-10">
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
        All Products
      </h1>
      <div className="flex flex-row mt-5 justify-content-right">
        <button
          className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
          onClick={() => (window.location.href = "/products/create")}
        >
          + Create
        </button>
      </div>
      <div style={{ width: "100%", minWidth: "300px", overflowX: "auto" }}>
        {!products || Object.keys(products) == 0 ? (
          <table style={{ marginTop: "20px" }}>
            <h2
              style={{
                padding: "10px",
                textAlign: "center",
                fontWeight: "600",
              }}
              className="text-gray-900 text-2xl"
            >
              No results found
            </h2>
          </table>
        ) : (
          <table style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Created Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(products).map((product) => (
                <tr
                  key={products[product].id}
                  onClick={() => {
                    window.location.href = "/products/" + products[product].id;
                  }}
                >
                  <td>{products[product].id}</td>
                  <td>{products[product].name}</td>
                  <td>${products[product].price}</td>
                  <td>{products[product].createdAt}</td>
                  <td style={{ width: "80px" }}>
                    <a href="#">Modify</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function CreateProductComponent() {
  const { createProduct } = useProducts();
  return (
    <div className="flex flex-col justify-center items-center text-black p-10">
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
        New Product
      </h1>
      <form
        onSubmit={(e) => {
          createProduct(e, {
            name: e.target.name.value,
            price: e.target.price.value,
          });
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Product Name"
            required
          />
        </div>
        <div>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            placeholder="$20.00"
            required
          />
        </div>
        <div>
          <button
            className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            type="submit"
          >
            Create
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            onClick={() => (window.location.href = "/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export function ModifyProductComponent() {
  const { id } = useParams();
  const { updateProduct, deleteProduct, product, getSpecificProduct } =
    useProducts();

  console.log(id);

  useEffect(() => {
    getSpecificProduct(id);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-black p-10">
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
        New Product
      </h1>
      <form
        onSubmit={(e) => {
          updateProduct(e, id, {
            name: e.target.name.value,
            price: e.target.price.value,
          });
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Product Name"
            defaultValue={product.name}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            placeholder="$20.00"
            defaultValue={product.price}
            required
          />
        </div>
        <div>Created Date: {product.createdAt}</div>
        <div>
          <button
            className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            type="submit"
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            onClick={(e) => deleteProduct(e, id)}
          >
            Delete
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            onClick={() => (window.location.href = "/products")}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
