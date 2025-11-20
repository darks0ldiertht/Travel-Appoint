import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Box,
    Typography,
    Paper,
    Stack,
    Button,
    Container
} from "@mui/material";

import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import Loading from "../../components/Loading"
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api/UserSlicer";
import { toast } from "react-toastify";

function UserProfilePage() {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = user?.id;


    const deleteAccount = async () => {
        try {
            const respond = await dispatch(deleteUser());
            if (respond) {
                toast.success("Account Has Been Deleted");
                localStorage.clear();
                navigate("/auth/login")
            }
        } catch (error) {
            toast.error(error)
        }
    }



    if (!user) return (<Loading />);

    return (
        <Box sx={{ py: 6, backgroundColor: "#f5f5f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        backgroundColor: "#fff",
                    }}
                >
                    <Stack alignItems="center" spacing={1.5} sx={{ mb: 4 }}>
                        <Avatar
                            sx={{
                                bgcolor: "#4caf50",
                                width: 80,
                                height: 80,
                                fontSize: 34,
                                border: "3px solid #c8e6c9",
                            }}
                        />

                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {user?.first_name} {user?.last_name}
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                backgroundColor: "#e8f5e9",
                                px: 2,
                                py: 0.4,
                                borderRadius: 10,
                                color: "#388e3c",
                                fontSize: "0.78rem",
                                marginBottom: "5px !important   "
                            }}
                        >
                            User Profile
                        </Typography>
                    </Stack>

                    <Stack spacing={2} sx={{ marginBottom: "10px !important" }}>
                        <InfoRow icon={<EmailIcon />} label="E-mail" value={user?.email} />
                        <InfoRow icon={<CakeIcon />} label="Age" value={user?.age} />
                        <InfoRow
                            icon={<CalendarTodayIcon />}
                            label="Created"
                            value={new Date(user?.created_at).toLocaleDateString("tr-TR")}
                        />
                    </Stack>

                    <Stack spacing={2} marginTop={4}>
                        <Button
                            variant="contained"
                            startIcon={<HistoryIcon />}
                            sx={{
                                backgroundColor: "#0ca125ff",
                                py: 1,
                                borderRadius: 2,
                                marginBottom: "10px !important",
                                "&:hover": { backgroundColor: "#086d19ff" },
                            }}
                            onClick={() => navigate(`/user-profile/history/${userId}`)}
                        >
                            Check History
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            sx={{
                                backgroundColor: "#e57373",
                                py: 1,
                                borderRadius: 2,
                                "&:hover": { backgroundColor: "#ef5350" },
                            }}
                            onClick={() => { deleteAccount() }}
                        >
                            Delete Account
                        </Button>

                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}

const InfoRow = ({ icon, label, value }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderRadius: 2,
            backgroundColor: "#f9fbe7",
            "&:hover": { backgroundColor: "#f0f4c3" },
        }}
    >
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ mr: 2, color: "#689f38" }}>{icon}</Box>
            <Box>
                <Typography variant="subtitle2" color="text.secondary">
                    {label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    </Box>
);

export default UserProfilePage;
