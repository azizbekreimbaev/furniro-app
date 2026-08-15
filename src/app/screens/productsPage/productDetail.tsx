import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import "../../css/product.css";
import heroImage from "../../../../public/images/banner.png";

interface Product {
    _id: string;
    productName: string;
    productPrice: number;
    productViews: number;
    productDescription: string;
    productCategory: string;
    productSku: string;
    image: string;
    images: string[];
    sizes: string[];
    colors: string[];
}

const products: Product[] = [
    {
        _id: "1",
        productName: "Modern Black Wood Chair",
        productPrice: 2688.15,
        productViews: 4200,
        productDescription:
            "A modern furniture piece created for stylish and comfortable interiors. Designed with quality materials and a minimalist appearance.",
        productCategory: "Chair",
        productSku: "CH001",
        image: heroImage,
        images: [
            heroImage,
            heroImage,
            heroImage,
            heroImage,
        ],
        sizes: ["S", "M", "L"],
        colors: [
            "#111111",
            "#7d624e",
            "#818181",
        ],
    },
    {
        _id: "2",
        productName: "Modern White Pendant Light",
        productPrice: 1595.6,
        productViews: 3800,
        productDescription:
            "Minimal pendant lighting designed for contemporary interiors with elegant proportions and a clean modern appearance.",
        productCategory: "Lighting",
        productSku: "LG002",
        image: heroImage,
        images: [
            heroImage,
            heroImage,
            heroImage,
        ],
        sizes: ["S", "M", "L"],
        colors: [
            "#ffffff",
            "#111111",
            "#aaaaaa",
        ],
    },
    {
        _id: "3",
        productName: "Metro Fusion Table",
        productPrice: 2238,
        productViews: 3200,
        productDescription:
            "A contemporary table with a strong modern structure, created for everyday living and elegant home interiors.",
        productCategory: "Table",
        productSku: "TB003",
        image: heroImage,
        images: [
            heroImage,
            heroImage,
            heroImage,
        ],
        sizes: ["M", "L", "XL"],
        colors: [
            "#111111",
            "#7a593c",
        ],
    },
];

