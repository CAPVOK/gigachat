import {Link} from 'react-router-dom';
import { ChatList } from '../../components';

function MainPage () {

    return (<>
        <div className='h-screen w-full flex flex-row'>

            <div className='h-full  w-6/12 '>
                <ChatList/>
            </div>

            <div className='h-full w-full  bg-red-200'>
                
            </div>

        </div>
    </>)
}

export {MainPage};