import axios from 'axios';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

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
    const response = await api.post('/authorization/registration/mailConfirmation', {
        login,
        mail,
        password,
        code,
    });
    return response.data;
}

/**
     * @param user на вход:
     *             String login,
     *             String password
     * @return status:
     *              user does not exist
     *              wrong password
     *              done
     *         sessionId:
     *              String {sessionId}
     */
export async function login(login, password) {
    const response = await api.post('/authorization/login', {
        login,
        password,
    });
    if (response.data.status === 'done') {
        localStorage.setItem('sessionId', response.data.sessionId);
        localStorage.setItem('login', login);
    }
    return response.data;
}

/**
     * @param sessionId на вход:
     *                  String sessionId
     * @return status:
     *                  done
     */
export async function logout(sessionId) {
    const response = await api.post('/authorization/logout', {
        sessionId,
    });
    if (response.data.status === 'done') {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('login');
    }
    return response.data;
}

/**
 * @param userData {
 *      DOB: '1999-12-31',
 *      name: 'user',
 *      surname: 'user',
 *      number: '+7(999)999-99-99',
 *      gender: 'male'
 * }
 */
export async function addUserData(userData) {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        await api.post('/profile/addUserData/' + sessionId, {
            ...userData
        });
    }
}

/**
 * @param nickname: string
 * @return [
 *      {
 *          id: 1,
 *         name: 'user',
 *        surname: 'user',
 *       urlAvatar: 'https://www.w3schools.com/howto/img_avatar.png',
 *        nickname: 'user',
 * }
 * ]
 * */
export async function findUserByNickname(nickname) {
    const response = await api.post('/find/userByNickname/' + nickname);
    return response.data;
}