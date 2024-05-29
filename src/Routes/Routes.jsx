import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import AddBlog from "../pages/AddBlog/AddBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import Wishlist from "../pages/Wishlist/Wishlist";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Update from "../pages/Update/Update";
import MyBlogs from "../pages/MyBlogs/MyBlogs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <Registration></Registration>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/add-blog",
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: "/all-blogs",
                element: <AllBlogs></AllBlogs>
            },
            {
                path: "/featured-blogs",
                element: <FeaturedBlogs></FeaturedBlogs>
            },
            {
                path: "/blog-details/:id",
                element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://blog-zone-server.vercel.app/blog/${params.id}`)
            },
            {
                path: "/wishlist",
                element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path: "/my-blogs",
                element: <PrivateRoute><MyBlogs></MyBlogs></PrivateRoute>
            },
            {
                path: "/update/:id",
                element: <PrivateRoute><Update></Update></PrivateRoute>,
                loader: ({ params }) => fetch(`https://blog-zone-server.vercel.app/blog/${params.id}`)
            }
        ]
    },
]);
export default router;