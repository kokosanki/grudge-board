import "./styles.scss";
import { UserType } from "@/components/Board/types";
import {
  activateModal,
  setModalData,
  ModalType,
} from "@/components/PointModal/PointModalSlice";
import { useAppDispatch } from "../../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrinHearts,
  faFaceTired,
} from "@fortawesome/free-solid-svg-icons";
function User({ email, id }: UserType) {
  const dispatch = useAppDispatch();

  const giveLovePoints = () => {
    dispatch(activateModal());
    const modalData = {
      modalType: ModalType.LOVE,
      editedUserId: id,
      editedUserEmail: email,
    };
    dispatch(setModalData(modalData));
  };

  const giveHatePoints = () => {
    dispatch(activateModal());
    const modalData = {
      modalType: ModalType.HATE,
      editedUserId: id,
      editedUserEmail: email,
    };
    dispatch(setModalData(modalData));
  };

  return (
    <div className="user-card">
      <FontAwesomeIcon
        className="grudge-icon point-modal__close-button"
        onClick={giveLovePoints}
        icon={faFaceGrinHearts}
        size="xl"
      />
      <div>{email}</div>
      <div onClick={giveHatePoints}>
        <FontAwesomeIcon
          className="grudge-icon point-modal__close-button"
          onClick={giveHatePoints}
          icon={faFaceTired}
          size="xl"
        />
      </div>
    </div>
  );
}

export default User;
