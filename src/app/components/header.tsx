import { NavLink } from "react-router";

export function Header() {
    return (
        <nav>
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/product" end>
                Products
            </NavLink>
            <NavLink to="/aboutus" end>About</NavLink>
        </nav>
    );
}
