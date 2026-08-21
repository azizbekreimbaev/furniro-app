import { Link } from "react-router";

import React from 'react'
import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { selectTrendingProducts, setTrendingProducts } from './homepageSlice'


import ProductCard from "./ProductCard";
import { useAppSelector } from "../../hook";


const TrendingProducts = () => {

    const trendingProducts = useAppSelector(selectTrendingProducts)

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