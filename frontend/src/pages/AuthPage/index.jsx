import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../core/api";

const InputStyle = "py-2 bg-transparent border-2 rounded-xl p-2 px-3 transition border-g focus:duration-150 border-slate-700 focus:border-purple-800 focus:bg-slate-900 text-white placeholder-gray-400 outline-none"
const PStyle = "text-left text-md mt-6 mb-1"

function AuthPage () {

    let navigate = useNavigate();
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
    const [error, setError] = useState(false);

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
            console.log(user);
            login(user.login, user.password).then((data) => {
                console.log(data);
                if(data.status == 'user does not exist'){
                    setError(true);
                    setWarn("Неверный логин");
                    return;
                }
                if(data.status == "wrong password"){
                    setError(true);
                    setWarn("Неверный пароль");
                    return;
                } else {
                    console.log(data);
                    navigate("/");
                }
            })
            
        }
    }
    
    useEffect(() => {
        isEmptyLogin();
        isEmptyPassword();
        console.log(user)
    },[user])

    return (<>
        <div className="h-full w-5/12 fixed top-0 left-0 flex items-center justify-center flex-col text-white text-xl">
            <h1 className="text-6xl font-bold mb-12">Войти</h1>
            {(emptyLogin || emptyPassword || error)&&<span>{warn}</span>}
            <div>
                <p className={PStyle}>Login</p>
                <input name = "login" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
            </div>
            <div>
                <p className={PStyle}>Password</p>
                <input name = "password" className={InputStyle} onChange={(e) => {handleInputChange(e)}}/>
            </div>

            <button
            onClick={handleSubmit}
            className=" bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-2xl px-10 py-3 font-bold mt-20"
            >Войти</button>
            <div className="flex space-x-2 pt-4 text-2xl">
               <p className=" text-gray-500 font-semibold">Нет аккаунта?</p>
                <Link to="/reg">Зарегистрироваться</Link> 
            </div>
            
        </div>
    </>)
}

export {AuthPage};