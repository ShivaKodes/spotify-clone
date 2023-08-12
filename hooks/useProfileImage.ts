import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { UserDetails } from "@/types";

const useProfileImage = (userData: UserDetails) => {
  const supabaseClient = useSupabaseClient();
  console.log(userData)
  if (!userData) {
    return null;
  }

  
  const { data: imageData } = supabaseClient.storage
    .from("user-avatar")
    .getPublicUrl(userData.avatar_url);
  return imageData.publicUrl;
};

export default useProfileImage;