import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supabase from "../utils/supabase"


export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        try {
            const { data, error } = await supabase.from("users").insert(user);

            if (error) {
                console.error("Supabase insert error:", error.message);
                return thunkAPI.rejectWithValue(error.message);
            }

            return data;
        } catch (err) {
            console.error("Unexpected error:", err);
            return thunkAPI.rejectWithValue("Beklenmedik bir hata oluştu");
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkAPI) => {

        function createToken(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        try {
            const { email, password } = user;

            const { data, error } = await supabase.from("users").select("*").eq("email", email).single();

            if (error || !data) {
                return thunkAPI.rejectWithValue("User not found");
            }

            if (data.password !== password) {
                return thunkAPI.rejectWithValue("Incorrect password");
            }

            const token = createToken(30);

            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            localStorage.setItem("Role", data?.Role)

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Unexpected error");
        }
    }
);

export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, thunkAPI) => {
        try {
            const email = localStorage.getItem("email");
            if (!email) {
                return thunkAPI.rejectWithValue("No email found in localStorage");
            }

            const { data, error } = await supabase.from("users").select("*").eq("email", email).single();

            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Unexpected error");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (_, thunkAPI) => {
        try {
            const email = localStorage.getItem("email");

            if (!email) {
                return thunkAPI.rejectWithValue("No email found in localStorage");
            }

            const { data, error } = await supabase.from("users").delete().eq("email", email);

            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }

            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue("Unexpected error");
        }
    }
)

const initialState = {
    user: null,
    loading: false,
    error: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
})

export const { } = userSlice.actions;
export default userSlice.reducer;