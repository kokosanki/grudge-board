import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectIsPointModalActive,
  deactiveModal,
  selectModalData,
  ModalType,
} from "./PointModalSlice";
import "./styles.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

function PointModal() {
  const [message, setMessage] = useState("");
  const [isValid, setValidation] = useState(true);

  useEffect(() => {
    setValidation(Boolean(message.length));
  }, [message]);

  // componentDidMount() {
  //   console.log("componentDidMount")
  // }

  const dispatch = useAppDispatch();

  const isModalActive = useAppSelector(selectIsPointModalActive);
  const { modalType, editedUserId, editedUserEmail } =
    useAppSelector(selectModalData);
  console.log("isModalActive", isModalActive, editedUserId);
  const closeModal = () => {
    dispatch(deactiveModal());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    // console.log(message);
    e.preventDefault();
    console.log(Boolean(message.length));

    if (!isValid) return;
    setUserPoint();
  };

  const setUserPoint = () => {
    if (modalType === ModalType.LOVE) {
      setLovePoint();
    } else {
      setHatePoint();
    }
  };

  async function setLovePoint() {
    const { data } = await supabase
      .from("love_points")
      .insert({ name: message, user_id: editedUserId });
    console.log(data);
  }

  async function setHatePoint() {
    const payload = { name: message, user_id: editedUserId };
    console.log("payload", payload);
    const { data } = await supabase.from("hate_points").insert(payload);
    console.log(data);
  }

  return (
    <div className="point-modal">
      <div className="point-modal__container">
        {/* <div className="point-modal__header">
          <FontAwesomeIcon
            className="point-modal__close-button"
            onClick={closeModal}
            icon={faCircleXmark}
          />
        </div> */}
        <div className="point-modal__body">
          <h3>
            Award {modalType} points to {editedUserEmail}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="point-modal__textarea-container">
              <textarea
                className="point-modal__textarea grudge-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {!isValid && (
                <p className="point-modal__error">Message is required</p>
              )}
              <p></p>
            </div>
            <div className="point-modal__footer">
              <button
                className="point-modal__button grudge-button point-modal__button--close"
                onClick={closeModal}
              >
                CLOSE
              </button>
              <button
                disabled={!message}
                type="submit"
                className="point-modal__button grudge-button point-modal__button--submit"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PointModal;
