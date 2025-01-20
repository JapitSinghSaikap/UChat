import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {authCheck} from "../store/authCheck"

export const chatCheck = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch users";
      toast.error(errorMessage);
    } finally {
      set({ isUsersLoading: false });
    }
  },


  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch messages";
      toast.error(errorMessage);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected for the chat.");
      return;
    }
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send message";
      toast.error(errorMessage);
    }
  },

 
  subscribeToMessages: () => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    const socket = authCheck.getState().socket;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        set({ messages: [...messages, newMessage] });
      }
    });
  },


  unsubscribeFromMessages: () => {
    const socket = authCheck.getState().socket;
    socket.off("newMessage");
  },


  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
