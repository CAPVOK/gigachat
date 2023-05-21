import { useState, useEffect, useRef } from "react";

import { SendButton, ChatInput, BackButton, AddUserButton } from "../../ui";
import { Modal, AddUser } from "../../components";
import { sendMessage, getChat, getUser } from "../../core/api";

function Chat({ activeChat, setActiveChat, payload}) {

    if (activeChat === -1) {
        return (<>
            <div className="w-full h-full text-white text-xl font-light flex items-center justify-center">
                Выберите чат
            </div>
        </>)
    }

    const [isModalShow, setIsModalShow] = useState(false);

    const [currentMessage, setCurrentMessage] = useState(""); // отправляемое сообщение
    const [chatHistory, setChatHistory] = useState([]); // все сообщения чата

    function chatMessages (payload) { // слушаем сервер и добавляем в chatHistory
        const payloadData = JSON.parse(JSON.parse(payload.body));
        setChatHistory((prev) => [
            ...prev,
            {
                username: payloadData.username,
                message: payloadData.message,
                date: payloadData.date
            }]
        )
    }

    const sendMyMessage = () => { // угадай по названию
        console.log(currentMessage.trim(), Number(activeChat));
        if (currentMessage.trim() !== "") {
            sendMessage(currentMessage.trim(), Number(activeChat))
            .then((res)=>console.log("ok sendMessage"))
            .catch((err)=>console.log("error sendMessage"))
            setCurrentMessage("");
        }
    };

    /* получение истории чата */
    useEffect(()=>{
        console.log(Number(activeChat));
        getChat(Number(activeChat))
        .then((res)=>{
            setChatHistory(res.messageList);
            console.log(res.messageList);
            getUser(msg.userId.id).then((res)=>console.log(res))
        })
        .catch(()=>setChatHistory([]))
    }, [activeChat]);

    useEffect(()=>{
        /* chatMessages(payload); */
        console.log(payload);
    }, [payload]);
    
    const handleKeyDown = (event) => { // отправка при нажатии Enter
        if (event.key === "Enter") {
            sendMyMessage();
        }
    };

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
                <div className="w-full h-12 px-2 flex flex-row justify-between text-white items-center ">
                    <div className="flex flex-row items-center gap-2">
                        <BackButton callback={() => setActiveChat(-1)} />
                    </div>
                    <div className="flex flex-row">
                        <div className="text-3xl">Название</div>
                    </div>
                </div>

                {/* Сам чат */}
                <div className="flex flex-col h-full scrollbar overflow-x-auto ">
                    {/* Сообщения/ошибки */}
                    <div className="overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 h-full">
                        <div className="grid grid-cols-12 gap-y-2 ">
                            {chatHistory.map((msg) => ( /* выводим весь чат */
                                false ? /* чьё сообщение  */
                                    (<div key={msg.date} className="col-start-1 col-end-8 p-3 rounded-lg">
                                        <div className="flex flex-row items-center">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                {} {/* // первая буква */}
                                            </div>
                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div>{msg.content}</div>
                                            </div>
                                        </div>
                                    </div>)
                                    :
                                    (<div key={msg.date} className="col-start-6 col-end-13 p-3 rounded-lg">
                                        <div className="flex items-center justify-start flex-row-reverse">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                {msg.id}
                                            </div>
                                            <div className="relative mr-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div>{msg.content}</div>
                                            </div>
                                        </div>
                                    </div>)
                            ))}
                            <div ref={chatEndRef} /> {/* ссылка на конец чата */}
                        </div>
                    </div>
                    {/* Ввод сообщения */}
                    <div className="flex flex-row gap-2 w-full p-2" >
                        <ChatInput onChange={setCurrentMessage} value={currentMessage} onKeyDown={handleKeyDown} />
                        <SendButton callback={sendMyMessage} label="Отправить" />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export { Chat };