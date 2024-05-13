import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const BlogDetails = () => {
    const { data: blogDetails } = useQuery({
        queryKey: ["blogDetails"],
        queryFn: async () => {
            const data = await axios.get("http://localhost:5000/blog-details/");
            return data.data;
        }
    })
    return (
        <div>

        </div>
    );
};

export default BlogDetails;