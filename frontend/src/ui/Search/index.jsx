

function Search({callback, value, onClick}) {

    return(<>
        <div onClick={onClick} className="w-full ">
            <input type="text" value={value} onChange={(e)=>callback(e.target.value)} placeholder="Поиск" className="w-full rounded-2xl px-6 py-4 bg-noActive text-white outline-none transition ease-in-out hover:bg-hover active:bg-hover"/>
        </div>
    </>)
}

export {Search};