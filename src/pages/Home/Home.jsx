import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"


const Home = () => {
    const { user } = useContext(AuthContext)

    const { data: recentBlogs } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: async () => {
            const res = await axios.get('https://blog-zone-server.vercel.app/recent-blogs');
            return res.data
        }
    })
    const addWishlist = (blog) => {
        if (!user) {
            toast.error("Please login")
            return
        }
        blog.wishlist_email = user.email;
        const { title, image_url, short_description, long_description, category, email, ownerName, ownerProfile, wishlist_email, _id } = blog;
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
    const subscrib = e => {
        e.preventDefault()
        toast.success("Thank you for subscribing to our newsletter")
    }

    return (
        <div>

            {/* banner */}

            <div className="hero min-h-screen bg-base-200">

                <div className="lg:flex flex-row-reverse p-6 gap-16">
                    <motion.div className="lg:w-1/2" animate={{ scale: [0.5, 1, 0.5, 1], opacity: [0, 1] }}
                        transition={{ type: "spring", stiffness: 20 }}>
                        <div>
                            <img src="https://www.blogtyrant.com/wp-content/uploads/2020/03/free-images-for-blog.png" className=" rounded-lg shadow-2xl" />
                        </div>
                    </motion.div>
                    <motion.div className="lg:w-1/2" animate={{ y: 20 }}
                        transition={{ type: "spring", stiffness: 10 }}>
                        <div>
                            <h1 className="text-5xl font-bold">Blog zone site</h1>
                            <p className="py-6">Welcome to Blog Zone, your digital sanctuary for captivating content and boundless inspiration. Here, imagination knows no bounds. Our carefully curated collection of articles, videos, and insights awaits your exploration, promising a journey brimming with discovery and enlightenment. Embark with us on a quest for knowledge, creativity, and connection. Step into our world, where every scroll unveils a new chapter in the story of your digital odyssey.</p>
                            <button className="btn bg-emerald-600 text-white">Details</button>
                        </div>
                    </motion.div>
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
                                    <Link to={`/blog-details/${blog._id}`} className="btn bg-emerald-600 text-white">Details</Link>
                                    <button onClick={() => addWishlist(blog)} className="btn bg-pink-600 text-white">Wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>

            {/* extra sections */}
            <section>
                <h2 className='text-center text-4xl font-bold mb-8'>About us</h2>
                <div className="md:flex items-center gap-4 bg-primary rounded-lg p-6">
                    <div>
                        <p className='p-10 text-white text-xl rounded grid-rows-6'>
                            <span className='text-secondary font-bold text-2xl'>Welcome to Blog Zone</span>,
                            <br />
                            Welcome to Blog Zone! We are dedicated to bringing you the latest insights, trends, and stories across a variety of topics. Our mission is to inform, inspire, and entertain our readers with high-quality content that sparks curiosity and fosters a sense of community.
                            <br />
                            Whether you are here to learn something new or simply enjoy a good read, Blog Zone is your go-to source for engaging and diverse content. Thank you for being a part of our journey.
                            <br />
                            Join our community today and never miss an update—explore Blog Zone and discover something new every day!
                        </p>
                    </div>
                    <div>
                        <img className="rounded h-auto" src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                </div>


            </section>
            <div className="bg-cyan-200 rounded-lg p-6 my-10">
                <form className="card-body">
                    <h2 className='text-center text-4xl font-bold mb-8'>Contact us</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input type="email" placeholder="Your email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input type="text" placeholder="Your name" className="input input-bordered" required />

                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-cyan-600 text-white">Submit</button>
                    </div>
                </form>
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
                        <button className="btn bg-emerald-600 text-white">subscrib</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;