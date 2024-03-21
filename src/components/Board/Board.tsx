import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { UserType, PointType } from "@/components/Board/types";
import User from "@/components/User/User";
import "./styles.scss";
import PointModal from "@/components/PointModal/PointModal";
import Points from "@/components/Points/Points";
import { selectIsPointModalActive } from "@/components/PointModal/PointModalSlice";
import { setBoardUsers, selectBoardUsers } from "@/components/Board/BoardSlice";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

function Board() {
  const dispatch = useAppDispatch();
  const [lovePoints, setLovePoints] = useState<PointType[] | null>(null);
  const [hatePoints, setHatePoints] = useState<PointType[] | null>(null);
  const isModalActive: boolean = useAppSelector(selectIsPointModalActive);
  const users: UserType[] = useAppSelector(selectBoardUsers);

  async function getUsers() {
    try {
      const { data } = await supabase
        .from("users")
        .select()
        .returns<UserType[]>();
      dispatch(setBoardUsers(data));
    } catch (err) {
      console.error(err);
    }
  }

  async function getLovePoints() {
    try {
      const { data } = await supabase
        .from("love_points")
        .select()
        .returns<PointType[]>();
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
        .returns<PointType[]>();
      setHatePoints(data);
    } catch (err) {
      console.error(err);
    }
  }

  const filterUserLovePoints = (userId: string): PointType[] => {
    return lovePoints?.filter((point) => point.user_id === userId) || [];
  };

  const filterUserHatePoints = (userId: string): PointType[] => {
    return hatePoints?.filter((point) => point.user_id === userId) || [];
  };

  useEffect(() => {
    getUsers();
    getLovePoints();
    getHatePoints();
  }, []);

  return (
    <div className="board">
      {isModalActive && <PointModal />}
      {users?.map((user) => (
        <div className="board__item" key={user.id}>
          <User {...user} />
          <Points
            lovePoints={filterUserLovePoints(user.id)}
            hatePoints={filterUserHatePoints(user.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default Board;
