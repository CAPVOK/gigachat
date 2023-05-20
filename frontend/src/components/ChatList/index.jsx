import { useState, useEffect, useRef } from "react";

import { ChatRoom } from "../ChatRoom";
import { Search, AddChatButton } from "../../ui";
import { Modal } from "../Modal";

import "./index.css"

function ChatList() {
    const [active, setActive] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [isActiveSearch, setIsActiveSearch] = useState(false);

    const isActiveSearchRef = useRef(false);

    const Users = [
        { id: 1, name: "Vova", time: '14:00', newMessage: true },
        { id: 2, name: "Vova", time: '12:00', newMessage: false },
        { id: 3, name: "Vanya", time: '11:00', newMessage: true },
        { id: 4, name: "Rodion", time: '15:00', newMessage: true },
        { id: 5, name: "Vova", time: '14:00', newMessage: true },
        { id: 6, name: "Vova", time: '12:00', newMessage: false },
        { id: 7, name: "Vanya", time: '11:00', newMessage: true },
        { id: 8, name: "Rodion", time: '15:00', newMessage: true },
        { id: 9, name: "Vova", time: '14:00', newMessage: true },
        { id: 10, name: "Vova", time: '12:00', newMessage: false },
        { id: 11, name: "Vanya", time: '11:00', newMessage: true },
        { id: 12, name: "Rodion", time: '15:00', newMessage: true },
    ];

    function handleClickChat(user) {
        setActive(user.id)
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
        setUsers(Users.filter((user) =>
            user.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0 || user.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0
        ));
    }, [searchText]);

    return (<>

        <div className={`w-full h-full flex flex-col gap-y-4 `}>
            <div className={`flex flex-row gap-x-2 ${isActiveSearch ? "px-0" : "px-4"}`}>
                <div ref={isActiveSearchRef} id="search-container" className="w-full"><Search callback={setSearchText} value={searchText} onClick={setIsActiveSearch} isActive={isActiveSearch}/></div>
                <div className={`${isActiveSearch && "hidden"}`}><AddChatButton /></div>
            </div>
            {users && users.map((user) =>
                <ChatRoom key={user.id} callback={handleClickChat} active={active} user={user} />
            )}
        </div>
    </>)
}

export { ChatList };
