import { useForm } from "../hooks/useForm";
import AuthPage from "./AuthPage";


function Login({ loggedIn, handleLogin }) {
    const { values, handleChange, setValues } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(values);
    }

    return (
        <AuthPage
            title="Вход"
            name="login"
            btnText="Войти"
            loggedIn={loggedIn}
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
    );

}

export default Login;