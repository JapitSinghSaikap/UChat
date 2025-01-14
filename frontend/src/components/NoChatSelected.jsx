import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#181818]">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-[#333333] flex items-center
              justify-center animate-bounce transition-colors group-hover:bg-[#444444]"
            >
              <MessageSquare className="w-8 h-8 text-[#dad2d2]" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#f0f0f0]">Welcome to UChat !</h2>
        <p className="text-[#b3b3b3]">Have a Happy Day Chatting !!!</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
