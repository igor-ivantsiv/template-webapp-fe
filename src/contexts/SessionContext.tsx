import React, { createContext, useEffect, useState, ReactNode } from "react";

interface SessionContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  token: string | undefined;
  requestWithToken: (
    endpoint: string,
    method?: string,
    payload?: any
  ) => Promise<any>;
  handleLogout: () => void;
  currentUser: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionContextProviderProps {
  children: ReactNode;
}

const SessionContextProvider: React.FC<SessionContextProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string | undefined>(undefined); // Change type to string or undefined
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<string>("");

  // Remove token from local storage
  const removeToken = () => {
    window.localStorage.removeItem("authToken");
  };

  // Verify token on backend
  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`, 
        {
          headers: {
            Authorization: `Bearer ${tokenToVerify}`,
          },
        }
      );

      // If response ok -> set token and authenticate
      if (response.status === 200) {
        setToken(tokenToVerify);
        setIsAuthenticated(true);
        const data = await response.json();
        setCurrentUser(data.userId);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        removeToken();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      removeToken();
    }
  };

  // Check local storage for token, verify token
  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    if (localToken) {
      verifyToken(localToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Save token in local storage and verify to get name and role
  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
      verifyToken(token);
    }
  }, [token]);

  // Make requests with token
  const requestWithToken = async (
    endpoint: string,
    method: string = "GET",
    payload?: any
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

  const handleLogout = () => {
    removeToken();
    setToken(undefined); // Set token to undefined
    setIsAuthenticated(false);
    setCurrentUser("");
    };

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setToken,
        token,
        requestWithToken,
        handleLogout,
        currentUser,
        setIsLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
export { SessionContext };
