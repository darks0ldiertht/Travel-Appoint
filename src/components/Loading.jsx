import { Box, CircularProgress, Typography } from "@mui/material";

function Loading() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <CircularProgress
                color="success"
                size={80}
                thickness={3.5}
            />
            <Typography
                variant="h6"
                sx={{ mt: 3, color: "#2e7d32", fontWeight: "bold", letterSpacing: 1 }}
            >
                Loading...
            </Typography>
        </Box>
    );
}

export default Loading;
