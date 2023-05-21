import { PhoneInput, BackButton, GenderSelect } from "../../ui";
import { useNavigate } from 'react-router';
import { Tab } from '@headlessui/react'
import { useEffect, useState } from "react";
import { addUserData, whoAmI } from "../../core/api";

const InputStyle = "py-2 bg-transparent border-2 rounded-xl p-2 px-3 transition border-g focus:duration-150 border-slate-700 focus:border-purple-800 focus:bg-slate-900 text-white placeholder-gray-400 outline-none"


function ProfilePage() {

    let navigate = useNavigate();
    const [extra, setExtra] = useState(false);
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState(false);


    const [emptyLogin, setEmptyLogin] = useState(true);
    const [emptyPassword, setEmptyPassword] = useState(true);
    const [emptySurname, setEmptySurname] = useState(true);
    const [emptyName, setEmptyName] = useState(true);
    const [emptyMail, setEmptyMail] = useState(true);
    const [emptyPhone, setEmptyPhone] = useState(true);
    const [emptyNick, setEmptyNick] = useState(true);
    const [emptyGender, setEmptyGender] = useState(true);
    const [warn, setWarn] = useState("");
    const [error, setError] = useState(false);

    const [changedLogin, setChangedLogin] = useState(false);
    const [changedPassword, setChangedPassword] = useState(false);
    const [changedSurname, setChangedSurname] = useState(false);
    const [changedName, setChangedName] = useState(false);
    const [changedMail, setChangedMail] = useState(false);
    const [changedPhone, setChangedPhone] = useState(false);
    const [changedNick, setChangedNick] = useState(false);
    const [changedGender, setChangedGender] = useState(false);

    const [personal, setPersonal] = useState(true);
    const [secure, setSecure] = useState(false);
    const [achiv, setAchiv] = useState(false);
    const [main, setMain] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);

    // проверка на изменение
    const isChangedLogin = () => {
        (editedUser.login != user.login) ? setChangedLogin(true) : setChangedLogin(false)
    }

    const isChangedPassword = () => {
        (editedUser.password != user.password) ? setChangedPassword(true) : setChangedPassword(false)
    }

    const isChangedSurname = () => {
        (editedUser.surname != user.surname) ? setChangedSurname(true) : setChangedSurname(false)
    }

    const isChangedName = () => {
        (editedUser.name != user.name) ? setChangedName(true) : setChangedName(false)
    }

    const isChangedMail = () => {
        (editedUser.mail != user.mail) ? setChangedMail(true) : setChangedMail(false)
    }

    const isChangedPhone = () => {
        (editedUser.number != user.number) ? setChangedPhone(true) : setChangedPhone(false)
    }

    const isChangedNick = () => {
        (editedUser.nickname != user.nickname) ? setChangedNick(true) : setChangedNick(false)
    }

    const isChangedGender = () => {
        (editedUser.gender != user.gender) ? setChangedGender(true) : setChangedGender(false)
    }

    // проверка на пустоту
    const isEmptyLogin = () => {
        (editedUser.login === "") ? setEmptyLogin(true) : setEmptyLogin(false)
    }

    const isEmptyPassword = () => {
        (editedUser.password === "") ? setEmptyPassword(true) : setEmptyPassword(false)
    }

    const isEmptySurname = () => {
        (editedUser.surname === "") ? setEmptySurname(true) : setEmptySurname(false)
    }

    const isEmptyName = () => {
        (editedUser.name === "") ? setEmptyName(true) : setEmptyName(false)
    }

    const isEmptyMail = () => {
        (editedUser.mail === "") ? setEmptyMail(true) : setEmptyMail(false)
    }

    const isEmptyPhone = () => {
        (editedUser.phone === "") ? setEmptyPhone(true) : setEmptyPhone(false)
    }

    const isEmptyNick = () => {
        (editedUser.nick === "") ? setEmptyNick(true) : setEmptyNick(false)
    }

    const isEmptyGender = () => {
        (editedUser.gender === "") ? setEmptyGender(true) : setEmptyGender(false)
    }

    useEffect(() => {
        whoAmI().then((data) => {
            console.log("Получаемые данные");
            console.log(data);
            const myuser = {
                login: data.login,
                mail: data.mail,
                nickname: data.nickname,
                gender: data.userData.gender,
                surname: data.userData.surname,
                name: data.userData.name,
                number: data.userData.number
            }
            setUser(myuser);
            console.log("Пользователь");
            console.log(myuser);
            setEditedUser(structuredClone(myuser))
        })
    }, [])

    const [editedUser, setEditedUser] = useState(structuredClone(user));

    useEffect(() => {
        //console.log(width);
        window.innerWidth;
    }, [])

    useEffect(() => {
        isChangedLogin();
        isChangedPassword();
        isChangedSurname();
        isChangedName();
        isChangedMail();
        isChangedPhone();
        isChangedNick();
        isChangedGender();

        isEmptyLogin();
        isEmptyPassword();
        isEmptySurname();
        isEmptyName();
        isEmptyMail();
        isEmptyPhone();
        isEmptyNick();
        isEmptyGender();
        // console.log(editedUser)
    }, [editedUser])

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setEditedUser({
            ...editedUser,
            [name]: value
        });
    };

    const handleEditUser = (e) => {
        if (emptySurname) {
            setWarn("Поле фамилии не должно быть пустым");
            return;
        }
        if (emptyName) {
            setWarn("Поле имени не должно быть пустым");
            return;
        }
        if (emptyNick) {
            setWarn("Поле никнейма не должно быть пустым");
            return;
        }
        if (!changedName && !changedSurname && !changedNick && !changedPhone && !changedGender) {
            setWarn("Не были внесены изменения");
            return;
        } else {

            addUserData({
                name: editedUser.name,
                surname: editedUser.surname,
                number: editedUser.number,
                gender: editedUser.gender,
                nickname: editedUser.nickname
            })
            setEdit(false);
            window.location.reload();
        }
    }

    const handleEditSec = (e) => {
        if (emptyLogin) {
            setWarn("Поле логина не должно быть пустым");
            return;
        }
        if (emptyPassword) {
            setWarn("Поле пароля не должно быть пустым");
            return;
        }
        if (emptyMail) {
            setWarn("Поле почты не должно быть пустым");
            return;
        }
        else {
            addUserData({
                login: editedUser.login,
                password: editedUser.password,
                mail: editedUser.mail,
            })
            setEdit(false);
            window.location.reload();
        }
    }

    return (<>
        <div className="flex">
            <div className={((main) ? "" : " hidden lg:relative") + " h-full w-full lg:w-5/12  flex flex-col text-white space-y-5"}>
                <div className="flex space-x-2 items-center p-3 text-3xl">
                    <BackButton />
                    <p>Мой профиль</p>
                </div>

                <div className=" flex space-x-4 p-2 justify-center">
                    <img src="https://i.ytimg.com/vi/laAgH_ghsx0/maxresdefault.jpg" className=" rounded-full w-[130px] h-[130px]" />
                    <div className="flex flex-col ">
                        <h1 className=" text-2xl">{user.surname} {user.name}</h1>
                        <p className=" text-md text-gray-500">{user.nickname}</p>
                    </div>
                </div>

                <p className=" text-xl text-bold text-gray-500 text-center">Настройки профиля</p>
                <div className="flex justify-center">
                    <div className="flex flex-col w-7/12 md:w-1/3 space-y-3">
                        <div className="flex justify-between items-center rounded-3xl pl-4 pr-6 py-1 bg-purple-700 w-full bg-gradient-to-tr from-start to-end  cursor-pointer"
                            onClick={
                                (e) => {
                                    if (window.innerWidth > 768) {
                                        setAchiv(false);
                                        setPersonal(true);
                                        setSecure(false);
                                        setMain(true);
                                    }
                                    else {
                                        setAchiv(false);
                                        setPersonal(true);
                                        setSecure(false);
                                        setMain(false);
                                    }

                                }
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p>Личные данные</p>
                        </div>

                        <div className="flex justify-between items-center rounded-3xl pl-4 pr-6 py-1 bg-purple-700 w-full bg-gradient-to-tr from-start to-end  cursor-pointer"
                            onClick={
                                (e) => {
                                    if (window.innerWidth > 768) {
                                        setAchiv(false);
                                        setPersonal(false);
                                        setSecure(true);
                                        setMain(true);
                                    }
                                    else {
                                        setAchiv(false);
                                        setPersonal(false);
                                        setSecure(true);
                                        setMain(false);
                                    }

                                }
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                            </svg>
                            <p>Безопасность</p>
                        </div>

                        <div className="flex justify-between items-center rounded-3xl pl-4 pr-6 py-1 bg-purple-700 w-full bg-gradient-to-tr from-start to-end cursor-pointer"
                            onClick={
                                (e) => {
                                    if (window.innerWidth > 768) {
                                        setAchiv(true);
                                        setPersonal(false);
                                        setSecure(false);
                                    }
                                    else {
                                        setAchiv(true);
                                        setPersonal(false);
                                        setSecure(false);
                                        setMain(false);
                                    }

                                }
                            }
                        >
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

            <div className={((personal) ? "" : "hidden") + " w-7/12 text-white flex flex-col items-center"}>
                <button
                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold lg:hidden "
                    onClick={e => {
                        setAchiv(false);
                        setPersonal(false);
                        setSecure(false);
                        setMain(true);
                    }}
                >
                    Вернуться
                </button>
                <p className=" text-center text-2xl">Личные данные</p>

                <div className="flex flex-col w-1/2 p-4 space-y-3">
                    <div className="flex justify-between">
                        {(emptySurname || emptyName || emptyPhone || emptyGender || emptyNick || error) && <span className=" text-sm text-center text-red-600">{warn}</span>}
                        <p>Фамилия:</p>
                        {(edit) ?
                            <input className={InputStyle} name="surname" value={editedUser.surname}
                                onChange={(e) => { handleInputChange(e) }} /> :
                            <p>{user.surname}</p>
                        }

                    </div>
                    <div className="flex justify-between">
                        <p>Имя:</p>
                        {(edit) ?
                            <input className={InputStyle} name="name" value={editedUser.name}
                                onChange={(e) => { handleInputChange(e) }} /> :
                            <p>{user.name}</p>
                        }
                    </div>

                    <div className="flex justify-between">
                        <p>Пол:</p>
                        {(edit) ?
                            <GenderSelect
                                onChange={(e) => setEditedUser({ ...editedUser, gender: e })} /> :
                            <p>{(user.gender == "male") ? "мужской" : ((user.gender == "female") ? "женский" : "небинарный")}</p>
                        }
                    </div>

                    <div className="flex justify-between">
                        <p>Никнейм:</p>
                        {(edit) ?
                            <input className={InputStyle} name="nickname" value={editedUser.nickname}
                                onChange={(e) => { handleInputChange(e) }} /> :
                            <p>{user.nickname}</p>
                        }
                    </div>

                    <div className="flex justify-between">
                        <p>Телефон:</p>
                        {(edit) ?
                            <PhoneInput onChange={(e) => setEditedUser({ ...editedUser, number: e })} value={editedUser.number} /> :
                            <p>{user.number}</p>
                        }
                    </div>
                    <div className="flex justify-center">
                        {(!edit) ?
                            <button
                                className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold "
                                onClick={(e) => setEdit(true)}
                            >Редактировать</button> :
                            <div className="flex space-x-4">
                                <button
                                    onClick={(e) => setEdit(false)}
                                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold "
                                >Отменить</button>
                                <button
                                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold "
                                    onClick={handleEditUser}
                                >Изменить</button>
                            </div>
                        }
                    </div>

                </div>
            </div>

            <div className={((secure) ? "" : "hidden") + " w-7/12 text-white flex flex-col items-center"}>
                <button
                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold lg:hidden "
                    onClick={e => {
                        setAchiv(false);
                        setPersonal(false);
                        setSecure(false);
                        setMain(true);
                    }}
                >
                    Вернуться
                </button>
                <p className=" text-center text-2xl">Безопасноть</p>

                <div className="flex flex-col w-1/2 p-4 space-y-3">
                    <div className="flex justify-between">
                        {(emptySurname || emptyName || emptyPhone || emptyGender || emptyNick || error) && <span className=" text-sm text-center text-red-600">{warn}</span>}
                        <p>Login:</p>
                        {(edit) ?
                            <input className={InputStyle} name="login" value={editedUser.login}
                                onChange={(e) => { handleInputChange(e) }} /> :
                            <p>{user.login}</p>
                        }

                    </div>
                    <div className="flex justify-between">
                        <p>Password:</p>
                        {(edit) ?
                            <input className={InputStyle} name="password" value={editedUser.password}
                                onChange={(e) => { handleInputChange(e) }} /> :
                            <p>*******</p>
                        }
                    </div>

                    <div className="flex justify-between">
                        <p>Почта:</p>
                        {(edit) ?
                            <input className={InputStyle} name="mail" value={editedUser.mail}
                                onChange={(e) => { handleInputChange(e) }} /> :
                            <p>{user.mail}</p>
                        }
                    </div>

                    <div className="flex justify-center">
                        {(!edit) ?
                            <button
                                className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold "
                                onClick={(e) => setEdit(true)}
                            >Редактировать</button> :
                            <div className="flex space-x-4">
                                <button
                                    onClick={(e) => setEdit(false)}
                                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold "
                                >Отменить</button>
                                <button
                                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold "
                                    onClick={handleEditUser}
                                >Изменить</button>
                            </div>
                        }
                    </div>

                </div>
            </div>

            <div className={((achiv) ? "" : "hidden") + " w-7/12 text-white flex flex-col items-center"}>
                <button
                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl m-2 p-4 font-bold lg:hidden "
                    onClick={e => {
                        setAchiv(false);
                        setPersonal(false);
                        setSecure(false);
                        setMain(true);
                    }}
                >
                    Вернуться
                </button>
                <img src="https://cs14.pikabu.ru/post_img/2021/09/28/10/og_og_1632850588253511082.jpg" />
            </div>
        </div>
    </>)
}

export { ProfilePage };