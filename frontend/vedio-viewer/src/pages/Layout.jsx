import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Container, Center, Button, ButtonGroup } from "@chakra-ui/react";
import { useUserContext } from '@/context/UserContext';
export default function Layout() {
    const { logout, isAuthenticated } = useUserContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh", // full viewport height
            minWidth: "100%"
        }}>
            {/* Shared Navbar */}
            <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
                {
                    isAuthenticated ?
                        <ButtonGroup size="sm" variant="surface">
                            <Button onClick={handleLogout}>Logout</Button>
                            <Button colorPalette="blue" asChild>
                                <Link to="/dashboard">Video</Link>
                            </Button>
                        </ButtonGroup>
                        :
                        <ButtonGroup size="sm" variant="surface">
                            <Button colorPalette="blue" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button colorPalette="blue" asChild>
                                <Link to="/register">Register</Link>
                            </Button>
                        </ButtonGroup>
                }

            </nav>

            {/* Main Content */}
            <Center as="main" flex="1" bg="bg.emphasized" py={6}>
                <Container maxW="container.lg">
                    <Outlet />
                </Container>
            </Center>

            {/* Shared Footer */}
            <footer style={{
                padding: "1rem",
                background: "#333",
                color: "white",
                textAlign: "center"
            }}>
                © 2025 Witco
            </footer>
        </div>
    );
}
