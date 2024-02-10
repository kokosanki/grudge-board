import { PointType } from "@/components/Board/types";
import "./styles.scss";

interface Props {
  point: PointType;
  type: string;
}

function Point({ point, type }: Props) {
  return (
    <div className={`point point--${type}`}>
      <h3 className="point__title">{point.name}</h3>
      <p className="point__text">{point.text}</p>
    </div>
  );
}

export default Point;
