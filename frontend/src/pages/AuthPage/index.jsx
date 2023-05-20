import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AuthPage () {

    const [user, setUser] = useState({
        login: "",
        password: ""
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
    const [warn, setWarn] = useState("");

    const isEmptyLogin = () => {
        (user.login === "") ? setEmptyLogin(true) : setEmptyLogin(false) 
    }

    const isEmptyPassword = () => {
        (user.password === "") ? setEmptyPassword(true) : setEmptyPassword(false) 
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
        } else {
            alert("Успешный вход")
        }
    }
    
    useEffect(() => {
        isEmptyLogin();
        isEmptyPassword();
        console.log(user)
    },[user])

    return (<>
        <div className="h-full w-full fixed top-0 left-0 flex items-center justify-center flex-col text-white">
            <h1>Войти</h1>
            {(emptyLogin || emptyPassword)&&<span>{warn}</span>}
            <p>Login</p>
            <input name = "login" className=" text-black" onChange={(e) => {handleInputChange(e)}}/>
            <p>Password</p>
            <input name = "password" className=" text-black" onChange={(e) => {handleInputChange(e)}}/>
            <button
            onClick={handleSubmit}
            >Войти</button>
            <p>Нет аккаунта?</p>
            <Link to="/reg">Зарегистрироваться</Link>
        </div>
    </>)
}

export {AuthPage};