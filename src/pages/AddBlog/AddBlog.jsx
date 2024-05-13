import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";


const AddBlog = () => {
    const { user } = useContext(AuthContext)
    const email = user?.email
    const ownerName = user?.displayName
    const ownerProfile = user?.photoURL
    const handleAddSpot = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image_url = form.image_url.value;
        const short_description = form.short_description.value;
        const long_description = form.long_description.value;
        const category = form.category.value;
        const data = {
            title,
            image_url,
            short_description,
            long_description,
            category,
            email,
            ownerName,
            ownerProfile
        }
        axios.post("https://blog-zone-server.vercel.app/add-blog", data)
            .then(data => console.log(data.data))
    }
    return (
        <div className="card shrink-0 w-full max-w-6xl mx-auto shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleAddSpot}>
                <div className="md:flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input name="title" placeholder="Title" className="input input-bordered" required />

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image url</span>
                        </label>
                        <input name="image_url" placeholder="Image url" className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Short description</span>
                    </label>
                    <input name="short_description" placeholder="Short description" className="input input-bordered" required />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Long description</span>
                    </label>
                    <input name="long_description" placeholder="Long description" className="input input-bordered h-16" required />

                </div>


                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Category</span>
                    </div>
                    <select name="category" className="select select-bordered w-fit">
                        <option value="Self Improvement">Self Improvement</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Science">Science</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                </label>
                <input className="btn btn-primary" type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddBlog;