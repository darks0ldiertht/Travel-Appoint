import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import {
    LocalOffer,
    SupportAgent,
    Public,
    Lock,
    FlightTakeoff,
    Insights,
} from "@mui/icons-material";
import Background from "../../../assets/images/index-background.avif";
import sanFransicoPhoto from "../../../assets/images/san-fransisco.avif"
import newYorkPhoto from "../../../assets/images/new-york.avif"
import istanbulPhoto from "../../../assets/images/istanbul.avif"
import reservePhoto from "../../../assets/images/reserve-photo.avif"

function Home() {
    const navigate = useNavigate();

    const destinations = [
        {
            name: "New York, NY",
            image: newYorkPhoto,
        },
        {
            name: "San Francisco, CA",
            image: sanFransicoPhoto
        },
        {
            name: "Istanbul, Tr",
            image: istanbulPhoto
        },
    ];

    const features = [
        { icon: <LocalOffer color="success" />, title: "The Best Deals", text: "Get the best deals and savings on worldwide bookings." },
        { icon: <SupportAgent color="success" />, title: "24 HR Customer Care", text: "Dedicated staff always ready to assist you, 24/7." },
        { icon: <Public color="success" />, title: "Biggest & Best Selection", text: "Choose from thousands of destinations and hotels." },
        { icon: <Lock color="success" />, title: "Secure & Simple", text: "Book seamlessly with our fast, secure, and simple checkout." },
        { icon: <FlightTakeoff color="success" />, title: "Immediate Booking", text: "Instant confirmation ensures your plans are ready." },
        { icon: <Insights color="success" />, title: "Travel Insights", text: "Travel reviews, advice, and insights from top travelers." },
    ];

    return (
        <Box sx={{ backgroundColor: "#fff" }}>
            <Box
                sx={{
                    position: "relative",
                    height: "90vh",
                    width: "100%",
                    backgroundImage: `url(${Background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    }}
                />

                <Box sx={{ zIndex: 2, textAlign: "center", px: 2 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            textShadow: "0px 4px 10px rgba(0,0,0,0.6)",
                            marginBottom: "10px !important"

                        }}
                    >
                        Explore the World with Us
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            maxWidth: "800px",
                            mx: "auto",
                            textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
                            marginBottom: "10px !important"

                        }}
                    >
                        Discover breathtaking destinations, unique experiences, and unforgettable adventures.
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                            borderRadius: "30px",
                            textTransform: "none",
                        }}
                        onClick={() => { navigate("/hotels") }}
                    >
                        Explore Now
                    </Button>
                </Box>
            </Box>

            <Box sx={{ py: 8, textAlign: "center", backgroundColor: "#f9f9f9" }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, mb: 5, color: "#2e7d32" }}
                >
                    Most Popular Destinations
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {destinations.map((dest, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                    transition: "transform 0.3s",
                                    marginTop: "10px !important",
                                    "&:hover": { transform: "scale(1.03)" },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={dest.image}
                                    alt={dest.name}
                                    sx={{
                                        height: 250,
                                        filter: "brightness(90%)",
                                    }}
                                />
                                <CardContent sx={{ textAlign: "left" }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600, color: "#333" }}
                                    >
                                        {dest.name}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        sx={{ mt: 1, textTransform: "none" }}
                                        onClick={() => { navigate("/hotels") }}

                                    >
                                        Book Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box
                sx={{
                    py: 10,
                    px: { xs: 2, md: 8 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    backgroundColor: "#ffffff",
                }}
            >


                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        gap: 4,
                        mb: 6,
                    }}
                >
                    <Box
                        component="img"
                        src={reservePhoto}
                        alt="Smiling travel agent"
                        sx={{
                            width: { xs: "100%", md: "40%" },
                            borderRadius: "20px",
                            boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
                        }}
                    />

                    <Box sx={{ flex: 1 }}>
                        <Typography
                            sx={{ fontWeight: 700, color: "#2e7d32", marginBottom: "20px !important" }}
                            variant="h4"
                            fontWeight={700}
                            mb={4}
                            textAlign={{ xs: "center", md: "left" }}
                        >
                            Reservations Center
                        </Typography>

                        <Grid container spacing={3}>
                            {features.map((f, i) => (
                                <Grid item xs={12} sm={6} md={4} key={i}>
                                    <Box display="flex" alignItems="flex-start" gap={1} height="100px">
                                        {f.icon}
                                        <Box>
                                            <Typography fontWeight={600}>{f.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {f.text}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    px: 2,
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        maxWidth: 700,
                        marginBottom: "10px !important",
                        color: "#2e7d32"
                    }}
                >
                    Speak to Us About Your Travel Plans
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: 600,
                        mb: 4,
                        color: "text.secondary",
                        marginBottom: "10px !important",
                    }}
                >
                    We’re here to help you plan the perfect trip. Reach out anytime and let’s make it happen.
                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{
                        borderRadius: "30px",
                        px: 5,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => navigate("/contact")}
                >
                    Contact Us
                </Button>
            </Box>

        </Box>
    );
}

export default Home;
