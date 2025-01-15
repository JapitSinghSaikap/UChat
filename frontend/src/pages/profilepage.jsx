import { useState } from "react";
import { authCheck } from "../store/authCheck";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = authCheck();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      try {
        await updateProfile({ profilePic: base64Image });
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    };
  };

  return (
    <div className="min-h-screen grid place-items-center bg-[#121212]">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-[#181818] shadow-lg rounded-xl w-[38rem]">
        <div className="w-full space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mt-2 text-[#f0f0f0]">Your Profile</h1>
            <p className="text-[#b3b3b3]">Update your account information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#444444]"
              /> */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#444444]">
                        <img
                          src={selectedImg || authUser?.profilePic || "/avatar.png"}
                          className="w-full h-full object-cover"
                        />
                        {!selectedImg && !authUser?.profilePic && (
                          <div className="absolute inset-0 flex items-center justify-center text-[#f0f0f0] text-sm font-semibold">
                            Profile
                          </div>
                        )}
                      </div>

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-[#333333] hover:bg-[#444444] 
                p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-[#f0f0f0]" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-[#b3b3b3]">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-[#f0f0f0] flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-[#222222] rounded-lg border border-[#444444] text-[#f0f0f0]">
                {authUser?.fullName || "N/A"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-[#f0f0f0] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-[#222222] rounded-lg border border-[#444444] text-[#f0f0f0]">
                {authUser?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[#181818] rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4 text-[#f0f0f0]">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-[#444444]">
                <span className="text-[#f0f0f0]">Member Since</span>
                <span className="text-[#b3b3b3]">
                  {authUser?.createdAt
                    ? authUser.createdAt.split("T")[0]
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#f0f0f0]">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
