import { useForm } from "../hooks/useForm";
import AuthPage from "./AuthPage";


function Register({ loggedIn, handleRegister }) {
    const { values, handleChange, setValues } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(values);
    }


    return (
        <AuthPage
            title="Регистрация"
            name="registration"
            btnText="Зарегистрироваться"
            loggedIn={loggedIn}
            isRegister={true}
            onSubmit={handleSubmit}

        >
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="authpage__input"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={values.email || ''}
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className="authpage__input"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={values.password || ''}
            />

        </AuthPage>

    )
}
export default Register;
