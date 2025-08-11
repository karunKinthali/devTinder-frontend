import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(BASE_URL + "/login", {
                emailId: email,
                password: password
            }, { withCredentials: true });
            dispatch(addUser(response.data));
            return navigate('/');
        } catch (error) {
            setError("ERROR : " + (error?.response?.data || "Somthing went wrong"));
            console.log(error)
        }

    }
    const handleSignUp = async () => {
        try {
            const response = await axios.post(BASE_URL + "/signup", {
                firstName, lastName, emailId: email,
                password: password
            },
                { withCredentials: true })
            dispatch(addUser(response.data.data));
            return navigate("/profile")
        } catch (error) {
            setError("ERROR : " + (error?.response?.data || "Somthing went wrong"));
            console.log(error)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <h2 className="justify-center card-title text-center mb-3">
                        {isLoginForm ? "Login to devTinder 🧑‍💻" : "SignUp to devTinder 🧑‍💻"}
                    </h2>
                    <p className="text-sm text-center text-base-content mb-4">
                        {isLoginForm
                            ? "Please enter your login credentials to continue."
                            : "Please fill in your details to create an account."}
                    </p>

                    {/* Conditional First/Last Name Fields */}
                    {!isLoginForm && (
                        <>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder="First Name"
                                    className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    placeholder="Last Name"
                                    className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {/* Email Field */}
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            placeholder="you@example.com"
                            className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="••••••••"
                            className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    {/* Submit Button */}
                    <div className="card-actions mt-6">
                        <button
                            className="btn btn-primary w-full hover:scale-[1.02] transition-transform duration-200"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    {/* Toggle Link */}
                    <p className="text-sm text-center mt-4">
                        {isLoginForm ? "Don't have an account?" : "Already have an account?"}
                        <button
                            className="text-primary ml-1 underline"
                            onClick={() => setIsLoginForm(!isLoginForm)}
                        >
                            {isLoginForm ? "Sign Up" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Login;