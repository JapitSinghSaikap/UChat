import { useState } from "react";
import { authCheck } from "../store/authCheck"; // Fixed import
import { Camera, Mail, User } from "lucide-react";

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
    <div className="h-screen bg-gray-900 text-white pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-gray-800 rounded-xl p-6 space-y-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Your Profile</h1>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                // alt="Profile"x`
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 
                p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
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
            <p className="text-sm text-gray-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600">
                {authUser?.fullName || "N/A"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600">
                {authUser?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span>Member Since</span>
                <span>
                  {authUser?.createdAt
                    ? authUser.createdAt.split("T")[0]
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
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