const ProductDetail = () => {
    const { productId } = useParams();

    const product = useMemo(() => {
        return products.find(
            (item) => item._id === productId
        );
    }, [productId]);

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] =
        useState(0);

    const [selectedSize, setSelectedSize] =
        useState("");

    const [selectedColor, setSelectedColor] =
        useState("");

    if (!product) {
        return (
            <main className="product-detail-page">
                <div className="product-detail-container">
                    <div className="product-not-found">
                        <h1>Product not found</h1>

                        <Link to="/shop">
                            BACK TO SHOP
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const activeSize =
        selectedSize || product.sizes[0];

    const activeColor =
        selectedColor || product.colors[0];

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity((prev) =>
            prev > 1 ? prev - 1 : 1
        );
    };

    const handleAddToCart = () => {
        /*
          BasketContext keyinchalik shu yerga ulanadi.
    
          Hozircha product tanlanganini ko'ramiz.
        */

        console.log({
            productId: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            quantity,
            size: activeSize,
            color: activeColor,
        });
    };

    return (
        <main className="product-detail-page">
            {/* BREADCRUMB */}

            <section className="product-breadcrumb">
                <div className="product-detail-container">
                    <div className="product-breadcrumb-content">
                        <Link to="/">
                            Home
                        </Link>

                        <span>›</span>

                        <Link to="/shop">
                            Shop
                        </Link>

                        <span>›</span>

                        <i />

                        <strong>
                            {product.productName}
                        </strong>
                    </div>
                </div>
            </section>

            {/* PRODUCT */}

            <section className="product-detail-main">
                <div className="product-detail-container">
                    <div className="product-detail-grid">
                        {/* LEFT GALLERY */}

                        <div className="product-gallery">
                            <div className="product-thumbnails">
                                {product.images.map(
                                    (image, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={
                                                selectedImage === index
                                                    ? "product-thumbnail active"
                                                    : "product-thumbnail"
                                            }
                                            onClick={() =>
                                                setSelectedImage(index)
                                            }
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.productName} ${index + 1}`}
                                            />
                                        </button>
                                    )
                                )}
                            </div>

                            <div className="product-main-image">
                                <img
                                    src={
                                        product.images[
                                        selectedImage
                                        ]
                                    }
                                    alt={product.productName}
                                />
                            </div>
                        </div>

                        {/* RIGHT INFORMATION */}

                        <div className="product-detail-info">
                            <span className="product-detail-category">
                                {product.productCategory}
                            </span>

                            <h1>
                                {product.productName}
                            </h1>

                            <div className="product-detail-price">
                                $
                                {product.productPrice.toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                )}
                            </div>

                            <div className="product-detail-rating">
                                <span className="product-detail-stars">
                                    ★★★★★
                                </span>

                                <i />

                                <span>
                                    {product.productViews.toLocaleString()}{" "}
                                    views
                                </span>
                            </div>

                            <p className="product-detail-description">
                                {product.productDescription}
                            </p>

                            {/* SIZE */}

                            <div className="product-option-section">
                                <span className="product-option-label">
                                    Size
                                </span>

                                <div className="product-size-options">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            className={
                                                activeSize === size
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setSelectedSize(size)
                                            }
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* COLOR */}

                            <div className="product-option-section">
                                <span className="product-option-label">
                                    Color
                                </span>

                                <div className="product-color-options">
                                    {product.colors.map(
                                        (color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                className={
                                                    activeColor === color
                                                        ? "active"
                                                        : ""
                                                }
                                                style={{
                                                    backgroundColor:
                                                        color,
                                                }}
                                                onClick={() =>
                                                    setSelectedColor(
                                                        color
                                                    )
                                                }
                                                aria-label={`Select ${color}`}
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            {/* ACTIONS */}

                            <div className="product-detail-actions">
                                <div className="product-detail-quantity">
                                    <button
                                        type="button"
                                        onClick={handleDecrease}
                                    >
                                        −
                                    </button>

                                    <span>
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={handleIncrease}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="product-add-cart"
                                    onClick={handleAddToCart}
                                >
                                    ADD TO CART
                                </button>

                            </div>

                            {/* META */}

                            <div className="product-detail-meta">
                                <div>
                                    <span>SKU</span>
                                    <i>:</i>

                                    <strong>
                                        {product.productSku}
                                    </strong>
                                </div>

                                <div>
                                    <span>Category</span>
                                    <i>:</i>

                                    <strong>
                                        {product.productCategory}
                                    </strong>
                                </div>

                                <div>
                                    <span>Views</span>
                                    <i>:</i>

                                    <strong>
                                        {product.productViews.toLocaleString()}
                                    </strong>
                                </div>

                                <div>
                                    <span>Tags</span>
                                    <i>:</i>

                                    <strong>
                                        Furniture, Interior, Home
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* RELATED */}

            <section className="product-related-section">
                <div className="product-detail-container">
                    <div className="product-related-title">
                        <span>
                            YOU MAY ALSO LIKE
                        </span>

                        <h2>
                            RELATED PRODUCTS
                        </h2>
                    </div>

                    <div className="product-related-grid">
                        {products
                            .filter(
                                (item) =>
                                    item._id !== product._id
                            )
                            .slice(0, 3)
                            .map((item) => (
                                <article
                                    className="product-related-card"
                                    key={item._id}
                                >
                                    <Link
                                        to={`/product/${item._id}`}
                                        className="product-related-image"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                        />
                                    </Link>

                                    <span>
                                        {item.productCategory}
                                    </span>

                                    <Link
                                        to={`/product/${item._id}`}
                                    >
                                        {item.productName}
                                    </Link>

                                    <strong>
                                        $
                                        {item.productPrice.toLocaleString(
                                            "en-US",
                                            {
                                                minimumFractionDigits:
                                                    2,
                                                maximumFractionDigits:
                                                    2,
                                            }
                                        )}
                                    </strong>
                                </article>
                            ))}
                    </div>

                    <div className="product-related-action">
                        <Link to="/shop">
                            VIEW MORE PRODUCTS
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductDetail;