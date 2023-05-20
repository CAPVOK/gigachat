import { PhoneInput, BackButton } from "../../ui";
import { useNavigate } from 'react-router';
import { Tab } from '@headlessui/react'
import { useState } from "react";

function ProfilePage () {

    let navigate = useNavigate();
    const [extra, setExtra] = useState(false);
    return (<>
        <div className="text-white flex flex-col">
            Страница Профиля
            {/* <Tab.Group>
                <Tab.List>
                    <Tab className="ui-selected:bg-blue-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black"><span className=" w-[50px] h-[15px] rounded-md bg-purple-800 absolute"/> 123</Tab>
                    <Tab className="ui-selected:bg-blue-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black"><span className=" w-[50px] h-[15px] rounded-md bg-slate-800 border-purple-800 absolute left-4"/>456</Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        Регистрация
                    </Tab.Panel>
                    <Tab.Panel>
                        Дополнительно
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group> */}
            <div className="flex p-6">
                <span className="w-[50px] h-[15px] rounded-md bg-purple-800 absolute"/>
                <span className={((!extra)?(" bg-slate-800"):(" bg-purple-800")) + " w-[50px] h-[15px] rounded-md border-purple-800 border-2 absolute left-24"}/>
            </div>
            <div className={((extra)?" hidden":"")+ " flex flex-col items-start"}>
                <p>Основная регистрация</p>
                <button onClick={(e) => setExtra(!extra)}>Потдвердить</button>
            </div>

            <div className={((!extra)?" hidden":"")+ " flex flex-col items-start"}>
                <p>Дополнительная регистрация</p>
                <button onClick={(e) => setExtra(!extra)}>Вернуться</button>
            </div>
        </div>
    </>)
}

export {ProfilePage};