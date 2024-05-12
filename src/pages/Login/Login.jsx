

const Login = () => {
    const { emailLogin, googleLogin, githubLogin } = useContext(AuthContext)
    const notifyLoginSuccess = () => toast.success("Loged in successfully");
    const notifyLoginError = () => toast.error("Please provide valid email and password");
    const navigate = useNavigate();
    const handleEmailLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        emailLogin(email, password)
            .then(result => {
                console.log("sahdfgkasjdfk")
                navigate("/")
                notifyLoginSuccess()

            })
            .catch(error => {
                notifyLoginError()
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result)
                navigate("/")
                notifyLoginSuccess()
            })
            .catch(error => {
                console.error(error)
                toast.error("Login faild")

            })

    }
    const handleGithubLogin = () => {
        githubLogin()
            .then(res => {
                navigate("/")
                notifyLoginSuccess()
            })
            .catch(err => {
                console.error(error)
                toast.error("Login faild")
            })
    }
    return (
        <div data-aos="fade-up" data-aos-duration="2000" className="card shrink-0 shadow-2xl bg-base-100 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <div className="card-body">
                <form onSubmit={handleEmailLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div>
                    <p className="flex gap-4">
                        <span>Login with</span> <button onClick={handleGoogleLogin} className="text-4xl"><FcGoogle /></button>
                        <button onClick={handleGithubLogin} className="text-blue-600 text-4xl"><FaGithub /></button>
                    </p>
                </div>
                <div>
                    <span>New here?</span>
                    <Link to={"/register"} className="text-cyan-600 font-bold"> Register Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;