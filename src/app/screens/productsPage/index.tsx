import {
    useMemo,
    useState,
} from "react";

import {
    useLocation,
    useNavigate,
} from "react-router";

import ShopHero from "./ShopHero";
import ProductToolbar from "./ProductToolbar";
import ProductGrid from "./ProductGrid";

import {
    shopProducts,
    type ShopProduct,
} from "./shop.data";

import "../../css/product.css";

const categories = [
    "All",
    "Sofas",
    "Chairs",
    "Tables",
    "Lighting",
];

const ProductsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] =
        useState("All");

    const [sortBy, setSortBy] =
        useState("popular");

    /* =========================================
       HEADER SEARCH
    ========================================= */

    const searchText =
        useMemo(() => {
            const params =
                new URLSearchParams(
                    location.search
                );

            return (
                params
                    .get("search")
                    ?.trim()
                    .toLowerCase() ?? ""
            );
        }, [location.search]);

    /* =========================================
       FILTER + SORT
    ========================================= */

    const filteredProducts =
        useMemo(() => {
            let result = [
                ...shopProducts,
            ];

            if (
                activeCategory !==
                "All"
            ) {
                result = result.filter(
                    (product) =>
                        product.productCategory ===
                        activeCategory
                );
            }

            if (searchText) {
                result = result.filter(
                    (product) => {
                        const searchable =
                            `${product.productName}
                             ${product.productCategory}
                             ${product.productDescription}`
                                .toLowerCase();

                        return searchable.includes(
                            searchText
                        );
                    }
                );
            }

            switch (sortBy) {
                case "price-low":
                    result.sort(
                        (a, b) =>
                            a.productPrice -
                            b.productPrice
                    );
                    break;

                case "price-high":
                    result.sort(
                        (a, b) =>
                            b.productPrice -
                            a.productPrice
                    );
                    break;

                case "newest":
                    result.sort(
                        (a, b) =>
                            Number(
                                Boolean(
                                    b.isNew
                                )
                            ) -
                            Number(
                                Boolean(
                                    a.isNew
                                )
                            )
                    );
                    break;

                case "popular":
                default:
                    result.sort(
                        (a, b) =>
                            b.productViews -
                            a.productViews
                    );
            }

            return result;
        }, [
            activeCategory,
            searchText,
            sortBy,
        ]);

    /* =========================================
       CATEGORY
    ========================================= */

    const handleCategoryChange = (
        category: string
    ) => {
        setActiveCategory(
            category
        );
    };

    /* =========================================
       ADD TO CART
    ========================================= */

    const handleAddToCart = (
        product: ShopProduct
    ) => {
        /*
         * Keyinchalik:
         *
         * addToBasket(product)
         *
         * yoki:
         *
         * dispatch(
         *   basketActions.addProduct(product)
         * )
         */

        console.log(
            "ADD TO CART:",
            product
        );
    };

    /* =========================================
       CLEAR SEARCH
    ========================================= */

    const handleClearSearch = () => {
        navigate("/shop");
    };

    return (
        <main className="shop-page">
            <ShopHero />

            <section className="shop-products-section">
                <div className="shop-container">
                    {searchText && (
                        <div className="shop-search-status">
                            <div>
                                <span>
                                    RESULT FOR
                                </span>

                                <p>
                                    “
                                    <strong>
                                        {searchText}
                                    </strong>
                                    ”
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    handleClearSearch
                                }
                            >
                                CLEAR
                                <span>×</span>
                            </button>
                        </div>
                    )}

                    <div className="shop-catalog-layout">
                        {/* =========================
                LEFT SIDEBAR
            ========================= */}

                        <ProductToolbar
                            categories={categories}
                            activeCategory={
                                activeCategory
                            }
                            totalProducts={
                                filteredProducts.length
                            }
                            sortBy={sortBy}
                            onCategoryChange={
                                handleCategoryChange
                            }
                            onSortChange={
                                setSortBy
                            }
                        />

                        {/* =========================
                RIGHT PRODUCTS
            ========================= */}

                        <div className="shop-catalog-products">
                            <div className="shop-result-header">
                                <div>
                                    <span>
                                        COLLECTION
                                    </span>

                                    <h2>
                                        {activeCategory ===
                                            "All"
                                            ? "ALL PRODUCTS"
                                            : activeCategory.toUpperCase()}
                                    </h2>
                                </div>

                                <p>
                                    SHOWED{" "}
                                    <strong>
                                        {
                                            filteredProducts.length
                                        }
                                    </strong>{" "}
                                    PRODUCTS
                                </p>
                            </div>

                            <ProductGrid
                                products={
                                    filteredProducts
                                }
                                onAddToCart={
                                    handleAddToCart
                                }
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductsPage;