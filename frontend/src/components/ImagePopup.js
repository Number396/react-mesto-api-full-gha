function ImagePopup({ card, isOpen, onClose }) {

    return (
        <div
            className={`popup popup_show-image ${card && isOpen && "popup_enabled"}`}
        >
            <figure className="popup__picture">
                <img
                    className="popup__image"
                    src={card?.link}
                    alt={card?.name}
                />
                <button
                    onClick={onClose}
                    aria-label="кнопка закрыть фотографию места"
                    type="button"
                    className="popup__close-button button-opacity"
                />
                <figcaption className="popup__caption">
                    {card?.name}
                </figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;
