import { Link } from "react-router";

import type {
    HomeProduct,
} from "./homepage.data";

interface ProductCardProps {
    product: HomeProduct;
}

const ProductCard = ({
    product,
}: ProductCardProps) => {
    return (
        <article className="home-product-card">
            {/* IMAGE */}

            <Link
                to={`/product/${product._id}`}
                className="home-product-card-image"
            >
                <img
                    src={product.image}
                    alt={product.productName}
                />

                <div className="home-product-card-overlay">
                    <span>
                        VIEW PRODUCT
                    </span>

                    <strong>
                        →
                    </strong>
                </div>

                {product.isNew && (
                    <span className="home-product-card-badge">
                        NEW
                    </span>
                )}
            </Link>

            {/* INFO */}

            <div className="home-product-card-content">
                <div className="home-product-card-top">
                    <span className="home-product-category">
                        {product.category}
                    </span>

                    <span className="home-product-views">
                        {product.productViews.toLocaleString()} views
                    </span>
                </div>

                <Link
                    to={`/product/${product._id}`}
                    className="home-product-name"
                >
                    {product.productName}
                </Link>

                <strong className="home-product-price">
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
    );
};

export default ProductCard;