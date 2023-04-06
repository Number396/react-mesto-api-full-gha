import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id || props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(item => item._id === currentUser._id);
    const cardLikeButtonClassName = (`cards__like-button-icon ${isLiked && 'cards__like-button-icon_active'}`);

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <li className="cards__item">
            <img
                className="cards__image"
                src={props.card.link}
                onClick={handleClick}
                alt={props.card.name}
            />
            {isOwn && <button
                aria-label="кнопка удалить карточку места"
                type="button"
                className="cards__trash-button-icon button-opacity"
                onClick={handleDeleteClick}
            ></button>}
            <div className="cards__description">
                <h2 className="cards__title">{props.card.name}</h2>
                <div className="cards__like-section">
                    <button
                        aria-label="кнопка нравится"
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    ></button>
                    <p className={"cards__like-counter"}>{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
