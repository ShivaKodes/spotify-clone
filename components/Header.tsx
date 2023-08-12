"use client";

import { useRouter } from "next/navigation";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";


import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";
import AccountDropdownMenuDemo from "./AccountDropDownMenu"
import { FaUserAlt } from "react-icons/fa";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const player=usePlayer();

  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const { user } = useUser();

  // console.log("user",user)
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    
    if (error) {
      toast.error(error.message);
    } else {
      // window.location.href="/"
      router.push("/")
      toast.success("Logged out successfully");
      // router.refresh();
    }
  };

  const HandleAccountClick=()=>{
    router.push('/account')
  }

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-indigo-400 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <Button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition" onClick={()=>router.push("/")}>
            <HiHome className="text-black" size={20} />
          </Button>
          <Button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition" onClick={()=>router.push("/search")}>
            <BiSearch className="text-black" size={20} />
          </Button>
        </div>
        <div className="flex gap-x-4 items-center">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              {/* <Button className="bg-white" onClick={HandleAccountClick}><FaUserAlt /></Button> */}

              <AccountDropdownMenuDemo onClick={HandleAccountClick}/>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  SignUp
                </Button>
              </div>
              <div>
                <Button onClick={authModal.onOpen} className="bg-white px-6 py-2">
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
