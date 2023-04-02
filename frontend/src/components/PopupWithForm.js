function PopupWithForm({ title, name, btnText, isOpen, onClose, onSubmit, children, extraClass }) {
    return (
        <div
            className={`popup popup_type_${name} ${isOpen && "popup_enabled"}`}
        >
            <div className="popup__container">
                <button
                    onClick={onClose}
                    aria-label="кнопка закрыть"
                    type="button"
                    className="popup__close-button button-opacity"
                ></button>
                <h2 className="popup__title">{title}</h2>
                <form
                    name={name}
                    className="popup__form"
                    onSubmit={onSubmit}
                >
                    <fieldset className={`popup__set ${extraClass}`}>
                        {children}
                        <button type="submit" className="popup__submit-button">
                            {btnText}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
