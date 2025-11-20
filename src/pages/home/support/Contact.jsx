import { Box, TextField, Button, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";

function Contact() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                px: 2,
                background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", sm: 450 },
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: "#ffffff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                <Typography variant="h5" textAlign="center" fontWeight={700} color="success.main">
                    Get in Touch
                </Typography>

                <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon color="success" />
                    <TextField
                        label="Your Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                    />
                </Box>

                <Box display="flex" alignItems="flex-start" gap={1}>
                    <MessageIcon color="success" sx={{ mt: 1 }} />
                    <TextField
                        label="Your Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                    />
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                        backgroundColor: "success.main",
                        color: "#fff",
                        borderRadius: "30px",
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1.5,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                            backgroundColor: "success.dark",
                        },
                    }}
                >
                    Send Message
                </Button>
            </Box>
        </Box>
    );
}

export default Contact;
