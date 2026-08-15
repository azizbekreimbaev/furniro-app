import { useEffect } from "react";
import { useLocation } from "react-router";

import "../../css/aboutpage.css";

const ABOUT_IMAGE = "/images/banner.png";

const AboutUsPage = () => {
    const location = useLocation();

    /* =========================================
       SCROLL TO CONTACT
    ========================================= */

    useEffect(() => {
        if (location.hash !== "#contact") {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            document
                .getElementById("contact")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        }, 100);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [location.hash]);

    return (
        <main className="about-page">
            {/* =================================
                HERO
            ================================= */}

            <section className="about-hero">
                <div className="about-container">
                    <div className="about-hero-content">
                        <div className="about-eyebrow">
                            <span />

                            <p>WHO WE ARE</p>
                        </div>

                        <h1>
                            FURNITURE FOR
                            <span>BETTER LIVING.</span>
                        </h1>

                        <div className="about-hero-bottom">
                            <p>
                                Furniro brings together timeless
                                furniture, natural materials and
                                thoughtful design for homes that
                                feel warm, personal and made for
                                everyday life.
                            </p>

                            <div className="about-hero-signature">
                                <span>EST.</span>

                                <strong>2026</strong>

                                <i />

                                <span>SEOUL</span>

                                <strong>SOUTH KOREA</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-hero-word">
                    FURNIRO
                </div>
            </section>

            {/* =================================
                STORY
            ================================= */}

            <section className="about-story">
                <div className="about-container">
                    <div className="about-story-grid">
                        {/* IMAGE */}

                        <div className="about-story-image">
                            <img
                                src={ABOUT_IMAGE}
                                alt="Furniro modern interior"
                            />

                            <div className="about-story-image-overlay" />

                            <div className="about-story-image-caption">
                                <span>
                                    01
                                </span>

                                <p>
                                    DESIGNED FOR
                                    <br />
                                    EVERYDAY LIVING
                                </p>
                            </div>
                        </div>

                        {/* CONTENT */}

                        <div className="about-story-content">
                            <div className="about-eyebrow">
                                <span />

                                <p>
                                    OUR STORY
                                </p>
                            </div>

                            <h2>
                                DESIGN THAT
                                <br />
                                FEELS LIKE
                                <span>HOME.</span>
                            </h2>

                            <p>
                                Furniro was created with one simple
                                belief: beautiful furniture should
                                never come at the expense of comfort
                                or everyday functionality.
                            </p>

                            <p>
                                We carefully select furniture that
                                combines understated forms, quality
                                materials and timeless character —
                                pieces designed to live with you for
                                years.
                            </p>

                            <div className="about-story-quote">
                                <span />

                                <blockquote>
                                    Good furniture should quietly
                                    become part of the way you live.
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================
                VALUES
            ================================= */}

            <section className="about-values">
                <div className="about-container">
                    <div className="about-section-heading">
                        <div>
                            <div className="about-eyebrow">
                                <span />

                                <p>
                                    WHY FURNIRO
                                </p>
                            </div>

                            <h2>
                                WHAT WE
                                <br />
                                BELIEVE IN.
                            </h2>
                        </div>

                        <p className="about-section-description">
                            Every Furniro piece is selected with
                            the same principles in mind: lasting
                            quality, thoughtful design and comfort
                            that works in real homes.
                        </p>
                    </div>

                    <div className="about-values-grid">
                        {/* VALUE 01 */}

                        <article>
                            <div className="about-value-top">
                                <span>
                                    01
                                </span>

                                <i />
                            </div>

                            <h3>
                                QUALITY
                            </h3>

                            <p>
                                We focus on durable materials,
                                thoughtful construction and
                                furniture designed for everyday
                                use.
                            </p>

                            <strong>
                                MADE TO LAST
                            </strong>
                        </article>

                        {/* VALUE 02 */}

                        <article>
                            <div className="about-value-top">
                                <span>
                                    02
                                </span>

                                <i />
                            </div>

                            <h3>
                                DESIGN
                            </h3>

                            <p>
                                Calm proportions, natural tones and
                                timeless forms allow every piece to
                                work across different interiors.
                            </p>

                            <strong>
                                TIMELESS FORMS
                            </strong>
                        </article>

                        {/* VALUE 03 */}

                        <article>
                            <div className="about-value-top">
                                <span>
                                    03
                                </span>

                                <i />
                            </div>

                            <h3>
                                COMFORT
                            </h3>

                            <p>
                                A home should look beautiful, but
                                more importantly it should feel
                                comfortable every single day.
                            </p>

                            <strong>
                                REAL LIVING
                            </strong>
                        </article>
                    </div>
                </div>
            </section>

            {/* =================================
                STATEMENT
            ================================= */}

            <section className="about-statement">
                <div className="about-container">
                    <div className="about-statement-content">
                        <span>
                            FURNIRO PHILOSOPHY
                        </span>

                        <h2>
                            LESS NOISE.
                            <br />
                            MORE COMFORT.
                            <br />
                            <em>
                                BETTER SPACES.
                            </em>
                        </h2>
                    </div>
                </div>
            </section>

            {/* =================================
                CONTACT
            ================================= */}

            <section
                className="about-contact"
                id="contact"
            >
                <div className="about-container">
                    <div className="about-contact-grid">
                        {/* LEFT */}

                        <div className="about-contact-info">
                            <div className="about-eyebrow">
                                <span />

                                <p>
                                    GET IN TOUCH
                                </p>
                            </div>

                            <h2>
                                LET'S TALK
                                <br />
                                ABOUT YOUR
                                <span>SPACE.</span>
                            </h2>

                            <p className="about-contact-description">
                                Questions about furniture, delivery,
                                orders or your next interior project?
                                Send us a message and our team will
                                be happy to help.
                            </p>

                            <div className="about-contact-details">
                                <div>
                                    <span>
                                        EMAIL
                                    </span>

                                    <strong>
                                        support@furniro.com
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        PHONE
                                    </span>

                                    <strong>
                                        +82 10 7557 0089
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        LOCATION
                                    </span>

                                    <strong>
                                        Seoul, South Korea
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* FORM */}

                        <form
                            className="about-contact-form"
                            onSubmit={(event) => {
                                event.preventDefault();

                                /*
                                 * Keyinchalik backend:
                                 *
                                 * ContactService.send(...)
                                 */

                                console.log(
                                    "Contact form submitted"
                                );
                            }}
                        >
                            <div className="about-contact-form-heading">
                                <span>
                                    SEND A MESSAGE
                                </span>

                                <h3>
                                    How can we help?
                                </h3>
                            </div>

                            <div className="about-contact-row">
                                <div className="about-form-group">
                                    <label htmlFor="contactName">
                                        YOUR NAME
                                    </label>

                                    <input
                                        id="contactName"
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className="about-form-group">
                                    <label htmlFor="contactEmail">
                                        YOUR EMAIL
                                    </label>

                                    <input
                                        id="contactEmail"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="about-form-group">
                                <label htmlFor="contactSubject">
                                    SUBJECT
                                </label>

                                <input
                                    id="contactSubject"
                                    type="text"
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>

                            <div className="about-form-group">
                                <label htmlFor="contactMessage">
                                    MESSAGE
                                </label>

                                <textarea
                                    id="contactMessage"
                                    rows={6}
                                    placeholder="Write your message..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="about-contact-submit"
                            >
                                SEND MESSAGE

                                <span>
                                    →
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUsPage;