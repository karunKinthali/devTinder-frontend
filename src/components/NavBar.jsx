import { useSelector } from "react-redux"

const NavBar = () => {
    const user = useSelector(store => store.user);
    return (
        <div className="navbar bg-base-300 px-4">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">devTinder 🧑‍💻</a>
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
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

// (
// <div className="navbar bg-base-300">
//     <div className="flex-1">
//         <a className="btn btn-ghost text-xl">devTinder 🧑‍💻</a>
//     </div>
//     {user && <div className="flex-none flex items-center gap-4 mx-5">

//         <p className="text-sm font-medium text-base-content">
//             Welcome, <span className="font-bold">{user.firstName}</span>
//         </p>
//         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//             <div className="w-10 rounded-full">
//                 <img
//                     alt={`${user.firstName}'s avatar`}
//                     src={user.photoUrl} />
//             </div>
//         </div>
//         <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//             <li>
//                 <a className="justify-between">
//                     Profile
//                     <span className="badge">New</span>
//                 </a>
//             </li>
//             <li><a>Settings</a></li>
//             <li><a>Logout</a></li>
//         </ul>
//     </div>}
// </div>)


export default NavBar