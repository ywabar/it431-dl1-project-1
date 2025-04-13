import axios from "axios";
import { createContext, useState, useEffect } from "react";

// Create the UserContext with a default value of `null`
export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const establishProfile = async () => {
      try {
        const { data } = await axios.get(
          "/user",
          {},
          {
            withCredentials: true, // Ensures cookies are sent along with the request
          }
        );
        setUser(data);
      } catch (err) {
        setUser(null); // Set user to null if there's an error
        console.error(err); // Log the error for debugging
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    if (!user) {
      establishProfile(); // Call the function to establish a profile
    } else {
      setIsLoading(false); // Set loading to false if user data is already set
    }
  }, [user]); // Add `user` to the dependency array

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
