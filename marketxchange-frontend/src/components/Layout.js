import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">MarketXchange</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/create-product">New Product</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main>
                <Container>
                    {children}
                </Container>
            </main>
            <footer style={{ 
            position: 'fixed', 
            bottom: 0, 
            width: '100%', 
            color: 'red', 
            backgroundColor: '#343a40' // This ensures the dark background remains
        }} className="text-white text-center py-3">
            <Container>
                <p>MarketXchange &copy; {new Date().getFullYear()}</p>
            </Container>
        </footer>
        </>
    );
};

export default Layout;
