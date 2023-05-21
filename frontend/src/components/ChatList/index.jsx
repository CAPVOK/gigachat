import { useState, useEffect, useRef } from "react";

import { ChatRoom } from "../ChatRoom";
import { AddChat } from "../AddChat";
import { Search, AddChatButton } from "../../ui";
import { Modal } from "../Modal";

import "./index.css"

function ChatList() {
    const [active, setActive] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [isActiveSearch, setIsActiveSearch] = useState(false);
    const [isModalShow, setIsModalShow] = useState(false);

    const isActiveSearchRef = useRef(false);

    const Users = [
        { id: 1, name: "Vova", time: '14:09', newMessage: true },
        { id: 2, name: "Vova", time: '12:20', newMessage: false },
        { id: 3, name: "Vanya", time: '11:32', newMessage: true },
        { id: 4, name: "Rodion", time: '15:00', newMessage: true },
        { id: 5, name: "Vova", time: '14:50', newMessage: true },
        { id: 6, name: "Vova", time: '12:05', newMessage: false },
        { id: 7, name: "Vanya", time: '11:00', newMessage: true },
        { id: 8, name: "Rodion", time: '10:00', newMessage: true },
        { id: 9, name: "Vova", time: '14:04', newMessage: true },
        { id: 10, name: "Vova", time: '12:10', newMessage: false },
        { id: 11, name: "Vanya", time: '11:02', newMessage: true },
        { id: 12, name: "Rodion", time: '15:30', newMessage: true },
    ];

    function handleClickChat(user) {
        setActive(user.id)
    }

    function handleCloseModal() {
        setIsModalShow(false)
    }

    function sortUsersByTime(users) {
        return users.sort((a, b) => {
            const [hoursA, minutesA] = a.time.split(':');
            const [hoursB, minutesB] = b.time.split(':');

            if (hoursA !== hoursB) {
                return Number(hoursA) - Number(hoursB);
            }

            return Number(minutesA) - Number(minutesB);
        });
    }

    function sortUsersBySearch(users) {
        return users.filter((user) =>
            user.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0 || user.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0
        )
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (isActiveSearchRef.current && !event.target.closest('#search-container')) {
                setIsActiveSearch(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        /* const usrs = Users;
        setUsers(sortUsersBySearch(sortUsersByTime(usrs))); */
    }, [searchText, Users]);

    return (<>
        <Modal isOpen={isModalShow} onClose={handleCloseModal} label='Создать чат'>
            <AddChat />
        </Modal>
        <div className={`w-full h-full flex flex-col gap-y-4 `}>
            <div className={`flex flex-row gap-x-2 ${isActiveSearch ? "px-0" : "px-4"}`}>
                <div ref={isActiveSearchRef} id="search-container" className="w-full"><Search callback={setSearchText} value={searchText} onClick={setIsActiveSearch} isActive={isActiveSearch} /></div>
                <div className={`${isActiveSearch && "hidden"}`}><AddChatButton callback={() => setIsModalShow(true)} /></div>
            </div>
            {users && users.map((user) =>
                <ChatRoom key={user.id} callback={handleClickChat} active={active} user={user} />
            )}
        </div>
    </>)
}

export { ChatList };
