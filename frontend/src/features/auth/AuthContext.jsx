/* eslint-disable react/prop-types */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
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

  const clearToken = useCallback(() => {
    setauthToken("");
    localStorage.removeItem("authToken");
    // Clear data for USER
    queryClient.removeQueries("User");
    setIsAuthenticated(false);
  }, [queryClient]);

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${authToken}`,
    }),
    [authToken],
  );

  const contextValue = useMemo(
    () => ({
      authToken,
      setToken,
      clearToken,
      headers,
      isAuthenticated,
      userData,
    }),
    [authToken, isAuthenticated, userData, clearToken, headers],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
