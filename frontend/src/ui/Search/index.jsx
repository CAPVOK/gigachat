

function Search({ callback, value, onClick, isActive }) {

    return (<>
        <div onClick={() => onClick(true)} className="w-full ">
            <input
                type="text"
                value={value}
                onChange={(e) => callback(e.target.value)}
                placeholder="Поиск"
                className={`w-full rounded-2xl px-4 py-2 ${isActive ? "bg-hover" : "bg-noActive hover:bg-hover" } text-white outline-none transition ease-in-out`} />
        </div>
    </>)
}

export { Search };