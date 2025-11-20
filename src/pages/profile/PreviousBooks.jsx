import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import supabase from '../../utils/supabase';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    CircularProgress,
    Divider,
} from '@mui/material';
import Loading from '../../components/Loading';
import { useNavigate } from "react-router";

export default function PreviousBooks() {

    const user = useSelector((state) => state.user.user);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.id) return;
        fetchBookings();
    }, [user?.id]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('booked_hotels_by_users')
                .select('id, hotel_id, book_time, total_price, booked_at, hotels(*)')
                .eq('user_id', user.id)
                .order('booked_at', { ascending: false });

            if (error) throw error;

            setBookings(data || []);
        } catch (err) {
            toast.error(err?.message || 'Failed to load bookings');
        }

        finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const { error } = await supabase
                .from('booked_hotels_by_users')
                .delete()
                .eq('id', bookingId);

            if (error) throw error;

            toast.success("Booking cancelled");

            setBookings((prev) => prev.filter((b) => b.id !== bookingId));

            navigate("/hotels")

        } catch (err) {
            toast.error(err?.message || 'Failed to cancel');
        }
        finally {
            setLoading(false);

        }
    };

    if (loading) return (<Loading />)

    return (
        <Box maxWidth="900px" mx="auto" p={2}>
            <Grid container spacing={3}>
                {bookings.map((b) => {
                    const hotel = b.hotels || {};
                    return (
                        <Grid item xs={12} sm={6} key={b.id}>
                            <Card
                                elevation={4}
                                sx={{
                                    borderRadius: "18px",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={hotel.image || ""}
                                    alt={hotel.name}
                                    sx={{
                                        width: { xs: "100%", md: "38%" },
                                        height: "220px",
                                        objectFit: "cover",
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        p: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box mb={2}>
                                        <Typography variant="h6" fontWeight={700}>
                                            {hotel.name || "Unknown Hotel"}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 0.5 }}
                                        >
                                            📍 {hotel.location}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 0.5 }}
                                        >
                                            📅 {new Date(b.booked_at).toLocaleString()}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <Box
                                        display="flex"
                                        flexWrap="wrap"
                                        justifyContent="space-between"
                                        mb={2}
                                    >
                                        <Typography variant="body1">
                                            Night(s): <strong>{b.book_time}</strong>
                                        </Typography>

                                        <Typography variant="body1">
                                            Total:{" "}
                                            <strong style={{ color: "#2e7d32" }}>
                                                {b.total_price}$
                                            </strong>
                                        </Typography>
                                    </Box>

                                    <Box display="flex" gap={2} mt={1}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#4CAF50",
                                                "&:hover": { backgroundColor: "#43a047" },
                                            }}
                                            onClick={() =>
                                                window.open(`/hotels/hotel-details/${hotel.id}`, "_blank")
                                            }
                                        >
                                            View Hotel
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => cancelBooking(b.id)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
