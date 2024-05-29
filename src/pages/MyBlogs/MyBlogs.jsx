import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MyBlogs = () => {
    const { user } = useContext(AuthContext);
    const { data: currentUserBlogs = [], refetch } = useQuery({
        queryKey: ["myBlogs"],
        queryFn: async () => {
            const res = await axios.get(`https://blog-zone-server.vercel.app/my-blogs?email=${user.email}`)
            return res.data
        }
    })

    const handleDelete = id => {

        Swal.fire({
            title: "Delete the blog?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://blog-zone-server.vercel.app/delete-blog?id=${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className="text-emerald-600"></th>
                        <th className="text-emerald-600">Title</th>
                        <th className="text-emerald-600">Category</th>
                        <th className="text-emerald-600">Update</th>
                        <th className="text-emerald-600">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentUserBlogs?.map((blog, idx) => <tr key={blog._id}>
                            <th>{idx + 1}</th>
                            <th>{blog.title}</th>
                            <td>{blog.category}</td>
                            <td><Link to={`/update/${blog._id}`} className="btn btn-info">Update</Link></td>
                            <td><button onClick={() => handleDelete(blog._id)} className="btn btn-error">Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyBlogs;