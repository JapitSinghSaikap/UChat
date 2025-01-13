import { chatCheck } from "../store/chatCheck";
import NoChatSelected from "../components/NoChatSelected";
import { ChatContainer } from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = chatCheck();

  return (
    <div className="h-screen bg-[#121212]">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-[#181818] rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
