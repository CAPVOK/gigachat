import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { PhoneInput } from "../../ui";

const InputStyle = "py-2 bg-transparent border-2 rounded-xl p-2 px-3 transition border-g focus:duration-150 border-slate-700 focus:border-purple-800 focus:bg-slate-900 text-white placeholder-gray-400 outline-none"
const PStyle = "text-left text-md mt-6 mb-1"

function RegPage () {

    const [user, setUser] = useState({
        login: "",
        password: "",
        mail: "",
        surname: "",
        name: "",
        phone: ""
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
    const [warn, setWarn] = useState("");

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
        if(emptySurname){   
            setWarn("Поле фамилии не должно быть пустым");
            return;
        } 
        if(emptyName){   
            setWarn("Поле имени не должно быть пустым");
            return;
        } 
        if(emptyMail){   
            setWarn("Поле почты не должно быть пустым");
            return;
        } 
        if(emptyPhone){   
            setWarn("Поле телефона не должно быть пустым");
            return;
        } else {
            alert("Успешный вход")
        }
    }
    
    useEffect(() => {
        isEmptyLogin();
        isEmptyPassword();
        isEmptySurname();
        isEmptyName();
        isEmptyMail();
        isEmptyPhone();
        console.log(user)
    },[user])

    return (<>
        <div className="h-full w-5/12 fixed top-0 left-0 flex items-center justify-center flex-col text-white text-xl">
            <h1 className="text-6xl font-bold mb-12">Регистрация</h1>
            {(emptyLogin || emptyPassword || emptySurname || emptyName || emptyMail || emptyPhone)&&<span>{warn}</span>}
            <div >
                <p className={PStyle}>Login</p>
                <input name = "login" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
            </div>
            <div>
                <p className={PStyle}>Password</p>
                <input name = "password" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
            </div>
            {/* <div>
               <p className={PStyle}>Фамилия</p>
                <input name = "surname" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/> 
            </div>
            
            <div>
                <p className={PStyle}>Имя</p>
                <input name = "name" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
            </div> */}
            <div>
                <p className={PStyle}>Почта</p>
                <input type="email" name = "mail" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
            </div>
            {/* <div>
                <p className={PStyle}>Телефон</p>
                <PhoneInput onChange={(e)=>setUser({...user, phone: e})} name = "phone"/>
            </div> */}
            
            
            <button
            onClick={handleSubmit}
            className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl p-4 font-bold mt-20"
            >Зарегистрироваться</button>
            <div className="flex space-x-2 pt-4 text-2xl">
                <p className=" text-gray-500 font-semibold">Есть аккаунт?</p>
                <Link to="/auth">Войти</Link>
            </div>
            
        </div>
        <div className="w-7/12">
            
        </div>
    </>)
}

export {RegPage};