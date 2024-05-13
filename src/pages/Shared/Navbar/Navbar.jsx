import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/Provider";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut();
    }

    const menu = <>
        <li><Link to={"/"}>Home</Link></li>
        {user && <li><Link to={"/add-blog"}>Add Blog</Link></li>}
        <li><Link to={"all-blogs"}>All blogs</Link></li>
        <li><Link to={"featured-blogs"}>Featured Blogs</Link></li>
        {user && <li><Link to={"wishlist"}>Wishlist</Link></li>}
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-emerald-600 font-bold">Blog Zone</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? <div className="relative mr-8 z-10 flex items-center gap-4">
                    <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleLogOut} className="btn bg-red-600 border-none text-white mt-2">Log out</button>
                    </div>
                </div>
                    : <div className="flex gap-2">
                        <Link to={"/login"} className="btn">Login</Link>
                        <Link to={"/register"} className="btn">Register</Link>
                    </div>}
            </div>
        </div>
    );
};

export default Navbar;