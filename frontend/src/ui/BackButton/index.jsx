import React from "react";
import { useNavigate } from 'react-router';

export const BackButton = ({callback}) => {
    
    let navigate = useNavigate();
    return(
        <button className="h-10 aspect-square flex flex-row justify-center items-center bg-gradient-to-br from-start to-end transition hover:scale-105 rounded-full" onClick={callback}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white hover:scale-125 transition hover:duration-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>
    )
}