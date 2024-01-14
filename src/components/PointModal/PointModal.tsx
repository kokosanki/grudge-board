import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  deactiveModal,
  selectModalData,
  ModalType,
} from "./PointModalSlice";
import "./styles.scss";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

function PointModal() {
  const [message, setMessage] = useState("");
  const [isValid, setValidation] = useState(true);

  useEffect(() => {
    setValidation(Boolean(message.length));
  }, [message]);
  const dispatch = useAppDispatch();

  const { modalType, editedUserId, editedUserEmail } =
    useAppSelector(selectModalData);
  const closeModal = () => {
    dispatch(deactiveModal());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
    try {
      const { data } = await supabase
        .from("love_points")
        .insert({ name: message, user_id: editedUserId });
      console.log(data);
    } catch (err) {
      alert("Something went wrong, please try again");
      console.error(err);
    } finally {
      closeModal();
    }
  }

  async function setHatePoint() {
    try {
      const payload = { name: message, user_id: editedUserId };
      console.log("payload", payload);
      const { data } = await supabase.from("hate_points").insert(payload);
      console.log(data);
    } catch (err) {
      alert("Something went wrong, please try again");
      console.error(err);
    } finally {
      closeModal();
    }
  }

  return (
    <div className="point-modal">
      <div className="point-modal__container">
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
