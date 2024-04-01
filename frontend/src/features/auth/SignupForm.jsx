import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupService } from "../../services/user.service";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const SignupForm = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signupService(formData);
      setToken(res.token);
      toast.success("signed up!");
      await queryClient.refetchQueries("User");
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-6 w-1/2 rounded-lg border border-black p-10 lg:w-1/3">
      <form onSubmit={handleSignup} className="grid grid-cols-1 gap-4">
        <div className="flex justify-center">
          <label>Full Name:</label>
          <input
            required
            name="fullName"
            type="text"
            placeholder="full name"
            className="mx-2 rounded-md border border-gray-400 px-2 text-sm"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <label>Email</label>
          <input
            required
            name="email"
            type="email"
            placeholder="email"
            className="mx-2 rounded-md border border-gray-400 px-2 text-sm"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <label>Password</label>
          <input
            required
            name="password"
            type="password"
            placeholder="password"
            className="mx-2 rounded-md border border-gray-400 px-2 text-sm"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <button className="rounded-md bg-black px-4 py-2 text-custom-gray">
            Signup
          </button>
        </div>
        <div className="flex justify-center gap-2 py-2 text-sm">
          <span>Already have an account?</span>
          <Link to={"/login"} className="font-medium text-custom-purple">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
