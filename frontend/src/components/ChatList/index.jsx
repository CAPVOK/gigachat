import { useState } from "react";
import { ChatRoom } from "../ChatRoom";

function ChatList() {
    const [active, setActive] = useState(1);

    const users = [
        { id: 1, name: "Vova", time: '14:00', newMessage: true },
        { id: 2, name: "Vova", time: '12:00', newMessage: false },
        { id: 3, name: "Vanya", time: '11:00', newMessage: true },
        { id: 4, name: "Rodion", time: '15:00', newMessage: true },
    ];

    function handleClick(user) {
        setActive(user.id)
    }

    return (<>
        <div className="w-full h-full p-2 flex flex-col gap-y-4">
            {users && users.map((user) =>
                <ChatRoom key={user.id} callback={handleClick} active={active} user={user} />
            )}
        </div>
    </>)
}

export { ChatList };
