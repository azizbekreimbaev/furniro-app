import {
    useState,
} from "react";

import {
    ProductCategory,
    ProductMaterial,
} from "../../../libs/enums/product.enum";


type CategoryOption =
    ProductCategory | "All";


interface ProductToolbarProps {
    categories:
    CategoryOption[];

    activeCategory:
    CategoryOption;

    totalProducts:
    number;

    sortBy:
    string;

    onCategoryChange: (
        category: CategoryOption
    ) => void;

    onMaterialChange: (
        material:
            ProductMaterial |
            undefined
    ) => void;

    onPriceChange: (
        maxPrice: number
    ) => void;

    onSortChange: (
        value: string
    ) => void;
}


/* =========================================
   MATERIALS
========================================= */

const materials = [
    {
        name: "FABRIC",
        value:
            ProductMaterial.FABRIC,
    },

    {
        name: "GLASS",
        value:
            ProductMaterial.GLASS,
    },

    {
        name: "LEATHER",
        value:
            ProductMaterial.LEATHER,
    },

    {
        name: "METAL",
        value:
            ProductMaterial.METAL,
    },

    {
        name: "PLASTIC",
        value:
            ProductMaterial.PLASTIC,
    },

    {
        name: "RATTAN",
        value:
            ProductMaterial.RATTAN,
    },

    {
        name: "STONE",
        value:
            ProductMaterial.STONE,
    },

    {
        name: "WOOD",
        value:
            ProductMaterial.WOOD,
    },
];


const ProductToolbar = ({
    categories,
    activeCategory,
    totalProducts,
    sortBy,
    onCategoryChange,
    onMaterialChange,
    onSortChange,
}: ProductToolbarProps) => {


    /* =========================================
       OPEN / CLOSE
    ========================================= */

    const [
        categoryOpen,
        setCategoryOpen,
    ] =
        useState(true);


    const [
        materialsOpen,
        setMaterialsOpen,
    ] =
        useState(true);





    /* =========================================
       MATERIAL STATE
    ========================================= */

    const [
        selectedMaterial,
        setSelectedMaterial,
    ] =
        useState<
            ProductMaterial |
            undefined
        >(
            undefined
        );


    /* =========================================
       PRICE STATE
    ========================================= */



    /* =========================================
       CATEGORY LIST
    ========================================= */

    const productCategories =
        categories.filter(
            (category) =>
                category !==
                "All"
        );


    /* =========================================
       MATERIAL HANDLER
    ========================================= */

    const handleMaterialClick = (
        material:
            ProductMaterial
    ) => {

        const newMaterial =
            selectedMaterial ===
                material
                ? undefined
                : material;


        setSelectedMaterial(
            newMaterial
        );


        onMaterialChange(
            newMaterial
        );
    };


    /* =========================================
       MATERIAL RESET
    ========================================= */

    const handleMaterialReset =
        () => {

            setSelectedMaterial(
                undefined
            );


            onMaterialChange(
                undefined
            );
        };


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
                            (prev) =>
                                !prev
                        )
                    }
                >

                    <span>
                        FURNITURE
                    </span>

                    <strong>
                        {
                            categoryOpen
                                ? "−"
                                : "+"
                        }
                    </strong>

                </button>


                {categoryOpen && (

                    <div className="shop-filter-list">


                        {/* ALL */}

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


                        {/* CATEGORIES */}

                        {productCategories.map(
                            (
                                category
                            ) => (

                                <button
                                    type="button"

                                    key={
                                        category
                                    }

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

                                    {
                                        category
                                    }

                                </button>
                            )
                        )}

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
                            (prev) =>
                                !prev
                        )
                    }
                >

                    <span>
                        MATERIALS
                    </span>

                    <strong>
                        {
                            materialsOpen
                                ? "−"
                                : "+"
                        }
                    </strong>

                </button>


                {materialsOpen && (

                    <div className="shop-material-list">


                        {/* MATERIALS */}

                        {materials.map(
                            (
                                material
                            ) => (

                                <button
                                    type="button"

                                    key={
                                        material.value
                                    }

                                    className={
                                        selectedMaterial ===
                                            material.value

                                            ? "active"

                                            : ""
                                    }

                                    onClick={() =>
                                        handleMaterialClick(
                                            material.value
                                        )
                                    }
                                >

                                    <span>
                                        {
                                            material.name
                                        }
                                    </span>

                                </button>
                            )
                        )}


                        {/* =========================
                            RESET MATERIAL
                        ========================= */}

                        {selectedMaterial && (

                            <button
                                type="button"

                                className="shop-material-reset"

                                onClick={
                                    handleMaterialReset
                                }
                            >

                                <span>
                                    RESET
                                </span>

                                <strong>
                                    ×
                                </strong>

                            </button>
                        )}

                    </div>
                )}

            </div>



            {/* =================================
                SORT
            ================================= */}

            <div className="shop-filter-block">

                <div className="shop-filter-title static">

                    <span>
                        SORT BY
                    </span>

                </div>


                <select
                    className="shop-sidebar-sort"

                    value={
                        sortBy
                    }

                    onChange={(
                        event
                    ) =>
                        onSortChange(
                            event
                                .target
                                .value
                        )
                    }
                >

                    <option value="popular">
                        Most Popular
                    </option>


                    <option value="price-low">
                        Price: Low to High
                    </option>




                    <option value="newest">
                        New Arrivals
                    </option>

                </select>

            </div>


            {/* =================================
                RESULT
            ================================= */}

            <div className="shop-sidebar-result">

                <span>
                    PRODUCTS FOUND
                </span>

                <strong>
                    {
                        String(
                            totalProducts
                        ).padStart(
                            2,
                            "0"
                        )
                    }
                </strong>

            </div>

        </aside>
    );
};


export default ProductToolbar;