import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toast";

export function useProducts() {
  const [products, setProducts] = useState({});
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get("/products");
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  const getSpecificProduct = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products/${id}`);
      setLoading(false);
      setProduct(data.product);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const createProduct = async (e, product) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/products", product);
      window.location.href = `/products`;
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const updateProduct = async (e, id, product) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/products/${id}`, product);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const deleteProduct = async (e, id) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.delete(`/products/${id}`);

      window.location.href = "/products";
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return {
    products,
    product,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    getSpecificProduct,
  };
}
