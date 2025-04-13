import { useEffect, useState } from "react";
import "../index.css";

export default function HomeComponent() {
  const [navbarHeight, setNavbarHeight] = useState(20);
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);
  return (
    <div
      className="flex flex-col justify-center items-center bg-gradient-animated text-white p-10"
      style={{ height: `calc(100vh - ${navbarHeight}px)` }}
    >
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-100">
        IT431-DL1 Project 2 - Home
      </h1>
      <p className="text-1l font-bold tracking-wide text-gray-100">
        This is designed for IT431-DL1 Project 2
      </p>
      <p className="text-1l font-bold tracking-wide text-gray-100">
        By Yemaj W
      </p>
      <button
        className="bg-black text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-800"
        onClick={() => (window.location.href = "/products")}
      >
        Get Started
      </button>
    </div>
  );
}
