
function ModalButton({ callback, label }) {

    return (
        <button onClick={callback} className="p-2 px-3 h-10 w-min text-center rounded-2xl bg-gradient-to-br from-start to-end active:scale-110 transition ease-in-out hover:cursor-default hover:scale-105">
            <div className="text-white">{label}</div>
        </button>
    );
};

export { ModalButton }