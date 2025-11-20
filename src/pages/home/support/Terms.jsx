import { Box, Container, Typography, Divider, Paper } from "@mui/material";

function Terms() {
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
                        Terms & Conditions
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
                            text={`By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.`}
                        />

                        <Section
                            title="2. Use of Our Services"
                            text={`You agree to use our services only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the website.`}
                        />

                        <Section
                            title="3. Intellectual Property"
                            text={`All content, designs, and trademarks displayed on this site are the property of our company or licensors. Unauthorized reproduction or distribution is prohibited.`}
                        />

                        <Section
                            title="4. User Responsibilities"
                            text={
                                <>
                                    Users are responsible for:
                                    <ul style={{ marginTop: 8 }}>
                                        <li>Providing accurate information</li>
                                        <li>Maintaining account confidentiality</li>
                                        <li>Complying with applicable laws</li>
                                    </ul>
                                </>
                            }
                        />

                        <Section
                            title="5. Limitation of Liability"
                            text={`We are not liable for any indirect, incidental, or consequential damages arising from your use of our site or services.`}
                        />

                        <Section
                            title="6. Termination"
                            text={`We reserve the right to suspend or terminate access to our services at any time, without notice, for any reason.`}
                        />

                        <Section
                            title="7. Governing Law"
                            text={`These Terms are governed by and interpreted according to the laws of your country of residence. Disputes will be handled in the appropriate local court.`}
                        />

                        <Section
                            title="8. Changes to Terms"
                            text={`We may update these Terms occasionally. All revisions will be posted here with an updated date.`}
                        />

                        <Section
                            title="9. Contact Us"
                            text={
                                <>
                                    For questions about these Terms, contact us at{" "}
                                    <span style={{ color: "#055208", fontWeight: 600 }}>
                                        legal@yourcompany.com
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

export default Terms;
