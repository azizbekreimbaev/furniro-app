import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "react-router";

import "../../css/product.css";

import {
    useAppDispatch,
    useAppSelector,
} from "../../hook";

import {
    selectProduct,
    selectProducts,
    setProduct,
    setProducts,
} from "./productPageSlice";

import ProductService from "../../services/ProductService";

import {
    serverApi,
} from "../../../libs/config";


const ProductDetail = () => {

    const { productId } =
        useParams();

    const dispatch =
        useAppDispatch();


    /* =========================================
       REDUX DATA
    ========================================= */

    const product =
        useAppSelector(
            selectProduct
        );

    const relatedProducts =
        useAppSelector(
            selectProducts
        );


    /* =========================================
       STATES
    ========================================= */

    const [
        quantity,
        setQuantity,
    ] =
        useState(1);


    const [
        selectedImage,
        setSelectedImage,
    ] =
        useState(0);


    const [
        loading,
        setLoading,
    ] =
        useState(true);


    const [
        productError,
        setProductError,
    ] =
        useState(false);


    /* =========================================
       GET PRODUCT
    ========================================= */

    useEffect(() => {

        if (!productId) {
            setProductError(true);
            setLoading(false);

            return;
        }


        const productService =
            new ProductService();


        /* RESET */

        setLoading(true);

        setProductError(false);

        setSelectedImage(0);

        setQuantity(1);


        /* ===============================
           GET SINGLE PRODUCT
        =============================== */

        productService
            .getProduct(
                productId
            )
            .then((data) => {

                dispatch(
                    setProduct(
                        data
                    )
                );


                /* ===============================
                   GET RELATED PRODUCTS
                =============================== */

                return productService
                    .getProducts({
                        page: 1,
                        limit: 4,
                        order:
                            "productViews",

                        productCategory:
                            data.productCategory,
                    })
                    .then(
                        (
                            relatedData
                        ) => {

                            dispatch(
                                setProducts(
                                    relatedData
                                )
                            );
                        }
                    )
                    .catch((err) => {

                        /*
                         * Related products xato
                         * bersa ham asosiy product
                         * ishlashda davom etadi.
                         */

                        console.log(
                            "Related products error:",
                            err
                        );

                        dispatch(
                            setProducts(
                                []
                            )
                        );
                    });

            })
            .catch((err) => {

                console.log(
                    "Get product error:",
                    err
                );

                setProductError(
                    true
                );

            })
            .finally(() => {

                setLoading(
                    false
                );

            });

    }, [
        productId,
        dispatch,
    ]);


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (

            <main className="product-detail-page">

                <div className="product-detail-container">

                    <div className="product-not-found">

                        <h1>
                            Loading...
                        </h1>

                    </div>

                </div>

            </main>
        );
    }


    /* =========================================
       PRODUCT NOT FOUND
    ========================================= */

    if (
        productError ||
        !product ||
        product._id !== productId
    ) {

        return (

            <main className="product-detail-page">

                <div className="product-detail-container">

                    <div className="product-not-found">

                        <h1>
                            Product not found
                        </h1>


                        <Link to="/shop">
                            BACK TO SHOP
                        </Link>

                    </div>

                </div>

            </main>
        );
    }


    /* =========================================
       PRODUCT IMAGES
    ========================================= */

    const productImages =
        product.productImages ??
        [];


    const mainImage =
        productImages[
        selectedImage
        ];


    const mainImagePath =
        mainImage
            ? `${serverApi}/${mainImage}`
            : "";


    /* =========================================
       QUANTITY
    ========================================= */

    const handleIncrease =
        () => {

            setQuantity(
                (prev) =>
                    prev + 1
            );
        };


    const handleDecrease =
        () => {

            setQuantity(
                (prev) =>
                    prev > 1
                        ? prev - 1
                        : 1
            );
        };


    /* =========================================
       ADD TO CART
    ========================================= */

    const handleAddToCart =
        () => {

            console.log({
                productId:
                    product._id,

                productName:
                    product.productName,

                productPrice:
                    product.productPrice,

                quantity,
            });
        };


    /* =========================================
       RELATED PRODUCTS
    ========================================= */

    const filteredRelatedProducts =
        relatedProducts
            .filter(
                (item) =>
                    item._id !==
                    product._id
            )
            .slice(
                0,
                3
            );


    return (

        <main className="product-detail-page">


            {/* =================================
                BREADCRUMB
            ================================= */}

            <section className="product-breadcrumb">

                <div className="product-detail-container">

                    <div className="product-breadcrumb-content">


                        <Link to="/">
                            Home
                        </Link>


                        <span>
                            ›
                        </span>


                        <Link to="/shop">
                            Shop
                        </Link>


                        <span>
                            ›
                        </span>


                        <i />


                        <strong>
                            {
                                product.productName
                            }
                        </strong>


                    </div>

                </div>

            </section>


            {/* =================================
                PRODUCT DETAIL
            ================================= */}

            <section className="product-detail-main">

                <div className="product-detail-container">

                    <div className="product-detail-grid">


                        {/* =========================
                            LEFT GALLERY
                        ========================= */}

                        <div className="product-gallery">


                            {/* THUMBNAILS */}

                            <div className="product-thumbnails">

                                {
                                    productImages.map(
                                        (
                                            image,
                                            index
                                        ) => {

                                            const imagePath =
                                                `${serverApi}/${image}`;


                                            return (

                                                <button
                                                    key={
                                                        image
                                                    }

                                                    type="button"

                                                    className={
                                                        selectedImage ===
                                                            index

                                                            ? "product-thumbnail active"

                                                            : "product-thumbnail"
                                                    }

                                                    onClick={() =>
                                                        setSelectedImage(
                                                            index
                                                        )
                                                    }
                                                >

                                                    <img
                                                        src={
                                                            imagePath
                                                        }

                                                        alt={`${product.productName} ${index + 1}`}
                                                    />

                                                </button>
                                            );
                                        }
                                    )
                                }

                            </div>


                            {/* MAIN IMAGE */}

                            <div className="product-main-image">

                                {
                                    mainImagePath
                                        ? (

                                            <img
                                                src={
                                                    mainImagePath
                                                }

                                                alt={
                                                    product.productName
                                                }
                                            />

                                        )
                                        : (

                                            <div className="product-image-empty">
                                                No image
                                            </div>

                                        )
                                }

                            </div>

                        </div>


                        {/* =========================
                            RIGHT INFORMATION
                        ========================= */}

                        <div className="product-detail-info">


                            {/* CATEGORY */}

                            <span className="product-detail-category">

                                {
                                    product.productCategory
                                }

                            </span>


                            {/* NAME */}

                            <h1>

                                {
                                    product.productName
                                }

                            </h1>


                            {/* PRICE */}

                            <div className="product-detail-price">

                                $

                                {
                                    product
                                        .productPrice
                                        .toLocaleString(
                                            "en-US",
                                            {
                                                minimumFractionDigits:
                                                    2,

                                                maximumFractionDigits:
                                                    2,
                                            }
                                        )
                                }

                            </div>


                            {/* VIEWS */}

                            <div className="product-detail-rating">


                                <span className="product-detail-stars">
                                    ★★★★★
                                </span>


                                <i />


                                <span>

                                    {
                                        (
                                            product.productViews ??
                                            0
                                        ).toLocaleString()
                                    }

                                    {" "}
                                    views

                                </span>

                            </div>


                            {/* DESCRIPTION */}

                            <p className="product-detail-description">

                                {
                                    product.productDesc
                                }

                            </p>


                            {/* =========================
                                ACTIONS
                            ========================= */}

                            <div className="product-detail-actions">


                                {/* QUANTITY */}

                                <div className="product-detail-quantity">


                                    <button
                                        type="button"

                                        onClick={
                                            handleDecrease
                                        }
                                    >
                                        −
                                    </button>


                                    <span>
                                        {
                                            quantity
                                        }
                                    </span>


                                    <button
                                        type="button"

                                        onClick={
                                            handleIncrease
                                        }
                                    >
                                        +
                                    </button>


                                </div>


                                {/* CART */}

                                <button
                                    type="button"

                                    className="product-add-cart"

                                    onClick={
                                        handleAddToCart
                                    }
                                >
                                    ADD TO CART
                                </button>


                            </div>


                            {/* =========================
                                META
                            ========================= */}

                            <div className="product-detail-meta">


                                {/* CATEGORY */}

                                <div>

                                    <span>
                                        Category
                                    </span>

                                    <i>
                                        :
                                    </i>

                                    <strong>

                                        {
                                            product.productCategory
                                        }

                                    </strong>

                                </div>


                                {/* MATERIAL */}

                                {
                                    product.productMaterial &&
                                    (

                                        <div>

                                            <span>
                                                Material
                                            </span>

                                            <i>
                                                :
                                            </i>

                                            <strong>

                                                {
                                                    product.productMaterial
                                                }

                                            </strong>

                                        </div>
                                    )
                                }


                                {/* COLOR */}

                                {
                                    product.productColor &&
                                    (

                                        <div>

                                            <span>
                                                Color
                                            </span>

                                            <i>
                                                :
                                            </i>

                                            <strong>

                                                {
                                                    product.productColor
                                                }

                                            </strong>

                                        </div>
                                    )
                                }


                                {/* VIEWS */}

                                <div>

                                    <span>
                                        Views
                                    </span>

                                    <i>
                                        :
                                    </i>

                                    <strong>

                                        {
                                            (
                                                product.productViews ??
                                                0
                                            ).toLocaleString()
                                        }

                                    </strong>

                                </div>


                                {/* TAGS */}

                                <div>

                                    <span>
                                        Tags
                                    </span>

                                    <i>
                                        :
                                    </i>

                                    <strong>
                                        Furniture,
                                        Interior,
                                        Home
                                    </strong>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================
                RELATED PRODUCTS
            ================================= */}

            {
                filteredRelatedProducts
                    .length > 0 &&
                (

                    <section className="product-related-section">

                        <div className="product-detail-container">


                            {/* TITLE */}

                            <div className="product-related-title">

                                <span>
                                    YOU MAY ALSO LIKE
                                </span>

                                <h2>
                                    RELATED PRODUCTS
                                </h2>

                            </div>


                            {/* PRODUCTS */}

                            <div className="product-related-grid">

                                {
                                    filteredRelatedProducts
                                        .map(
                                            (
                                                item
                                            ) => {

                                                const image =
                                                    item
                                                        .productImages?.[
                                                    0
                                                    ];


                                                const imagePath =
                                                    image
                                                        ? `${serverApi}/${image}`
                                                        : "";


                                                return (

                                                    <article
                                                        className="product-related-card"

                                                        key={
                                                            item._id
                                                        }
                                                    >


                                                        {/* IMAGE */}

                                                        <Link
                                                            to={`/product/${item._id}`}

                                                            className="product-related-image"
                                                        >

                                                            {
                                                                imagePath
                                                                    ? (

                                                                        <img
                                                                            src={
                                                                                imagePath
                                                                            }

                                                                            alt={
                                                                                item.productName
                                                                            }
                                                                        />

                                                                    )
                                                                    : (

                                                                        <div className="product-image-empty">
                                                                            No image
                                                                        </div>

                                                                    )
                                                            }

                                                        </Link>


                                                        {/* CATEGORY */}

                                                        <span>

                                                            {
                                                                item.productCategory
                                                            }

                                                        </span>


                                                        {/* NAME */}

                                                        <Link
                                                            to={`/product/${item._id}`}
                                                        >

                                                            {
                                                                item.productName
                                                            }

                                                        </Link>


                                                        {/* PRICE */}

                                                        <strong>

                                                            $

                                                            {
                                                                item
                                                                    .productPrice
                                                                    .toLocaleString(
                                                                        "en-US",
                                                                        {
                                                                            minimumFractionDigits:
                                                                                2,

                                                                            maximumFractionDigits:
                                                                                2,
                                                                        }
                                                                    )
                                                            }

                                                        </strong>


                                                    </article>
                                                );
                                            }
                                        )
                                }

                            </div>


                            {/* VIEW MORE */}

                            <div className="product-related-action">

                                <Link to="/shop">
                                    VIEW MORE PRODUCTS
                                </Link>

                            </div>


                        </div>

                    </section>
                )
            }

        </main>
    );
};


export default ProductDetail;