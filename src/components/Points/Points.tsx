import Point from "@/components/Point/Point";
import { PointType } from "@/components/Board/types";
import "./styles.scss";

interface Props {
  lovePoints: PointType[];
  hatePoints: PointType[];
}

function Points({ lovePoints, hatePoints }: Props) {
  return (
    <div className="points">
      {lovePoints?.map((point) => (
        <Point key={point.id} point={point} type="love"></Point>
      ))}
      {hatePoints?.map((point) => (
        <Point key={point.id} point={point} type="hate"></Point>
      ))}
    </div>
  );
}

export default Points;
