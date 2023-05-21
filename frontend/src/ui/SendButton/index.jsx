
function SendButton({ callback, label }) {

    return (
        <button onClick={callback} className="p-2 h-10 flex flex-row gap-2 rounded-2xl bg-gradient-to-br from-start to-end active:scale-110 transition ease-in-out hover:cursor-default hover:scale-105">
            <div className="text-white hidden lg:block">{label}</div>
            <div className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </div>
        </button>
    );
};

export { SendButton }