import { useEffect } from "react";


const Home = () => {

    useEffect(()=>{
        // http://localhost:5000/recent-blogs
    },[])

    return (
        <div>
            {/* banner */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://www.blogtyrant.com/wp-content/uploads/2020/03/free-images-for-blog.png" className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Blog zone site</h1>
                        <p className="py-6">Welcome to Blog Zone, your digital sanctuary for captivating content and boundless inspiration. Here, imagination knows no bounds. Our carefully curated collection of articles, videos, and insights awaits your exploration, promising a journey brimming with discovery and enlightenment. Embark with us on a quest for knowledge, creativity, and connection. Step into our world, where every scroll unveils a new chapter in the story of your digital odyssey.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            {/* recent blogs */}
            <div>
                
            </div>
        </div>
    );
};

export default Home;