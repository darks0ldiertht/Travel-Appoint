import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Paper,
    Rating
} from "@mui/material";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");
    const [rating, setRating] = useState(0);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = () => {
        onSearch({
            query: query.toLowerCase(),
            rating,
            minPrice,
            maxPrice
        });
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                borderRadius: "14px",
                display: "flex",
                gap: 2,
                alignItems: "center",
                background: "#ffffff",
                flexWrap: "wrap",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
        >
            <TextField
                fullWidth
                type="text"
                placeholder="Search by name or location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                    },
                }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                    value={rating}
                    onChange={(e, val) => setRating(val)}
                    precision={1}
                />
            </Box>

            <TextField
                type="number"
                label="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                sx={{ width: "140px" }}
                InputProps={{ inputProps: { min: 0 } }}
            />

            <TextField
                type="number"
                label="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                sx={{ width: "140px" }}
                InputProps={{ inputProps: { min: 0 } }}
            />

            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                    backgroundColor: "#4CAF50",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 3,
                    borderRadius: "12px",
                    "&:hover": { backgroundColor: "#43a047" },
                    height: "48px",
                }}
            >
                Search
            </Button>
        </Paper>
    );
}

export default SearchBar;
