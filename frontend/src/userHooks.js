import axios from "axios";
import { useState } from "react";
import { toast } from "react-toast";

export function useUser() {
  const [loading, setLoading] = useState(true);

  const loginUser = async (e, userForm) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/user/login", userForm);
      window.location.href = `/products`;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const registerUser = async (e, userForm) => {
    e.preventDefault();
    if (userForm.password !== userForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/user/register", userForm);
      toast.success("User registered successfully");
      window.location.href = "/products";
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`/user/logout`);
      toast.success("Product logged out");
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.delete(`/user`);
      toast.success("Account deleted successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return {
    loading,
    loginUser,
    logoutUser,
    registerUser,
    deleteAccount,
  };
}
