import { useState, useEffect } from "react";
import { addNewChat, findUserByNickname } from "../../core/api";
import { ModalButton, Search, ExitButton } from "../../ui";

function AddChat() {
    const [searchText, setSearchText] = useState(''); // текст поиска 
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
    })

    function handleInput(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleCreate() {
        if (formData.name) {
            if (selectedUsers.length > 0) {
                addNewChat({ name: formData.name, type: (selectedUsers.length > 1 ? "multi" : "single") }, selectedUsers.map((user) => user.id))
                    .then(() => console.log("Ok"))
                    .catch(() => console.log("Ошибка"));
            } else setMessage("Выберите пользователей");
        } else setMessage("Введите название");
    }

    function handleAddUser(user) {
        setSelectedUsers([
            ...selectedUsers,
            user,
        ])
    }

    function handleDeleteUser(user) {
        setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
    }

    useEffect(() => {
        if (searchText) {
            findUserByNickname(searchText)
                .then((res) => {
                    const filteredUsers = res.filter((user) => !selectedUsers.some((selectedUser) => selectedUser.id === user.id));
                    setUsers(filteredUsers);
                    console.log(filteredUsers);
                })
                .catch((err) => {
                    console.log(err);
                    setUsers([]);
                });
        } else {
            setUsers([]);
            setSelectedUser(null);
            setMessage('');
        }
    }, [searchText, selectedUsers]);

    return (<>
        <div className="w-96 flex flex-col justify-start items-center">

            <input type="text" placeholder="Введите название чата" name="name" onChange={(e) => handleInput(e)}
                className="w-full my-4 p-2 px-4 bg-hover outline-none rounded-xl" />

            <div className="w-full ">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Введите пользователя"
                    className={`w-full rounded-2xl px-4 py-2 bg-hover text-white outline-none transition ease-in-out`} />
            </div>

            <div className="w-full h-40 my-4 scrollbar overflow-y-auto flex flex-col gap-y-2">
                {users.length > 0 && users.map((user) =>
                    <div key={user.id} onClick={() => handleAddUser(user)} className={`w-full text-center rounded-xl p-2  ${(selectedUser && user.id === selectedUser.id) ? "bg-gradient-to-br from-start to-end" : "bg-hover hover:bg-active"}`} >
                        {user.nickname}
                    </div>
                )}
            </div>

            {selectedUsers.length > 0 &&
                <div className="w-full my-2 flex flex-col gap-2 rounded-2xl p-2 border-2 border-end">
                    {selectedUsers.map((user) =>
                        <div key={user.id} className={`w-full flex flex-row justify-between gap-2 items-center rounded-xl p-2 px-4 ${(selectedUser && user.id === selectedUser.id) ? "bg-gradient-to-br from-start to-end" : "bg-hover hover:bg-active"}`} >
                            {user.nickname}
                            <button onClick={() => handleDeleteUser(user)} className="h-6 aspect-square flex flex-row items-center justify-center rounded-full transition ease-in-out text-gray-300 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>}

            <div className="flex flex-col gap-2 text-center">
                <div className="h-5">{message}</div>
                <div className="flex flex-row justify-center">
                    <ModalButton callback={handleCreate} label="Создать" />
                </div>
            </div>
        </div>
    </>)
}

export { AddChat };