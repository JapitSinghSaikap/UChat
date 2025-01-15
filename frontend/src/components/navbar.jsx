import { Link } from "react-router-dom";
import { authCheck } from "../store/authCheck";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = authCheck();

  return (
    <header
      className="bg-[#181818] border-b  fixed w-full top-0 z-40 "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-[#181818] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary bg-[#181818]" />
              </div>
              <h1 className="text-lg font-bold">UChat</h1>
            </Link>
          </div>

          <div className="flex items-center ml-12 gap-12">
            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;