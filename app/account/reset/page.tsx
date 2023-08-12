"use client"

import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { Label } from "@/components/ui/label";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const ResetPassword=()=>{

    const [isLoading,setIsLoading]=useState(false)
    const [pageContent, setPageContent] = useState<JSX.Element| null>(null);
    const supabaseClient = useSupabaseClient();
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            email:"",
            password:""
        },
    });


    const onSubmit:SubmitHandler<FieldValues>= async (values)=>{
       
        try {
            setIsLoading(true)
            const { data, error } = await supabaseClient.auth.updateUser({password:values.password})

            if(!error){
                toast.success("Password change successful")
                setPageContent(<p className="text-white text-2xl">Lets groove on AP Dhillon&apos;s songs </p>)

            }else{
                toast.error("Try again!")
            }


        } catch (error:any) {
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
        

    }

  

    // if()

    return(
       <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden">
            <Header className="from-fuchsia-500" >
            <div className="mb-2 flex flex-col gap-y-6">
                <h1 className="text-white text-3xl font-semibold">
                    Reset Password
                </h1>
            </div>
            </Header >
            <div className="w-full flex items-center justify-center  h-[500px]">

                {pageContent ? pageContent:
                (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-full md:w-1/2 items-center justify-center border rounded-lg border-neutral-600/50 bg-neutral-800 py-5 px-5">
                            <p className="text-white text-2xl">Change your password</p>
                            <div className="flex flex-col gap-y-5 items-center justify-center w-full md:w-2/3 text-white">
                                <Input
                                    id="email"
                                    disabled={isLoading}
                                    {...register("email", { required: true })}
                                    placeholder="Enter Your Email"
                                    className="w-full"
                                />
                                <Input
                                    id="password"
                                    disabled={isLoading}
                                    {...register("password", { required: true })}
                                    placeholder="Enter Your New Password"
                                    className="w-full"
                                    type="password"
                                />
                                
                            </div>
                            <Button disabled={isLoading} type="submit" className="w-full md:w-2/3 py-1">
                                Reset the password
                            </Button>
                        </form>
                )}
            </div>
            </div>
        
    )
}

export default ResetPassword;