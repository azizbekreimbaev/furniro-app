import {
    useState,
    type FormEvent,
} from "react";

import { Link } from "react-router";

import "../css/footer.css";

interface FooterLink {
    label: string;
    to: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
    {
        title: "SHOP",
        links: [
            {
                label: "New Arrivals",
                to: "/shop",
            },
            {
                label: "Trending Products",
                to: "/shop",
            },
            {
                label: "Living Room",
                to: "/shop?search=living",
            },
            {
                label: "Chairs",
                to: "/shop?search=chair",
            },
            {
                label: "Tables",
                to: "/shop?search=table",
            },
        ],
    },

    {
        title: "COMPANY",
        links: [
            {
                label: "About Furniro",
                to: "/about",
            },
            {
                label: "Contact Us",
                to: "/about#contact",
            },
            {
                label: "Our Story",
                to: "/about",
            },
            {
                label: "My Account",
                to: "/mypage",
            },
            {
                label: "My Orders",
                to: "/cart",
            },
        ],
    },

    {
        title: "SUPPORT",
        links: [
            {
                label: "Delivery",
                to: "/about#contact",
            },
            {
                label: "Returns",
                to: "/about#contact",
            },
            {
                label: "Payment",
                to: "/cart",
            },
            {
                label: "Help Center",
                to: "/about#contact",
            },
            {
                label: "Customer Support",
                to: "/about#contact",
            },
        ],
    },
];

const Footer = () => {
    const [email, setEmail] =
        useState("");

    const handleSubscribe = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const value = email.trim();

        if (!value) {
            return;
        }

        /*
         * Keyinchalik backend:
         *
         * await NewsletterService.subscribe({
         *   email: value,
         * });
         */

        console.log(
            "Newsletter email:",
            value
        );

        setEmail("");
    };

    return (
        <footer className="footer">
            {/* ==============================
          TOP
      ============================== */}

            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-main-grid">
                        {/* ==========================
                BRAND
            ========================== */}

                        <div className="footer-brand">
                            <Link
                                to="/"
                                className="footer-logo"
                            >
                                <div className="footer-logo-mark">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <div className="footer-logo-info">
                                    <strong>
                                        FURNIRO
                                    </strong>

                                    <small>
                                        YOUR FUTURE INTERIOR
                                    </small>
                                </div>
                            </Link>

                            <p className="footer-brand-description">
                                Thoughtfully selected furniture
                                for modern homes. Timeless forms,
                                natural materials and everyday
                                comfort for spaces made to be
                                lived in.
                            </p>

                            <div className="footer-brand-location">
                                <span />

                                <p>
                                    Seoul, South Korea
                                </p>
                            </div>
                        </div>

                        {/* ==========================
                LINKS
            ========================== */}

                        <div className="footer-links-area">
                            {footerColumns.map(
                                (column) => (
                                    <div
                                        className="footer-column"
                                        key={column.title}
                                    >
                                        <h3>
                                            {column.title}
                                        </h3>

                                        <nav>
                                            {column.links.map(
                                                (link) => (
                                                    <Link
                                                        key={`${column.title}-${link.label}`}
                                                        to={link.to}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                )
                                            )}
                                        </nav>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* ==============================
              NEWSLETTER
          ============================== */}

                    <div className="footer-newsletter">
                        <div className="footer-newsletter-title">
                            <span>
                                STAY INSPIRED
                            </span>

                            <h2>
                                STORIES, PRODUCTS
                                <br />
                                & INTERIOR IDEAS.
                            </h2>
                        </div>

                        <div className="footer-newsletter-right">
                            <p>
                                Join our newsletter for new
                                collections, thoughtful interiors
                                and exclusive Furniro updates.
                            </p>

                            <form
                                className="footer-newsletter-form"
                                onSubmit={
                                    handleSubscribe
                                }
                            >
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    aria-label="Email address"
                                />

                                <button type="submit">
                                    SUBSCRIBE

                                    <span>
                                        →
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================
          BOTTOM
      ============================== */}

            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <p>
                            © {new Date().getFullYear()} Furniro.
                            All rights reserved.
                        </p>

                        <div className="footer-bottom-links">
                            <button type="button">
                                Privacy Policy
                            </button>

                            <button type="button">
                                Terms & Conditions
                            </button>

                            <button type="button">
                                Cookies
                            </button>
                        </div>

                        <div className="footer-socials">
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                IG
                            </a>

                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                FB
                            </a>

                            <a
                                href="https://www.pinterest.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                PT
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================
          LARGE DECORATIVE LOGO
      ============================== */}

            <div className="footer-wordmark">
                FURNIRO
            </div>
        </footer>
    );
};

export default Footer;