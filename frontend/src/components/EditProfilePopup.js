import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, setValues } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values);
    }

    useEffect(() => {
        setValues({ name: currentUser.name, about: currentUser.about });
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit"
            btnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                className="popup__input popup__input_type_name"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={values.name || ''}
            />
            <span className="popup__input-error name-input-error"></span>
            <input
                type="text"
                name="about"
                id="about"
                placeholder="Профессия"
                className="popup__input popup__input_type_occupation"
                required
                minLength="2"
                maxLength="200"
                onChange={handleChange}
                value={values.about || ''}
            />
            <span className="popup__input-error occupation-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;