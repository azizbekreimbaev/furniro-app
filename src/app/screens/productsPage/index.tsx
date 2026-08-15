import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Pagination from "@mui/material/Pagination";

import "../../css/product.css";
import heroImage from "../../../../public/images/banner.png";


interface Product {
    _id: string;
    productName: string;
    productPrice: number;
    productViews: number;
    category: string;
    brand: string;
    color: string;
    image: string;
}

const products: Product[] = [
    {
        _id: "1",
        productName: "Modern Black Wood Chair",
        productPrice: 2688.15,
        productViews: 4200,
        category: "Chair",
        brand: "Furnitur",
        color: "Black",
        image:
            "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=700&q=80",
    },
    {
        _id: "2",
        productName: "Modern White Pendant Light",
        productPrice: 1595.6,
        productViews: 3800,
        category: "Lighting",
        brand: "Furnitur",
        color: "White",
        image:
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=700&q=80",
    },
    {
        _id: "3",
        productName: "Metro Fusion Table",
        productPrice: 2238,
        productViews: 3200,
        category: "Table",
        brand: "Nordic",
        color: "Black",
        image:
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=700&q=80",
    },
    {
        _id: "4",
        productName: "Classic Wall Clock",
        productPrice: 521.4,
        productViews: 2500,
        category: "Decor",
        brand: "Classic",
        color: "White",
        image:
            "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=700&q=80",
    },
    {
        _id: "5",
        productName: "Minimal Flower Vase",
        productPrice: 630.5,
        productViews: 1800,
        category: "Decor",
        brand: "Nordic",
        color: "Blue",
        image:
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80",
    },
    {
        _id: "6",
        productName: "Modern Wooden Stool",
        productPrice: 1450,
        productViews: 2200,
        category: "Chair",
        brand: "Classic",
        color: "Brown",
        image:
            "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=700&q=80",
    },
    {
        _id: "7",
        productName: "Modern Black Hanging Light",
        productPrice: 1150,
        productViews: 4900,
        category: "Lighting",
        brand: "Furnitur",
        color: "Black",
        image:
            "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=700&q=80",
    },
    {
        _id: "8",
        productName: "Luxury Dining Chair",
        productPrice: 2990,
        productViews: 3500,
        category: "Chair",
        brand: "Nordic",
        color: "Black",
        image:
            "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=700&q=80",
    },
    {
        _id: "9",
        productName: "Premium Desk Table",
        productPrice: 3650,
        productViews: 3100,
        category: "Table",
        brand: "Furnitur",
        color: "Brown",
        image:
            "https://images.unsplash.com/photo-1532372320572-cda25653a694?auto=format&fit=crop&w=700&q=80",
    },
];

