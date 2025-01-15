import { useEffect, useState } from "react";
import { chatCheck } from "../store/chatCheck";
import { authCheck } from "../store/authCheck";
import SidebarSkeleton from "../skeletons/sidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = chatCheck();

  const { onlineUsers } = authCheck();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filtered = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72  border-base-300 flex flex-col transition-all duration-200 bg-[#211f1f]">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;