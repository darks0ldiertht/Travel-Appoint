import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../api/UserSlicer";
import hotelReducer from "../api/HotelSlicer"

export const Store = configureStore({
    reducer: {
        user: userReducer,
        hotels: hotelReducer
    },
})