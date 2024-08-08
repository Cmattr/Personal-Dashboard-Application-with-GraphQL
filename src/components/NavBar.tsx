import { Nav, Navbar } from "react-bootstrap";
import './component.css'



const NavBar: React.FC = () => {

    return (
        <Navbar  expand="lg" className="NavBar">
            <Nav className="me-auto">
                <Nav.Link className="NavLink" href="/">Home</Nav.Link>
                <Nav.Link className="NavLink" href="/post">Post</Nav.Link>
                <Nav.Link className="NavLink" href="/Todo">Todo</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default NavBar;