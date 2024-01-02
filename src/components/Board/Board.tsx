import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { UserType, Point } from "@/components/Board/types";
import User from "@/components/User/User"
import "./styles.scss"
import PointModal from "@/components/PointModal/PointModal";
import {
  selectIsPointModalActive,
  activateModal,
  deactiveModal,
  ModalType
} from "@/components/PointModal/PointModalSlice";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

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
    console.log("mounted");
    getUsers();
    getLovePoints();
    getHatePoints();
  }, []);
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    if (isModalActive) {
      dispatch(deactiveModal());
    } else {
      dispatch(activateModal('dupa'));
    }
  };
  const handleClick = () => toggleModal();
  return (
    <div className="board">
      <button onClick={handleClick}>ToggleModal</button>
      {isModalActive && <PointModal />}
      {/* <div>
        <h2>Users</h2>
        <ul>
          {users?.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
        <h2>Love Points</h2>
        <ul>
          {lovePoints?.map((point) => (
            <li key={point.id}>{point.name}</li>
          ))}
        </ul>
        <h2>Hate Points</h2>
        <ul>
          {hatePoints?.map((point) => (
            <li key={point.id}>{point.name}</li>
          ))}
        </ul>
      </div> */}
      {users?.map((user) => (
        // <div key={user.id}>{user.email}</div>
        <User {...user} key={user.id} />
      ))}
    </div>
  );
}

export default Board;