const ProductsPage = () => {
    const [category, setCategory] = useState<string>("All");
    const [brand, setBrand] = useState<string>("All");
    const [sort, setSort] = useState<string>("default");
    const [maxPrice, setMaxPrice] = useState<number>(5000);
    const [page, setPage] = useState<number>(1);

    const [searchParams] = useSearchParams();

    const searchQuery =
        searchParams.get("search")?.trim().toLowerCase() || "";


    const productsPerPage = 6;

    const filteredProducts = useMemo(() => {
        let result = [...products];

        /* SEARCH */

        if (searchQuery) {
            result = result.filter((product) => {
                const name = product.productName.toLowerCase();
                const category = product.category.toLowerCase();
                const brand = product.brand.toLowerCase();

                return (
                    name.includes(searchQuery) ||
                    category.includes(searchQuery) ||
                    brand.includes(searchQuery)
                );
            });
        }

        /* CATEGORY */

        if (category !== "All") {
            result = result.filter(
                (product) => product.category === category
            );
        }

        /* BRAND */

        if (brand !== "All") {
            result = result.filter(
                (product) => product.brand === brand
            );
        }

        /* PRICE */

        result = result.filter(
            (product) => product.productPrice <= maxPrice
        );

        /* SORT */

        if (sort === "price-low") {
            result.sort(
                (a, b) => a.productPrice - b.productPrice
            );
        }

        if (sort === "price-high") {
            result.sort(
                (a, b) => b.productPrice - a.productPrice
            );
        }

        if (sort === "views") {
            result.sort(
                (a, b) => b.productViews - a.productViews
            );
        }

        return result;
    }, [
        searchQuery,
        category,
        brand,
        sort,
        maxPrice,
    ]);

    const pageCount = Math.max(
        1,
        Math.ceil(filteredProducts.length / productsPerPage)
    );

    const startIndex = (page - 1) * productsPerPage;

    const visibleProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );

    const handleCategory = (value: string) => {
        setCategory(value);
        setPage(1);
    };

    const handleBrand = (value: string) => {
        setBrand(value);
        setPage(1);
    };

    const handleReset = () => {
        setCategory("All");
        setBrand("All");
        setSort("default");
        setMaxPrice(5000);
        setPage(1);
    };

    return (
        <main className="products-page">
            {/* HERO */}

            <section
                className="shop-hero"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="shop-container">
                    <div className="shop-hero-content">
                        <span>WELCOME TO OUR</span>

                        <h1>
                            FURNITURE
                            <br />
                            GALLERY
                        </h1>

                        <p>
                            Discover our carefully selected furniture
                            collection.
                        </p>
                    </div>
                </div>
            </section>

            {/* SHOP */}

            <section className="shop-section">
                <div className="shop-container">
                    <div className="shop-layout">

                        {/* ======================
                FILTER SIDEBAR
            ====================== */}

                        <aside className="shop-sidebar">
                            <div className="filter-block">
                                <h3>CATEGORY</h3>

                                {["All", "Chair", "Lighting", "Table", "Decor"].map(
                                    (item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            className={
                                                category === item
                                                    ? "filter-option active"
                                                    : "filter-option"
                                            }
                                            onClick={() => handleCategory(item)}
                                        >
                                            <span>{item}</span>
                                        </button>
                                    )
                                )}
                            </div>

                            <div className="filter-block">
                                <h3>BRANDS</h3>

                                {["All", "Furnitur", "Nordic", "Classic"].map(
                                    (item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            className={
                                                brand === item
                                                    ? "filter-option active"
                                                    : "filter-option"
                                            }
                                            onClick={() => handleBrand(item)}
                                        >
                                            <span>{item}</span>
                                        </button>
                                    )
                                )}
                            </div>

                            <div className="filter-block">
                                <h3>SHOP BY PRICE</h3>

                                <div className="price-range-label">
                                    <span>$0</span>
                                    <span>${maxPrice}</span>
                                </div>

                                <input
                                    type="range"
                                    min="500"
                                    max="5000"
                                    step="100"
                                    value={maxPrice}
                                    onChange={(event) => {
                                        setMaxPrice(Number(event.target.value));
                                        setPage(1);
                                    }}
                                />

                                <div className="filter-price-value">
                                    Price: $0 - ${maxPrice}
                                </div>
                            </div>

                            <div className="filter-block">
                                <h3>COLOR</h3>

                                <div className="color-options">
                                    <span className="color-black" />
                                    <span className="color-brown" />
                                    <span className="color-gray" />
                                    <span className="color-blue" />
                                </div>
                            </div>

                            <button
                                type="button"
                                className="filter-reset"
                                onClick={handleReset}
                            >
                                RESET FILTER
                            </button>
                        </aside>

                        {/* ======================
                PRODUCTS
            ====================== */}

                        <div className="shop-content">
                            <div className="shop-toolbar">
                                <div>
                                    <span className="shop-result-title">
                                        {searchQuery
                                            ? `RESULT FOR "${searchQuery.toUpperCase()}"`
                                            : 'RESULT FOR "FURNITURE"'}
                                    </span>

                                    <p>
                                        Showing {visibleProducts.length} of{" "}
                                        {filteredProducts.length} products
                                    </p>
                                </div>

                                <div className="shop-sort">
                                    <label htmlFor="sort">
                                        SORT BY
                                    </label>

                                    <select
                                        id="sort"
                                        value={sort}
                                        onChange={(event) => {
                                            setSort(event.target.value);
                                            setPage(1);
                                        }}
                                    >
                                        <option value="default">
                                            Default sorting
                                        </option>

                                        <option value="views">
                                            Most viewed
                                        </option>

                                        <option value="price-low">
                                            Price: low to high
                                        </option>

                                        <option value="price-high">
                                            Price: high to low
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* PRODUCTS GRID */}

                            {visibleProducts.length > 0 ? (
                                <div className="shop-products-grid">
                                    {visibleProducts.map((product) => (
                                        <article
                                            className="shop-product-card"
                                            key={product._id}
                                        >
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="shop-product-image"
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.productName}
                                                />

                                                <div className="shop-product-hover">
                                                    VIEW PRODUCT
                                                </div>
                                            </Link>

                                            <div className="shop-product-info">
                                                <span>
                                                    {product.category}
                                                </span>

                                                <Link
                                                    to={`/product/${product._id}`}
                                                    className="shop-product-name"
                                                >
                                                    {product.productName}
                                                </Link>

                                                <div className="shop-product-rating">
                                                    ★★★★★
                                                </div>

                                                <strong>
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
                                    ))}
                                </div>
                            ) : (
                                <div className="shop-empty">
                                    <h3>No products found</h3>

                                    <p>
                                        Try changing your filters.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleReset}
                                    >
                                        RESET FILTER
                                    </button>
                                </div>
                            )}

                            {/* PAGINATION */}

                            {filteredProducts.length > 0 && (
                                <div className="shop-pagination">
                                    <Pagination
                                        count={pageCount}
                                        page={page}
                                        onChange={(_, value) => {
                                            setPage(value);

                                            window.scrollTo({
                                                top: 450,
                                                behavior: "smooth",
                                            });
                                        }}
                                        shape="rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROMO */}

            <section className="shop-promo-section">
                <div className="shop-container">
                    <div className="shop-promo">
                        <div>
                            <span>
                                SPECIAL COLLECTION
                            </span>

                            <h2>
                                MODERN BRONZE
                                <br />
                                HANGING LIGHT
                            </h2>

                            <strong>
                                $2352.41
                            </strong>
                        </div>

                        <div className="shop-promo-circle">
                            LIGHT
                        </div>
                    </div>
                </div>
            </section>

            {/* GET IN TOUCH */}

            <section className="shop-contact-section">
                <div className="shop-container">
                    <div className="shop-contact">
                        <div className="shop-contact-image">
                            <img
                                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80"
                                alt="Furniture sofa"
                            />
                        </div>

                        <div className="shop-contact-info">
                            <span>
                                HAVE A QUESTION?
                            </span>

                            <h2>
                                GET IN TOUCH
                            </h2>

                            <p>
                                Our team is ready to help you choose the right
                                furniture for your home.
                            </p>

                            <Link to="/about#contact">
                                CONTACT US
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductsPage;