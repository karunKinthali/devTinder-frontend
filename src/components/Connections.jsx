import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnection = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections",
                { withCredentials: true });
            dispatch(addConnections(response.data.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchConnection()
    }, [])

    if (!connections) return;

    if (connections.length === 0)
        return (
            <div className="flex justify-center items-center my-20">
                <h1 className="text-xl font-bold mb-2">No connections found</h1>
            </div>
        );


    return (
        <div className='text-center my-10' >
            <h1 className='text-bold text-white text-2xl'>Connections</h1>
            {connections.map((connection) => {
                const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = connection;
                return (
                    < div key={_id} className='flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto' >
                        <div>
                            <img alt='photo' className='w-20 h-20 rounded-full' src={photoUrl} />
                        </div>
                        <div className='text-left mx-10'>
                            <h2 className='font-bold'>{firstName + " " + lastName}  </h2>
                            {age && gender && <p className="text-sm text-gray-500 mb-2">Age: {age} | Gender: {gender}</p>}
                            <p>{skills.join(', ')}</p>
                            <p>{about}</p>
                        </div>
                    </div>)
            })}
        </div >
    )
}

export default Connections