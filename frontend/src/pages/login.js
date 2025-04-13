import { useContext, useState } from "react";
import "../index.css";
import { UserContext } from "../userContext";
import { useUser } from "../userHooks";

export default function LoginComponent() {
  const userContext = useContext(UserContext);
  const { user, isLoading } = userContext;
  const { loginUser } = useUser();

  const [formJson, setFormJson] = useState({
    email: "",
    password: "",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-black p-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
          Login
        </h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading && user) {
    window.location.href = "/products";
  }

  return (
    <div className="flex flex-col justify-center items-center text-black p-10">
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
        Login
      </h1>
      <div className="flex flex-row mt-5 justify-content-right">
        <form onSubmit={(e) => loginUser(e, formJson)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formJson.email}
              onChange={(e) =>
                setFormJson({ ...formJson, email: e.target.value })
              }
              required
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formJson.password}
              onChange={(e) =>
                setFormJson({ ...formJson, password: e.target.value })
              }
              required
              placeholder="Password"
            />
          </div>
          <button
            className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            type="submit"
          >
            Login
          </button>

          <div className="flex flex-column mt-5 justify-content-center">
            or..
            <a
              href="/register"
              className="justify-content-center flex items-center align-center"
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export function RegisterComponent() {
  const userContext = useContext(UserContext);
  const { user, isLoading } = userContext;
  const { registerUser } = useUser();

  const [formJson, setFormJson] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-black p-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
          Register
        </h1>

        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading && user) {
    window.location.href = "/products";
  }

  return (
    <div className="flex flex-col justify-center items-center text-black p-10">
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
        Register
      </h1>
      <div className="flex flex-row mt-5 justify-content-right">
        <form onSubmit={(e) => registerUser(e, formJson)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formJson.email}
              onChange={(e) =>
                setFormJson({ ...formJson, email: e.target.value })
              }
              required
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formJson.name}
              onChange={(e) =>
                setFormJson({ ...formJson, name: e.target.value })
              }
              required
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formJson.password}
              onChange={(e) =>
                setFormJson({ ...formJson, password: e.target.value })
              }
              required
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formJson.confirmPassword}
              onChange={(e) =>
                setFormJson({
                  ...formJson,
                  confirmPassword: e.target.value,
                })
              }
              required
              placeholder="Confirm Password"
            />
          </div>
          <button
            className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            type="submit"
          >
            Register
          </button>

          <div className="flex flex-column mt-5 justify-content-center">
            or..
            <a
              href="/login"
              className="justify-content-center flex items-center align-center"
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export const AccountComponent = () => {
  const userContext = useContext(UserContext);
  const { user, isLoading } = userContext;
  const { logoutUser, deleteAccount } = useUser();

  console.log(user);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-black p-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
          My Account
        </h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading && !user) {
    window.location.href = "/login";
  }

  return (
    <div className="flex flex-col justify-center items-center text-black p-10">
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
        My Account
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <h2 style={{ fontSize: "large" }}>Welcome back {user.userInfo.name}</h2>
        <div className="flex flex-row mt-5 justify-content-right gap-2">
          <button
            className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            onClick={(e) => logoutUser(e)}
          >
            Logout
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg font-bold tracking-wide shadow-lg hover:bg-gray-500"
            onClick={(e) => deleteAccount(e)}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
