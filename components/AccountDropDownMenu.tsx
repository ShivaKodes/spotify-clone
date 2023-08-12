"use client"

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
 
import  Button  from "@/components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaUserAlt } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";


interface AccountDropdownMenuDemoProps{
    onClick:()=>void;
}
 
function AccountDropdownMenuDemo({onClick}:AccountDropdownMenuDemoProps) {
  const router=useRouter();
  const {isLoading,subscription,user}=useUser();

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
                console.log("content error",error)
            }
        }
        setLoading(false)
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white" ><FaUserAlt /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-neutral-800/50 backdrop-blur-sm border-none text-white">
        <DropdownMenuLabel >My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onClick}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={redirectToCustomerPortal} disabled={loading||isLoading}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Subscription</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default AccountDropdownMenuDemo;