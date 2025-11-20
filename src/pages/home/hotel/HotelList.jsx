import { useEffect, useState } from "react";
import { getHotels } from "../../../api/HotelSlicer"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loading from "../../../components/Loading"
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Rating,
    Button,
    Pagination
} from "@mui/material";
import { toast } from "react-toastify";
import SearchBar from "./components/searchBar";

function HotelList() {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredHotels, setFilteredHotels] = useState([]);

    const hotelsPerPage = 9;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAllHotels = async () => {
        setLoading(true);
        try {
            const respond = await dispatch(getHotels());
            if (respond) {
                setHotels(respond.payload.data);
                setFilteredHotels(respond.payload.data);
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllHotels()
    }, [])

    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

    const totalPages = Math.ceil(hotels.length / hotelsPerPage);

    const getHotelId = (id) => {
        navigate(`/hotels/hotel-details/${id}`)
    }

    const handleSearch = ({ query, rating, minPrice, maxPrice }) => {

        const f = hotels.filter(h => {
            const matchQuery =
                h.name.toLowerCase().includes(query) ||
                h.location.toLowerCase().includes(query);

            const matchRating = rating ? h.rate >= rating : true;

            const matchMin = minPrice ? h.price >= Number(minPrice) : true;
            const matchMax = maxPrice ? h.price <= Number(maxPrice) : true;

            return matchQuery && matchRating && matchMin && matchMax;
        });

        setFilteredHotels(f);
        setCurrentPage(1);
    };

    if (loading) return <Loading />

    return (
        <Box mt={2} sx={{ marginBottom: "10px !important" }}>
            <Box sx={{ mb: 5 }}>
                <SearchBar onSearch={handleSearch} />
            </Box>
            <Grid container spacing={2} justifyContent="center">
                {currentHotels.map((hotel, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                maxWidth: "490px",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                                transition: "0.25s",
                                cursor: "pointer",
                                marginTop: "65px !important",
                                marginBottom: "10px !important",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 28px rgba(0,0,0,0.19)",
                                },
                            }}
                        >

                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    image={hotel.image}
                                    alt={hotel.name}
                                    sx={{
                                        height: 200,
                                        width: "100%",
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "55%",
                                        background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)"
                                    }}
                                />
                            </Box>

                            <CardContent sx={{ textAlign: "left", padding: "14px 16px" }}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#222", mb: 0.5, fontSize: "1rem" }}
                                >
                                    {hotel.name}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{ color: "#666", mb: 0.8 }}
                                >
                                    📍 {hotel.location}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#444",
                                        mb: 1,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        fontSize: "0.85rem"
                                    }}
                                >
                                    {hotel.description}
                                </Typography>

                                <Rating
                                    value={Number(hotel.rate)}
                                    precision={0.5}
                                    readOnly
                                    sx={{ mb: 1 }}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 0.5,
                                        backgroundColor: "#4CAF50",
                                        color: "#fff",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        borderRadius: "10px",
                                        "&:hover": { backgroundColor: "#45a049" }
                                    }}
                                    onClick={() => { getHotelId(hotel?.id) }}
                                >
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                variant="outlined"
                shape="rounded"
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "#388e3c",
                        borderColor: "#a5d6a7",
                        fontWeight: 600,
                        minWidth: 40,
                        height: 40,
                    },
                    "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "#e8f5e9",
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        borderColor: "#4CAF50",
                    },
                    "& .MuiPaginationItem-root.Mui-selected:hover": {
                        backgroundColor: "#45a049",
                        borderColor: "#45a049",
                    },
                }}
            />

        </Box>
    )
}

export default HotelList;
