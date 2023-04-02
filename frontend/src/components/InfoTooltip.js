import unionLogoSuccess from '../images/UnionSuccess.svg';
import unionLogoFail from '../images/UnionFail.svg';

function InfoTooltip({ infoTooltipSet, onClose }) {
    const unionLogo = `${infoTooltipSet.isSucceded ? unionLogoSuccess : unionLogoFail}`;
    const message = `${infoTooltipSet.isSucceded ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз."}`;

    return (
        <div className={`popup ${infoTooltipSet.isOpen && "popup_enabled"}`}>
            <div className="popup__container">
                <button
                    onClick={onClose}
                    aria-label="кнопка закрыть"
                    type="button"
                    className="popup__close-button button-opacity"
                ></button>
                <img className="popup__union" src={unionLogo} alt="Изображение авторазиции." />
                <p className="popup__message">{message}</p>
            </div>
        </div>
    )

}

export default InfoTooltip;