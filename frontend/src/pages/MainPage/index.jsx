import {Link} from 'react-router-dom';

function MainPage () {

    return (<>
        <div>
            MainPage
            Link to <Link to="/profile">profile</Link>
        </div>
    </>)
}

export {MainPage};