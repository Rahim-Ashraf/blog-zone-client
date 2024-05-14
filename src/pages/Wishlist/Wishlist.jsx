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

    return (
        <div>
            {wishlisted?.map(blog => <div key={blog._id}>
                <div className="flex p-4 rounded-md items-center bg-base-100 shadow-xl">
                    <figure><img src={blog.image_url} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{blog.title}</h2>
                        <p>{blog.description}</p>
                        <div className="card-actions justify-between">
                            <Link to={`/blog-details/${blog._id}`} className="btn btn-primary">Details</Link>
                            <button className="btn btn-primary">Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default Wishlist;