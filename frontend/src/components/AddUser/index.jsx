import { useState, useEffect } from "react";
import { addNewChat } from "../../core/api";
import { ModalButton, Search } from "../../ui";
import { findUserByNickname } from "../../core/api";
import { invite } from "../../core/api";

function AddUser() {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState(''); // текст поиска 
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');

    function handleAdd() {
        if (selectedUser) {
            console.log(selectedUser);

            setMessage("Успех!");
        } else setMessage("Error")
    }

    useEffect(() => {
        if (searchText) {
            console.log(searchText)
            findUserByNickname(searchText)
                .then((res) => {
                    setUsers(res);
                    console.log(res)
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
    }, [searchText])

    return (<>
        <div className="w-96 h-80 py-2 flex flex-col justify-between items-center">

            <Search callback={setSearchText} value={searchText} onClick={() => { }} />

            <div className="w-full flex flex-col gap-y-2">
                {users.length > 0 && users.map((user) =>
                    <div key={user.id} onClick={() => setSelectedUser(user)} className={`w-full text-center rounded-xl p-2  ${(selectedUser && user.id === selectedUser.id) ? "bg-gradient-to-br from-start to-end" : "bg-hover hover:bg-active"}`} >
                        {user.nickname}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 text-center">
                <div className="h-5">{message}</div>
                <div className="flex flex-row justify-center">
                    <ModalButton callback={handleAdd} label="Пригласить" />
                </div>
            </div>


        </div>
    </>)
}

export { AddUser };