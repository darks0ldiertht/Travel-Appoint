import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import { registerSchema } from "../../validation/Yup";
import { registerUser } from "../../api/UserSlicer";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import supabase from "../../utils/supabase";

function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);


    const togglePassword = () => setShowPassword(!showPassword);
    const toggleRePassword = () => setShowRePassword(!showRePassword);

    const checkEmailExists = async (email) => {
        const { data, error } = await supabase
            .from("users")
            .select("email")
            .eq("email", email);

        if (error) {
            console.error(error);
            return false;
        }
        return data.length > 0;
    };


    const inputStyles = {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5bd85b",
            borderRadius: "30px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3dc23d",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1f9e1f",
        },
        "& .MuiInputBase-input": {
            caretColor: "#0a630a",
            color: "#0a630a",
        },
        "& .MuiInputLabel-root": {
            color: "black",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
        },
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#e8f5e9",
            }}
        >
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    age: "",
                    password: "",
                    rePassword: "",
                    Role: "User"
                }}
                validationSchema={registerSchema}
                onSubmit={async (values) => {

                    const { rePassword, ...userData } = values;

                    try {

                        const emailExists = await checkEmailExists(values.email);

                        if (emailExists) {
                            toast.error("This email is already registered!");
                            return;
                        }


                        else {
                            const result = await dispatch(registerUser(userData));
                            if (result.payload?.error) {
                                toast.error(result.payload.error);
                                return;
                            }
                            toast.success("Registration successful!");
                            navigate("/auth/login");
                        }

                    } catch (error) {
                        toast.error("Something went wrong!");
                    }
                }}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched,
                }) => (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            width: 400,
                            p: 4,
                            borderRadius: 4,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="h4"
                            textAlign="center"
                            fontWeight="bold"
                            color="#1b5e20"
                        >
                            Register
                        </Typography>

                        <TextField
                            label="Name"
                            name="first_name"
                            variant="outlined"
                            fullWidth
                            value={values.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.first_name && Boolean(errors.first_name)}
                            helperText={touched.first_name && errors.first_name}
                            sx={inputStyles}
                        />

                        <TextField
                            label="Surname"
                            name="last_name"
                            variant="outlined"
                            fullWidth
                            value={values.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.last_name && Boolean(errors.last_name)}
                            helperText={touched.last_name && errors.last_name}
                            sx={inputStyles}
                        />

                        <TextField
                            label="E-mail"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={inputStyles}
                        />

                        <TextField
                            label="Age"
                            name="age"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={values.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.age && Boolean(errors.age)}
                            helperText={touched.age && errors.age}
                            sx={inputStyles}
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={inputStyles}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            name="rePassword"
                            type={showRePassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            value={values.rePassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.rePassword && Boolean(errors.rePassword)}
                            helperText={touched.rePassword && errors.rePassword}
                            sx={inputStyles}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleRePassword} edge="end">
                                            {showRePassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Typography
                            sx={{
                                color: "green",
                                fontSize: "0.9rem",
                                cursor: "pointer",
                                position: "relative",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    bottom: -2,
                                    width: 0,
                                    height: "1px",
                                    backgroundColor: "green",
                                    transition: "width 0.3s ease",
                                },
                                "&:hover::after": {
                                    width: "55%",
                                },
                            }}
                            onClick={() => navigate("/auth/login")}
                        >
                            Already have an account?
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 1,
                                py: 1.2,
                                backgroundColor: "#2e7d32",
                                borderRadius: "30px",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#43a047",
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    );
}

export default Register;
