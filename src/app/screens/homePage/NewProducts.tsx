import { useMemo } from "react";
import { Link } from "react-router";

import ProductCard from "./ProductCard";
import NewProductFeature from "./NewProductFeature";

import {
    newProductsData,
    type HomeProduct,
} from "./homepage.data";

const NEW_PRODUCTS_LIMIT = 4;

const NewProducts = () => {
    /*
     * Hozir:
     * local mock data.
     *
     * Keyinchalik:
     *
     * const newProducts = useSelector(
     *   selectNewProducts
     * );
     *
     * yoki backend:
     *
     * ProductService.getProducts({
     *   order: "createdAt",
     *   limit: 4,
     * });
     */

    const newProducts =
        useMemo<HomeProduct[]>(() => {
            return newProductsData.slice(
                0,
                NEW_PRODUCTS_LIMIT
            );
        }, []);

    const featuredProduct =
        newProducts[0];

    const remainingProducts =
        newProducts.slice(1);

    if (!featuredProduct) {
        return null;
    }

    return (
        <section className="home-new-products">
            <div className="home-section-container">
                {/* =========================
            HEADER
        ========================= */}

                <div className="home-new-heading">
                    <div>
                        <span className="home-section-eyebrow">
                            JUST ARRIVED
                        </span>

                        <h2>
                            NEW
                            <br />
                            PRODUCTS
                        </h2>
                    </div>

                    <div className="home-new-heading-info">
                        <p>
                            Fresh forms, thoughtful materials
                            and understated details. Meet the
                            newest additions to our furniture
                            collection.
                        </p>

                        <Link
                            to="/shop"
                            className="home-section-link"
                        >
                            DISCOVER NEW ARRIVALS

                            <span>→</span>
                        </Link>
                    </div>
                </div>

                {/* =========================
            PRODUCTS
        ========================= */}

                <div className="home-new-layout">
                    {/* LARGE FEATURE */}

                    <NewProductFeature
                        product={featuredProduct}
                    />

                    {/* SMALL PRODUCTS */}

                    <div className="home-new-grid">
                        {remainingProducts.map(
                            (product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewProducts;