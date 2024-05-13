import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const FeaturedBlogs = () => {
    const { data: featuredBlogs } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/recent-blogs');
            return res.data
        }
    })

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Blog Title</th>
                        <th>Blog Owner</th>
                        <th>owner Profile</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        featuredBlogs?.map((blog, idx) => <tr key={blog._id}>
                            <th>{idx + 1}</th>
                            <th>{blog.title}</th>
                            <td>{blog.location}</td>
                            <td>{blog.tourists_spot_name}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FeaturedBlogs;