import { useEffect } from "react";
import { useLocation } from "react-router";

import "../../css/aboutpage.css";
import heroImage from "../../../../public/images/banner.png";

const AboutUsPage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#contact") {
            setTimeout(() => {
                document
                    .getElementById("contact")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
            }, 50);
        }
    }, [location]);

    return (
        <main className="about-page">
            {/* ==========================
          ABOUT HERO
      ========================== */}

            <section className="about-hero">
                <div className="about-container">
                    <span>WHO WE ARE</span>

                    <h1>
                        ABOUT FURNITUR
                    </h1>

                    <p>
                        We create furniture for modern living,
                        combining timeless design, functionality
                        and comfort.
                    </p>
                </div>
            </section>

            {/* ==========================
          ABOUT CONTENT
      ========================== */}

            <section className="about-story">
                <div className="about-container">
                    <div className="about-story-grid">
                        <div className="about-story-image">
                            <img
                                src={heroImage}
                                alt="Furnitur interior"
                            />
                        </div>

                        <div className="about-story-content">
                            <span>
                                OUR STORY
                            </span>

                            <h2>
                                FURNITURE DESIGNED
                                <br />
                                FOR YOUR LIFE
                            </h2>

                            <p>
                                Furnitur was created with a simple
                                idea: beautiful furniture should
                                also be functional, comfortable and
                                made for everyday living.
                            </p>

                            <p>
                                We carefully select products that
                                combine modern design, quality
                                materials and timeless character.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================
          VALUES
      ========================== */}

            <section className="about-values">
                <div className="about-container">
                    <div className="about-section-title">
                        <span>
                            WHY FURNITUR
                        </span>

                        <h2>
                            WHAT WE BELIEVE IN
                        </h2>
                    </div>

                    <div className="about-values-grid">
                        <article>
                            <span>01</span>

                            <h3>
                                QUALITY
                            </h3>

                            <p>
                                Carefully selected furniture made
                                with quality materials.
                            </p>
                        </article>

                        <article>
                            <span>02</span>

                            <h3>
                                DESIGN
                            </h3>

                            <p>
                                Modern and timeless designs created
                                for different interiors.
                            </p>
                        </article>

                        <article>
                            <span>03</span>

                            <h3>
                                COMFORT
                            </h3>

                            <p>
                                Furniture should look beautiful and
                                feel comfortable every day.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* ==========================
          CONTACT US
      ========================== */}

            <section
                className="about-contact"
                id="contact"
            >
                <div className="about-container">
                    <div className="about-contact-grid">
                        <div className="about-contact-info">
                            <span>
                                GET IN TOUCH
                            </span>

                            <h2>
                                HAVE A QUESTION?
                                <br />
                                CONTACT US
                            </h2>

                            <p>
                                Have questions about products,
                                shipping, orders or anything else?
                                Send us a message and our team will
                                get back to you.
                            </p>

                            <div className="about-contact-details">
                                <div>
                                    <span>EMAIL</span>

                                    <strong>
                                        support@furnitur.com
                                    </strong>
                                </div>

                                <div>
                                    <span>PHONE</span>

                                    <strong>
                                        +82 10 7557 0089
                                    </strong>
                                </div>

                                <div>
                                    <span>ADDRESS</span>

                                    <strong>
                                        Seoul, South Korea
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* CONTACT FORM */}

                        <form
                            className="about-contact-form"
                            onSubmit={(event) => {
                                event.preventDefault();

                                // Keyinchalik backendga yuboramiz
                                console.log("Contact form submitted");
                            }}
                        >
                            <div className="about-contact-row">
                                <div>
                                    <label htmlFor="contactName">
                                        YOUR NAME
                                    </label>

                                    <input
                                        id="contactName"
                                        type="text"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contactEmail">
                                        YOUR EMAIL
                                    </label>

                                    <input
                                        id="contactEmail"
                                        type="email"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contactSubject">
                                    SUBJECT
                                </label>

                                <input
                                    id="contactSubject"
                                    type="text"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="contactMessage">
                                    MESSAGE
                                </label>

                                <textarea
                                    id="contactMessage"
                                    rows={6}
                                    placeholder="Write your message..."
                                />
                            </div>

                            <button type="submit">
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUsPage;