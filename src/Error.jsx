import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e8f5e9",
                textAlign: "center",
                color: "#1b5e20",
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: "#2e7d32", mb: 2 }} />
            <Typography variant="h3" fontWeight="bold">
                Oops!
            </Typography>
            <Typography variant="h5" sx={{ mt: 1, marginBottom: '50px' }}>
                The page you're looking for doesn't exist or an error occurred.
            </Typography>

            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#2e7d32",
                    borderRadius: "30px",
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "#43a047",
                    },
                }}
                onClick={() => navigate("/")}
            >
                Go Back Home
            </Button>
        </Box>
    );
}

export default ErrorPage;
