import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal"
import useMenuModal from "@/hooks/useMenuModal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

import uniqid from "uniqid";


const MenuModal=()=>{
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const router = useRouter();

    const [isLoading,setIsLoading]=useState(false)
    const menuModal=useMenuModal();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
        full_name: "",
        avatar_url: "",
        },
    });

    

    const onChange = (open: boolean) => {
        if (!open) {
        menuModal.onClose();
        }
    }

  const onSubmit:SubmitHandler<FieldValues>= async (values)=>{
        try {
            setIsLoading(true)
            const fullName=values.full_name;
            const avatarFile=values.avatar_url?.[0];
            console.log(fullName,avatarFile)
           

            if (!fullName || !avatarFile || !user) {
                // toast.error("Missing fields");
                console.log("missing fields")
                return;
            }

            //unique id for each record:user-avatar
            const uniqueID = uniqid();

            // Upload image
            const { data: imageData, error: imageError } =await supabaseClient.storage
                .from("user-avatar")
                .upload(`image-${fullName}-${uniqueID}`, avatarFile, {
                    cacheControl: "3600",
                    upsert: false,
                });


                console.log("image data",imageData)
                console.log("error",imageError)

            if (imageError) {
                setIsLoading(false);
                return toast.error("Failed image upload");
            }

            const { error: supabaseError } = await supabaseClient
                .from("users")
                .update({
                    full_name: fullName,
                    avatar_url: imageData.path,
                })
                .eq('id',user.id);

            if (supabaseError) {
                return toast.error(supabaseError.message);
            }


            router.refresh();
            setIsLoading(false);
            toast.success("Changes Saved Succesfully!");
            reset();
            menuModal.onClose();

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }finally{
            setIsLoading(false)
        }
  }


  return(
            <Modal
            title="Edit Profile"
            description="Edit info of your profile"
            isOpen={menuModal.isOpen}
            onChange={onChange}
            >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                id="full_name"
                disabled={isLoading}
                {...register("full_name", { required: true })}
                placeholder="Full Name"
                />
                
                <div className="pb-1">Select an image</div>
                <Input
                    placeholder="test"
                    disabled={isLoading}
                    type="file"
                    accept="image/*"
                    id="avatar_url"
                    {...register("avatar_url", { required: true })}
                />
                
                <Button disabled={isLoading} type="submit">
                    Save
                </Button>
            </form>
            </Modal >
        )
}

export default MenuModal;