import { UserDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getUserDetail = async (): Promise<UserDetails|null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data:  sessionData ,error:sessionError
  } = await supabase.auth.getSession();

  if(sessionError){
    console.log("session",sessionError.message)
    return null
  } 


  // console.log("sesssion",sessionData)
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq('id', sessionData?.session?.user?.id)
    .single();
    
    console.log("data",data)

  if (error) {
    console.log("user details error",error);
  }

  // console.log(data); // Here, TypeScript should correctly understand data is an array of UserDetails.

  return data || null;
};

export default getUserDetail;
