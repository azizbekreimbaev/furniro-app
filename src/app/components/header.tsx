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
import AuthenticationModal from "./auth";

import "../css/header.css";

import {
    useGlobals,
} from "../hooks/useGlobals";

import MemberService from "../services/MemberService";

import {
    serverApi,
} from "../../libs/config";


/* =====================================================
   MEMBER IMAGE HELPER
===================================================== */

const getMemberImageUrl = (
    image?: string,
) => {

    if (!image) {
        return "";
    }


    /*
     * Agar backend allaqachon full URL
     * qaytarsa:
     *
     * http://...
     * https://...
     */

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }


    /*
     * Masalan:
     *
     * /uploads/members/image.jpg
     *
     * yoki
     *
     * uploads/members/image.jpg
     *
     * ikkisini ham ishlatadi.
     */

    const cleanImage =
        image.startsWith("/")
            ? image.slice(1)
            : image;


    return `${serverApi}/${cleanImage}`;
};


/* =====================================================
   USER AVATAR
===================================================== */

interface UserAvatarProps {
    image?: string;

    name?: string;
}


const UserAvatar = ({
    image,
    name,
}: UserAvatarProps) => {

    const [
        imageError,
        setImageError,
    ] = useState(false);


    /*
     * User yoki uning rasmi o'zgarsa,
     * oldingi error state reset bo'ladi.
     */

    useEffect(() => {

        setImageError(false);

    }, [image]);


    const imageUrl =
        getMemberImageUrl(
            image,
        );


    /*
     * IMAGE BOR VA ERROR YO'Q
     */

    if (
        imageUrl &&
        !imageError
    ) {

        return (

            <img
                src={
                    imageUrl
                }

                alt={
                    name ||
                    "User"
                }

                onError={() =>
                    setImageError(
                        true,
                    )
                }

                style={{
                    width:
                        "32px",

                    height:
                        "32px",

                    borderRadius:
                        "50%",

                    objectFit:
                        "cover",

                    border:
                        "1px solid rgba(128,128,128,0.3)",

                    flexShrink:
                        0,
                }}
            />
        );
    }


    /*
     * IMAGE YO'Q YOKI IMAGE LOAD ERROR
     *
     * DEFAULT USER ICON
     */

    return (

        <span
            style={{
                width:
                    "32px",

                height:
                    "32px",

                borderRadius:
                    "50%",

                display:
                    "flex",

                alignItems:
                    "center",

                justifyContent:
                    "center",

                border:
                    "1px solid rgba(128,128,128,0.35)",

                flexShrink:
                    0,
            }}
        >

            <svg
                width="18"

                height="18"

                viewBox="0 0 24 24"

                fill="none"

                aria-hidden="true"
            >

                {/* HEAD */}

                <circle
                    cx="12"

                    cy="8"

                    r="4"

                    stroke="currentColor"

                    strokeWidth="1.5"
                />


                {/* BODY */}

                <path
                    d="M4.5 20C5.2 15.8 8 13.5 12 13.5C16 13.5 18.8 15.8 19.5 20"

                    stroke="currentColor"

                    strokeWidth="1.5"

                    strokeLinecap="round"
                />

            </svg>

        </span>
    );
};


/* =====================================================
   HEADER
===================================================== */

