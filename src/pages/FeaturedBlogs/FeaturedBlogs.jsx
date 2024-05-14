import { useQuery } from "@tanstack/react-query";
import axios from "axios";








const FeaturedBlogs = () => {
    const { data: featuredBlogs } = useQuery({
        queryKey: ['recentBlogs'],
        queryFn: async () => {
            const res = await axios.get('https://blog-zone-server.vercel.app/all-blogs');
            const data = res.data;
            const sortedData = data.sort((a, b) => {
                const sortItem = b.long_description.length - a.long_description.length
                return sortItem
            });
            const slicedArray = sortedData.slice(0, 10);
            return slicedArray;
        }
    })





    return (
        <div>
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
                                <td>{blog.ownerName}</td>
                                <td><img className="rounded-full max-w-10" src={blog.ownerProfile} alt="" /></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default FeaturedBlogs;