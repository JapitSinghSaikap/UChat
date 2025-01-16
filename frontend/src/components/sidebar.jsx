import { chatCheck } from "../store/chatCheck";
import { authCheck } from "../store/authCheck";
import { Users } from "lucide-react";
import SidebarSkeleton from "../skeletons/sidebarSkeleton";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const { getUsers, users = [], selectedUser, setSelectedUser, isUsersLoading } = chatCheck();
  const { onlineUsers = [], loggedInUser } = authCheck(); 
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  
  const filtered = users
    .filter((user) => user._id !== loggedInUser?._id) 
    .filter((user) => (showOnlineOnly ? onlineUsers?.includes(user._id) : true)); 

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72  flex flex-col transition-all duration-200 bg-[#211f1f]">
      <div className="border-b  w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filtered.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-400 ring-1 ring-base-300" : ""}`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {/* {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"
                />
              )} */}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
