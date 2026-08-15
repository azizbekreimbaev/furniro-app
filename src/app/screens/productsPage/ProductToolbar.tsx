import { useState } from "react";

interface ProductToolbarProps {
    categories: string[];
    activeCategory: string;
    totalProducts: number;
    sortBy: string;

    onCategoryChange: (
        category: string
    ) => void;

    onSortChange: (
        value: string
    ) => void;
}

const materials = [
    {
        name: "Bronze",
        count: 8,
    },
    {
        name: "Oak wood",
        count: 12,
    },
    {
        name: "Stainless metal",
        count: 36,
    },
    {
        name: "Titanium",
        count: 4,
    },
    {
        name: "Alloy",
        count: 8,
    },
    {
        name: "Ceramic",
        count: 17,
    },
];

const sizes = [
    {
        name: "S",
        count: 8,
    },
    {
        name: "M",
        count: 12,
    },
    {
        name: "L",
        count: 34,
    },
];

const ProductToolbar = ({
    categories,
    activeCategory,
    totalProducts,
    sortBy,
    onCategoryChange,
    onSortChange,
}: ProductToolbarProps) => {
    const [categoryOpen, setCategoryOpen] =
        useState(true);

    const [materialsOpen, setMaterialsOpen] =
        useState(true);

    const [priceOpen, setPriceOpen] =
        useState(true);


    const [shippingOpen, setShippingOpen] =
        useState(false);

    const [allProductOpen, setAllProductOpen] =
        useState(false);

    const [selectedMaterial, setSelectedMaterial] =
        useState("");

    const [maxPrice, setMaxPrice] =
        useState(2000);

    const productCategories =
        categories.filter(
            (category) =>
                category !== "All"
        );

    return (
        <aside className="shop-sidebar">
            {/* =================================
                CATEGORY
            ================================= */}

            <div className="shop-sidebar-heading">
                <h2>
                    CATEGORY
                </h2>

                <span />
            </div>

            <div className="shop-filter-block">
                <button
                    type="button"
                    className="shop-filter-title"
                    onClick={() =>
                        setCategoryOpen(
                            (prev) => !prev
                        )
                    }
                >
                    <span>
                        FURNITURE
                    </span>

                    <strong>
                        {categoryOpen
                            ? "−"
                            : "+"}
                    </strong>
                </button>

                {categoryOpen && (
                    <div className="shop-filter-list">
                        <button
                            type="button"
                            className={
                                activeCategory ===
                                    "All"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                onCategoryChange(
                                    "All"
                                )
                            }
                        >
                            All
                        </button>

                        {productCategories.map(
                            (category) => (
                                <button
                                    type="button"
                                    key={category}
                                    className={
                                        activeCategory ===
                                            category
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        onCategoryChange(
                                            category
                                        )
                                    }
                                >
                                    {category}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>

            {/* =================================
                SHIPPING
            ================================= */}

            <div className="shop-filter-block">
                <button
                    type="button"
                    className="shop-filter-title"
                    onClick={() =>
                        setShippingOpen(
                            (prev) => !prev
                        )
                    }
                >
                    <span>
                        SHIPPING
                    </span>

                    <strong>
                        {shippingOpen
                            ? "−"
                            : "+"}
                    </strong>
                </button>

                {shippingOpen && (
                    <div className="shop-filter-list">
                        <button type="button">
                            Free shipping
                        </button>

                        <button type="button">
                            Standard delivery
                        </button>
                    </div>
                )}
            </div>

            {/* =================================
                ALL PRODUCT
            ================================= */}

            <div className="shop-filter-block">
                <button
                    type="button"
                    className="shop-filter-title"
                    onClick={() =>
                        setAllProductOpen(
                            (prev) => !prev
                        )
                    }
                >
                    <span>
                        ALL PRODUCT
                    </span>

                    <strong>
                        {allProductOpen
                            ? "−"
                            : "+"}
                    </strong>
                </button>

                {allProductOpen && (
                    <div className="shop-filter-list">
                        <button
                            type="button"
                            onClick={() =>
                                onCategoryChange(
                                    "All"
                                )
                            }
                        >
                            View all products
                        </button>
                    </div>
                )}
            </div>

            {/* =================================
                SHOP BY
            ================================= */}

            <div className="shop-sidebar-heading shop-by-heading">
                <h2>
                    SHOP BY
                </h2>

                <span />
            </div>

            {/* =================================
                MATERIALS
            ================================= */}

            <div className="shop-filter-block">
                <button
                    type="button"
                    className="shop-filter-title"
                    onClick={() =>
                        setMaterialsOpen(
                            (prev) => !prev
                        )
                    }
                >
                    <span>
                        MATERIALS
                    </span>

                    <strong>
                        {materialsOpen
                            ? "−"
                            : "+"}
                    </strong>
                </button>

                {materialsOpen && (
                    <div className="shop-material-list">
                        {materials.map(
                            (material) => (
                                <button
                                    type="button"
                                    key={
                                        material.name
                                    }
                                    className={
                                        selectedMaterial ===
                                            material.name
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setSelectedMaterial(
                                            (
                                                current
                                            ) =>
                                                current ===
                                                    material.name
                                                    ? ""
                                                    : material.name
                                        )
                                    }
                                >
                                    <span>
                                        {
                                            material.name
                                        }
                                    </span>

                                    <small>
                                        (
                                        {String(
                                            material.count
                                        ).padStart(
                                            2,
                                            "0"
                                        )}
                                        )
                                    </small>
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>

            {/* =================================
                PRICE
            ================================= */}

            <div className="shop-filter-block">
                <button
                    type="button"
                    className="shop-filter-title"
                    onClick={() =>
                        setPriceOpen(
                            (prev) => !prev
                        )
                    }
                >
                    <span>
                        PRICE
                    </span>

                    <strong>
                        {priceOpen
                            ? "−"
                            : "+"}
                    </strong>
                </button>

                {priceOpen && (
                    <div className="shop-price-filter">
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={maxPrice}
                            onChange={(event) =>
                                setMaxPrice(
                                    Number(
                                        event
                                            .target
                                            .value
                                    )
                                )
                            }
                        />

                        <div className="shop-price-actions">
                            <div className="shop-price-value">
                                $0 - $
                                {maxPrice.toLocaleString()}
                            </div>

                            <button
                                type="button"
                                className="shop-price-apply"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* =================================
                SORT BY
            ================================= */}

            <div className="shop-filter-block">
                <div className="shop-filter-title static">
                    <span>
                        SORT BY
                    </span>
                </div>

                <select
                    className="shop-sidebar-sort"
                    value={sortBy}
                    onChange={(event) =>
                        onSortChange(
                            event.target.value
                        )
                    }
                >
                    <option value="popular">
                        Most Popular
                    </option>

                    <option value="price-low">
                        Price: Low to High
                    </option>

                    <option value="price-high">
                        Price: High to Low
                    </option>

                    <option value="newest">
                        New Arrivals
                    </option>
                </select>
            </div>



            {/* =================================
                RESULT INFO
            ================================= */}

            <div className="shop-sidebar-result">
                <span>
                    PRODUCTS FOUND
                </span>

                <strong>
                    {String(
                        totalProducts
                    ).padStart(2, "0")}
                </strong>
            </div>
        </aside>
    );
};

export default ProductToolbar;