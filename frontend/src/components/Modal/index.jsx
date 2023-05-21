import { ExitButton } from "../../ui";

function Modal({ isOpen, onClose, children, label }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>

            <div className="relative z-10 bg-noActive p-4 rounded-2xl text-white">
                <div className="flex flex-row justify-between items-center">

                    <div className="text-xl cursor-default">{label}</div>

                    <div className="self-end ">
                        <ExitButton callback={onClose}/>
                    </div>

                </div>
                {children}
            </div>

        </div>
    );
}


export { Modal };