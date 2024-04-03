import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/user.service";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService(formData);
      setToken(res.token);
      toast.success("Logged In.");
      await queryClient.refetchQueries("User");
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-6 w-1/2 rounded-lg border border-black p-10 lg:w-1/3">
      <form onSubmit={handleLogin} className="grid grid-cols-1 gap-4">
        <div className="flex justify-center">
          <label>Email</label>
          <input
            value={formData.email}
            onChange={handleInputChange}
            required
            name="email"
            type="email"
            placeholder="email"
            className="mx-2 rounded-md border border-gray-400 px-2 text-sm"
          />
        </div>
        <div className="flex justify-center">
          <label>Password</label>
          <input
            onChange={handleInputChange}
            required
            value={formData.password}
            name="password"
            type="password"
            placeholder="password"
            className="mx-2 rounded-md border border-gray-400 px-2 text-sm"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <button className="rounded-md bg-black px-8 py-2 text-custom-gray">
            Login
          </button>
        </div>
        <div className="flex justify-center gap-2 py-2 text-sm">
          <span>{"Don't have an account?"}</span>
          <Link to={"/signup"} className="font-medium text-custom-purple">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
