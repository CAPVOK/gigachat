
function ChatInput({ onChange, value, onKeyDown, }) {

    return (
        <input type="text"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            value={value}
            placeholder="Введите сообщение"
            className="w-full h-10 rounded-2xl px-4 bg-hover text-white 
                outline-none transition ease-in-out hover:bg-active focus:bg-active" />
    );
};

export { ChatInput }