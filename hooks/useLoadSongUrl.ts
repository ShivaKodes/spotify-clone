import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song: Song) => {
  //supabaseClient to read the song from the database for any user
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return "";
  }
  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;
