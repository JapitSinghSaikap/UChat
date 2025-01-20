import { X } from "lucide-react";
import {chatCheck} from "../store/chatCheck"
import {authCheck} from "../store/authCheck"

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = chatCheck();
  const { onlineUsers } = authCheck();

  return (
    <div className="p-2.5 border-b bg-[#1b1b1b]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;