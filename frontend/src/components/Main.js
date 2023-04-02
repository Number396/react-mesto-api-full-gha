import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__data">
                    <div className="profile__avatar-wrapper">
                        <img className="profile__avatar" src={currentUser.avatar} alt="Изображение аватара." />
                        <button
                            onClick={props.onEditAvatar}
                            aria-label=""
                            type="button"
                            className="profile__avatar-button"
                        ></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            onClick={props.onEditProfile}
                            aria-label="кнопка редактировать профиль"
                            type="button"
                            className="profile__edit-button button-opacity"
                        ></button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    onClick={props.onAddPlace}
                    aria-label="кнопка добавить карточку места"
                    type="button"
                    className="profile__add-button button-opacity"
                ></button>
            </section>

            <section className="cards">
                <ul className="cards__items">
                    {props.cards.map((cardItem) => (
                        <Card
                            card={cardItem}
                            key={cardItem._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}

                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
