import { isAction } from "@reduxjs/toolkit";
import "./index.css"

function ChatRoom({ user, active, callback }) {

    return (<>
        <div onClick={()=>callback(user)} className={`min-w-[300px] h-20 p-2 px-4 flex flex-row items-center gap-x-2 rounded-2xl ${active === user.id ? 'bg-active' : 'bg-main'} transition ease-in-out hover:bg-active `}>
            <div className="w-12 h-12 aspect-square rounded-full bg-blue-100"></div>
            <div className="h-12 w-full flex flex-col">
                <div className="w-full flex flex-row justify-between">
                    <div className="text-white font-semibold">{user.name}</div>
                    <div className="text-gray-300 text-sm">{user.time}</div>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="overflow-hidden text-gray-300">Я съел деда</div>
                    {user.newMessage && <div className="w-6 h-6 flex justify-center items-center rounded-full aspect-square text-white text-sm bg-blue-400">8</div>}
                </div>
            </div>
        </div>

    </>)
}

export { ChatRoom };