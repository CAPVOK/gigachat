import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { GenderSelect, PhoneInput } from "../../ui";
import { Carousel } from "../../components";
import { addUserData, confirmRegistration, createRegistrationCode, login, sendEmailCode } from "../../core/api";

const InputStyle = "py-2 bg-transparent border-2 rounded-xl p-2 px-3 transition border-g focus:duration-150 border-slate-700 focus:border-purple-800 focus:bg-slate-900 text-white placeholder-gray-400 outline-none"
const PStyle = "text-left text-md mt-6 mb-1"

function RegPage () {

    let navigate = useNavigate();
    const [user, setUser] = useState({
        login: "",
        password: "",
        mail: "",
        surname: "",
        name: "",
        date: "",
        nick: "",
        phone: "",
        gender: "male"
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value
        });
    };

    const [emptyLogin, setEmptyLogin] = useState(true);
    const [emptyPassword, setEmptyPassword] = useState(true);
    const [emptySurname, setEmptySurname] = useState(true);
    const [emptyName, setEmptyName] = useState(true);
    const [emptyMail, setEmptyMail] = useState(true);
    const [emptyPhone, setEmptyPhone] = useState(true);
    const [emptyNick, setEmptyNick] = useState(true);
    const [emptyGender, setEmptyGender] = useState(true);
    const [warn, setWarn] = useState("");
    const [check, setCheck] = useState(false);
    const [cod, setCod] = useState("");
    const [extra, setExtra] = useState(false);
    const [error, setError] = useState(false);

    const isEmptyLogin = () => {
        (user.login === "") ? setEmptyLogin(true) : setEmptyLogin(false) 
    }

    const isEmptyPassword = () => {
        (user.password === "") ? setEmptyPassword(true) : setEmptyPassword(false) 
    }

    const isEmptySurname = () => {
        (user.surname === "") ? setEmptySurname(true) : setEmptySurname(false) 
    }

    const isEmptyName = () => {
        (user.name === "") ? setEmptyName(true) : setEmptyName(false) 
    }

    const isEmptyMail = () => {
        (user.mail === "") ? setEmptyMail(true) : setEmptyMail(false) 
    }

    const isEmptyPhone = () => {
        (user.phone === "") ? setEmptyPhone(true) : setEmptyPhone(false) 
    }

    const isEmptyNick = () => {
        (user.nick === "") ? setEmptyNick(true) : setEmptyNick(false) 
    }

    const isEmptyGender = () => {
        (user.gender === "") ? setEmptyGender(true) : setEmptyGender(false) 
    }

    const handleSubmit = (e) => {
        
        console.log(emptyLogin);
        console.log(emptyPassword);
        if(emptyLogin){
            setWarn("Поле логина не должно быть пустым");
            return;
        }
        if(emptyPassword){   
            setWarn("Поле пароля не должно быть пустым");
            return;
        } 
        if(emptyMail){   
            setWarn("Поле почты не должно быть пустым");
            return;
        } 
        else {
            console.log(user);
            createRegistrationCode(user.login, user.mail).then((data) => {
                console.log(data);
                if(data.status == "user already exists"){
                    setError(true);
                    setWarn("Логин уже занят");
                    return;
                }
                if(data.status == "mail already exists"){
                    setError(true);
                    setWarn("Почта уже зарегистрована");
                    return;
                }
                if(data.status == "done"){
                    sendEmailCode(user.mail);
                    setCheck(true);
                    setError(false);
                }
            } )    
        }
        
    }
    
    useEffect(() => {
        isEmptyLogin();
        isEmptyPassword();
        isEmptySurname();
        isEmptyName();
        isEmptyMail();
        isEmptyPhone();
        isEmptyNick();
        isEmptyGender();
        console.log(user)
    },[user])

    const handleCheck = (e) => {
        confirmRegistration(user.login, user.mail, user.password, cod).then((data) => {
            if(data == "denied"){
                setError(true);
                setWarn("Неправильный код подтверждения");
                return;
            }
            else{
                login(user.login, user.password).then((data) => {
                    console.log(data);
                    localStorage.setItem("sessionId", data.sessionId);
                })
                setExtra(!extra);
                console.log(cod);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleExtra = (e) => {
        if(emptySurname){   
            setWarn("Поле фамилии не должно быть пустым");
            return;
        } 
        if(emptyName){   
            setWarn("Поле имени не должно быть пустым");
            return;
        }
        if(emptyNick){   
            setWarn("Поле никнейма не должно быть пустым");
            return;
        } else {
            addUserData({
                DOB: user.date,
                name: user.name, 
                surname: user.surname,
                number: user.phone,
                gender: user.gender,
                nickname: user.nick
            }).then(navigate("/"))
            
        }
    }

    const slides = [
        'https://mobimg.b-cdn.net/v3/fetch/e6/e6044cb0b978ce39ff76b57402ebd1de.jpeg',
        'https://mobimg.b-cdn.net/v3/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg?w=1470&r=0.5625',
        'https://mobimg.b-cdn.net/v3/fetch/74/74739e1770f31cdbfdde99cc0b2925d3.jpeg?w=1470&r=0.5625',
      ];

    return (<>
        <div className="h-full w-full fixed top-0 left-0 flex items-center justify-center flex-col text-white text-xl bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg animate-tilt">
            <h1 className="text-5xl sm:text-6xl font-bold mb-10">Регистрация</h1>
            
            <div className="flex p-6 space-x-4 justify-items-start">
                <span className={" w-[50px] h-[15px] rounded-md bg-green-600 shadow-fuchsia-600"}/>
                
                <span className={((!extra)?(" bg-rose-600"):(" bg-green-600")) + " w-[50px] h-[15px] rounded-md border-yellow-400 border-2"}/>
                {/* <div className=" group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt -z-0"></div> */}
            </div>
            <div className={((extra)?" hidden":"")+ " flex flex-col items-start z-10"}>
                <p>Основная регистрация</p>
                {(emptyLogin || emptyPassword || emptyMail || error)&&<span>{warn}</span>}
                <div>
                    <p className={PStyle}>Почта</p>
                    <input type="email" name = "mail" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
                </div>

                <div >
                    <p className={PStyle}>Login</p>
                    <input name = "login" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
                </div>
                <div>
                    <p className={PStyle}>Password</p>
                    <input name = "password" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
                </div>

                {check && 
                    <div className="flex flex-col mt-2">
                        <p className={PStyle}>Код подтверждения</p>
                        <input className={InputStyle} onChange={(e) => setCod(e.target.value)}/>
                        <button 
                        className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl p-4 font-bold mt-20"
                        onClick={handleCheck}
                        >Подтвердить</button>
                    </div>
                }
                
                {!check && <button
                    onClick={handleSubmit}
                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl p-4 font-bold mt-20"
                    >Зарегистрироваться</button>
                }
                <div className="flex space-x-2 pt-4 text-2xl">
                    <p className=" text-gray-300 font-semibold">Есть аккаунт?</p>
                    <Link to="/auth">Войти</Link>
                </div>

            </div>

            <div className={((!extra)?" hidden":"")+ " flex flex-col items-start  z-10"}>
                <p>Дополнительная регистрация</p>
                {( emptySurname || emptyName || emptyPhone || error)&&<span className=" text-sm text-center text-red-600">{warn}</span>}
                <div>
                    <p className={PStyle + " mt-1"}>Фамилия</p>
                    <input name = "surname" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/> 
                </div>
                
                <div>
                    <p className={PStyle + " mt-1"}>Имя</p>
                    <input name = "name" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
                </div>

                <div>
                    <p className={PStyle + " mt-1"}>Пол</p>
                    <GenderSelect onChange={(e)=>setUser({...user, gender: e})}/>
                </div>

                <div>
                    <p className={PStyle + " mt-1"}>Никнейм</p>
                    <input name = "nick" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
                </div>

                <div>
                    <p className={PStyle + " mt-1"}>Телефон</p>
                    <PhoneInput onChange={(e)=>setUser({...user, phone: e})} name = "phone"/>
                </div> 

                <div className="flex space-x-3 mt-6 place-items-center">
                    <Link to="/">Пропустить</Link>
                    <button onClick={handleExtra} 
                    className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl p-4 font-bold">Добавить</button>
                </div>
            </div>

        </div>
        <div className="">
            {/* <Carousel slides={slides} /> */}
        </div>
    </>)
}

export {RegPage};