import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <div>
                <h2>404 Not found</h2>
                <p>go to <Link className="btn" to={"/"}>Home</Link> page</p>
            </div>
        </div>
    );
};

export default ErrorPage;