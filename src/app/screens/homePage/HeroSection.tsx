import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router";

import {
    heroSlides,
    type HeroSlide,
} from "./homepage.data";

const SLIDE_INTERVAL = 6500;

const HeroSection = () => {
    const [activeSlide, setActiveSlide] =
        useState(0);

    /* ==============================
       AUTO SLIDER
    ============================== */

    useEffect(() => {
        const intervalId = window.setInterval(
            () => {
                setActiveSlide((previousSlide) =>
                    previousSlide ===
                        heroSlides.length - 1
                        ? 0
                        : previousSlide + 1
                );
            },
            SLIDE_INTERVAL
        );

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    /* ==============================
       CONTROLS
    ============================== */

    const handlePrevious = () => {
        setActiveSlide((previousSlide) =>
            previousSlide === 0
                ? heroSlides.length - 1
                : previousSlide - 1
        );
    };

    const handleNext = () => {
        setActiveSlide((previousSlide) =>
            previousSlide ===
                heroSlides.length - 1
                ? 0
                : previousSlide + 1
        );
    };

    const handleDotClick = (
        slideIndex: number
    ) => {
        setActiveSlide(slideIndex);
    };

    return (
        <section className="home-hero">
            {/* ==========================
          BACKGROUND SLIDES
      ========================== */}

            <div className="home-hero-backgrounds">
                {heroSlides.map(
                    (
                        slide: HeroSlide,
                        index: number
                    ) => (
                        <div
                            key={slide.id}
                            className={
                                activeSlide === index
                                    ? "home-hero-slide active"
                                    : "home-hero-slide"
                            }
                            aria-hidden={
                                activeSlide !== index
                            }
                        >
                            <img
                                src={slide.image}
                                alt=""
                            />
                        </div>
                    )
                )}
            </div>

            {/* ==========================
          DARK OVERLAY
      ========================== */}

            <div className="home-hero-overlay" />

            {/* ==========================
          CONTENT
      ========================== */}

            <div className="home-hero-container">
                <div
                    key={activeSlide}
                    className="home-hero-content"
                >
                    <div className="home-hero-eyebrow">
                        <span />

                        <p>
                            {
                                heroSlides[activeSlide]
                                    .eyebrow
                            }
                        </p>
                    </div>

                    <h1>
                        {
                            heroSlides[activeSlide]
                                .title
                        }

                        <span>
                            {
                                heroSlides[activeSlide]
                                    .highlightedText
                            }
                        </span>
                    </h1>

                    <p className="home-hero-description">
                        {
                            heroSlides[activeSlide]
                                .description
                        }
                    </p>

                    <div className="home-hero-actions">
                        <Link
                            to="/shop"
                            className="home-hero-primary-button"
                        >
                            EXPLORE COLLECTION

                            <span>→</span>
                        </Link>

                        <Link
                            to="/about"
                            className="home-hero-secondary-button"
                        >
                            OUR STORY
                        </Link>
                    </div>
                </div>

                {/* ==========================
            BOTTOM AREA
        ========================== */}

                <div className="home-hero-bottom">
                    {/* DOTS */}

                    <div className="home-hero-dots">
                        {heroSlides.map(
                            (slide, index) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() =>
                                        handleDotClick(index)
                                    }
                                    className={
                                        activeSlide === index
                                            ? "home-hero-dot active"
                                            : "home-hero-dot"
                                    }
                                    aria-label={`Go to slide ${index + 1
                                        }`}
                                >
                                    <span />
                                </button>
                            )
                        )}
                    </div>

                    {/* SLIDE NUMBER */}

                    <div className="home-hero-counter">
                        <strong>
                            {String(
                                activeSlide + 1
                            ).padStart(2, "0")}
                        </strong>

                        <span />

                        <small>
                            {String(
                                heroSlides.length
                            ).padStart(2, "0")}
                        </small>
                    </div>

                    {/* ARROWS */}

                    <div className="home-hero-navigation">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            aria-label="Previous slide"
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next slide"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* SCROLL INDICATOR */}

            <div className="home-hero-scroll">
                <span />

                <small>
                    SCROLL TO DISCOVER
                </small>
            </div>
        </section>
    );
};

export default HeroSection;