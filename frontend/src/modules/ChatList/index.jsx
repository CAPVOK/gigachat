import { useState, useEffect, useRef } from "react";

import { Search, AddChatButton } from "../../ui";
import { ChatRoom, AddChat, Modal, Invite } from "../../components";
import { accept, decline, getInvites, getChats } from "../../core/api";

function ChatList({ activeChat, setActiveChat }) {
    const [searchText, setSearchText] = useState(''); // текст поиска 
    const [isActiveSearch, setIsActiveSearch] = useState(false); // тыкнули ли мы на поиск
    const [isModalShow, setIsModalShow] = useState(false); // модалка 

    const [users, setUsers] = useState([]); // сорт чаты
    const [invites, setInvites] = useState([])

    const isActiveSearchRef = useRef(false);

    const [chats, setChats] = useState([
        { id: 1, name: "Vova", time: '14:09', newMessage: true, content: "ужпас"},
        { id: 2, name: "Vova", time: '12:20', newMessage: false, content: "бомба!" },
    ]);


    function handleClickChat(user) {
        setActiveChat(user.id);
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


    useEffect(() => {
        function handleClickOutside(event) {
            if (isActiveSearchRef.current && !event.target.closest('#search-container')) {
                setIsActiveSearch(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        // // получить инвайты
        // getInvites().then(unparsed_invites => {
        //     console.log(unparsed_invites);
        //     setInvites(unparsed_invites.map(unparsed_invite => {
        //         return {
        //             id: unparsed_invite.chatId.id,
        //             name: unparsed_invite.chatId.name,
        //             nickname: unparsed_invite.inviterNickname,
        //         }
        //     }))
        // })

        // получить чаты
        getChats().then(unparsed_chats => {
            console.log(unparsed_chats);
            setUsers(unparsed_chats.map(unparsed_chat => {
                return {
                    id: unparsed_chat.id,
                    name: unparsed_chat.name,
                    time: (() => { if (unparsed_chat.messageList == []) { return '' } else { return Date.now().toString()  } })(),
                    newMessage: false,
                    lastMessage: (() => { if (unparsed_chat.messageList == []) { return '' } else {
                        const msgs = unparsed_chat.messageList;
                        return msgs[msgs.length - 1].content;
                    } })(),
                }
            }))
        });

        return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

        /*  сорт чаты */
        useEffect(() => {
            setUsers(sortUsersByTime(sortUsersBySearch(chats)));
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

                {users.length > 0 && users.map((user) =>
                    <ChatRoom key={user.id} callback={handleClickChat} active={activeChat} user={user} />
                )}
            </div>
        </>)
    }

export { ChatList };
