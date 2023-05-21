
function ChatRoom({ user, active, callback }) {

    return (<>
        <div onClick={()=>callback(user)} className={`w-full h-20 p-2 px-4 flex flex-row items-center gap-x-2 rounded-2xl ${active === user.id ? 'bg-active' : 'bg-noActive hover:bg-hover'} transition cursor-default ease-in-out `}>
            <div className="w-12 h-12 aspect-square rounded-full bg-blue-100"></div>
            <div className="h-12 w-full flex flex-col">
                <div className="w-full flex flex-row justify-between">
                    <div className="text-white font-semibold">{user.name}</div>
                    <div className="text-gray-300 text-sm">{user.time}</div>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="overflow-hidden text-gray-300">{user.lastMessage}</div>
                </div>
            </div>
        </div>
    </>)
}

export { ChatRoom };