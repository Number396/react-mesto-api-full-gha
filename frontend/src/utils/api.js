import { apiConfig } from "./constants.js";

class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._cardUrl = `${this._baseUrl}/cards`;
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
        return fetch(url, options).then(this._checkResponse)
    }

    getUserInfo(token) {
        return this._request(this._userUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
    };

    getCards(token) {
        return this._request(this._cardUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
    };

    setUserInfo({ name, about, tokenJwt }) {
        console.log(tokenJwt);
        return this._request(this._userUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenJwt.token}`,
            },
            body: JSON.stringify({
                name,
                about,
            }),
        })
    };

    addCard({ name, link }, tokenJwt) {
        return this._request(this._cardUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenJwt.token}`,
            },
            body: JSON.stringify({
                name,
                link,
            }),
        })
    };

    deleteCard(cardID, tokenJwt) {
        return this._request(`${this._cardUrl}/${cardID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenJwt.token}`,
            },
        })
    };

    changeLikeCardStatus(cardID, isLiked, tokenJwt) {
        if (isLiked) {
            return this.setLike(cardID, tokenJwt);
        }
        else {
            return this.deleteLike(cardID, tokenJwt);
        }
    }

    setLike(cardID, tokenJwt) {
        return this._request(`${this._cardUrl}/${cardID}/likes`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenJwt.token}`,
            },
        })
    };

    deleteLike(cardID, tokenJwt) {
        return this._request(`${this._cardUrl}/${cardID}/likes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenJwt.token}`,
            },
        })
    };

    setUserAvatar(avatar, tokenJwt) {
        return this._request(`${this._userUrl}/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenJwt.token}`,
            },
            body: JSON.stringify({
                avatar,
            }),
        })
    };
};

export const api = new Api(apiConfig);