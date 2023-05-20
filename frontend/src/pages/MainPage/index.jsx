import { Link } from 'react-router-dom';
import { ChatList, ChatNav, } from '../../components';

function MainPage() {

    return (<>
        <div className='h-screen w-full flex flex-row'>

            <div className='h-full w-6/12 flex flex-col justify-between'>
                <div><ChatList /></div>
                <ChatNav />
            </div>

            <div className='h-full w-full  bg-red-200'>

            </div>

        </div>
    </>)
}

export { MainPage };