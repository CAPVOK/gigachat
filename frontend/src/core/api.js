import axios from 'axios';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

export let token;

const URL = 'http://62.217.177.150:8082/';

const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// return string
export async function getHi() {
    const response = await api.get('/hi');
    return response.data;
}

//work with socket
// event instance example
// const event = {
//     header: {
//         type: 'new_message',
//     },
//     body: {
//         date: '2021-05-05T12:00:00',
//         message: 'hello',
//         sender: {
//             name: 'user',
//             surname: 'user',
//             patronymic: 'user',
//             username: 'user',
//             urlAvatar: 'https://www.w3schools.com/howto/img_avatar.png',
//         },
//         receiver: {
//              name: 'user',
//              surname: 'user',
//              patronymic: 'user',
//              username: 'user',
//              urlAvatar: 'https://www.w3schools.com/howto/img_avatar.png',
//          },
//     },
// };
export function connect() {
    const socket = new SockJS(URL + 'ws');
    const stompClient = over(socket);
    return stompClient;
}

export function disconnect(stompClient) {
    stompClient.disconnect();
}

export function subscribeForEvent(stompClient, callback) {
    stompClient.subscribe('/topic/events', callback);
}

/**
     * @param user на вход:
     *             String login,
     *             String mail
     * @return status:
     *             user already exists,
     *             mail already exists,
     *             done
     */
export async function createRegistrationCode(login, mail) {
    const response = await api.post('/authorization/registration/createRegistrationCode', {
        login,
        mail,
    });
    return response.data;
}

    /**
     * @param mail:
     *            String mail
     */
export async function sendEmailCode(mail) {
    await api.post('/authorization/registration/sendCode', {
        mail,
    });
}

/**
     * @param user на вход:
     *             String login,
     *             String mail
     *             String password
     *             String code;
     * @return status:
     *             denied
     *             done
     */
export async function confirmRegistration(login, mail, password, code) {
    const response = await api.post('/authorization/registration/confirmRegistration', {
        login,
        mail,
        password,
        code,
    });
    return response.data;
}