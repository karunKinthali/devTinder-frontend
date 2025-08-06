import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user)

    const fetchUser = async () => {
        try {
            const user = await axios.get(BASE_URL + '/profile/view', {
                withCredentials: true
            });
            dispatch(addUser(user.data))
        } catch (error) {
            if (error.status === 401) {
                navigate('/login')
            }
            console.log(error)
        }
    };
    useEffect(() => {
        if (!userData) {
            fetchUser()
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Body