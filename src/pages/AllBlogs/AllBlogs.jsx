import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const AllBlogs = () => {
    const { data: allBlogs } = useQuery({
        queryKey: ["allBlogs"],
        queryFn: async () => {
            const data = await axios.get('http://localhost:5000/all-blogs');
            return data.data
        }
    })
    const handleSelect = () => {

    }
    return (
        <div>
            <div className="flex justify-center my-4">
                <details className="dropdown">
                    <summary className="m-1 btn select">Sort By</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li onClick={handleSelect} className="btn">Cost high to low</li>
                    </ul>
                </details>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">

                {allBlogs?.map(blog => <div key={blog._id}>
                    <div className="card card-compact w-96 bg-base-100 shadow-xl">
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

export default AllBlogs;