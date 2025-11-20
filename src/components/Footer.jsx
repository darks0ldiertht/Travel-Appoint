import { Typography, Box, Grid, Container, Button, TextField, IconButton } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();

    const supportItems = [
        {
            id: 1,
            linkName: "Contact",
            url: "/contact"
        },
        {
            id: 2,
            linkName: "Terms",
            url: "/terms"
        },
        {
            id: 3,
            linkName: "Privacy Policy",
            url: "/privacy-policy"
        },
    ]

    const otherLinks = [
        {
            id: 1,
            linkName: "Home",
            url: "/"
        },
        {
            id: 2,
            linkName: "About us",
            url: "/about-us"
        },
        {
            id: 3,
            linkName: "Team",
            url: "/team"
        },
        {
            id: 4,
            linkName: "Hotels",
            url: "/hotels"
        },
    ]

    return (
        <Box
            sx={{
                background: "linear-gradient(180deg, #055208 0%, #043d06 100%)",
                color: "white",
                py: { xs: 6, md: 8 },
                px: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Container sx={{ mb: { xs: 7, md: 8 }, marginBottom: "20px !important" }}>
                <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            sx={{
                                mb: 2,
                                letterSpacing: 0.5,
                                textAlign: { xs: "center", md: "left" },
                                lineHeight: 1.3,
                            }}
                        >
                            Stay Tuned With Us
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                opacity: 0.85,
                                textAlign: { xs: "center", md: "left" },
                                fontSize: "1.05rem",
                            }}
                        >
                            Enter your email to receive exclusive offers and updates.
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            justifyContent: { xs: "center", md: "flex-end" },
                        }}
                    >
                        <TextField
                            variant="outlined"
                            placeholder="Enter your email"
                            size="small"
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "30px",
                                width: { xs: "80%", sm: "70%", md: "60%" },
                                input: { color: "black", px: 2 },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "transparent",
                                    borderRadius: "30px",
                                    border: "10px"
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#76ff76",
                                    borderRadius: "30px",

                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#5bd85b",
                                    borderRadius: "30px",

                                },
                                "& .MuiInputBase-input": {
                                    caretColor: "#0a630a",
                                    borderRadius: "30px",

                                },
                            }}
                        />

                        <Button
                            variant="contained"
                            sx={{
                                background: "white",
                                color: "#055208",
                                fontWeight: 600,
                                borderRadius: 5,
                                textTransform: "none",
                                px: 3.5,
                                py: 1.2,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    background: "#e6ffe6",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                                },
                            }}
                        >
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <Box
                sx={{
                    width: "90%",
                    height: "1px",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    mb: { xs: 5, md: 6 },
                }}
            />

            <Container sx={{ marginTop: "10px !important" }}>
                <Grid
                    container
                    spacing={4}
                    justifyContent="space-between"
                    textAlign={{ xs: "center", md: "left" }}
                >
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            mb={2}
                            sx={{ letterSpacing: 0.5 }}
                        >
                            Support
                        </Typography>
                        {supportItems.map((item) => (
                            <Typography
                                onClick={() => navigate(item.url)}
                                key={item.id}
                                variant="body2"
                                sx={{
                                    cursor: "pointer",
                                    opacity: 0.85,
                                    lineHeight: 1.8,
                                    transition: "0.25s",
                                    "&:hover": {
                                        color: "#a8f5a8",
                                        opacity: 1,
                                    },
                                }}
                            >
                                {item.linkName}
                            </Typography>
                        ))}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            mb={2}
                            sx={{ letterSpacing: 0.5 }}
                        >
                            Other Links
                        </Typography>
                        {otherLinks.map((item) => (
                            <Typography
                                onClick={() => navigate(item.url)}
                                key={item.id}
                                variant="body2"
                                sx={{
                                    cursor: "pointer",
                                    opacity: 0.85,
                                    lineHeight: 1.8,
                                    transition: "0.25s",
                                    "&:hover": {
                                        color: "#a8f5a8",
                                        opacity: 1,
                                    },

                                }
                                }
                            >
                                {item.linkName}
                            </Typography>
                        ))}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            mb={2}
                            sx={{ letterSpacing: 0.5 }}
                        >
                            Follow Us On Social Media
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: { xs: "center", md: "flex-start" },
                                gap: 6,
                            }}
                        >
                            <IconButton
                                onClick={() => window.open("https://www.instagram.com", "_blank")}
                                sx={{ color: "white", "&:hover": { color: "#E1306C" } }}
                            >
                                <InstagramIcon fontSize="medium" />
                            </IconButton>

                            <IconButton
                                onClick={() => window.open("https://www.facebook.com", "_blank")}
                                sx={{ color: "white", "&:hover": { color: "#1877F2" } }}
                            >
                                <FacebookIcon fontSize="medium" />
                            </IconButton>

                            <IconButton
                                onClick={() => window.open("https://www.x.com", "_blank")}
                                sx={{ color: "white", "&:hover": { color: "#1DA1F2" } }}
                            >
                                <XIcon fontSize="medium" />
                            </IconButton>

                        </Box>
                    </Grid>
                </Grid>

                <Typography
                    variant="body2"
                    sx={{
                        textAlign: "center",
                        opacity: 0.6,
                        mt: 7,
                        fontSize: "0.85rem",
                        letterSpacing: 0.3,
                        marginTop: "25px !important"
                    }}
                >
                    © {new Date().getFullYear()} BookHotel — All Rights Reserved.
                </Typography>
            </Container>
        </Box >
    );
}

export default Footer;
