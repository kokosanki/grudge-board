import Board from "@/components/Board/Board";
import { supabase } from "./supabase";
import { useEffect } from "react";

function Home() {

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
    };

    getUserId();
  }, []);
  return (
    <div className="app-wrapper">
      <h1 className="app-wrapper__header">Grudge Board</h1>
      <div className="app-wrapper__card">
        <Board />
      </div>
    </div>
  );
}

export default Home;
