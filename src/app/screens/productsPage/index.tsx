import {
    useEffect,
    useState,
} from "react";

import {
    useLocation,
    useNavigate,
} from "react-router";

import ShopHero from "./ShopHero";
import { useGlobals } from "../../hooks/useGlobals";
import ProductToolbar from "./ProductToolbar";
import ProductGrid from "./ProductGrid";

import "../../css/product.css";

import {
    useAppDispatch,
    useAppSelector,
} from "../../hook";

import {
    selectProducts,
    setProducts,
} from "./productPageSlice";

import ProductService from "../../services/ProductService";

import type {
    Product,
    ProductInquiry,
} from "../../../libs/types/product";

import {
    ProductCategory,
    ProductMaterial,
} from "../../../libs/enums/product.enum";


type CategoryOption =
    ProductCategory | "All";


const categories: CategoryOption[] = [
    "All",
    ProductCategory.BED,
    ProductCategory.CHAIR,
    ProductCategory.TABLE,
    ProductCategory.BENCH,
    ProductCategory.CABINET,
    ProductCategory.DECOR,
    ProductCategory.DESK,
    ProductCategory.SHELF,
    ProductCategory.SOFA,
    ProductCategory.STOOL,
    ProductCategory.WARDROBE,
];


const ProductsPage = () => {
    const { basket } = useGlobals();

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const dispatch =
        useAppDispatch();


    /* =========================================
       REDUX DATA
    ========================================= */

    const products =
        useAppSelector(
            selectProducts
        );


    /* =========================================
       STATES
    ========================================= */

    const [
        activeCategory,
        setActiveCategory,
    ] =
        useState<CategoryOption>(
            "All"
        );


    const [
        sortBy,
        setSortBy,
    ] =
        useState(
            "popular"
        );


    /* =========================================
       SEARCH FROM URL
    ========================================= */

    const params =
        new URLSearchParams(
            location.search
        );

    const searchText =
        params
            .get("search")
            ?.trim() ?? "";


    /* =========================================
       PRODUCT INQUIRY
    ========================================= */

    const [
        productSearch,
        setProductSearch,
    ] =
        useState<ProductInquiry>({
            page: 1,
            limit: 20,
            order: "productViews",
            search: "",
        });


    /* =========================================
       GET PRODUCTS
    ========================================= */

    useEffect(() => {

        const productService =
            new ProductService();

        productService
            .getProducts(
                productSearch
            )
            .then((data) => {

                dispatch(
                    setProducts(
                        data
                    )
                );

            })
            .catch((err) => {

                console.log(
                    "getProducts error:",
                    err
                );

            });

    }, [
        productSearch,
        dispatch,
    ]);


    /* =========================================
       HEADER SEARCH
    ========================================= */

    useEffect(() => {

        setProductSearch(
            (prev) => ({
                ...prev,

                page: 1,

                search:
                    searchText,
            })
        );

    }, [
        searchText,
    ]);


    /* =========================================
       CATEGORY
    ========================================= */

    const handleCategoryChange = (
        category: CategoryOption
    ) => {

        setActiveCategory(
            category
        );

        setProductSearch(
            (prev) => ({
                ...prev,

                page: 1,

                productCategory:
                    category ===
                        "All"
                        ? undefined
                        : category,
            })
        );
    };


    /* =========================================
       MATERIAL
    ========================================= */

    const handleMaterialChange = (
        material:
            ProductMaterial |
            undefined
    ) => {

        setProductSearch(
            (prev) => ({
                ...prev,

                page: 1,

                productMaterial:
                    material,
            })
        );
    };


    /* =========================================
       PRICE
    ========================================= */

    const handlePriceChange = (
        maxPrice: number
    ) => {

        setProductSearch(
            (prev) => ({
                ...prev,

                page: 1,

                minPrice: 0,

                maxPrice:
                    maxPrice,
            })
        );
    };


    /* =========================================
       SORT
    ========================================= */

    const handleSortChange = (
        value: string
    ) => {

        setSortBy(
            value
        );


        let order =
            "productViews";


        switch (value) {

            case "newest":

                order =
                    "createdAt";

                break;


            case "price-low":

                order =
                    "productPrice";

                break;


            case "price-high":

                order =
                    "productPrice";

                break;


            case "popular":
            default:

                order =
                    "productViews";
        }


        setProductSearch(
            (prev) => ({
                ...prev,

                page: 1,

                order,
            })
        );
    };


    /* =========================================
       ADD TO CART
    ========================================= */

    const handleAddToCart = (
        product: Product
    ) => {

        basket.onAdd({
            _id: product._id,
            name: product.productName,
            price: product.productPrice,
            image: product.productImages[0],
            quantity: 1,
        });
    };


    /* =========================================
       CLEAR SEARCH
    ========================================= */

    const handleClearSearch =
        () => {

            navigate(
                "/shop"
            );
        };


    return (

        <main className="shop-page">

            <ShopHero />


            <section className="shop-products-section">

                <div className="shop-container">


                    {/* =========================
                        SEARCH RESULT
                    ========================= */}

                    {searchText && (

                        <div className="shop-search-status">

                            <div>

                                <span>
                                    RESULT FOR
                                </span>

                                <p>
                                    “

                                    <strong>
                                        {
                                            searchText
                                        }
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

                                <span>
                                    ×
                                </span>

                            </button>

                        </div>
                    )}


                    <div className="shop-catalog-layout">


                        {/* =========================
                            LEFT SIDEBAR
                        ========================= */}

                        <ProductToolbar

                            categories={
                                categories
                            }

                            activeCategory={
                                activeCategory
                            }

                            totalProducts={
                                products.length
                            }

                            sortBy={
                                sortBy
                            }

                            onCategoryChange={
                                handleCategoryChange
                            }

                            onMaterialChange={
                                handleMaterialChange
                            }

                            onPriceChange={
                                handlePriceChange
                            }

                            onSortChange={
                                handleSortChange
                            }

                        />


                        {/* =========================
                            PRODUCTS
                        ========================= */}

                        <div className="shop-catalog-products">


                            <div className="shop-result-header">

                                <div>

                                    <span>
                                        COLLECTION
                                    </span>

                                    <h2>

                                        {
                                            activeCategory ===
                                                "All"

                                                ? "ALL PRODUCTS"

                                                : activeCategory
                                                    .toUpperCase()
                                        }

                                    </h2>

                                </div>


                                <p>

                                    SHOWED{" "}

                                    <strong>
                                        {
                                            products.length
                                        }
                                    </strong>

                                    {" "}
                                    PRODUCTS

                                </p>

                            </div>


                            <ProductGrid

                                products={
                                    products
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
