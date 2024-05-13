import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import { toast } from "react-toastify";


const Home = () => {
    const { user } = useContext(AuthContext)

    const { data: recentBlogs } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/recent-blogs');
            return res.data
        }
    })
    const addWishlist = (blog) => {
        blog.wishlist_email = user.email;
        axios.post("https://blog-zone-server.vercel.app/add-wishlist", blog)
            .then(res => {
                toast.success("Wishlisted")
            })
            .catch(err => {
                toast.error("Already wishlisted")
            })
    }
    const subscrib = e => {
        e.preventDefault()
        toast.success("Thank you for subscribing to our newsletter")
    }

    return (
        <div>
            {/* banner */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://www.blogtyrant.com/wp-content/uploads/2020/03/free-images-for-blog.png" className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Blog zone site</h1>
                        <p className="py-6">Welcome to Blog Zone, your digital sanctuary for captivating content and boundless inspiration. Here, imagination knows no bounds. Our carefully curated collection of articles, videos, and insights awaits your exploration, promising a journey brimming with discovery and enlightenment. Embark with us on a quest for knowledge, creativity, and connection. Step into our world, where every scroll unveils a new chapter in the story of your digital odyssey.</p>
                        <button className="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>

            {/* recent blogs */}
            <div className="my-6">
                <h2 className="text-2xl font-semibold text-center my-4">Recent Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentBlogs?.map(blog => <div key={blog._id}>
                        <div className="p-4 rounded-md bg-base-100 shadow-xl">
                            <figure><img className="rounded" src={blog.image_url} alt="" /></figure>
                            <div className="space-y-4">
                                <h2 className="card-title">{blog.title}</h2>
                                <p>{blog.short_description}</p>
                                <h2 className="text-xl font-semibold">Category: {blog.category}</h2>
                                <div className="flex justify-between">
                                    <button className="btn btn-primary">Details</button>
                                    <button onClick={() => addWishlist(blog)} className="btn bg-pink-600 text-white">Wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>

            {/* newsletter */}
            <div className="my-10">
                <h2 className="text-xl font-bold text-center text-rose-600">newsletter</h2>
                <form onSubmit={subscrib} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input type="email" placeholder="Your email" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">subscrib</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;