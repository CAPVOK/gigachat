
function Invite({ invite, onSubmit, onDiscard }) {

    return (<>
        <div className={`w-full p-1 rounded-2xl bg-gradient-to-br from-start to-end`}>
            <div className="w-full h-20 p-1 px-3 flex flex-row items-center gap-x-2 rounded-2xl bg-noActive">
                <div className="w-full h-full text-white inline">
                    <div className="inline text-sm">{`Пользователь `}</div>
                    <div className="inline font-medium">{`${invite.nickname} `}</div>
                    <div className="inline text-sm">{`приглашает вас в `}</div>
                    <div className="inline font-medium">{`${invite.name} `}</div>
                </div>
                <div className="h-full flex flex-col justify-around">
                    <div onClick={onSubmit} className="h-7 aspect-square rounded-full flex flex-row justify-center items-center text-white transition ease-in-out bg-hover hover:bg-active">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <div onClick={onDiscard} className="h-7 aspect-square rounded-full flex flex-row justify-center items-center text-white transition ease-in-out bg-hover hover:bg-active">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>

    </>)
}

export { Invite };