import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";


const Update = () => {
    const blogDetails = useLoaderData();
    const handleUpdateBlog = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image_url = form.image_url.value;
        const short_description = form.short_description.value;
        const long_description = form.long_description.value;
        const category = form.category.value;
        const newData = {
            title,
            image_url,
            short_description,
            long_description,
            category
        }
        axios.patch(`http://localhost:5000/update?id=${blogDetails._id}`,newData)
            .then(res => toast.success("Updated succesfully"))
            .catch(err => toast.error("Update faild"))
    }

    return (
        <div className="card shrink-0 w-full max-w-6xl mx-auto shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleUpdateBlog}>
                <div className="md:flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input defaultValue={blogDetails.title} name="title" placeholder="Title" className="input input-bordered" required />

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image url</span>
                        </label>
                        <input defaultValue={blogDetails.image_url} name="image_url" placeholder="Image url" className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Short description</span>
                    </label>
                    <input defaultValue={blogDetails.short_description} name="short_description" placeholder="Short description" className="input input-bordered" required />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Long description</span>
                    </label>
                    <input defaultValue={blogDetails.long_description} name="long_description" placeholder="Long description" className="input input-bordered h-16" required />

                </div>


                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Category</span>
                    </div>
                    <select defaultValue={blogDetails.category} name="category" className="select select-bordered w-fit">
                        <option value="Self Improvement">Self Improvement</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Science">Science</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                </label>
                <input className="btn bg-emerald-600 text-white" type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;