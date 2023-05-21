import { useState, useEffect, useRef } from "react";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
/* import { api } from "../../core/api"; */
import { SendButton, ChatInput, } from "../../ui";
import { Modal } from "../Modal";
import { AddUser } from "../AddUser";

function Chat() {
    const [isModalShow, setIsModalShow] = useState(false);

    const stompClient = useRef(null); // ссылка но зачем уже не помню

    const [connection, setConnection] = useState(true); // подключены ли мы 
    const [currentMessage, setCurrentMessage] = useState(""); // отправляемое сообщение

    const [chatHistory, setChatHistory] = useState([]); // все сообщения чата

    const myName = 'vova';

    const onConnected = () => { // подключаемся)))
        /* console.log('WS connected');
        stompClient.current.subscribe('/chatroom/public', chatMessages);
        setConnection(true); */
    };

    const chatMessages = (payload) => { // слушаем сервер и добавляем в chatHistory
        console.log(payload);
        const payloadData = JSON.parse(payload.body);
        console.log(payloadData);
        setChatHistory((prev) => [
            ...prev,
            {
                username: payloadData.username,
                message: payloadData.message,
                date: payloadData.date
            }]
        )
    }

    const sendMessage = () => { // угадай по названию 
        if (stompClient.current !== null) {
            if (currentMessage.trim() !== "") {
                const newDate = new Date();
                const newMessage = {
                    username: myName,
                    message: currentMessage.trim(),
                    date: newDate.toLocaleString(),
                };
                stompClient.current.send("/app/message", {}, JSON.stringify(newMessage));
                setCurrentMessage("");
            }
        }
    };


    const onError = () => { // ничего не работает 
        console.log('WS error');
        setConnection(false);
    };

    useEffect(() => { //подключаемся / отключаемся
        /* stompClient.current = over(new SockJS('http://localhost:8082/ws'));
        stompClient.current.connect({}, onConnected, onError);
        getHistoryOfChat(); // первичная загрузка сообщений (не помню)

        return () => { // выполняется при размонтировании компонента
            stompClient.current && stompClient.current.disconnect();
        }; */
    }, []);

    const handleKeyDown = (event) => { // отправка при нажатии Enter
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const getHistoryOfChat = () => {
        /*  api.get('/pastMessages/load').then((res) => {
             console.log(res.data);
             Object.entries(res.data).map(([key, value]) => {
                 setChatHistory((prev) => [
                     ...prev,
                     {
                         username: value.username,
                         message: value.message,
                         date: value.date
                     }]
                 );
             })
         }) */
    }

    const chatEndRef = useRef(null); // ссылка на конец чата для скрола

    useEffect(() => {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (<>
        <Modal isOpen={isModalShow} onClose={() => setIsModalShow(false)} label='Пригласить пользователя'>
            <AddUser />
        </Modal>
        <div className='h-full w-full antialiased overflow-hidden text-gray-800 '>
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4 bg-gradient-to-tr from-[#141E30]/80 to-[#243B55]/80 ">
                {/* header */}
                <div className="w-full h-10 flex flex-row justify-between text-white items-center bg-red-500/20">
                    <div>название</div>
                    <div className="flex flex-row">
                        <div onClick={()=>setIsModalShow(true)} className="h-10 aspect-square rounded-full flex flex-row justify-center items-center transition ease-in-out bg-start hover:bg-end">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full overflow-x-auto">
                    {/* Сообщения/ошибки */}
                    <div className="overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 h-full">
                        <div className="grid grid-cols-12 gap-y-2 ">
                            {chatHistory.map((msg) => ( /* выводим весь чат */
                                msg.username !== myName ? /* чьё сообщение  */
                                    (<div key={msg.date} className="col-start-1 col-end-8 p-3 rounded-lg">
                                        <div className="flex flex-row items-center">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                {msg.username[0]} {/* // первая буква */}
                                            </div>
                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div>{msg.message}</div>
                                            </div>
                                        </div>
                                    </div>)
                                    :
                                    (<div key={msg.date} className="col-start-6 col-end-13 p-3 rounded-lg">
                                        <div className="flex items-center justify-start flex-row-reverse">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                {msg.username[0]}
                                            </div>
                                            <div className="relative mr-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div>{msg.message}</div>
                                            </div>
                                        </div>
                                    </div>)
                            ))}
                            <div ref={chatEndRef} /> {/* ссылка на конец чата */}
                        </div>
                        {!connection && (<div className="text-center text-red-500">
                            Чат сломался :( </div>)} {/* если connection = false */}
                    </div>
                    <div className="flex flex-row gap-2 w-full p-2" >
                        <ChatInput onChange={setCurrentMessage} value={currentMessage} onKeyDown={handleKeyDown} />
                        <SendButton callback={sendMessage} label="Отправить" />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export { Chat };