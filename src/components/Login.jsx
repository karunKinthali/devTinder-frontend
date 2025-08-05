import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email, setEmail] = useState("siva@gmail.com");
    const [password, setPassword] = useState("Shiva@123");
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
            console.log(error)
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <div className="flex justify-center mb-4">
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Login Avatar" />
                            </div>
                        </div>
                    </div>

                    <h2 className="justify-center card-title text-center mb-3">
                        Login to devTinder 🧑‍💻
                    </h2>
                    <p className="text-sm text-center text-base-content mb-4">
                        Please enter your credentials to continue.
                    </p>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            placeholder="you@example.com"
                            className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                            onChange={(email) => setEmail(email.target.value)}
                        />
                    </div>

                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="••••••••"
                            className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                            onChange={(password) => setPassword(password.target.value)}
                        />
                    </div>
                    <div className="card-actions mt-6">
                        <button className="btn btn-primary w-full hover:scale-[1.02] transition-transform duration-200" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;