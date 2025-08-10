import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/RequestSlice'

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const [toastStatus, setToastStatus] = useState('');


    const reviewRequest = async (status, _id) => {
        // Show toast immediately
        setToastStatus(status);
        setShowToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => setShowToast(false), 3000);

        try {
            const response = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
                {}, { withCredentials: true });
            dispatch(removeRequests(_id));

        } catch (error) {
            console.log(error);
        }
    }

    const fetchRequests = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/requests/received",
                { withCredentials: true });
            dispatch(addRequests(response.data.data))

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchRequests()
    }, [])

    if (!requests) return;

    if (requests.length === 0)
        return (
            <div className="flex justify-center items-center my-20">
                <h1 className="text-xl font-bold mb-2">No Requests Found</h1>
            </div>
        );



    return (
        <>
            <div className='text-center my-10' >
                <h1 className='text-bold text-white text-2xl'>Connection Requests</h1>
                {requests.map((request) => {
                    const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = request.fromUserId;
                    return (
                        < div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto' >
                            <div>
                                <img alt='photo' className='w-20 h-20 rounded-full' src={photoUrl} />
                            </div>
                            <div className='text-left mx-10'>
                                <h2 className='font-bold text-xl'>{firstName + " " + lastName}  </h2>
                                {age && gender && <p className="text-sm text-gray-500 mb-2">Age: {age} | Gender: {gender}</p>}
                                <p>{skills.join(', ')}</p>
                                <p>{about}</p>
                            </div>
                            <div>
                                <button className='btn btn-primary mx-2 my-2' onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                <button className='btn btn-secondary mx-2 my-2' onClick={() => reviewRequest("accepted", request._id)}>Intrest</button>
                            </div>
                        </div>)
                })}
            </div >


            {
                showToast && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="alert alert-success shadow-lg">
                            <span>Request {toastStatus} successfully.</span>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Requests