import {
    Box,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { Formik } from "formik";
import { addHotelSchema } from "../../validation/Yup";
import { addHotel } from "../../api/HotelSlicer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function AddNewHotel() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);

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
                    name: "",
                    description: "",
                    price: "",
                    rate: "",
                    location: "",
                    image: "",
                }}
                validationSchema={addHotelSchema}
                onSubmit={async (values) => {

                    try {

                        const sendRequest = await dispatch(addHotel({ hotel: values, role: user?.Role })).unwrap();

                        toast.success("Hotel Added Succesfully")

                        navigate("/hotels")

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
                            Add A Hotel
                        </Typography>

                        <TextField
                            label="Name"
                            name="name"
                            variant="outlined"
                            fullWidth
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            sx={inputStyles}
                        />

                        <TextField
                            label="Description"
                            name="description"
                            variant="outlined"
                            fullWidth
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                            sx={inputStyles}
                        />

                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.price && Boolean(errors.price)}
                            helperText={touched.price && errors.price}
                            sx={inputStyles}
                        />

                        <TextField
                            label="Rate"
                            name="rate"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={values.rate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.rate && Boolean(errors.rate)}
                            helperText={touched.rate && errors.rate}
                            sx={inputStyles}
                        />

                        <TextField
                            label="Location"
                            name="location"
                            variant="outlined"
                            fullWidth
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.location && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                            sx={inputStyles} />

                        <TextField
                            label="Image"
                            name="image"
                            variant="outlined"
                            fullWidth
                            value={values.image}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.image && Boolean(errors.image)}
                            helperText={touched.image && errors.image}
                            sx={inputStyles} />
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
                            Add Hotel
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    )
}

export default AddNewHotel