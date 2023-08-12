import { useUser } from "@/hooks/useUser";
import Input from "./Input"
import Modal from "./Modal"
import useChangePasswordModal from "@/hooks/useChangePasswordModal";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {  useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { toast } from "react-hot-toast";

const ChangePasswordModal=()=>{
    const passwordModal=useChangePasswordModal();
    const {user}=useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    
    const [isLoading,setIsLoading]=useState(false)

    // get the user email from user object
    const userEmail=user?.email;
    

    // useForm hook to set defaul values and destructure register, handleSubmit, reset functions
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            permission:false
        },
    });

    // function to handle change in modal state
    // basically close it
    const onChange=(open: boolean)=>{
        if (!open) {
            passwordModal.onClose();
        }
    }
    


    // function to handle submit behaviour on the modal
    const onSubmit:SubmitHandler<FieldValues>= async (values)=>{
        try {
            // start loading
            setIsLoading(true)
            
            // check whether the user has given the permission
            // if not then show error toast and do not proceed further
            if(!values.permission){
                toast.error("Check the box to proceed")
                return; 
            }

            // proceed when the user has given the permission
            
            // trigger the email with login link

            const { data, error } = await supabaseClient.auth.resetPasswordForEmail(userEmail!)

            
            // if error occurs while sending the email
            // show the error toast
            if(error){
                toast.error("An error occured while sending email")
                console.log(error)
            }

            console.log(data)

            //refresh page
            router.refresh();

            //set loading false
            setIsLoading(false);

            // show a success toast
            toast.success("Email Sent!");

            // reset form field
            reset();

            // close the modal
            passwordModal.onClose();

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }finally{
            setIsLoading(false)
        }
        
    }

     return(
            <Modal
            title="Change Password"
            description="Modify your password"
            isOpen={passwordModal.isOpen}
            onChange={onChange}
            >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <p>This will trigger a email to your registered email address to reset the password</p>
                <div className="flex items-center justify-center w-full">
                    <Input
                        id="permission"
                        type="checkbox"
                        disabled={isLoading}
                        {...register("permission", { required: true })}
                        placeholder="Full Name"
                        className="inline w-min"
                    />
                    <Label htmlFor="permission" >Are you sure</Label>
                </div>
                <Button disabled={isLoading} type="submit">
                    Email the link
                </Button>
            </form>
            </Modal >
        )
}

export default ChangePasswordModal