"use client"

import useSubscribeModal from "@/hooks/useSubscribe";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Button from "./Button";


const AccountContent=()=>{
    const router=useRouter();
    const subscribeModal=useSubscribeModal();
    const {isLoading,subscription,user}=useUser();

    console.log(user)

    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        if(!loading && !user){
            router.replace('/')
        }
    },[loading,user,router])


    const redirectToCustomerPortal=async()=>{
        setLoading(true)
        try {
            const {url,error}=await postData({
                url:'/api/create-portal-link'
            })

            window.location.assign(url);
        } catch (error) {
            if(error){
                console.log("content erro",error)
            }
        }
        setLoading(false)
    }
    return(
        <div className="mb-7 px-6 ">
            <p className="text-4xl">Hello {user?.email}</p>
            {!subscription && 
            <div className="flex flex-col gap-y-4">
              <p>No active Plan</p>  
              <Button onClick={subscribeModal.onOpen} className="w-[300px]">
                Subscribe
              </Button>
            </div>
            }
            {subscription&&
            <div className="flex flex-col gap-y-4">
                
                <p>You are currently on <b>{subscription?.prices?.product?.name}</b>Plan</p>
                <Button 
                    disabled={loading||isLoading}
                    onClick={redirectToCustomerPortal}
                    className="w-[300px]"
                >
                    Open Customer Portal
                </Button>
            </div>}
        </div>
    )
}

export default AccountContent