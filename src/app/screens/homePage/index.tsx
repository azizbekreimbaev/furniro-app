import { Link } from "react-router";
import { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";



import "../../css/homepage.css";
import heroImage from "../../../../public/images/banner.png";

interface Product {
    _id: string;
    productName: string;
    productPrice: number;
    productViews: number;
    category: string;
}

const products: Product[] = [
    {
        _id: "1",
        productName: "Urban Luxe Arm Chair",
        productPrice: 2688.15,
        productViews: 4200,
        category: "Chair",
    },
    {
        _id: "2",
        productName: "Modern Black Hanging Light",
        productPrice: 1595.6,
        productViews: 3800,
        category: "Lighting",
    },
    {
        _id: "3",
        productName: "Metro Fusion Table",
        productPrice: 2238,
        productViews: 3200,
        category: "Table",
    },
    {
        _id: "4",
        productName: "Modern Desk Lamp",
        productPrice: 985.5,
        productViews: 2700,
        category: "Lighting",
    },
    {
        _id: "5",
        productName: "Classic Wall Clock",
        productPrice: 521.4,
        productViews: 2500,
        category: "Decor",
    },
    {
        _id: "6",
        productName: "Pendant Ceiling Lamp",
        productPrice: 1029,
        productViews: 2100,
        category: "Lighting",
    },
];

const HomePage = () => {
    // Eng ko'p ko'rilgan productlar
    const trendingProducts = [...products].sort(
        (a, b) => b.productViews - a.productViews
    );

    // Hozircha static.
    // Keyinchalik backenddan createdAt DESC orqali keladi.
    const newProducts = [...products].reverse();

    // Top 5 eng ko'p ko'rilgan




    const topProducts = trendingProducts.slice(0, 5);

    const [activeSlide, setActiveSlide] = useState(0);

    const handleNextSlide = () => {
        setActiveSlide((prev) =>
            prev === topProducts.length - 1 ? 0 : prev + 1
        );
    };

    const handlePreviousSlide = () => {
        setActiveSlide((prev) =>
            prev === 0 ? topProducts.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const sliderInterval = window.setInterval(() => {
            setActiveSlide((prev) =>
                prev === topProducts.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => {
            window.clearInterval(sliderInterval);
        };
    }, [topProducts.length]);




    return (
        <main className="home-page">
            {/* =====================================
          HERO
      ===================================== */}

            <section
                className="home-hero"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="home-main-container">
                    <div className="home-hero-content">
                        <span>WELCOME TO OUR</span>

                        <h1>
                            FURNITURE
                            <br />
                            GALLERY
                        </h1>

                        <p>
                            Discover beautiful furniture designed for modern living.
                            Explore our carefully selected collection and create the
                            interior you always wanted.
                        </p>

                        <div className="home-hero-buttons">
                            <Link to="/shop">
                                DISCOVER COLLECTION
                            </Link>

                            {/* Keyinchalik AuthenticationModal ochadi */}
                            <button type="button">
                                SIGN UP
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================
          TRENDING PRODUCTS
      ===================================== */}

            <section className="home-products-section">
                <div className="home-main-container">
                    <div className="home-section-title">
                        <h2>TRENDING PRODUCTS</h2>

                        <p>OUR MOST VIEWED PRODUCTS</p>
                    </div>

                    <div className="home-products-grid">
                        {trendingProducts.map((product) => (
                            <article
                                className="home-product-card"
                                key={product._id}
                            >
                                <div className="home-product-image">
                                    <img
                                        src={heroImage}
                                        alt={product.productName}
                                    />

                                    <div className="home-product-overlay">
                                        <Link to={`/product/${product._id}`}>
                                            VIEW PRODUCT
                                        </Link>
                                    </div>
                                </div>

                                <div className="home-product-info">
                                    <span>
                                        {product.category}
                                    </span>

                                    <h3>
                                        {product.productName}
                                    </h3>

                                    <div className="home-rating">
                                        ★★★★★
                                    </div>

                                    <strong>
                                        $
                                        {product.productPrice.toLocaleString(
                                            "en-US",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </strong>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="home-products-action">
                        <Link to="/shop">
                            VIEW ALL PRODUCTS
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================
          NEW PRODUCTS
      ===================================== */}

            <section className="home-products-section home-new-products">
                <div className="home-main-container">
                    <div className="home-section-title">
                        <h2>NEW PRODUCTS</h2>

                        <p>EXPLORE OUR LATEST PRODUCTS</p>
                    </div>

                    <div className="home-products-grid">
                        {newProducts.map((product) => (
                            <article
                                className="home-product-card"
                                key={product._id}
                            >
                                <div className="home-product-image">
                                    <img
                                        src={heroImage}
                                        alt={product.productName}
                                    />

                                    <div className="home-product-overlay">
                                        <Link to={`/product/${product._id}`}>
                                            VIEW PRODUCT
                                        </Link>
                                    </div>
                                </div>

                                <div className="home-product-info">
                                    <span>
                                        {product.category}
                                    </span>

                                    <h3>
                                        {product.productName}
                                    </h3>

                                    <div className="home-rating">
                                        ★★★★★
                                    </div>

                                    <strong>
                                        $
                                        {product.productPrice.toLocaleString(
                                            "en-US",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </strong>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================
          GET IN TOUCH
      ===================================== */}

            <section className="home-contact-section">
                <div className="home-main-container">
                    <div className="home-contact-banner">
                        <div className="home-contact-image">
                            <img
                                src={heroImage}
                                alt="Furniture"
                            />
                        </div>

                        <div className="home-contact-content">
                            <span>
                                WE ARE HERE FOR YOU
                            </span>

                            <h2>
                                GET IN TOUCH
                            </h2>

                            <p>
                                Need help choosing furniture or have any
                                questions? Contact our team and we will be
                                happy to help.
                            </p>

                            <Link to="/about#contact">
                                CONTACT US
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================
          VIDEO
      ===================================== */}

            <section className="home-video-section">
                <div className="home-main-container">
                    <div className="home-section-title">
                        <h2>
                            DISCOVER OUR COLLECTION
                        </h2>

                        <p>
                            FURNITURE CREATED FOR YOUR HOME
                        </p>
                    </div>

                    <div className="home-video-wrapper">
                        <div className="home-video-placeholder">
                            <button
                                type="button"
                                className="home-play-button"
                                aria-label="Play video"
                            >
                                ▶
                            </button>

                            <h3>
                                OUR FURNITURE STORY
                            </h3>

                            <p>
                                Video will be added here
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================
          TOP 5 PRODUCTS
      ===================================== */}

            {/* =====================================
    MOST POPULAR PRODUCTS SLIDER
===================================== */}

            <section className="home-popular-section">
                <div className="home-main-container">
                    <div className="home-section-title">
                        <h2>MOST POPULAR PRODUCTS</h2>

                        <p>OUR TOP 5 MOST VIEWED PRODUCTS</p>
                    </div>

                    <div className="popular-slider">
                        <div
                            className="popular-slider-track"
                            style={{
                                transform: `translateX(-${activeSlide * 100}%)`,
                            }}
                        >
                            {topProducts.map((product, index) => (
                                <div
                                    className="popular-slide"
                                    key={product._id}
                                >
                                    <div className="popular-slide-image">
                                        <img
                                            src={heroImage}
                                            alt={product.productName}
                                        />

                                        <span className="popular-slide-number">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <div className="popular-slide-content">
                                        <span className="popular-slide-category">
                                            {product.category}
                                        </span>

                                        <h3>
                                            {product.productName}
                                        </h3>

                                        <div className="popular-slide-rating">
                                            ★★★★★
                                        </div>

                                        <p className="popular-slide-description">
                                            One of our most popular furniture pieces,
                                            selected by customers and viewed{" "}
                                            <strong>
                                                {product.productViews.toLocaleString()}
                                            </strong>{" "}
                                            times.
                                        </p>

                                        <strong className="popular-slide-price">
                                            $
                                            {product.productPrice.toLocaleString(
                                                "en-US",
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </strong>

                                        <Link
                                            to={`/product/${product._id}`}
                                            className="popular-product-button"
                                        >
                                            VIEW PRODUCT
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* LEFT */}

                        <IconButton
                            className="popular-slider-arrow popular-slider-left"
                            onClick={handlePreviousSlide}
                            aria-label="Previous product"
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>

                        {/* RIGHT */}

                        <IconButton
                            className="popular-slider-arrow popular-slider-right"
                            onClick={handleNextSlide}
                            aria-label="Next product"
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </div>

                    {/* DOTS */}

                    <div className="popular-slider-dots">
                        {topProducts.map((product, index) => (
                            <button
                                key={product._id}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => setActiveSlide(index)}
                                className={
                                    activeSlide === index
                                        ? "popular-slider-dot active"
                                        : "popular-slider-dot"
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;