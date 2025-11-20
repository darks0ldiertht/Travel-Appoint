import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import Home from '../pages/home/index/Home'
import HotelList from '../pages/home/hotel/HotelList'
import UserProfilePage from "../pages/profile/UserProfilePage"
import PreviousBooks from '../pages/profile/PreviousBooks'
import AuthLayout from '../layout/AuthLayout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import UserProfileLayout from '../layout/UserProfileLayout'
import ErrorPage from '../Error'
import Terms from '../pages/home/support/Terms'
import PrivacyPolicy from '../pages/home/support/PrivacyPolicy'
import Contact from '../pages/home/support/Contact'
import HotelDetail from '../pages/home/hotel/HotelDetail'
import AddNewHotel from '../pages/Admin/AddNewHotel'
import AdminRouter from "../routes/AdminRouter"
import EditHotel from "../pages/Admin/EditHotel"

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeLayout />}>

                    <Route index element={<Home to="home" replace />} />

                    <Route element={<PrivateRouter />}>
                        <Route path='hotels' element={<HotelList />} />
                    </Route>

                    <Route element={<PrivateRouter />}>
                        <Route path='hotels/hotel-details/:id' element={<HotelDetail />} />
                    </Route>

                    <Route element={<PrivateRouter />}>
                        <Route element={<AdminRouter />}>
                            <Route path='/admin/add-new-hotel' element={<AddNewHotel />} />
                        </Route>
                    </Route>

                    <Route element={<PrivateRouter />}>
                        <Route element={<AdminRouter />}>
                            <Route path='/admin/edit-hotel/:id' element={<EditHotel />} />
                        </Route>
                    </Route>

                    <Route path='terms' element={<Terms />} />

                    <Route path='privacy-policy' element={<PrivacyPolicy />} />

                    <Route path="contact" element={<Contact />} />

                </Route>

                <Route path='/auth' element={<AuthLayout />}>
                    <Route element={<PublicRouter />}>
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                </Route>

                <Route path='/user-profile' element={<UserProfileLayout />}>
                    <Route element={<PrivateRouter />}>
                        <Route path='profile/:id' element={<UserProfilePage />} />
                        <Route path='history/:id' element={<PreviousBooks />} />
                    </Route>
                </Route>

                <Route path="*" element={<ErrorPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
