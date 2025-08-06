import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        setError(""); //Clearing the errors before saving..
        try {
            const response = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about, skills }, { withCredentials: true })
            dispatch(addUser(response?.data?.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            setError(error.response.data)
        }
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 my-10 px-4">
                <div className="card w-full max-w-md bg-base-300 shadow-lg border border-base-300">
                    <div className="card-body">
                        <div className="flex justify-center mb-4">
                        </div>
                        <h2 className="card-title text-center mb-2 text-lg font-semibold">
                            Edit Your Profile 🧑‍💻
                        </h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
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
                                className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Age</span>
                            </label>
                            <input
                                type="number"
                                value={age}
                                className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <label className="label">
                            <span className="label-text">Gender</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to disclose</option>
                        </select>

                        {/*}   <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <input
                                type="text"
                                value={gender}
                                className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                                onChange={(e) => setGender(e.target.value)}
                            />
                        
                        </div>*/}

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">photoUrl</span>
                            </label>
                            <input
                                type="text"
                                value={photoUrl}
                                className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </div>
                        <label className="form-control mt-4">
                            <div className="label">
                                <span className="label-text">About</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered h-24 focus:outline-none focus:ring focus:ring-primary"
                                placeholder="Write something about yourself..."
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </label>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Skills</span>
                            </label>
                            <input
                                type="text"
                                value={skills}
                                placeholder="e.g. React, Node.js, Tailwind"
                                className="input input-bordered"
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="card-actions mt-6">
                            <button onClick={saveProfile} className="btn btn-primary w-full hover:scale-[1.02] transition-transform duration-200">
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card w-full max-w-md bg-base-300 shadow-lg border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-2 text-lg font-semibold">Profile Preview 👀</h2>
                        <UserCard
                            user={{
                                firstName,
                                lastName,
                                age,
                                gender,
                                photoUrl,
                                about,
                                skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills,
                            }}
                        />
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="alert alert-success shadow-lg">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;