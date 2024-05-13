import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData, useParams } from "react-router-dom";


const BlogDetails = () => {
    const {id} = useParams()

    const { data: blogDetails } = useQuery({
        queryKey: ["blogDetails"],
        queryFn: async () => {
            const data = await axios.get(`http://localhost:5000/blog-details/${id}`);
            return data.data;
        }
    })
    console.log(blogDetails)
    return (
        <div>

        </div>
    );
};

export default BlogDetails;