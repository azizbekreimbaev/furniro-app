import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router";

import PopularProductSlide from "./PopularProductSlide";


import { useAppSelector } from "../../hook";
import { selectPopularProducts } from "./homepageSlice";

const SLIDER_INTERVAL = 5000;

const POPULAR_LIMIT = 5;

const PopularProductsSlider = () => {
    const [activeSlide, setActiveSlide] =
        useState(0);

    const [isPaused, setIsPaused] =
        useState(false);

    const popularProductsData = useAppSelector(selectPopularProducts)

    const popularProducts = [...popularProductsData]
        .sort((a, b) => (b.productViews ?? 0) - (a.productViews ?? 0))
        .slice(0, POPULAR_LIMIT);

    /* ============================
       AUTOPLAY
    ============================ */

    useEffect(() => {
        if (
            isPaused ||
            popularProducts.length <= 1
        ) {
            return;
        }

        const intervalId =
            window.setInterval(() => {
                setActiveSlide((prev) =>
                    prev ===
                        popularProducts.length - 1
                        ? 0
                        : prev + 1
                );
            }, SLIDER_INTERVAL);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [
        isPaused,
        popularProducts.length,
    ]);

    /* ============================
       CONTROLS
    ============================ */

    const handleNext = () => {
        setActiveSlide((prev) =>
            prev ===
                popularProducts.length - 1
                ? 0
                : prev + 1
        );
    };

    const handlePrevious = () => {
        setActiveSlide((prev) =>
            prev === 0
                ? popularProducts.length - 1
                : prev - 1
        );
    };

    if (popularProducts.length === 0) {
        return null;
    }

    return (
        <section className="home-popular-section">
            <div className="home-section-container">
                {/* =========================
            HEADING
        ========================= */}

                <div className="home-popular-heading">
                    <div>
                        <span className="home-section-eyebrow">
                            MOST LOVED
                        </span>

                        <h2>
                            MOST POPULAR
                            <br />
                            PRODUCTS
                        </h2>
                    </div>

                    <div className="home-popular-heading-info">
                        <p>
                            Explore the pieces our customers
                            return to most — timeless furniture
                            chosen for design, comfort and
                            character.
                        </p>

                        <Link
                            to="/shop"
                            className="home-section-link"
                        >
                            EXPLORE COLLECTION

                            <span>→</span>
                        </Link>
                    </div>
                </div>

                {/* =========================
            SLIDER
        ========================= */}

                <div
                    className="home-popular-slider"
                    onMouseEnter={() =>
                        setIsPaused(true)
                    }
                    onMouseLeave={() =>
                        setIsPaused(false)
                    }
                >
                    <div
                        className="home-popular-track"
                        style={{
                            transform: `translateX(-${activeSlide * 100
                                }%)`,
                        }}
                    >
                        {popularProducts.map(
                            (product, index) => (
                                <PopularProductSlide
                                    key={product._id}
                                    product={product}
                                    position={index + 1}
                                />
                            )
                        )}
                    </div>

                    {/* =========================
              ARROWS
          ========================= */}

                    <button
                        type="button"
                        className="home-popular-arrow home-popular-arrow-left"
                        onClick={handlePrevious}
                        aria-label="Previous product"
                    >
                        ←
                    </button>

                    <button
                        type="button"
                        className="home-popular-arrow home-popular-arrow-right"
                        onClick={handleNext}
                        aria-label="Next product"
                    >
                        →
                    </button>
                </div>

                {/* =========================
            BOTTOM CONTROLS
        ========================= */}

                <div className="home-popular-controls">
                    <div className="home-popular-dots">
                        {popularProducts.map(
                            (product, index) => (
                                <button
                                    key={product._id}
                                    type="button"
                                    className={
                                        activeSlide === index
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setActiveSlide(index)
                                    }
                                    aria-label={`Go to product ${index + 1
                                        }`}
                                >
                                    <span />
                                </button>
                            )
                        )}
                    </div>

                    <div className="home-popular-counter">
                        <strong>
                            {String(
                                activeSlide + 1
                            ).padStart(2, "0")}
                        </strong>

                        <span />

                        <small>
                            {String(
                                popularProducts.length
                            ).padStart(2, "0")}
                        </small>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularProductsSlider;