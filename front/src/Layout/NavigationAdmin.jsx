import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationAdmin = () => {
    return (
        <Navbar expand="lg" bg="white" className="py-3">
            <Container>
                <Link to="/" className="navbar-brand">
                    <span className="fw-bolder text-primary">Siduzzaman</span>
                </Link>
                <Navbar.Toggle
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="ms-auto mb-2 mb-lg-0 small fw-bolder">
                        <Nav.Item className="nav-item">
                            <Link to="/" className="nav-link active">Portfolio</Link>
                        </Nav.Item>
                        <Nav.Item className="nav-item">
                            <Link to="/admin" className="nav-link active">Admin Panel</Link>
                        </Nav.Item>
                        <Nav.Item className="nav-item">
                            <Link to="/addproject" className="nav-link">Add Projects</Link>
                        </Nav.Item>
                        <Nav.Item className="nav-item">
                            <Link to="/addskill" className="nav-link">Add Skills</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationAdmin;
