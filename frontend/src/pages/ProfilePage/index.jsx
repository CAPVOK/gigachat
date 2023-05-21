import { PhoneInput, BackButton } from "../../ui";
import { useNavigate } from 'react-router';
import { Tab } from '@headlessui/react'
import { useState } from "react";


function ProfilePage () {

    let navigate = useNavigate();
    const [extra, setExtra] = useState(false);
    return (
        <div className=" h-full w-full fixed top-0 left-0 flex items-center justify-center flex-col text-white">
            <div className=" w-1/2">
                <div className="flex items-center justify-start">
                    <BackButton/>
                    <h1>Мой аккаунт</h1>
                </div>
                <div className="flex items-center justify-items-start space-x-10 p-4">
                    <img src="https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-lev-v-ochkah-otrazhayutsya-zebry.jpg"
                    className="w-[150px] h-[150px] rounded-full"/>
                    <p  className=" text-gray-400 text-xl px-1">Фамилия Имя</p>
                </div>

                <div className="flex justify-start"><p className=" text-left">Личные данные</p></div>

                <div className=" bg-slate-700 rounded-lg grid grid-cols-8 text-3xl">
                    <div className=" col-start-1 col-end-3">
                        <p className=" text-gray-400 text-xl px-1">Фамилия</p>
                    </div>
                    <div className=" col-start-1 col-end-6">
                        <input className="p-2 rounded-lg ml-3 bg-slate-700 outline-none read-only:" value={"Фамилия"}/>
                    </div>
                    <div className="col-end-9">Edit</div>
                    
                    <div className=" col-start-1 col-end-3">
                        <p className=" text-gray-400 text-xl px-1">Имя</p>
                    </div>
                    <div className=" col-start-1 col-end-6">
                        <input className="p-2 rounded-lg ml-3 bg-slate-700 outline-none read-only:" value={"Имя"}/>
                    </div>
                    <div className="col-end-9">Edit</div>

                    <div className=" col-start-1 col-end-3">
                        <p className=" text-gray-400 text-xl px-1">Дата рождения</p>
                    </div>
                    <div className=" col-start-1 col-end-7 py-1">
                        <input type="date" className="p-2 rounded-lg ml-3 bg-slate-700 outline-none read-only:"/>
                    </div>
                    <div className=" col-end-9">Edit</div>

                    <div className=" col-start-1 col-end-3">
                        <p className=" text-gray-400 text-xl px-1">Пол</p>
                    </div>
                    <div className=" col-start-1 col-end-7 py-1">
                        <input className="p-2 rounded-lg ml-3 bg-slate-700 outline-none read-only:"/>
                    </div>
                    <div className=" col-end-9">Edit</div>
                </div>

                <div className="flex justify-start"><p className=" text-left">Личные данные</p></div>

                <div className=" bg-slate-700 rounded-lg grid grid-cols-8 text-3xl">
                    <div className=" col-start-1 col-end-3">
                        <p className=" text-gray-400 text-xl px-1">Фамилия</p>
                    </div>
                    <div className=" col-start-1 col-end-6">
                        <input className="p-2 rounded-lg ml-3 bg-slate-700 outline-none read-only:" value={"Фамилия"}/>
                    </div>
                    <div className="col-end-9">Edit</div>
                    
                    <div className=" col-start-1 col-end-3">
                        <p className=" text-gray-400 text-xl px-1">Имя</p>
                    </div>
                    <div className=" col-start-1 col-end-6">
                        <input className="p-2 rounded-lg ml-3 bg-slate-700 outline-none read-only:" value={"Имя"}/>
                    </div>
                    <div className="col-end-9">Edit</div>

                    <div className=" col-start-1 col-end-3">
                        <p className=" text-gray-400 text-xl px-1">Дата рождения</p>
                    </div>
                    <div className=" col-start-1 col-end-7 py-1">
                        <input type="date" className="p-2 rounded-lg ml-3 bg-slate-700 outline-none read-only:"/>
                    </div>
                    <div className=" col-end-9">Edit</div>

                    <div className=" col-start-1 col-end-3">
                        <p className=" text-gray-400 text-xl px-1">Пол</p>
                    </div>
                    <div className=" col-start-1 col-end-7 py-1">
                        <input className="p-2 rounded-lg ml-3 bg-slate-700 outline-none read-only:"/>
                    </div>
                    <div className=" col-end-9">Edit</div>
                </div>
            </div>
        </div>
    )
}

export {ProfilePage};