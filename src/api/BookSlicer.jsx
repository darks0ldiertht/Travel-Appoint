import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supabase from "../utils/supabase"

export const bookHotel = createAsyncThunk(
    "book/BookHotel",
    async ({ hotelId, userId, night, totalPrice }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();

            if (!userId) {
                return thunkAPI.rejectWithValue("User not logged in");
            }

            if (night == null || totalPrice == null) {
                return thunkAPI.rejectWithValue("Missing booking info");
            }

            const { data, error } = await supabase
                .from("booked_hotels_by_users")
                .insert({
                    user_id: userId,
                    hotel_id: hotelId,
                    book_time: night,
                    total_price: totalPrice
                })
                .select();

            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }

            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getUserBookings = createAsyncThunk(
    "book/GetUserBookings",
    async (userId, thunkAPI) => {
        try {
            if (!userId) {
                return thunkAPI.rejectWithValue("User not logged in");
            }

            const { data, error } = await supabase
                .from("booked_hotels_by_users")
                .select(`
                    id,
                    book_time,
                    total_price,
                    hotels (
                        id,
                        name,
                        city,
                        image,
                        rating
                    )
                `)
                .eq("user_id", userId);

            if (error) return thunkAPI.rejectWithValue(error.message);

            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const initialState = {
    hotels: null,
    loading: false,
    error: null,
}

export const BookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

    }
})

export const { } = BookSlice.actions;
export default BookSlice.reducer;