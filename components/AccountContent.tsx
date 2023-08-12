"use client"

import useSubscribeModal from "@/hooks/useSubscribe";
import { useUser } from "@/hooks/useUser";
import Button from "./Button";
import Image from "next/image";
import { UserDetails } from "@/types";
import MenuDropDown from "@/components/MenuDropDown"
import useMenuModal from "@/hooks/useMenuModal";
import useProfileImage from "@/hooks/useProfileImage";
import useChangePasswordModal from "@/hooks/useChangePasswordModal";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";



interface AccountContentProps{
    userData:UserDetails;
}

const AccountContent:React.FC<AccountContentProps>=({userData})=>{
    const subscribeModal=useSubscribeModal();
    const menuModal=useMenuModal();
    const passwordModal=useChangePasswordModal()
    const router=useRouter()
    
    const {isLoading,subscription,user}=useUser();

    // console.log("isLoading",isLoading)
    // console.log("user",user)

    

//    
    

     useEffect(() => {
        if (isLoading && !user) {
            console.log("inside effect")
            router.replace("/");
        }
    }, [isLoading, user, router]);
   

    console.log("userData",userData)

    const handleEditProfile=()=>{
        menuModal.onOpen();
    }
    
    const handleChangePassowrd=()=>{
        passwordModal.onOpen()
    }

    const avatarUrl=useProfileImage(userData);

    console.log("userData",userData)
        if (user === null) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400 ">
                You need to login
            </div>
        );
    }
    
    
    return(
        <div className="mb-7 px-6 text-white ">
            <div className="flex items-center  w-full justify-between">
                <article className="flex items-center gap-x-5">
                    <div className="rounded-full relative w-52 h-52">
                        <Image src={avatarUrl ?? "/images/liked.png"} fill alt="profile" className="rounded-full"/>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xl">Hello </p>
                        <p className="text-4xl font-bold">{userData?.full_name ??"No name"}</p>
                    </div>
                </article>
                {/* <Button className="justify-self-end w-min bg-transparent" >
                    <MoreHorizontal className="text-white"/>
                </Button> */}
                <MenuDropDown handleEditProfile={handleEditProfile} handleChangePassowrd={handleChangePassowrd}/>
            </div>
            {!subscription && 
            <div className="flex flex-col gap-y-4 ">
              <p>No active Plan</p>  
              <Button onClick={subscribeModal.onOpen} className="w-[300px]">
                Subscribe
              </Button>
            </div>
            }
            {subscription&&
            <div className="flex flex-col gap-y-4 mt-5">
                <p>You are currently on <b className="text-emerald-500">{subscription?.prices?.products?.name}</b> Plan</p>
            </div>}
            {/* <ProfileForm user={userData}/> */}
        </div>
    )
}

export default AccountContent