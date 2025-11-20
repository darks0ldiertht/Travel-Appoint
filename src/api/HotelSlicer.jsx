import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supabase from "../utils/supabase"

export const getHotels = createAsyncThunk(
    "hotels/getHotels",
    async (_, rejectWithValue) => {
        try {
            const respond = await supabase.from("hotels").select("*");
            if (respond) {
                return respond;
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getSingleHotel = createAsyncThunk(
    "hotels/getSingleHotel",
    async (hotelId, rejectWithValue) => {
        try {
            const respond = await supabase.from("hotels").select("*").eq("id", hotelId).maybeSingle();
            if (respond) {
                return respond;
            }
        } catch (error) {
            return rejectWithValue(error)

        }
    }
)

export const addHotel = createAsyncThunk(
    "hotels/addHotel",
    async ({ hotel, role, }, rejectWithValue) => {
        try {
            if (role != "Admin") {
                return rejectWithValue("Not Authorized ")
            }
            const { data, error } = await supabase.from("hotels").insert(hotel);


            if (error) {
                console.error("Supabase insert error:", error.message);
                return thunkAPI.rejectWithValue(error.message);
            }

            return data;

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteHotel = createAsyncThunk(
    "hotels/deleteHotel",
    async ({ hotelId, role, }, thunkAPI) => {
        try {
            if (role != "Admin") {
                return thunkAPI.rejectWithValue("Not Authorized ")
            }
            const { data, error } = await supabase.from("hotels").delete().eq("id", hotelId);

            if (error) {
                console.error("Supabase insert error:", error.message);
                return thunkAPI.rejectWithValue(error.message);
            }

            return data;

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const editHotelApi = createAsyncThunk(
    "hotels/editHotel",
    async ({ hotel, role }, thunkAPI) => {
        try {
            if (role !== "Admin") {
                return thunkAPI.rejectWithValue("Not Authorized");
            }

            const { data, error } = await supabase
                .from("hotels")
                .update({
                    name: hotel.name,
                    description: hotel.description,
                    price: hotel.price,
                    rate: hotel.rate,
                    location: hotel.location,
                    image: hotel.image,
                })
                .eq("id", hotel.id);

            if (error) {
                console.error("Supabase update error:", error.message);
                return thunkAPI.rejectWithValue(error.message);
            }

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || err.toString());
        }
    }
);


const initialState = {
    hotels: null,
    loading: false,
    error: null,
}

export const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHotels.fulfilled, (state, action) => {
                state.hotels = action.payload;
                state.loading = false
            })
            .addCase(getHotels.pending, (state) => {
                state.loading = true
            })
            .addCase(getHotels.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getSingleHotel.fulfilled, (state, action) => {
                state.hotels = action.payload;
                state.loading = false
            })
            .addCase(getSingleHotel.pending, (state) => {
                state.loading = true
            })
            .addCase(getSingleHotel.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
})

export const { } = hotelSlice.actions;
export default hotelSlice.reducer;