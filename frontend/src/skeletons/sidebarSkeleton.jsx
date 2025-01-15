import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r bg-[#211f1f] border-black  
    flex flex-col shadow-lg transition-all duration-400"
    >
      {/* Sidebar Header */}
      <div className="border-b border-gray-200 w-full p-5 bg-gradient-to-r from-white via-black to-[#211f1f] text-white">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-white" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full p-3 flex items-center gap-3 animate-pulse"
          >
            {/* Skeleton Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <div className="bg-gray-300 rounded-full w-12 h-12" />
            </div>
            {/* Skeleton Text */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="bg-gray-300 h-4 w-32 mb-2 rounded" />
              <div className="bg-gray-300 h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
