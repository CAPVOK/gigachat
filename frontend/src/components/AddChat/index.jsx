import { useState, useEffect } from "react";
import { addNewChat } from "../../core/api";
import { ModalButton } from "../../ui";

function AddChat() {
    const [formData, setFormData] = useState({
        type: '',
        name: '',
    })

    function handleInput(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleCreate() {
        if (formData.name) {
            addNewChat({ name: formData.name, type: (formData.type ? "multi" : "single") })
                .then(() => console.log("Ok"))
                .catch(() => console.log("Ошибка"));
        }
    }

    return (<>
        <div className="w-96 h-60 flex flex-col justify-around items-center">
            <input type="text" placeholder="Введите название чата" name="name" onChange={(e) => handleInput(e)}
                className="p-2 px-4 bg-hover outline-none rounded-xl" />

            <input type="checkbox" name="type" id="chattype" onChange={(e) => handleInput(e)}
                className="hidden" />
            <label htmlFor="chattype" className="flex flex-nowrap flex-row gap-2 items-center cursor-pointer">
                <div >Групповой чат</div>
                <div className={`h-5 aspect-square flex rounded-full ${formData.type ? "bg-end" : "bg-hover"}`}></div>
            </label>

            <div className="flex flex-row justify-center">
                <ModalButton callback={handleCreate} label="Создать" />
            </div>
        </div>
    </>)
}

export { AddChat };