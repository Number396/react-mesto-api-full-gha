import { apiAuthConfig } from "./constants";

class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
        this._signupUrl = `${this._baseUrl}signup`;
        this._signinUrl = `${this._baseUrl}signin`;
        this._userUrl = `${this._baseUrl}users/me`;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(
                `Ошибка HTTP: ${response.status} ${response.statusText}`
            );
        }
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    };

    register(email, password) {
        // console.log(email, password);
        return this._request(this._signupUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ password, email }),
        })
    };

    login(email, password) {
        // console.log(email, password);
        return this._request(this._signinUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ password, email }),
        })
    };

    checkToken(token) {
        return this._request(this._userUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })

    };
}

export const apiAuth = new Api(apiAuthConfig);
