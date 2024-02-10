import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deactiveModal, selectModalData, ModalType } from "./PointModalSlice";
import "./styles.scss";
import { ChangeEvent, useState } from "react";
import { supabase } from "@/supabase";

function PointModal() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string[]> = {
      title: [],
      text: [],
    };

    if (!formData.title) {
      newErrors.title.push("Title is required.");
      isValid = false;
    }

    if (formData.title.length > 200) {
      newErrors.title.push("Title must be shorter than 200 signs.");
      isValid = false;
    }

    if (!formData.text) {
      newErrors.text.push("Text is required.");
      isValid = false;
    }

    if (formData.text.length > 500) {
      newErrors.text.push("Text must be shorter than 500 signs.");
      isValid = false;
    }

    setErrors(newErrors);
    console.log("isValid", isValid);
    return isValid;
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useAppDispatch();

  const { modalType, editedUserId, editedUserEmail } =
    useAppSelector(selectModalData);
  const closeModal = () => {
    dispatch(deactiveModal());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      setUserPoint();
    }
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
      const payload = {
        name: formData.title,
        text: formData.text,
        user_id: editedUserId,
      };
      const { data } = await supabase.from("love_points").insert(payload);
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
      const payload = {
        name: formData.title,
        text: formData.text,
        user_id: editedUserId,
      };

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
          <form noValidate onSubmit={handleSubmit}>
            <div className="point-modal__textarea-container">
              <div className="point-modal__value-container">
                <h3 className="point-modal__value-header">Title</h3>
                <textarea
                  className="point-modal__textarea grudge-textarea"
                  value={formData.title}
                  name="title"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.title?.map((error, index) => (
                  <p key={index} className="point-modal__error">
                    {error}
                  </p>
                ))}
              </div>
              <div className="point-modal__value-container">
                <h3 className="point-modal__value-header">Text</h3>
                <textarea
                  className="point-modal__textarea grudge-textarea"
                  name="text"
                  value={formData.text}
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.text?.map((error, index) => (
                  <p key={index} className="point-modal__error">
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="point-modal__footer">
              <button
                className="point-modal__button grudge-button point-modal__button--close"
                onClick={closeModal}
              >
                CLOSE
              </button>
              <button
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
