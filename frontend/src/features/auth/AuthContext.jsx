/* eslint-disable react/prop-types */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { getUserInfoService } from "../../services/user.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setauthToken] = useState(() =>
    localStorage.getItem("authToken"),
  );

  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    authToken ? true : false,
  );

  const { data: userData } = useQuery({
    queryKey: ["User"],
    queryFn: isAuthenticated ? getUserInfoService : null,
  });

  const setToken = async (token) => {
    localStorage.setItem("authToken", token);
    setauthToken(token);
    setIsAuthenticated(true);
  };

  const clearToken = () => {
    setauthToken("");
    localStorage.removeItem("authToken");
    // Clear data for USER
    queryClient.removeQueries("User");
    setIsAuthenticated(false);
  };

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setToken,
        clearToken,
        headers,
        isAuthenticated,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
