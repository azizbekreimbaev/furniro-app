import { useMemo } from "react";
import { Link } from "react-router";

import ProductCard from "./ProductCard";

import {
    trendingProductsData,
    type HomeProduct,
} from "./homepage.data";

const TRENDING_LIMIT = 4;

const TrendingProducts = () => {
    /*
     * Hozir local mock data.
     *
     * Keyinchalik:
     *
     * const products = useSelector(
     *   selectTrendingProducts
     * );
     *
     * yoki:
     *
     * const { products } = useProducts();
     */

    const trendingProducts =
        useMemo<HomeProduct[]>(() => {
            return [...trendingProductsData]
                .sort(
                    (a, b) =>
                        b.productViews -
                        a.productViews
                )
                .slice(
                    0,
                    TRENDING_LIMIT
                );
        }, []);

    return (
        <section className="home-trending">
            <div className="home-section-container">
                {/* HEADER */}

                <div className="home-section-heading">
                    <div className="home-section-heading-left">
                        <span className="home-section-eyebrow">
                            CURATED FOR YOU
                        </span>

                        <h2>
                            TRENDING
                            <br />
                            PRODUCTS
                        </h2>
                    </div>

                    <div className="home-section-heading-right">
                        <p>
                            Discover our most viewed pieces,
                            selected by customers who appreciate
                            thoughtful design, timeless materials
                            and comfortable living.
                        </p>

                        <Link
                            to="/shop"
                            className="home-section-link"
                        >
                            VIEW ALL PRODUCTS

                            <span>
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* PRODUCTS */}

                <div className="home-trending-grid">
                    {trendingProducts.map(
                        (product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;