import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/RequestSlice'

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
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

    if (requests.length === 0) return <h1>No requests found</h1>



    return (
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
                            <p>{skills}</p>
                            <p>{about}</p>
                        </div>
                        <div>
                            <button className='btn btn-primary'>Rejected</button>
                            <button className='btn btn-secondary my-2'>Intrested</button>
                        </div>
                    </div>)
            })}
        </div >)
}

export default Requests