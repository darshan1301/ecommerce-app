import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { authToken, userData, clearToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  function handleLogout() {
    clearToken();
    toast.success("Logged Out!");
    queryClient.clear();
    navigate("/");
  }
  return (
    <div className="">
      <nav className="mb-1 flex w-full items-center justify-between  bg-white px-4 py-3 shadow-lg md:px-20">
        <div>
          <h1 className="text-lg font-semibold uppercase">
            <NavLink to={"/"}>Ecommerce</NavLink>
          </h1>
        </div>
        <div className="space-x-6 text-sm font-medium uppercase text-custom-purple">
          {authToken ? (
            <>
              <NavLink to={"/cart"}>Cart</NavLink>
              <NavLink to={"/myorders"}>My Orders</NavLink>
              {userData?.user?.role === "ADMIN" && (
                <NavLink to={"/admin"}>Dashboard</NavLink>
              )}
              <button onClick={handleLogout} className=" uppercase">
                LogOut
              </button>
            </>
          ) : (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/signup"}>Signup</NavLink>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Navbar;
