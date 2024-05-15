import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Table from "./Table";
import { useState } from "react";





const columns = [
    {
        header: 'Blog Title',
        accessorKey: 'title',
    },
    {
        header: 'Blog Owner',
        accessorKey: 'ownerName',
    },
    {
        header: 'Owner Profile',
        accessorKey: 'ownerProfile',
    },
];



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
    // const [data,setData]= useState(featuredBlogs||[{title:""}])
    console.log(featuredBlogs)
    // const data = [
    //     {
    //         title: 'John Doe',
    //         ownerName: 28,
    //         ownerProfile: 'USA',
    //     },
    //     {
    //         title: 'Jane Smith',
    //         owner: 34,
    //         profile: 'Canada',
    //     },
    //     {
    //         title: 'Alice Johnson',
    //         owner: 45,
    //         profile: 'UK',
    //     },
    // ];

    

    

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
            {/* tanstack table */}
            {/* <Table  columns={columns} data={data}></Table> */}
        </div>
    );
};

export default FeaturedBlogs;