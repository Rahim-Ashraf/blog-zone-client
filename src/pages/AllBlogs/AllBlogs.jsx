import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";


const AllBlogs = () => {
    const { user } = useContext(AuthContext);
    const [allBlogs, setAllBlogs] = useState([])
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        axios.get('https://blog-zone-server.vercel.app/all-blogs')
            .then(res => {
                setAllBlogs(res.data)
                setBlogs(res.data)
            });
    }, [])

    const handleCategoryChange = e => {
        if (e.target.value === "All") {
            setBlogs(allBlogs)
            return
        }
        const filteredBlogs = allBlogs.filter(blog => blog.category === e.target.value)
        setBlogs(filteredBlogs)
    }
    const addWishlist = (blog) => {
        blog.wishlist_email = user.email;
        axios.post("https://blog-zone-server.vercel.app/add-wishlist", blog)
            .then(res => console.log(res.data))
    }

    return (
        <div>
            <div className="flex justify-center my-4">
                <label className="label">
                    <h3 className="font-bold">filter by category</h3>
                </label>
                <select onChange={handleCategoryChange} name="category" className="select select-bordered w-fit">
                    <option value="All">All</option>
                    <option value="Self Improvement">Self Improvement</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Science">Science</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">

                {blogs?.map(blog => <div key={blog._id}>
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