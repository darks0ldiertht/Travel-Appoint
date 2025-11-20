import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    age: Yup.number().min(18, "You must be at least 18 years old").required("Age is required"),
    password: Yup.string().required("Password is required").min(5, "Password must be minimum 5 characters").max(18, "Password must be maximum 18 characters"),
    rePassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Please confirm your password"),
});


export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required").min(5, "Password must be minimum 5 characters").max(18, "Password must be maximum 18 characters"),

})

export const addHotelSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Number is required"),
    rate: Yup.number().required("Rate is required"),
    location: Yup.string().required("Location is required"),
    image: Yup.string().required("Image is required"),

})