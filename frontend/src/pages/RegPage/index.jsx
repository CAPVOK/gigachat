import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { PhoneInput } from "../../ui";

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
        <div className="h-full w-full fixed top-0 left-0 flex items-center justify-center flex-col text-white">
            <h1 className="mb-12">Войти</h1>
            <input type="text" id="name" name="name" placeholder="Name" 
               class="py-2 bg-slate-600 border-b-2 border-gray-400 focus:border-purple-800 
                      text-white placeholder-gray-400
                      outline-none"></input>
            {(emptyLogin || emptyPassword || emptySurname || emptyName || emptyMail || emptyPhone)&&<span>{warn}</span>}
            <p>Login</p>
            <input name = "login" className=" text-black" onChange={(e) => {handleInputChange(e)}}/>
            <p>Password</p>
            <input name = "password" className=" text-black" onChange={(e) => {handleInputChange(e)}}/>
            <p>Фамилия</p>
            <input name = "surname" className=" text-black" onChange={(e) => {handleInputChange(e)}}/>
            <p>Имя</p>
            <input name = "name" className=" text-black" onChange={(e) => {handleInputChange(e)}}/>
            <p>Почта</p>
            <input type="email" name = "mail" className=" text-black" onChange={(e) => {handleInputChange(e)}}/>
            <p>Телефон</p>
            <PhoneInput onChange={(e)=>setUser({...user, phone: e})} name = "phone"/>
            <input name = "phone" className=" text-black" onChange={(e) => {handleInputChange(e)}}/>
            <button
            onClick={handleSubmit}
            >Зарегистрироваться</button>
            <p>Есть аккаунт?</p>
            <Link to="/auth">Войти</Link>
        </div>
    </>)
}

export {RegPage};