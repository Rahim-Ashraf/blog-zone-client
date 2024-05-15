import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";


const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlisted, setWishlisted] = useState(null)
    useEffect(() => {
        axios.get(`https://blog-zone-server.vercel.app/wishlist?email=${user.email}`, { withCredentials: true })
            .then(res => setWishlisted(res.data))
    }, [])
    const handleRemove = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://blog-zone-server.vercel.app/remove-wishlist?id=${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Removed!",
                                text: "Your file has been Removed.",
                                icon: "success"
                            });
                            setWishlisted(wishlisted.filter(wishlit => wishlit._id !== id))
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
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
                            <button onClick={() => handleRemove(blog._id)} className="btn btn-error">Remove</button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default Wishlist;