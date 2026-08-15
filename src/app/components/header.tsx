import { useEffect, useState, type FormEvent } from "react";

import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router";

import Basket from "./basket";

import "../css/header.css";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isShopPage = location.pathname === "/shop";

    const [searchText, setSearchText] = useState("");
    const [basketOpen, setBasketOpen] = useState(false);

    /* ============================
       SEARCH
    ============================ */

    useEffect(() => {
        if (!isShopPage) {
            setSearchText("");
        }
    }, [isShopPage]);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = searchText.trim();

        if (!value) {
            navigate("/shop");
            return;
        }

        navigate(`/shop?search=${encodeURIComponent(value)}`);
    };

    /* ============================
       BASKET
    ============================ */

    const handleBasketOpen = () => {
        setBasketOpen(true);
    };

    const handleBasketClose = () => {
        setBasketOpen(false);
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    {/* ======================
              LOGO
          ====================== */}

                    <Link to="/" className="header-logo">
                        <div className="header-logo-mark">
                            <span />
                            <span />
                            <span />
                        </div>

                        <div className="header-logo-info">
                            <strong>FURNITUR</strong>

                            <small>
                                YOUR FUTURE INTERIOR
                            </small>
                        </div>
                    </Link>

                    {/* ======================
              SHOP SEARCH
          ====================== */}

                    {isShopPage && (
                        <form
                            className="header-search"
                            onSubmit={handleSearch}
                        >
                            <button
                                type="submit"
                                className="header-search-icon"
                                aria-label="Search"
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="7"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />

                                    <path
                                        d="M16.5 16.5L21 21"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>

                            <input
                                type="text"
                                placeholder="Search furniture"
                                value={searchText}
                                onChange={(e) =>
                                    setSearchText(e.target.value)
                                }
                            />
                        </form>
                    )}

                    {/* ======================
              NAVIGATION
          ====================== */}

                    <nav className="header-menu">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/shop"
                            className={({ isActive }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            Shop
                        </NavLink>

                        {/* ORDER = CART PAGE */}

                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            Order
                        </NavLink>

                        <NavLink
                            to="/mypage"
                            className={({ isActive }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            My Page
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            About Us
                        </NavLink>
                    </nav>

                    {/* ======================
              RIGHT SIDE
          ====================== */}

                    <div className="header-actions">
                        {/* BASKET BUTTON */}

                        <button
                            type="button"
                            className="header-basket-button"
                            onClick={handleBasketOpen}
                            aria-label="Open basket"
                        >
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M3 3H5L7.4 15H18L21 7H6"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <circle
                                    cx="9"
                                    cy="20"
                                    r="1.2"
                                    fill="currentColor"
                                />

                                <circle
                                    cx="18"
                                    cy="20"
                                    r="1.2"
                                    fill="currentColor"
                                />
                            </svg>

                            <span className="header-basket-count">
                                2
                            </span>
                        </button>

                        {/* LOGIN */}

                        <button
                            type="button"
                            className="header-login"
                        >
                            Login
                        </button>

                        {/* SIGN UP */}

                        <button
                            type="button"
                            className="header-signup"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* ======================
          BASKET DRAWER
      ====================== */}

            <Basket
                open={basketOpen}
                onClose={handleBasketClose}
            />
        </>
    );
};

export default Header;