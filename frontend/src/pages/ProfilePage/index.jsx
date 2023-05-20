import { PhoneInput, BackButton } from "../../ui";
import { useNavigate } from 'react-router';

function ProfilePage () {

    let navigate = useNavigate();
    const callback = (e) => {
        
    }

    return (<>
        <div className="">
            Страница Профиля
            <BackButton callback={(e) => callback(e)}/>
        </div>
    </>)
}

export {ProfilePage};