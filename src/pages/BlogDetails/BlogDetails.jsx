import { useLoaderData } from "react-router-dom";


const BlogDetails = () => {
    const blogDetails = useLoaderData()
    return (
        <div>
            <div className="card shadow-xl p-4">
                <div className="lg:flex">
                    <div className="w-full">
                        <img className="rounded-lg" src={blogDetails.image_url} alt="" />
                    </div>
                    <div className="card-body w-full">
                        <h2 className="text-4xl text-cyan-600 font-bold mb-4">{blogDetails.title}</h2>
                        <div className="flex gap-2 items-center font-bold">
                            <p>{blogDetails.short_description}</p>
                        </div>
                        <p>{blogDetails.long_description}</p>
                    </div>
                </div>
                <div>
                    <p>comments</p>
                </div>
            </div>

        </div>
    );
};

export default BlogDetails;