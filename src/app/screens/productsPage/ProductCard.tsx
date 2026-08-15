import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router";

import type {
    ShopProduct,
} from "./shop.data";

interface ProductCardProps {
    product: ShopProduct;

    onAddToCart?: (
        product: ShopProduct
    ) => void;
}

const ProductCard = ({
    product,
    onAddToCart,
}: ProductCardProps) => {
    const [isAdded, setIsAdded] =
        useState(false);

    useEffect(() => {
        if (!isAdded) {
            return;
        }

        const timeoutId =
            window.setTimeout(() => {
                setIsAdded(false);
            }, 1600);

        return () => {
            window.clearTimeout(
                timeoutId
            );
        };
    }, [isAdded]);

    const handleAddToCart = () => {
        onAddToCart?.(product);

        setIsAdded(true);
    };

    return (
        <article className="shop-product-card">
            {/* =========================
                IMAGE
            ========================= */}

            <div className="shop-product-image-wrapper">
                <Link
                    to={`/product/${product._id}`}
                    className="shop-product-image"
                    aria-label={
                        product.productName
                    }
                >
                    <img
                        src={
                            product.productImage
                        }
                        alt={
                            product.productName
                        }
                        loading="lazy"
                    />

                    <div className="shop-product-image-overlay" />

                    <span className="shop-product-view">
                        VIEW PRODUCT
                        <i>↗</i>
                    </span>
                </Link>

                {/* BADGES */}

                <div className="shop-product-badges">
                    {product.isNew && (
                        <span className="shop-product-new">
                            NEW
                        </span>
                    )}

                    <span className="shop-product-views">
                        {
                            product.productViews
                        }{" "}
                        VIEWS
                    </span>
                </div>
            </div>

            {/* =========================
                INFORMATION
            ========================= */}

            <div className="shop-product-content">
                <div className="shop-product-meta">
                    <span>
                        {
                            product.productCategory
                        }
                    </span>

                    <span>
                        FURNIRO
                    </span>
                </div>

                <Link
                    to={`/product/${product._id}`}
                    className="shop-product-name"
                >
                    {
                        product.productName
                    }
                </Link>

                <p className="shop-product-description">
                    {
                        product.productDescription
                    }
                </p>

                <div className="shop-product-bottom">
                    <strong className="shop-product-price">
                        $
                        {product.productPrice.toLocaleString(
                            "en-US"
                        )}
                    </strong>

                    <button
                        type="button"
                        className={`shop-add-cart ${isAdded
                                ? "added"
                                : ""
                            }`}
                        onClick={
                            handleAddToCart
                        }
                        disabled={isAdded}
                    >
                        {isAdded ? (
                            <>
                                ADDED
                                <span>✓</span>
                            </>
                        ) : (
                            <>
                                ADD TO CART
                                <span>+</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;