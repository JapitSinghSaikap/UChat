import  {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const authCheck = create((set) => ({
    authUser : null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,


    isCheckingAuth: true,


    checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data });
          // get().connectSocket();
        } catch (error) {
          console.log("Error in authCheck :", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
          // get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
      },


      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
          // get().connectSocket(); // Uncomment if using socket
        } catch (error) {
          // Handle undefined error.response safely
          const errorMessage = error.response?.data?.message || "An error occurred while logging in.";
          toast.error(errorMessage);
        } finally {
          set({ isLoggingIn: false });
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
      
    
}));