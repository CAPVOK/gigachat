
function Invite({ invite, callback }) {

    return (<>
        <div onClick={()=>callback(invite)} className={`w-full h-20 p-2 px-4 flex flex-row items-center gap-x-2 rounded-2xl bg-gradient-to-br from-start to-end transition ease-in-out `}>
            <div className="w-12 h-12 aspect-square rounded-full bg-blue-100"></div>
            <div className="h-12 w-full flex flex-col">
                <div className="w-full flex flex-row justify-between">
                    <div className="text-white font-semibold">Fylhtq</div>
                    <div className="text-gray-300 text-sm">Федор</div>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="overflow-hidden text-gray-300">Я съел бабу</div>
                </div>
            </div>
        </div>

    </>)
}

export { Invite };