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

  const filteredUsers = users
    .filter((user) => user._id !== loggedInUser?._id) // Exclude the logged-in user
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true)); // Apply online-only filter if enabled

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 flex flex-col transition-all duration-200 bg-[#211f1f]">
      <div className="border-b border-[#383838] w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-white" />
          <span className="font-medium text-white hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm bg-[#383838] border-[#5a5a5a] focus:ring-white"
            />
            <span className="text-sm text-white">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-[#383838] transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-[#383838] ring-1 ring-[#5a5a5a]"
                  : ""
              }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-[#211f1f]"
                />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-white">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
