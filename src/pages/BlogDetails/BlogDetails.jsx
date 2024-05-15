import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/Provider";


const BlogDetails = () => {
    const { user } = useContext(AuthContext);
    const blogDetails = useLoaderData();
    const [comments, setComments] = useState(null)
    useEffect(() => {
        axios.get(`https://blog-zone-server.vercel.app/comments?id=${blogDetails._id}`)
            .then(res => setComments(res.data))
    }, [])

    const addComment = e => {
        e.preventDefault();
        const commentValue = e.target.comment.value;
        const id = blogDetails._id
        const comment = { commentValue, commenter: user.displayName, commenterProfile: user.photoURL, id }
        axios.post("https://blog-zone-server.vercel.app/add-comment", comment)
            .then(res => {
                toast.success("commented")
                e.target.comment.value = ""
                setComments([...comments, comment])
            })
            .catch(err => toast.error("Comment faild"))
    }

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
                        <h2 className="text-xl font-bold">Category: <span className="text-emerald-600">{blogDetails.category}</span></h2>
                    </div>
                </div>
                {user.email === blogDetails.email ? <div className="flex justify-between">
                    <h2 className="text-2xl font bold text-red-600 bg-cyan-100 rounded text-center my-4">Can not comment on own blog</h2>
                    <Link to={`/update/${blogDetails._id}`} className="btn btn-warning text-wh">Update Blog</Link>
                </div> : <form onSubmit={addComment} className="my-4">
                    <textarea name="comment" className="textarea textarea-accent w-full" placeholder="Comment"></textarea>
                    <input className="btn bg-emerald-600 text-white" type="submit" value="Comment" />
                </form>}
            </div>
            <div className="my-6">
                <h2 className="text-2xl font-bold text-center">comments</h2>
                <hr />
                <div>
                    {comments?.map(comment => <div key={comment._id} className="my-4 bg-emerald-600 text-white rounded-md p-4">
                        <h2 className="text-xl font-bold">{comment.commenter}</h2>
                        <div className="flex gap-10 items-center">
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                    <img src={comment.commenterProfile} />
                                </div>
                            </div>
                            <p>{comment.commentValue}</p>
                        </div>
                        <div>

                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;