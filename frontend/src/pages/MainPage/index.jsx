import { Link } from 'react-router-dom';
import { ChatNav, Chat, } from '../../components';
import { ChatList } from '../../modules';
import { useEffect, useState } from 'react';
import { connect, disconnect, subscribeForEvent } from '../../core/api';
import './index.css'

function MainPage() {
    const onConnected = (stompClient) => {
        console.log('WS connected');
        subscribeForEvent(stompClient, (payload) => {
            console.log(payload);
        });
    };

    const [stompClient, _] = useState(connect(onConnected));

    useEffect(() => {
    }, []);

    return (<>
        <div className='h-screen w-full flex flex-row p-4 gap-4'>

            <div className='h-full w-full sm:w-8/12 md:w-7/12 lg:w-5/12 flex flex-col justify-between'>
                <div className='overflow-y-auto scroll-auto scrollbar'>
                    <ChatList />
                </div>
                <ChatNav />
            </div>

            <div className='h-full w-full'>
                <Chat />
            </div>

        </div>
    </>)
}

export { MainPage };