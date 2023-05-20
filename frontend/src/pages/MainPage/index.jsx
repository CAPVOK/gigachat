import { Link } from 'react-router-dom';
import { ChatList, ChatNav, } from '../../components';
import { Search, } from '../../ui/Search';

function MainPage() {

    return (<>
        <div className='h-screen w-full flex flex-row'>

            <div className='h-full w-6/12 flex flex-col justify-between'>
                <div className='overflow-auto scroll-auto'>
                    <ChatList />
                </div>

                <ChatNav />
            </div>

            <div className='h-full w-full  '>

            </div>

        </div>
    </>)
}

export { MainPage };