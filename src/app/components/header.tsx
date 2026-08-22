import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router";

import Basket from "./basket";

import "../css/header.css";

import { useGlobals } from "../hooks/useGlobals";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    /* =========================================
       GLOBAL BASKET
    ========================================= */

    const { basket } = useGlobals();

    /*
     * Savatdagi umumiy quantity.
     *
     * Masalan:
     * Chair quantity = 2
     * Table quantity = 3
     *
     * basketCount = 5
     */
    const basketCount = basket.cartItems.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    /* =========================================
       PAGE CHECK
    ========================================= */

    const isHomePage =
        location.pathname === "/";

    const isShopPage =
        location.pathname === "/shop";

    /* =========================================
       STATES
    ========================================= */

    const [searchText, setSearchText] =
        useState("");

    const [basketOpen, setBasketOpen] =
        useState(false);

    const [isScrolled, setIsScrolled] =
        useState(false);

    /* =========================================
       HEADER SCROLL
    ========================================= */

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(
                window.scrollY > 60
            );
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    /* =========================================
       RESET SCROLL STATE AFTER ROUTE CHANGE
    ========================================= */

    useEffect(() => {
        setIsScrolled(
            window.scrollY > 60
        );
    }, [location.pathname]);

    /* =========================================
       SHOP SEARCH SYNC
    ========================================= */

    useEffect(() => {
        if (!isShopPage) {
            setSearchText("");
            return;
        }

        const params =
            new URLSearchParams(
                location.search
            );

        const currentSearch =
            params.get("search") ?? "";

        setSearchText(currentSearch);

    }, [
        isShopPage,
        location.search,
    ]);

    /* =========================================
       SEARCH
    ========================================= */

    const handleSearch = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const value =
            searchText.trim();

        if (!value) {
            navigate("/shop");
            return;
        }

        navigate(
            `/shop?search=${encodeURIComponent(
                value
            )}`
        );
    };

    /* =========================================
       BASKET
    ========================================= */

    const handleBasketOpen = () => {
        setBasketOpen(true);
    };

    const handleBasketClose = () => {
        setBasketOpen(false);
    };

    /* =========================================
       HEADER CLASS
    ========================================= */

    const headerClassName = [
        "header",

        isHomePage
            ? "header-home"
            : "header-inner",

        isHomePage && isScrolled
            ? "header-scrolled"
            : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <header
                className={
                    headerClassName
                }
            >
                <div className="header-container">

                    {/* =================================
                        LOGO
                    ================================= */}

                    <Link
                        to="/"
                        className="header-logo"
                        aria-label="Furniro Home"
                    >
                        <div className="header-logo-mark">
                            <span />
                            <span />
                            <span />
                        </div>

                        <div className="header-logo-info">
                            <strong>
                                FURNIRO
                            </strong>

                            <small>
                                YOUR FUTURE INTERIOR
                            </small>
                        </div>
                    </Link>

                    {/* =================================
                        SHOP SEARCH
                    ================================= */}

                    {isShopPage && (
                        <form
                            className="header-search"
                            onSubmit={
                                handleSearch
                            }
                        >
                            <button
                                type="submit"
                                className="header-search-icon"
                                aria-label="Search furniture"
                            >
                                <svg
                                    width="18"
                                    height="18"
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
                                value={
                                    searchText
                                }
                                onChange={(
                                    event
                                ) =>
                                    setSearchText(
                                        event
                                            .target
                                            .value
                                    )
                                }
                            />
                        </form>
                    )}

                    {/* =================================
                        NAVIGATION
                    ================================= */}

                    <nav className="header-menu">

                        <NavLink
                            to="/"
                            end
                            className={({
                                isActive,
                            }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/shop"
                            className={({
                                isActive,
                            }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            Shop
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className={({
                                isActive,
                            }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            Order
                        </NavLink>

                        <NavLink
                            to="/mypage"
                            className={({
                                isActive,
                            }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            My Page
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({
                                isActive,
                            }) =>
                                isActive
                                    ? "header-nav-link active"
                                    : "header-nav-link"
                            }
                        >
                            About Us
                        </NavLink>

                    </nav>

                    {/* =================================
                        RIGHT ACTIONS
                    ================================= */}

                    <div className="header-actions">

                        {/* =================================
                            BASKET
                        ================================= */}

                        <button
                            type="button"
                            className="header-basket-button"
                            onClick={
                                handleBasketOpen
                            }
                            aria-label="Open basket"
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M3 3H5L7.4 15H18L21 7H6"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
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

                            {/* REAL BASKET COUNT */}

                            {basketCount > 0 && (
                                <span className="header-basket-count">
                                    {
                                        basketCount
                                    }
                                </span>
                            )}

                        </button>

                        {/* =================================
                            LOGIN
                        ================================= */}

                        <button
                            type="button"
                            className="header-login"
                        >
                            Login
                        </button>

                        {/* =================================
                            SIGN UP
                        ================================= */}

                        <button
                            type="button"
                            className="header-signup"
                        >
                            Sign Up
                        </button>

                    </div>
                </div>
            </header>

            {/* =================================
                BASKET DRAWER
            ================================= */}

            <Basket
                open={basketOpen}
                onClose={
                    handleBasketClose
                }
            />
        </>
    );
};

export default Header;