import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Avatar,
    Button,
    Tooltip,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import Logo from "../assets/images/logo.png";
import useAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../api/UserSlicer";

const pages = [
    {
        id: 1,
        navName: "Home",
        navUrl: "/"
    },
    {
        id: 2,
        navName: "About Us",
        navUrl: "/about-us"
    },
    {
        id: 3,
        navName: "Team",
        navUrl: "/team"
    },
    {
        id: 4,
        navName: "Hotels",
        navUrl: "/hotels"
    },

]

const settings = ["Profile", "Logout"];
const adminSettings = ["Profile", "Add New Hotel", "Logout"];

const AuthButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    background: "green",
    fontWeight: 600,
    textTransform: "none",
    padding: "7px 25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "scale(1.05)",
        background: "darkGreen",
        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    },
}));

function Navbar() {
    const Auth = useAuth();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const toggleDrawer = (open) => () => setDrawerOpen(open);

    const dispatch = useDispatch();

    const logout = () => {
        localStorage.clear();
        handleCloseUserMenu();
        navigate("/auth/login");
    }

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) {
            dispatch(getUser());
        }
    }, [dispatch]);

    const userId = user?.id;
    const userRole = user?.Role;
    return (
        <AppBar
            position="sticky"
            sx={{
                top: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                maxHeight: 130,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>

                    <Box component="a" href="/" sx={{ display: "flex", alignItems: "center", height: "70px" }}>
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{
                                maxHeight: 100,
                                objectFit: "contain",
                                transition: "all 0.3s ease",
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center",
                            gap: 4,
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                onClick={() => { navigate(page.navUrl) }}
                                key={page.id}
                                sx={{
                                    color: "#333",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "16px",
                                    fontFamily: "'Poppins', sans-serif",
                                    position: "relative",
                                    "&:after": {
                                        content: '""',
                                        position: "absolute",
                                        width: "0%",
                                        height: "2px",
                                        bottom: -2,
                                        left: 0,
                                        bgcolor: "green",
                                        transition: "0.3s",
                                    },
                                    "&:hover:after": {
                                        width: "100%",
                                    },
                                    "&:hover": {
                                        color: "darkGreen",
                                        transform: "scale(1.05)",
                                        transition: "0.3s",
                                    },
                                }}
                            >
                                {page.navName}
                            </Button>
                        ))}
                    </Box>


                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                        {Auth ? (
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "#4caf50",
                                            fontSize: 34,
                                            border: "3px solid #c8e6c9",
                                        }}
                                    />                                </IconButton>
                            </Tooltip>
                        ) : (
                            <AuthButton onClick={() => navigate("/auth/login")}>Login</AuthButton>
                        )}

                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                                    <List>
                                        {pages.map((item) => (
                                            <ListItem key={item.id} disablePadding>
                                                <ListItemButton onClick={() => navigate(item.navUrl)}>
                                                    <ListItemText primary={item.navName} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>

                                </Box>
                            </Drawer>
                        </Box>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            {userRole == "Admin" ? (
                                adminSettings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={() => {
                                            if (setting === "Logout") {
                                                logout();
                                            } else if (setting === "Profile") {
                                                navigate(`/user-profile/profile/${userId}`);
                                            }
                                            else if (setting === "Add New Hotel") {
                                                navigate("/admin/add-new-hotel")
                                            }
                                            handleCloseUserMenu();
                                        }
                                        }
                                    >
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))
                            ) : (
                                settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={() => {
                                            if (setting === "Logout") {
                                                logout();
                                            } else {
                                                handleCloseUserMenu();
                                                navigate(`/user-profile/profile/${userId}`);
                                            }
                                        }}
                                    >
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))
                            )}
                        </Menu>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default Navbar;
