import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Login successful, you might want to redirect the user or perform some action
        const { user } = response.data;

        console.log(user);
        setUserProfile(user);
        // navigate("/home");
        // window.location.reload();
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred");
    }
  };

  return (
    <section className="gradient-form  bg-neutral-200 dark:bg-neutral-700">
      {userProfile ? (
        <div>
          <p>Email: {userProfile.email}</p>
          <p>Full Name: {userProfile.fullName}</p>
        </div>
      ) : (
        <div className="container px-5 py-24 mx-auto">
          <div className="g-6 flex  flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* Left column container */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* Logo */}
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Please login to your account
                        </h4>
                      </div>

                      <form onSubmit={handleLogin}>
                        {/* Username input */}
                        <div className=" mb-4">
                          <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Username
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>

                        {/* Password input */}
                        <div className="mb-4">
                          <label
                            htmlFor="password"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Password
                          </label>
                          <input
                            id="password"
                            type="password"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        {/* Submit button */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>
                          {error && <p>{error}</p>}
                          <Link to="/reset-password">Forgot password?</Link>
                        </div>

                        {/* Register button */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Dont have an account?</p>
                          <Link to="/register">
                            {" "}
                            <span className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
                              Register
                            </span>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right column container with background and description */}
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
Login.propTypes = {
  setUserProfile: PropTypes.func.isRequired, // Ensure setUserProfile is a required function prop
};
export default Login;
