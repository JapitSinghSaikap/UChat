import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const OTPVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const response = await axios.post("/api/send-otp", { email });
      toast.success(response.data.message);
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("/api/verify-otp", { email, otp });
      toast.success(response.data.message);
      navigate("/login"); // Redirect to login page after OTP verification
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="p-6 bg-[#181818] text-white rounded-lg w-[28rem]">
        {!otpSent ? (
          <div>
            <h2 className="text-xl mb-4">Send OTP</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 bg-[#222222] text-[#f0f0f0] rounded"
            />
            <button
              onClick={handleSendOTP}
              className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-4">Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 mb-4 bg-[#222222] text-[#f0f0f0] rounded"
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full p-2 bg-green-500 rounded hover:bg-green-600"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
