// import { cookies } from "next/headers";
import type { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// TODO: Is this how am I gonna get attendances for a user?
const getLikedSongs = async (): Promise<Song[]> => {
  //   const supabase = createServerComponentClient({
  //     cookies: cookies,
  //   });
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   const { data } = await supabase
  //     .from("liked_songs")
  //     .select("*, songs(*)")
  //     .eq("user_id", session?.user?.id)
  //     .order("created_at", { ascending: false });
  //   if (!data) return [];
  //   return data.map((item) => ({
  //     ...item.songs,
  //   }));
};

export default getLikedSongs;
