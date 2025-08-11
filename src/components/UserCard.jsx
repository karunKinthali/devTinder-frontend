import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = user;
    const handleSendRequest = async (status, userId) => {
        try {
            const resposne = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-xl my-10">
            <figure>
                <img
                    src={user.photoUrl || 'https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg'}
                    alt={`${user.firstName} ${user.lastName}`}
                />
            </figure>
            <div className="card-body">
                <h2 className="text-xl font-bold">
                    {user.firstName + " " + user.lastName}
                </h2>
                {user.age && user.gender && (
                    <p className="text-sm text-base-content">
                        {user.age}, {user.gender}
                    </p>
                )}
                <p className="text-base text-base-content">{user.about}</p>
                {user.skills && (
                    <p className="skills">
                        {user.skills.join(', ')}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-4">
                    <button className="btn btn-primary"
                        onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary"
                        onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div >
    )
}

export default UserCard