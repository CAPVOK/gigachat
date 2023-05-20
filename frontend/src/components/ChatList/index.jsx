import { useState, useEffect } from "react";
import { ChatRoom } from "../ChatRoom";

import { Search } from "../../ui";

function ChatList() {
    const [active, setActive] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);

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

    function handleClick(user) {
        setActive(user.id)
    }

    useEffect(() => {
        setUsers(Users.filter((user) =>
            user.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0 || user.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0
        ));
    }, [searchText]);

    return (<>
        <div className="w-full h-full p-4 flex flex-col gap-y-4">
            <div className="px-4">
                <Search callback={setSearchText} value={searchText} /* onClick={()=>setActive(0)} *//>
            </div>
            {users && users.map((user) =>
                <ChatRoom key={user.id} callback={handleClick} active={active} user={user} />
            )}
        </div>
    </>)
}

export { ChatList };
