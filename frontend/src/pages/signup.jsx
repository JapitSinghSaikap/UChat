import { useState } from "react";
import { authCheck } from "../store/authCheck";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = authCheck();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-[#121212]">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-[#181818] shadow-lg rounded-xl w-[28rem]">
        <div className="w-full space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-[#333333] flex items-center justify-center 
              group-hover:bg-[#444444] transition-colors"
              >
                <MessageSquare className="size-6 text-[#dad2d2]" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-[#f0f0f0]">Create Account</h1>
              <p className="text-[#b3b3b3]">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-[#f0f0f0]">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-[#888888]" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 bg-[#222222] text-[#f0f0f0] border-[#444444] focus:ring-[#555555]`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-[#f0f0f0]">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-[#888888]" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-[#222222] text-[#f0f0f0] border-[#444444] focus:ring-[#555555]`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-[#f0f0f0]">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-[#888888]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 bg-[#222222] text-[#f0f0f0] border-[#444444] focus:ring-[#555555]`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-[#888888]" />
                  ) : (
                    <Eye className="size-5 text-[#888888]" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn w-full bg-[#444444] text-[#f0f0f0] hover:bg-[#555555]" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[#b3b3b3]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#888888] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
