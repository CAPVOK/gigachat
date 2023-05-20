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

export async function login(username, password) {
    const response = await api.post('/login', {username, password});
    token = response.data.token;
    return response.data;
}

export async function register(username, password) {
    const response = await api.post('/register', {username, password});
    return response.data;
}

export async function getChatHistory() {
    const response = await api.get('/history', {headers: {Authorization: token}});
    return response.data;
}

export async function sendMessage(message) {
    const response = await api.post('/message', {message}, {headers: {Authorization: token}});
    return response.data;
}

export async function getOnlineUsers() {
    const response = await api.get('/online', {headers: {Authorization: token}});
    return response.data;
}