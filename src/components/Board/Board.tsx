import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { UserType, Point } from "@/components/Board/types";
import User from "@/components/User/User";
import "./styles.scss";
import PointModal from "@/components/PointModal/PointModal";
import { selectIsPointModalActive } from "@/components/PointModal/PointModalSlice";

import { useAppSelector } from "../../app/hooks";

function Board() {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [lovePoints, setLovePoints] = useState<Point[] | null>(null);
  const [hatePoints, setHatePoints] = useState<Point[] | null>(null);

  const isModalActive: boolean = useAppSelector(selectIsPointModalActive);

  async function getUsers() {
    try {
      const { data } = await supabase.from("users").select().returns<User[]>();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getLovePoints() {
    try {
      const { data } = await supabase
        .from("love_points")
        .select()
        .returns<Point[]>();
      setLovePoints(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getHatePoints() {
    try {
      const { data } = await supabase
        .from("hate_points")
        .select()
        .returns<Point[]>();
      setHatePoints(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUsers();
    getLovePoints();
    getHatePoints();
  }, []);

  return (
    <div className="board">
      {isModalActive && <PointModal />}
      {users?.map((user) => (
        <User {...user} key={user.id} />
      ))}
      <h2>Love:</h2>
      {lovePoints?.map((point) => (
        <div key={point.id}>{point.name}</div>
      ))}
      <h2>Hate:</h2>
      {hatePoints?.map((point) => (
        <div key={point.id}>{point.name}</div>
      ))}
    </div>
  );
}

export default Board;
