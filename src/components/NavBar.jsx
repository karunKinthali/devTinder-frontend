import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login")
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="navbar bg-base-300 px-4">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">devTinder 🧑‍💻</Link>
            </div>

            {user && (
                <div className="flex-none flex items-center gap-4 mx-5">
                    {/* Welcome Message */}
                    <span className="text-sm font-medium text-base-content">
                        Welcome, <span className="font-bold">{user.firstName}</span>
                    </span>

                    {/* Avatar Dropdown */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                <img
                                    alt={`${user.firstName}'s avatar`}
                                    src={user.photoUrl || `https://ui-avatars.com/api/?name=${user.firstName}`}
                                />
                            </div>
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link to='/profile' className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to='/connections'>Connections</Link></li>
                            <li><Link to='/requests'>Requests</Link></li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar