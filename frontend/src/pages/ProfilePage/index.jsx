import { PhoneInput, BackButton } from "../../ui";
import { useNavigate } from 'react-router';
import { Tab } from '@headlessui/react'
import { useEffect, useState } from "react";


function ProfilePage() {

    let navigate = useNavigate();
    const [extra, setExtra] = useState(false);

    useEffect(() => {
        
    }, [])

    return (<>
        <div className=" h-full w-full md:w-5/12 fixed top-0 left-0 flex flex-col text-white space-y-5">
            <div className="flex space-x-2 items-center p-3 text-3xl">
                <BackButton />
                <p>Мой профиль</p>
            </div>

            <div className=" flex space-x-4 p-2">
                <img src="https://i.ytimg.com/vi/laAgH_ghsx0/maxresdefault.jpg" className=" rounded-full w-[130px] h-[130px]" />
                <div className="flex flex-col ">
                    <h1 className=" text-2xl">Фамилия Имя</h1>
                    <p className=" text-md text-gray-500">Никнейм</p>
                </div>
            </div>
            <p className=" text-xl text-bold text-gray-500 text-center">Настройки профиля</p>
            <div className="flex justify-center">
                <div className="flex flex-col w-7/12 md:w-1/3 space-y-3">
                    <div className="flex justify-between items-center rounded-3xl pl-4 pr-6 py-1 bg-purple-700 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>Личные данные</p>
                    </div>

                    <div className="flex justify-between items-center rounded-3xl pl-4 pr-10 py-1 bg-fuchsia-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                        </svg>
                        <p>Безопасность</p>
                    </div>

                    <div className="flex justify-between items-center rounded-3xl pl-4 pr-10 py-1 bg-fuchsia-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                        </svg>
                        <p>Достижения</p>
                    </div>
                </div>
            </div>
            <span className=" bg-slate-600 h-[2px] mx-5" />
            <p className=" text-xl text-bold text-gray-500 text-center">Мой аккаунт</p>
            <div className=" flex justify-center">
                <div className=" flex justify-between w-1/3 rounded-full bg-violet-800 px-4 py-2">
                    <p>Выйти</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                </div>
            </div>
        </div>

        <div className=" w-7/12">
            <h1>Личные данные</h1>
        </div>
    </>)
}

export { ProfilePage };