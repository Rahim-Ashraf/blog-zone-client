import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";


const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const { data: wishlisted } = useQuery({
        queryKey: ["wishlisted"],
        queryFn: async () => {
            const data = await axios.get(`https://blog-zone-server.vercel.app/wishlist?email=${user.email}`);
            return data.data
        }
    })
    const handleRemove = () => {
        
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlisted?.map(blog => <div key={blog._id}>
                <div className="p-4 rounded-md items-center bg-base-100 shadow-xl">
                    <figure><img className="rounded" src={blog.image_url} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{blog.title}</h2>
                        <p>{blog.short_description}</p>
                        <h2 className="text-xl text-emerald-600 font-semibold">Category: {blog.category}</h2>
                        <div className="card-actions justify-between">
                            <Link to={`/blog-details/${blog._id}`} className="btn bg-emerald-600 text-white">Details</Link>
                            <button onClick={handleRemove} className="btn btn-error">Remove</button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default Wishlist;