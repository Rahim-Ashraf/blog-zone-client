import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";


const AllBlogs = () => {
    const { user } = useContext(AuthContext);

    const { data: allBlogs } = useQuery({
        queryKey: ["allBlogs"],
        queryFn: async () => {
            const data = await axios.get('http://localhost:5000/all-blogs');
            return data.data
        }
    })
    const handleSelect = () => {

    }
    const addWishlist = (blog) => {
        blog.wishlist_email = user.email;

        axios.post("http://localhost:5000/add-wishlist", blog)
            .then(res => console.log(res.data))
    }

    return (
        <div>
            <div className="flex justify-center my-4">
                <details className="dropdown">
                    <summary className="m-1 btn select">Sort By</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li onClick={handleSelect} className="btn">Cost high to low</li>
                    </ul>
                </details>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">

                {allBlogs?.map(blog => <div key={blog._id}>
                    <div className="md:flex p-4 gap-4 rounded bg-base-100 shadow-xl">
                        <figure><img className="rounded" src={blog.image_url} alt="Shoes" /></figure>
                        <div>
                            <h2 className="card-title">{blog.title}</h2>
                            <p>{blog.description}</p>
                            <div className="flex gap-2 justify-between">
                                <Link to={`/blog-details/${blog._id}`} className="btn btn-primary">Details</Link>
                                <button onClick={() => addWishlist(blog)} className="btn bg-pink-600 text-white">Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default AllBlogs;