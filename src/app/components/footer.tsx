import { Link } from "react-router";
import "../css/footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h3>CUSTOMER SERVICE</h3>

                        <a href="/">Help & FAQs</a>
                        <a href="/">Return & Refund</a>
                        <a href="/">Shipping Policy</a>
                        <a href="/">Customs and Taxes</a>
                        <a href="/">Customer Reviews</a>
                    </div>

                    <div className="footer-column">
                        <h3>COMPANY</h3>

                        <a href="/about">About Us</a>
                        <Link to="/about#contact">
                            Contact Us
                        </Link>
                        <a href="/">Special Deals & Offers</a>
                        <a href="/">Terms of Service</a>
                        <a href="/">Privacy Policy</a>
                    </div>

                    <div className="footer-column">
                        <h3>HELP CENTER</h3>

                        <a href="/">Order Information</a>
                        <a href="/">Shipping Options</a>
                        <a href="/">International Shipping</a>
                        <a href="/">Payment Options</a>
                    </div>

                    <div className="footer-column">
                        <h3>RETURN & WARRANTY</h3>

                        <a href="/">Returns & Exchange Policy</a>
                        <a href="/">Returns Center</a>
                        <a href="/">Warranty Policy</a>
                        <a href="/">Warranty Registration</a>
                        <a href="/">Warranty Repair Center</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        Furnitur © 2026. All rights reserved.
                    </p>

                    <div className="footer-socials">
                        <a href="/">f</a>
                        <a href="/">x</a>
                        <a href="/">in</a>
                        <a href="/">ig</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;