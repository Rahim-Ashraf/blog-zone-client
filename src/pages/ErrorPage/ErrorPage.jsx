import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="flex justify-center">
            <div>
                <h2 className="text-xl font-bold text-red-600">404 Not found</h2>
                <p>go to <Link className="btn bg-emerald-600 text-white" to={"/"}>Home</Link> page</p>
            </div>
        </div>
    );
};

export default ErrorPage;