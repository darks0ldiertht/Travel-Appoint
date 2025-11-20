import { useNavigate, useParams } from "react-router";
import { deleteHotel, getSingleHotel } from "../../../api/HotelSlicer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Grid,
    TextField,
    Button,
    Rating
} from "@mui/material";
import Loading from "../../../components/Loading";
import { bookHotel } from "../../../api/BookSlicer";

function HotelDetail() {
    const [hotelInfo, setHotelInfo] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    const getHotelInfos = async () => {
        setLoading(true)
        try {
            const res = await dispatch(getSingleHotel(id));
            if (res?.payload?.data) {
                setHotelInfo(res.payload.data);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    };

    const handleDeleteHotel = async () => {
        try {
            const sendRequest = await dispatch(deleteHotel({ hotelId: id, role: user?.Role })).unwrap();
            toast.success("Hotel Deleted!");
            navigate("/hotels")
        } catch (error) {
            toast.error(error)
        }
    }

    const toEditPage = (selectedHotelId) => {
        navigate(`/admin/edit-hotel/${selectedHotelId}`)
    }

    const handleBookHotel = async () => {
        try {
            if (nights == 0 || totalPrice == 0 || nights == null || totalPrice == null) {
                return toast.error("You Must Choose Date");
            }
            const sendRequest = await dispatch(bookHotel({ hotelId: id, userId: user?.id, night: nights, totalPrice: totalPrice })).unwrap();
            toast.success("Hotel Booked!");
            navigate("/hotels")
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        getHotelInfos();
    }, []);

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        if (end <= start) return 0;

        const difference = end.getTime() - start.getTime();
        const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));

        return nights;
    };


    const nights = calculateNights();
    const totalPrice = nights * (hotelInfo?.price || 0);

    if (loading) return <Loading />;

    return (
        <Box
            sx={{
                p: 4,
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#fafafa",
            }}
        >
            <Card
                sx={{
                    maxWidth: 850,
                    width: "100%",
                    borderRadius: 6,
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    bgcolor: "white",
                }}
            >
                <CardMedia
                    component="img"
                    height="360"
                    image={hotelInfo?.image || "/default-hotel.jpg"}
                    alt={hotelInfo?.name}
                    sx={{
                        objectFit: "cover",
                        filter: "brightness(0.95)",
                    }}
                />

                <CardContent sx={{ p: 4 }}>
                    <Typography
                        variant="h4"
                        fontWeight={600}
                        sx={{ mb: 1, color: "#2f2f2f" }}
                    >
                        {hotelInfo?.name}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: "#8a8a8a", mb: 1 }}
                    >
                        {hotelInfo?.location}
                    </Typography>

                    <Rating value={hotelInfo?.rate} precision={0.5} readOnly />

                    <Typography
                        variant="h5"
                        sx={{
                            mt: 2,
                            fontWeight: 600,
                            color: "#3a3a3a",
                            marginBottom: "15px !important"
                        }}
                    >
                        ${hotelInfo?.price}
                        <span style={{ fontSize: "17px", color: "#7b7b7b", }}>
                            /night
                        </span>
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Check-In"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Check-Out"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                inputProps={{
                                    min: checkIn || ""
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    p: 2.5,
                                    borderRadius: 4,
                                    bgcolor: "#f4f4f4",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "-10px !important"
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#555", marginRight: "10px !important" }}>
                                    Nights:{" "}
                                    <strong style={{ color: "#333" }}>{nights}</strong>
                                </Typography>

                                <Typography variant="h6" sx={{ color: "#555" }}>
                                    Total:{" "}
                                    <strong style={{ color: "#333" }}>
                                        ${totalPrice}
                                    </strong>
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="medium"
                                        sx={{
                                            py: 1.5,
                                            fontSize: "17px",
                                            borderRadius: 4,
                                            textTransform: "none",
                                            backgroundColor: "#45a049",
                                            "&:hover": {
                                                backgroundColor: "#1f8023ff",
                                            },
                                            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.12)",
                                        }}
                                        onClick={() => { handleBookHotel() }}
                                    >
                                        Book Now
                                    </Button>
                                </Grid>
                                {user?.Role === "Admin" && (
                                    <>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                size="medium"
                                                sx={{
                                                    py: 1.5,
                                                    fontSize: "17px",
                                                    borderRadius: 4,
                                                    textTransform: "none",
                                                    backgroundColor: "#d8ba0eff",
                                                    "&:hover": {
                                                        backgroundColor: "#c4a80bff",
                                                    },
                                                    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.12)",
                                                }}
                                                onClick={() => { toEditPage(hotelInfo?.id) }}
                                            >
                                                Edit Hotel
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                size="medium"
                                                sx={{
                                                    py: 1.5,
                                                    fontSize: "17px",
                                                    borderRadius: 4,
                                                    textTransform: "none",
                                                    backgroundColor: "#cb1919ff",
                                                    "&:hover": {
                                                        backgroundColor: "#8f1212ff",
                                                    },
                                                    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.12)",
                                                }}
                                                onClick={() => { handleDeleteHotel() }}
                                            >
                                                Delete Hotel
                                            </Button>
                                        </Grid>
                                    </>
                                )}


                            </Grid>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default HotelDetail;
