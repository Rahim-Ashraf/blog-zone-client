import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Table from "./Table";


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
        },
        initialData: []
    })

    return (
        <div>
            <Table data={featuredBlogs}></Table>
        </div>
    );
};

export default FeaturedBlogs;