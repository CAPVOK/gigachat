
function ExitButton({ callback }) {

    return (
        <button onClick={callback} className="h-10 aspect-square flex flex-row items-center justify-center p-2 rounded-full bg-noActive transition ease-in-out text-gray-300 hover:bg-hover active:bg-active">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    )
}

export { ExitButton }