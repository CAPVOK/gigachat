import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Search, AddChatButton } from "../../ui";
import { ChatRoom, AddChat, Modal, Invite } from "../../components";
import "./index.css"
import { accept, decline, getInvites } from "../../core/api";
import { saveid } from "../../core/slice";

function ChatList() {
    const [active, setActive] = useState(0); // активный чат
    const [searchText, setSearchText] = useState(''); // текст поиска 
    const [users, setUsers] = useState([]); // сорт чаты
    const [isActiveSearch, setIsActiveSearch] = useState(false); // тыкнули ли мы на поиск
    const [isModalShow, setIsModalShow] = useState(false); // модалка 

    const isActiveSearchRef = useRef(false);
    const dispatch = useDispatch();

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

    const [invites, setInvites] = useState([
        { id: 1, name: 'Super Chat', nickname: 'Степан' },
        { id: 2, name: 'Brawl Start 7A', nickname: 'El Primo' },
    ])

    function handleClickChat(user) {
        setActive(user.id);
        dispatch(saveid(user.id));
    }

    function handleCloseModal() {
        setIsModalShow(false)
    }

    function handleSubmitInvite(invite) {
        accept(invite.id).then(result => {
            if (!result) return;
            const index = invites.indexOf(invite)
            invites.splice(index, 1);
            setInvites(invites);
        });
    }

    function handleDiscardInvite(invite) {
        decline(invite.id).then(result => {
            if (!result) return;
            const index = invites.indexOf(invite)
            invites.splice(index, 1);
            setInvites(invites);
        });
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

    /* клик вне search*/
    useEffect(() => {
        function handleClickOutside(event) {
            if (isActiveSearchRef.current && !event.target.closest('#search-container')) {
                setIsActiveSearch(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        // получить инвайты
        getInvites().then(unparsed_invites => {
            console.log(unparsed_invites);
            setInvites(unparsed_invites.map(unparsed_invite => {
                return {
                    id: unparsed_invite.chatId.id,
                    name: unparsed_invite.chatId.name,
                    nickname: unparsed_invite.inviterNickname,
                }
            }))
        })


        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    /*  сорт чаты */
    useEffect(() => {
        setUsers(sortUsersByTime(sortUsersBySearch(Users)));
    }, [searchText]);

    return (<>
        <Modal isOpen={isModalShow} onClose={handleCloseModal} label='Создать чат'>
            <AddChat />
        </Modal>
        <div className={`w-full h-full flex flex-col gap-y-4 `}>
            <div className={`flex flex-row gap-x-2 ${isActiveSearch ? "px-0" : "px-4"}`}>
                <div ref={isActiveSearchRef} id="search-container" className="w-full"><Search callback={setSearchText} value={searchText} onClick={setIsActiveSearch} isActive={isActiveSearch} /></div>
                <div className={`${isActiveSearch && "hidden"}`}><AddChatButton callback={() => setIsModalShow(true)} /></div>
            </div>

            {invites.length > 0 && invites.map((invite) =>
                <Invite key={invite.id} invite={invite} onSubmit={() => handleSubmitInvite(invite)} onDiscard={() => handleDiscardInvite(invite)} />
            )}

            {users && users.map((user) =>
                <ChatRoom key={user.id} callback={handleClickChat} active={active} user={user} />
            )}
        </div>
    </>)
}

export { ChatList };
