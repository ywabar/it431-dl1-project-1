import React, { useContext } from "react";
import { UserContext } from "./userContext";

export default function Navbar() {
  const userContext = useContext(UserContext);
  const { user, isLoading } = userContext;

  return (
    <nav>
      <div>
        <h1
          className="bg-orange"
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          IT431-DL1 Project 2
        </h1>
      </div>
      <div>
        <a
          href="/"
          className={document.location.pathname == "/" ? "active" : ""}
        >
          Home
        </a>
        <a
          href="/products"
          className={
            document.location.pathname.includes("/products") ? "active" : ""
          }
        >
          Products
        </a>
        {!isLoading && !user ? (
          <a
            href="/login"
            className={
              document.location.pathname.includes("/login") ||
              document.location.pathname.includes("/register")
                ? "active"
                : ""
            }
          >
            Login/Register
          </a>
        ) : !isLoading && user ? (
          <a
            href="/account"
            className={
              document.location.pathname.includes("/account") ? "active" : ""
            }
          >
            My Account
          </a>
        ) : null}
      </div>
    </nav>
  );
}
