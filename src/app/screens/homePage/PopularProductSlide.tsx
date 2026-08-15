import { Link } from "react-router";

import type {
    HomeProduct,
} from "./homepage.data";

interface PopularProductSlideProps {
    product: HomeProduct;
    position: number;
}

const PopularProductSlide = ({
    product,
    position,
}: PopularProductSlideProps) => {
    return (
        <article className="home-popular-slide">
            {/* =========================
          IMAGE
      ========================= */}

            <Link
                to={`/product/${product._id}`}
                className="home-popular-image"
            >
                <img
                    src={product.image}
                    alt={product.productName}
                />

                <div className="home-popular-image-overlay" />

                <div className="home-popular-rank">
                    <span>
                        TOP
                    </span>

                    <strong>
                        {String(position).padStart(
                            2,
                            "0"
                        )}
                    </strong>
                </div>

                <div className="home-popular-image-action">
                    VIEW PRODUCT
                    <span>↗</span>
                </div>
            </Link>

            {/* =========================
          INFORMATION
      ========================= */}

            <div className="home-popular-content">
                <div className="home-popular-content-top">
                    <div>
                        <span className="home-popular-category">
                            {product.category}
                        </span>

                        <span className="home-popular-views">
                            {product.productViews.toLocaleString()}{" "}
                            views
                        </span>
                    </div>

                    <span className="home-popular-number">
                        {String(position).padStart(
                            2,
                            "0"
                        )}
                    </span>
                </div>

                <Link
                    to={`/product/${product._id}`}
                    className="home-popular-name"
                >
                    {product.productName}
                </Link>

                <p className="home-popular-description">
                    A carefully selected piece combining
                    understated design, natural materials
                    and everyday comfort.
                </p>

                <strong className="home-popular-price">
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
                    className="home-popular-view-button"
                >
                    DISCOVER PRODUCT

                    <span>
                        →
                    </span>
                </Link>
            </div>
        </article>
    );
};

export default PopularProductSlide;