import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Home = () => {

    const { data: recentBlogs } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: async () => {
            const res = await axios.get('https://blog-zone-server.vercel.app/recent-blogs');
            return res.data
        }
    })
    
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentBlogs?.map(blog => <div key={blog._id}>
                    <div className="flex p-4 rounded-md items-center bg-base-100 shadow-xl">
                        <figure><img src={blog.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <p>{blog.description}</p>
                            <div className="card-actions justify-between">
                                <button className="btn btn-primary">Details</button>
                                <button className="btn btn-primary">Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default Home;