const Header = () => {

    const location =
        useLocation();


    const navigate =
        useNavigate();


    /* =========================================
       GLOBAL CONTEXT
    ========================================= */

    const {
        authMember,
        setAuthMember,
        basket,
    } = useGlobals();


    /* =========================================
       BASKET COUNT
    ========================================= */

    const basketCount =
        basket.cartItems.reduce(
            (
                total,
                item,
            ) =>
                total +
                item.quantity,

            0,
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

    const [
        searchText,
        setSearchText,
    ] = useState("");


    const [
        basketOpen,
        setBasketOpen,
    ] = useState(false);


    const [
        isScrolled,
        setIsScrolled,
    ] = useState(false);


    /* =========================================
       AUTH MODAL STATES
    ========================================= */

    const [
        loginOpen,
        setLoginOpen,
    ] = useState(false);


    const [
        signupOpen,
        setSignupOpen,
    ] = useState(false);


    /* =========================================
       HEADER SCROLL
    ========================================= */

    useEffect(() => {

        const handleScroll =
            () => {

                setIsScrolled(
                    window.scrollY >
                    60,
                );
            };


        handleScroll();


        window.addEventListener(
            "scroll",

            handleScroll,

            {
                passive:
                    true,
            },
        );


        return () => {

            window.removeEventListener(
                "scroll",

                handleScroll,
            );
        };

    }, []);


    /* =========================================
       RESET SCROLL AFTER ROUTE CHANGE
    ========================================= */

    useEffect(() => {

        setIsScrolled(
            window.scrollY >
            60,
        );

    }, [
        location.pathname,
    ]);


    /* =========================================
       SHOP SEARCH SYNC
    ========================================= */

    useEffect(() => {

        if (!isShopPage) {

            setSearchText(
                "",
            );

            return;
        }


        const params =
            new URLSearchParams(
                location.search,
            );


        const currentSearch =
            params.get(
                "search",
            ) ?? "";


        setSearchText(
            currentSearch,
        );

    }, [
        isShopPage,
        location.search,
    ]);


    /* =========================================
       SEARCH
    ========================================= */

    const handleSearch = (
        event:
            FormEvent<HTMLFormElement>,
    ) => {

        event.preventDefault();


        const value =
            searchText.trim();


        if (!value) {

            navigate(
                "/shop",
            );

            return;
        }


        navigate(
            `/shop?search=${encodeURIComponent(
                value,
            )}`,
        );
    };


    /* =========================================
       BASKET
    ========================================= */

    const handleBasketOpen =
        () => {

            setBasketOpen(
                true,
            );
        };


    const handleBasketClose =
        () => {

            setBasketOpen(
                false,
            );
        };


    /* =========================================
       LOGIN MODAL
    ========================================= */

    const handleLoginOpen =
        () => {

            setSignupOpen(
                false,
            );


            setLoginOpen(
                true,
            );
        };


    const handleLoginClose =
        () => {

            setLoginOpen(
                false,
            );
        };


    /* =========================================
       SIGNUP MODAL
    ========================================= */

    const handleSignupOpen =
        () => {

            setLoginOpen(
                false,
            );


            setSignupOpen(
                true,
            );
        };


    const handleSignupClose =
        () => {

            setSignupOpen(
                false,
            );
        };


    /* =========================================
       LOGOUT
    ========================================= */

    const handleLogout =
        async () => {

            try {

                const memberService =
                    new MemberService();


                await memberService
                    .logout();


                /* =============================
                   AUTH CLEAR
                ============================== */

                setAuthMember(
                    null,
                );


                /* =============================
                   BASKET CLEAR
                ============================== */

                basket
                    .onDeleteAll();


                /* =============================
                   HOME
                ============================== */

                navigate(
                    "/",
                );


            } catch (err) {

                console.log(
                    "LOGOUT ERROR:",
                    err,
                );
            }
        };


    /* =========================================
       HEADER CLASS
    ========================================= */

    const headerClassName =
        [

            "header",


            isHomePage
                ? "header-home"
                : "header-inner",


            isHomePage &&
                isScrolled

                ? "header-scrolled"

                : "",

        ]
            .filter(
                Boolean,
            )
            .join(
                " ",
            );


    /* =========================================
       RENDER
    ========================================= */

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
                                    event,
                                ) =>
                                    setSearchText(
                                        event
                                            .target
                                            .value,
                                    )
                                }
                            />

                        </form>

                    )}


                    {/* =================================
                        NAVIGATION
                    ================================= */}

                    <nav className="header-menu">


                        {/* HOME */}

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


                        {/* SHOP */}

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


                        {/* =================================
                            AUTH ONLY
                        ================================= */}

                        {authMember && (

                            <>

                                {/* ORDER */}

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


                                {/* MY PAGE */}

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

                            </>

                        )}


                        {/* ABOUT */}

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


                            {/* BASKET COUNT */}

                            {basketCount >
                                0 && (

                                    <span className="header-basket-count">

                                        {
                                            basketCount
                                        }

                                    </span>

                                )}

                        </button>


                        {/* =================================
                            NOT AUTHENTICATED
                        ================================= */}

                        {!authMember && (

                            <>

                                {/* LOGIN */}

                                <button
                                    type="button"

                                    className="header-login"

                                    onClick={
                                        handleLoginOpen
                                    }
                                >
                                    Login
                                </button>


                                {/* SIGNUP */}

                                <button
                                    type="button"

                                    className="header-signup"

                                    onClick={
                                        handleSignupOpen
                                    }
                                >
                                    Sign Up
                                </button>

                            </>

                        )}


                        {/* =================================
                            AUTHENTICATED USER
                        ================================= */}

                        {authMember && (

                            <>

                                {/* =================================
                                    USER AVATAR + NAME
                                ================================= */}

                                <button
                                    type="button"

                                    className="header-login"

                                    onClick={() =>
                                        navigate(
                                            "/mypage",
                                        )
                                    }

                                    style={{
                                        display:
                                            "flex",

                                        alignItems:
                                            "center",

                                        gap:
                                            "9px",
                                    }}
                                >

                                    <UserAvatar
                                        image={
                                            authMember.memberImage
                                        }

                                        name={
                                            authMember
                                                .memberNick
                                        }
                                    />


                                    <span>
                                        {
                                            authMember
                                                .memberNick
                                        }
                                    </span>

                                </button>


                                {/* =================================
                                    LOGOUT
                                ================================= */}

                                <button
                                    type="button"

                                    className="header-signup"

                                    onClick={
                                        handleLogout
                                    }
                                >
                                    Logout
                                </button>

                            </>

                        )}

                    </div>

                </div>

            </header>


            {/* =================================
                BASKET DRAWER
            ================================= */}

            <Basket
                open={
                    basketOpen
                }

                onClose={
                    handleBasketClose
                }
            />


            {/* =================================
                AUTHENTICATION MODAL
            ================================= */}

            <AuthenticationModal
                signupOpen={
                    signupOpen
                }

                loginOpen={
                    loginOpen
                }

                handleSignupOpen={
                    handleSignupOpen
                }

                handleSignupClose={
                    handleSignupClose
                }

                handleLoginOpen={
                    handleLoginOpen
                }

                handleLoginClose={
                    handleLoginClose
                }
            />

        </>
    );
};


export default Header;