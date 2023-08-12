"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {

  const supabaseClient = useSupabaseClient();

    // useEffect(() => {
    //   // console.log("ran")
    //   supabaseClient.auth.onAuthStateChange(async (event, session) => {
    //     // console.log("event",event)
    //     if (event == "PASSWORD_RECOVERY") {
    //       const newPassword = prompt("What would you like your new password to be?");
    //       const { data, error } = await supabaseClient.auth
    //         .updateUser({ password: newPassword! })

    //       if (data) alert("Password updated successfully!")
    //       if (error) alert("There was an error updating your password.")
    //     }
    //   })
    // }, [])


  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }


  


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-8 gap-4 mt-4 ">
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={(id: string) => onPlay(id)}
          data={song}
        />
      ))}
    </div>
  );
};

export default PageContent;
