import { Link } from "react-router";

const CONTACT_IMAGE =
    "/images/banner.png"

const GetInTouch = () => {
    return (
        <section className="home-contact-section">
            <div className="home-section-container">
                <div className="home-contact-layout">
                    {/* =========================
              IMAGE
          ========================= */}

                    <div className="home-contact-image">
                        <img
                            src={CONTACT_IMAGE}
                            alt="Warm modern living room interior"
                        />

                        <div className="home-contact-image-overlay" />

                        <div className="home-contact-image-label">
                            <span>FURNIRO</span>

                            <strong>
                                DESIGNED FOR
                                <br />
                                REAL LIVING
                            </strong>
                        </div>
                    </div>

                    {/* =========================
              CONTENT
          ========================= */}

                    <div className="home-contact-content">
                        <span className="home-section-eyebrow">
                            GET IN TOUCH
                        </span>

                        <h2>
                            LET'S CREATE
                            <br />
                            SOMETHING
                            <span>BEAUTIFUL.</span>
                        </h2>

                        <p className="home-contact-description">
                            Have a question about a product,
                            delivery or your next interior
                            project? Our team is here to help
                            you find the right furniture for
                            your space.
                        </p>

                        {/* CONTACT INFO */}

                        <div className="home-contact-info">
                            <div>
                                <span>EMAIL</span>

                                <strong>
                                    support@furniro.com
                                </strong>
                            </div>

                            <div>
                                <span>PHONE</span>

                                <strong>
                                    +82 10 7557 0089
                                </strong>
                            </div>
                        </div>

                        {/* ACTIONS */}

                        <div className="home-contact-actions">
                            <Link
                                to="/about#contact"
                                className="home-contact-primary"
                            >
                                CONTACT US

                                <span>→</span>
                            </Link>

                            <Link
                                to="/about"
                                className="home-contact-secondary"
                            >
                                ABOUT FURNIRO
                            </Link>
                        </div>

                        {/* SMALL TEXT */}

                        <div className="home-contact-note">
                            <span />

                            <p>
                                Furniture, interiors and support
                                for better everyday spaces.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;