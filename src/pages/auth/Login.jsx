import React, { useState } from "react";
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
import { loginSchema } from "../../validation/Yup";
import { toast } from "react-toastify";
import { loginUser } from "../../api/UserSlicer";
import { useDispatch } from "react-redux";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

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
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    try {
                        const result = await dispatch(loginUser(values)).unwrap();

                        if (result && result.token) {
                            localStorage.setItem("token", result?.token);
                            toast.success("Login Successful!");
                        }

                        navigate("/");


                    } catch (error) {
                        toast.error(error);
                        console.log(error);
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
                            Login
                        </Typography>

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
                                    width: "43%",
                                },
                            }}
                            onClick={() => navigate("/auth/register")}
                        >
                            You don't have an account
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
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
                            Login
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box >
    );
}

export default Login;
