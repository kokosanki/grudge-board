import { PointType } from "@/components/Board/types";
import "./styles.scss";
import { selectBoardUsers } from "@/components/Board/BoardSlice";
import { useAppSelector } from "../../app/hooks";
import { UserType } from "@/components/Board/types";

interface Props {
  point: PointType;
  type: string;
}

function Point({ point, type }: Props) {
  const users: UserType[] = useAppSelector(selectBoardUsers);

  const selectUserById = (userId: string): string => {
    return users.find((user) => user.id === userId)?.email || "";
  };

  return (
    <div className={`point point--${type}`}>
      <div>
        <h3 className="point__title">{point.name}</h3>
        <p className="point__text">{point.text}</p>
      </div>
      <p className="point__created-by">
        Created by: {selectUserById(point.created_by)}
      </p>
      <p className="point__created-by">
        Created at: {new Date(point.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}

export default Point;
