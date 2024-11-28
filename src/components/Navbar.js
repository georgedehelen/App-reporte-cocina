import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
    const location = useLocation();

    return (
        <Navbar
            bg="primary"
            variant="dark"
            expand="lg"
            className="mb-4 shadow"
            style={{ justifyContent: 'center' }}
        >
            <Container className="d-flex justify-content-center">
                <Navbar.Brand as={Link} to="/" className="fw-bold text-center">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXuAP0JxTx514byt3JGf_jOUjjMmYe1DyJyQ&s" // Reemplázalo con el logo de tu elección
                        alt="Logo"
                        className="me-2"
                        style={{ maxHeight: '40px' }}
                    />
                    Reporte Diario
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`nav-item px-3 ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Inventario
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/menu"
                            className={`nav-item px-3 ${location.pathname === '/menu' ? 'active' : ''}`}
                        >
                            Menú Diario
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/sales"
                            className={`nav-item px-3 ${location.pathname === '/sales' ? 'active' : ''}`}
                        >
                            Reporte Ventas
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/report"
                            className={`nav-item px-3 ${location.pathname === '/report' ? 'active' : ''}`}
                        >
                            Reporte Completo
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
