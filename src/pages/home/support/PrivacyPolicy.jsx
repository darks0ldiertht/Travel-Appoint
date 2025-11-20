import { Box, Container, Typography, Divider, Paper } from "@mui/material";

function PrivacyPolicy() {
    return (
        <Box
            sx={{
                background: "linear-gradient(180deg, #f7fdf7 0%, #ebffec 100%)",
                minHeight: "100vh",
                py: { xs: 6, md: 10 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={6}
                    sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: 4,
                        backgroundColor: "white",
                        border: "1px solid #dcefdc",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        textAlign="center"
                        sx={{
                            mb: 1.5,
                            color: "#055208",
                            letterSpacing: 0.8,
                        }}
                    >
                        Privacy Policy
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        textAlign="center"
                        sx={{
                            color: "text.secondary",
                            mb: 5,
                            fontStyle: "italic",
                        }}
                    >
                        Last updated: {new Date().toLocaleDateString()}
                    </Typography>

                    <Divider sx={{ mb: 5, borderColor: "rgba(0,0,0,0.1)" }} />

                    <Box sx={{ color: "text.primary", lineHeight: 1.8 }}>
                        <Section
                            title="1. Introduction"
                            text={`We value your privacy and are dedicated to safeguarding your personal data. This policy explains how we collect, use, and protect your information when using our services.`}
                        />

                        <Section
                            title="2. Information We Collect"
                            text={`We may collect your name, email, and browsing data to provide you with a better experience. This includes information voluntarily shared when signing up or contacting us.`}
                        />

                        <Section
                            title="3. How We Use Your Information"
                            text={
                                <>
                                    We use collected information to:
                                    <ul style={{ marginTop: 8 }}>
                                        <li>Provide and improve our services</li>
                                        <li>Send service updates or promotions (if you opt-in)</li>
                                        <li>Ensure platform safety and reliability</li>
                                    </ul>
                                </>
                            }
                        />

                        <Section
                            title="4. Data Protection"
                            text={`We use modern encryption and secure servers to protect your personal data. However, no online service can guarantee absolute security.`}
                        />

                        <Section
                            title="5. Your Rights"
                            text={
                                <>
                                    You can access, correct, or delete your personal data anytime.
                                    Contact us at{" "}
                                    <span style={{ color: "#055208", fontWeight: 600 }}>
                                        privacy@yourcompany.com
                                    </span>{" "}
                                    for requests.
                                </>
                            }
                        />

                        <Section
                            title="6. Policy Updates"
                            text={`We may update this Privacy Policy from time to time. Changes will be reflected on this page with a revised date.`}
                        />

                        <Section
                            title="7. Contact Us"
                            text={
                                <>
                                    For any concerns, contact us at{" "}
                                    <span style={{ color: "#055208", fontWeight: 600 }}>
                                        support@yourcompany.com
                                    </span>.
                                </>
                            }
                        />
                    </Box>

                    <Divider sx={{ my: 5, borderColor: "rgba(0,0,0,0.1)" }} />

                    <Typography
                        variant="body2"
                        textAlign="center"
                        color="text.secondary"
                        sx={{
                            fontSize: "0.9rem",
                            opacity: 0.8,
                        }}
                    >
                        © {new Date().getFullYear()} Your Company — All Rights Reserved.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}

const Section = ({ title, text }) => (
    <Box sx={{ mb: 4 }}>
        <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
                color: "#055208",
                mb: 1,
                borderLeft: "5px solid #0b7a0b",
                pl: 1.5,
            }}
        >
            {title}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {text}
        </Typography>
    </Box>
);

export default PrivacyPolicy;
