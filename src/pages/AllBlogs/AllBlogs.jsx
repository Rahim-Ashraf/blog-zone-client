import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import { toast } from "react-toastify";


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
        if (!user) {
            toast.error("Please login")
            return
        }
        blog.wishlist_email = user.email;
        const { title, image_url, short_description, long_description, category, email, ownerName, ownerProfile, wishlist_email, _id } = blog
        const newDate = new Date();
        const newBlog = { title, image_url, short_description, long_description, category, email, ownerName, ownerProfile, wishlist_email, newDate, id: _id }

        axios.post("https://blog-zone-server.vercel.app/add-wishlist", newBlog)
            .then(res => {
                toast.success("Wishlisted")
            })
            .catch(err => {
                toast.error("Already wishlisted")
            })
    }

    const handleSearch = e => {
        e.preventDefault()
        const title = e.target.search.value;
        axios.get(`https://blog-zone-server.vercel.app/blog-by-title?title=${title}`)
            .then(res => setBlogs(res.data));
        e.target.search.value = ""
    }

    return (
        <div>
            <div>
                <div className="mx-auto flex justify-center">
                    <div>
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
                </div>
                <div className="w-60 mx-auto mt-6">

                    <h2 className="text-xl font-bold">Search by full Title</h2>
                    <form onSubmit={handleSearch}>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" name="search" className="grow" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">

                {blogs?.map(blog => <div key={blog._id}>
                    <div className="p-4 rounded-md bg-base-100 shadow-xl">
                        <figure><img className="rounded" src={blog.image_url} alt="" /></figure>
                        <div className="space-y-4">
                            <h2 className="card-title">{blog.title}</h2>
                            <p>{blog.short_description}</p>
                            <h2 className="text-xl font-semibold">Category: {blog.category}</h2>
                            <div className="flex justify-between">
                                <Link to={`/blog-details/${blog._id}`} className="btn bg-emerald-600 text-white">Details</Link>
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