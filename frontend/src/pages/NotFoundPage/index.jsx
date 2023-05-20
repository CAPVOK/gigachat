import { Link } from 'react-router-dom';

function NotFoundPage () {

    return (<>
        <div>
            Page not found. Go {<Link to="/">home</Link>}
        </div>
    </>)
}

export {NotFoundPage};