import React from "react";
import { useNavigate } from 'react-router';

export const BackButton = ({callback}) => {
    
    let navigate = useNavigate();
    return(
        <button className=" hover:bg-fuchsia-700 bg-purple-700 transition hover:duration-100 p-2 m-2 rounded-md" onClick={(e) => navigate('/')}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:scale-125 transition hover:duration-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white hover:scale-125 transition hover:duration-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>

        </button>
    )
}