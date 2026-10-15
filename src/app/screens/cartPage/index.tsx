import {
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    Link,
} from "react-router";

import {
    useDispatch,
} from "react-redux";

import type {
    AppDispatch,
} from "../../store";

import "../../css/cartPage.css";

import {
    useGlobals,
} from "../../hooks/useGlobals";

import OrderService
    from "../../services/OrderService";

import {
    setPendingOrders,
    setProcessingOrders,
    setShippedOrders,
    setDeliveredOrders,
    setCancelledOrders,
} from "./CartPageslice";

import {
    serverApi,
} from "../../../libs/config";

import type {
    Order,
    OrderItem,
} from "../../../libs/types/order";

import {
    OrderStatus,
} from "../../../libs/enums/order.enum";


/* =====================================================
   TYPES
===================================================== */

interface CheckoutProduct {
    _id: string;

    productId: string;

    productName: string;

    productPrice: number;

    quantity: number;

    image: string;
}


interface CustomerInformation {
    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    country: string;

    city: string;

    zipCode: string;

    address: string;
}


interface ShippingOption {
    id: string;

    name: string;

    description: string;

    price: number;
}


type PaymentMethod =
    | "card"
    | "paypal";


/* =====================================================
   SHIPPING OPTIONS
===================================================== */

const shippingOptions: ShippingOption[] = [
    {
        id: "dhl",

        name: "DHL Express",

        description:
            "Estimated delivery time 1-2 days",

        price: 0,
    },

    {
        id: "fedex",

        name: "FedEx",

        description:
            "Estimated delivery time 2-3 days",

        price: 25,
    },

    {
        id: "expedition",

        name: "Express Expedition",

        description:
            "Estimated delivery time 2-3 days",

        price: 35,
    },

    {
        id: "jne",

        name: "JNE Express",

        description:
            "Estimated delivery time 3-4 days",

        price: 35,
    },

    {
        id: "pos",

        name: "POS Indonesia",

        description:
            "Estimated delivery time 3-5 days",

        price: 35,
    },
];


/* =====================================================
   IMAGE HELPER
===================================================== */

const getImageUrl = (
    image?: string,
) => {

    if (!image) {
        return "/images/no-image.png";
    }


    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {

        return image;
    }


    const cleanImage =
        image.startsWith("/")
            ? image.slice(1)
            : image;


    return `${serverApi}/${cleanImage}`;
};


/* =====================================================
   CART PAGE
===================================================== */

const CartPage = () => {

    const dispatch =
        useDispatch<AppDispatch>();


    const {
        authMember,
        orderBuilder,
        setOrderBuilder,
    } = useGlobals();


    /* =================================================
       PAGE STATE
    ================================================= */

    const [
        currentStep,
        setCurrentStep,
    ] = useState(1);


    /* =================================================
       ACTIVE ORDER
    ================================================= */

    const [
        activeOrder,
        setActiveOrder,
    ] = useState<Order | null>(
        null,
    );


    /* =================================================
       PRODUCTS
    ================================================= */

    const [
        cartProducts,
        setCartProducts,
    ] = useState<
        CheckoutProduct[]
    >([]);


    /* =================================================
       LOADING
    ================================================= */

    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        orderError,
        setOrderError,
    ] = useState("");


    /* =================================================
       COMPLETED ORDER
    ================================================= */

    const [
        completedTotal,
        setCompletedTotal,
    ] = useState(0);


    const [
        orderNumber,
        setOrderNumber,
    ] = useState("");


    /* =================================================
       CUSTOMER INFO
    ================================================= */

    const [
        customerInfo,
        setCustomerInfo,
    ] = useState<CustomerInformation>({
        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        country: "",

        city: "",

        zipCode: "",

        address: "",
    });


    /* =================================================
       SHIPPING
    ================================================= */

    const [
        selectedShipping,
        setSelectedShipping,
    ] = useState("dhl");


    /* =================================================
       PAYMENT
    ================================================= */

    const [
        paymentMethod,
        setPaymentMethod,
    ] = useState<PaymentMethod>(
        "card",
    );


    const [
        cardName,
        setCardName,
    ] = useState("");


    const [
        cardNumber,
        setCardNumber,
    ] = useState("");


    const [
        cardExpiry,
        setCardExpiry,
    ] = useState("");


    const [
        cardCvv,
        setCardCvv,
    ] = useState("");


    /* =====================================================
       LOAD ORDERS
    ===================================================== */

    useEffect(() => {

        const loadOrders =
            async () => {

                try {

                    setLoading(
                        true,
                    );


                    setOrderError(
                        "",
                    );


                    const orderService =
                        new OrderService();


                    const [
                        pending,
                        processing,
                        shipped,
                        delivered,
                        cancelled,
                    ] =
                        await Promise.all([

                            orderService
                                .getMyOrders({
                                    page: 1,

                                    limit: 20,

                                    orderStatus:
                                        OrderStatus.PENDING,
                                }),


                            orderService
                                .getMyOrders({
                                    page: 1,

                                    limit: 20,

                                    orderStatus:
                                        OrderStatus.PROCESSING,
                                }),


                            orderService
                                .getMyOrders({
                                    page: 1,

                                    limit: 20,

                                    orderStatus:
                                        OrderStatus.SHIPPED,
                                }),


                            orderService
                                .getMyOrders({
                                    page: 1,

                                    limit: 20,

                                    orderStatus:
                                        OrderStatus.DELIVERED,
                                }),


                            orderService
                                .getMyOrders({
                                    page: 1,

                                    limit: 20,

                                    orderStatus:
                                        OrderStatus.CANCELLED,
                                }),

                        ]);


                    /* =============================
                       SAVE TO REDUX
                    ============================== */

                    dispatch(
                        setPendingOrders(
                            pending,
                        ),
                    );


                    dispatch(
                        setProcessingOrders(
                            processing,
                        ),
                    );


                    dispatch(
                        setShippedOrders(
                            shipped,
                        ),
                    );


                    dispatch(
                        setDeliveredOrders(
                            delivered,
                        ),
                    );


                    dispatch(
                        setCancelledOrders(
                            cancelled,
                        ),
                    );


                    console.log(
                        "PENDING ORDERS:",
                        pending,
                    );


                    /* =============================
                       NO PENDING ORDER
                    ============================== */

                    if (
                        !pending ||
                        pending.length === 0
                    ) {

                        setActiveOrder(
                            null,
                        );


                        setCartProducts(
                            [],
                        );


                        setOrderError(
                            "No pending order found.",
                        );


                        return;
                    }


                    /* =============================
                       LATEST PENDING ORDER
                    ============================== */

                    const latestOrder =
                        pending[0];


                    setActiveOrder(
                        latestOrder,
                    );


                    /* =============================
                       ORDER ITEMS
                    ============================== */

                    const orderItems =
                        latestOrder
                            .orderItems ??
                        [];


                    const productData =
                        latestOrder
                            .productData ??
                        [];


                    /* =============================
                       MAP BACKEND → CHECKOUT PRODUCT
                    ============================== */

                    const mappedProducts:
                        CheckoutProduct[] =
                        orderItems.map(
                            (
                                orderItem:
                                    OrderItem,
                            ) => {

                                const product =
                                    productData.find(
                                        (item) =>
                                            String(
                                                item._id,
                                            ) ===
                                            String(
                                                orderItem.productId,
                                            ),
                                    );


                                const productObject =
                                    product as any;


                                const image =
                                    Array.isArray(
                                        productObject
                                            ?.productImages,
                                    )

                                        ? productObject
                                            .productImages[0]

                                        : productObject
                                            ?.productImage ??

                                        productObject
                                            ?.image ??

                                        "";


                                return {

                                    _id:
                                        orderItem._id ??
                                        orderItem.productId,


                                    productId:
                                        String(
                                            orderItem.productId,
                                        ),


                                    productName:
                                        productObject
                                            ?.productName ??

                                        productObject
                                            ?.name ??

                                        "Product",


                                    productPrice:
                                        Number(
                                            orderItem.itemPrice ??

                                            productObject
                                                ?.productPrice ??

                                            productObject
                                                ?.price ??

                                            0,
                                        ),


                                    quantity:
                                        Number(
                                            orderItem.itemQuantity ??
                                            1,
                                        ),


                                    image:
                                        getImageUrl(
                                            image,
                                        ),
                                };
                            },
                        );


                    console.log(
                        "CHECKOUT PRODUCTS:",
                        mappedProducts,
                    );


                    setCartProducts(
                        mappedProducts,
                    );


                } catch (err) {

                    console.log(
                        "LOAD ORDERS ERROR:",
                        err,
                    );


                    setOrderError(
                        "Failed to load your order.",
                    );


                } finally {

                    setLoading(
                        false,
                    );
                }
            };


        if (!authMember) {

            setLoading(
                false,
            );


            setActiveOrder(
                null,
            );


            setCartProducts(
                [],
            );


            setOrderError(
                "Please login first.",
            );


            return;
        }


        loadOrders();


    }, [
        authMember,
        orderBuilder,
        dispatch,
    ]);


    /* =====================================================
       PRODUCT ACTIONS
    ===================================================== */

    const increaseQuantity = (
        id: string,
    ) => {

        setCartProducts(
            (products) =>
                products.map(
                    (product) => {

                        if (
                            product._id !== id
                        ) {

                            return product;
                        }


                        return {
                            ...product,

                            quantity:
                                product.quantity + 1,
                        };
                    },
                ),
        );
    };


    const decreaseQuantity = (
        id: string,
    ) => {

        setCartProducts(
            (products) =>
                products.map(
                    (product) => {

                        if (
                            product._id !== id
                        ) {

                            return product;
                        }


                        return {
                            ...product,

                            quantity:
                                product.quantity > 1

                                    ? product.quantity - 1

                                    : 1,
                        };
                    },
                ),
        );
    };


    const removeProduct = (
        id: string,
    ) => {

        setCartProducts(
            (products) =>
                products.filter(
                    (product) =>
                        product._id !== id,
                ),
        );
    };


    /* =====================================================
       PRICE
    ===================================================== */

    const subtotal =
        useMemo(
            () => {

                return cartProducts.reduce(
                    (
                        total,
                        product,
                    ) => {

                        return (
                            total +
                            product.productPrice *
                            product.quantity
                        );
                    },

                    0,
                );

            }, [
            cartProducts,
        ],
        );


    /*
     * Hozirgi project logic:
     * 10% discount.
     */

    const discount =
        subtotal * 0.1;


    const shippingPrice =
        shippingOptions.find(
            (item) =>
                item.id ===
                selectedShipping,
        )?.price ?? 0;


    const totalPrice =
        subtotal -
        discount +
        shippingPrice;


    /* =====================================================
       CUSTOMER
    ===================================================== */

    const handleContinueToShipping =
        () => {

            const required =
                customerInfo.firstName &&
                customerInfo.lastName &&
                customerInfo.email &&
                customerInfo.phone &&
                customerInfo.country &&
                customerInfo.city &&
                customerInfo.address;


            if (!required) {

                alert(
                    "Please complete your information.",
                );


                return;
            }


            setCurrentStep(
                3,
            );


            scrollToTop();
        };


    /* =====================================================
       REVIEW ORDER
    ===================================================== */

    const handleReviewOrder =
        () => {

            if (
                paymentMethod ===
                "card" &&
                (
                    !cardName ||
                    !cardNumber ||
                    !cardExpiry ||
                    !cardCvv
                )
            ) {

                alert(
                    "Please complete your card information.",
                );


                return;
            }


            setCurrentStep(
                4,
            );


            scrollToTop();
        };


    /* =====================================================
       CONFIRM
    ===================================================== */

    const handleConfirmOrder =
        async () => {

            try {

                if (!activeOrder) {

                    alert(
                        "Order does not exist.",
                    );


                    return;
                }


                if (
                    cartProducts.length === 0
                ) {

                    alert(
                        "Your order has no products.",
                    );


                    return;
                }


                const orderService =
                    new OrderService();


                /* =============================
                   PENDING → PROCESSING
                ============================== */

                const updatedOrder =
                    await orderService
                        .updateOrder({

                            orderId:
                                activeOrder._id,

                            orderStatus:
                                OrderStatus.PROCESSING,

                        });


                console.log(
                    "PROCESSING ORDER:",
                    updatedOrder,
                );


                /* =============================
                   COMPLETED SNAPSHOT
                ============================== */

                setOrderNumber(
                    activeOrder._id,
                );


                setCompletedTotal(
                    totalPrice,
                );


                /* =============================
                   STEP 5
                ============================== */

                setCurrentStep(
                    5,
                );


                /* =============================
                   REFRESH ORDERS
                ============================== */

                setOrderBuilder(
                    new Date(),
                );


                scrollToTop();


            } catch (err) {

                console.log(
                    "CONFIRM ORDER ERROR:",
                    err,
                );


                alert(
                    "Failed to confirm order.",
                );
            }
        };


    /* =====================================================
       SCROLL
    ===================================================== */

    const scrollToTop =
        () => {

            window.scrollTo({
                top: 0,

                behavior:
                    "smooth",
            });
        };


    /* =====================================================
       LOADING
    ===================================================== */

    if (
        loading &&
        currentStep !== 5
    ) {

        return (

            <main className="cart-page">

                <div className="cart-page-container">

                    <section className="checkout-heading">

                        <h1>
                            LOADING ORDER
                        </h1>

                        <p>
                            PLEASE WAIT
                        </p>

                    </section>

                </div>

            </main>
        );
    }


    /* =====================================================
       COMPLETED
    ===================================================== */

    if (
        currentStep === 5
    ) {

        return (

            <main className="cart-page">

                <div className="cart-page-container">

                    <OrderCompleted
                        orderNumber={
                            orderNumber
                        }

                        total={
                            completedTotal
                        }

                        customerName={
                            `${customerInfo.firstName} ${customerInfo.lastName}`
                        }
                    />


                    <WhyChooseUs />

                </div>

            </main>
        );
    }


    /* =====================================================
       NO ORDER
    ===================================================== */

    if (
        !activeOrder
    ) {

        return (

            <main className="cart-page">

                <div className="cart-page-container">

                    <section className="checkout-heading">

                        <h1>
                            YOUR ORDER
                        </h1>

                        <p>
                            {
                                orderError ||
                                "NO ACTIVE ORDER"
                            }
                        </p>

                    </section>


                    <div className="cart-empty">

                        <h2>
                            No pending order
                        </h2>


                        <Link to="/shop">
                            GO TO SHOP
                        </Link>

                    </div>


                    <WhyChooseUs />

                </div>

            </main>
        );
    }


    /* =====================================================
       MAIN RENDER
    ===================================================== */

    return (

        <main className="cart-page">

            <div className="cart-page-container">


                {/* =====================================
                    TITLE
                ====================================== */}

                <section className="checkout-heading">

                    <h1>

                        {currentStep ===
                            1 &&
                            "SHOPPING CART"}


                        {currentStep ===
                            2 &&
                            "CUSTOMER INFORMATION"}


                        {currentStep ===
                            3 &&
                            "SHIPPING & PAYMENT"}


                        {currentStep ===
                            4 &&
                            "REVIEW AND CONFIRMATION"}

                    </h1>


                    <p>

                        {currentStep ===
                            1 &&
                            "THIS IS YOUR ORDER BASED ON THE PRODUCTS FROM YOUR BASKET"}


                        {currentStep ===
                            2 &&
                            "PROVIDE YOUR REQUIRED INFORMATION TO COMPLETE THE PROCESS"}


                        {currentStep ===
                            3 &&
                            "CHOOSE THE PAYMENT AND SHIPPING METHOD YOU WANT"}


                        {currentStep ===
                            4 &&
                            "LOOK BACK ONE MORE TIME TO CONFIRM YOUR INFORMATION"}

                    </p>

                </section>


                {/* =====================================
                    PROGRESS
                ====================================== */}

                <CheckoutProgress
                    currentStep={
                        currentStep
                    }
                />


                {/* =====================================
                    STEP 1 — PRODUCTS
                ====================================== */}

                {currentStep ===
                    1 && (

                        <section className="checkout-main-layout">


                            <div className="cart-products-column">


                                {cartProducts.length >
                                    0
                                    ? (

                                        cartProducts.map(
                                            (
                                                product,
                                            ) => (

                                                <div
                                                    className="checkout-cart-product"

                                                    key={
                                                        product._id
                                                    }
                                                >


                                                    {/* IMAGE */}

                                                    <div className="checkout-product-image">

                                                        <img
                                                            src={
                                                                product.image
                                                            }

                                                            alt={
                                                                product.productName
                                                            }
                                                        />

                                                    </div>


                                                    {/* PRODUCT BODY */}

                                                    <div className="checkout-product-body">


                                                        {/* TOP */}

                                                        <div className="checkout-product-top">


                                                            <div>

                                                                <h3>
                                                                    {
                                                                        product.productName
                                                                    }
                                                                </h3>


                                                            </div>


                                                            {/* =============================
                                                                REMOVE
                                                            ============================== */}

                                                            <button
                                                                type="button"

                                                                className="checkout-remove"

                                                                onClick={() =>
                                                                    removeProduct(
                                                                        product._id,
                                                                    )
                                                                }
                                                            >
                                                                REMOVE
                                                            </button>

                                                        </div>





                                                        {/* BOTTOM */}

                                                        <div className="checkout-product-bottom">


                                                            {/* =============================
                                                                QUANTITY
                                                            ============================== */}

                                                            <div className="checkout-quantity">


                                                                {/* MINUS */}

                                                                <button
                                                                    type="button"

                                                                    onClick={() =>
                                                                        decreaseQuantity(
                                                                            product._id,
                                                                        )
                                                                    }
                                                                >
                                                                    −
                                                                </button>


                                                                {/* VALUE */}

                                                                <span>
                                                                    {
                                                                        product.quantity
                                                                    }
                                                                </span>


                                                                {/* PLUS */}

                                                                <button
                                                                    type="button"

                                                                    onClick={() =>
                                                                        increaseQuantity(
                                                                            product._id,
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </button>


                                                            </div>


                                                            {/* PRICE */}

                                                            <strong>

                                                                $

                                                                {(
                                                                    product.productPrice *
                                                                    product.quantity
                                                                ).toFixed(
                                                                    2,
                                                                )}

                                                            </strong>

                                                        </div>

                                                    </div>

                                                </div>
                                            ),
                                        )

                                    )
                                    : (

                                        <div className="cart-empty">

                                            <h2>
                                                Your order is empty
                                            </h2>


                                            <Link to="/shop">
                                                GO TO SHOP
                                            </Link>

                                        </div>

                                    )}

                            </div>


                            {/* =================================
                                SUMMARY
                            ================================== */}

                            <OrderSummary
                                subtotal={
                                    subtotal
                                }

                                discount={
                                    discount
                                }

                                shipping={
                                    shippingPrice
                                }

                                total={
                                    totalPrice
                                }

                                products={
                                    cartProducts
                                }
                            >

                                <button
                                    type="button"

                                    className="checkout-primary-button"

                                    disabled={
                                        cartProducts.length === 0
                                    }

                                    onClick={() => {

                                        setCurrentStep(
                                            2,
                                        );


                                        scrollToTop();
                                    }}
                                >

                                    PROCEED TO CHECKOUT

                                </button>

                            </OrderSummary>

                        </section>
                    )}


                {/* =====================================
                    STEP 2 — CUSTOMER INFORMATION
                ====================================== */}

                {currentStep ===
                    2 && (

                        <section className="checkout-main-layout">


                            <div className="checkout-form-section">


                                <div className="checkout-section-header">

                                    <h2>
                                        YOUR INFORMATION
                                    </h2>

                                    <p>
                                        Add your name,
                                        phone number and
                                        address.
                                    </p>

                                </div>


                                <div className="customer-information-grid">


                                    <CheckoutInput
                                        label="Your first name"

                                        value={
                                            customerInfo.firstName
                                        }

                                        onChange={(
                                            value,
                                        ) =>
                                            setCustomerInfo(
                                                (
                                                    prev,
                                                ) => ({
                                                    ...prev,

                                                    firstName:
                                                        value,
                                                }),
                                            )
                                        }
                                    />


                                    <CheckoutInput
                                        label="Your last name"

                                        value={
                                            customerInfo.lastName
                                        }

                                        onChange={(
                                            value,
                                        ) =>
                                            setCustomerInfo(
                                                (
                                                    prev,
                                                ) => ({
                                                    ...prev,

                                                    lastName:
                                                        value,
                                                }),
                                            )
                                        }
                                    />


                                    <CheckoutInput
                                        label="Your email"

                                        type="email"

                                        value={
                                            customerInfo.email
                                        }

                                        onChange={(
                                            value,
                                        ) =>
                                            setCustomerInfo(
                                                (
                                                    prev,
                                                ) => ({
                                                    ...prev,

                                                    email:
                                                        value,
                                                }),
                                            )
                                        }
                                    />


                                    <CheckoutInput
                                        label="Phone number"

                                        value={
                                            customerInfo.phone
                                        }

                                        onChange={(
                                            value,
                                        ) =>
                                            setCustomerInfo(
                                                (
                                                    prev,
                                                ) => ({
                                                    ...prev,

                                                    phone:
                                                        value,
                                                }),
                                            )
                                        }
                                    />


                                    <CheckoutInput
                                        label="Country"

                                        value={
                                            customerInfo.country
                                        }

                                        onChange={(
                                            value,
                                        ) =>
                                            setCustomerInfo(
                                                (
                                                    prev,
                                                ) => ({
                                                    ...prev,

                                                    country:
                                                        value,
                                                }),
                                            )
                                        }
                                    />


                                    <CheckoutInput
                                        label="City"

                                        value={
                                            customerInfo.city
                                        }

                                        onChange={(
                                            value,
                                        ) =>
                                            setCustomerInfo(
                                                (
                                                    prev,
                                                ) => ({
                                                    ...prev,

                                                    city:
                                                        value,
                                                }),
                                            )
                                        }
                                    />


                                    <CheckoutInput
                                        label="ZIP Code"

                                        value={
                                            customerInfo.zipCode
                                        }

                                        onChange={(
                                            value,
                                        ) =>
                                            setCustomerInfo(
                                                (
                                                    prev,
                                                ) => ({
                                                    ...prev,

                                                    zipCode:
                                                        value,
                                                }),
                                            )
                                        }
                                    />


                                    <div className="checkout-input-full">

                                        <CheckoutInput
                                            label="Address details"

                                            value={
                                                customerInfo.address
                                            }

                                            onChange={(
                                                value,
                                            ) =>
                                                setCustomerInfo(
                                                    (
                                                        prev,
                                                    ) => ({
                                                        ...prev,

                                                        address:
                                                            value,
                                                    }),
                                                )
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="checkout-navigation">

                                    <button
                                        type="button"

                                        className="checkout-secondary-button"

                                        onClick={() => {

                                            setCurrentStep(
                                                1,
                                            );


                                            scrollToTop();
                                        }}
                                    >

                                        BACK TO ORDER

                                    </button>

                                </div>

                            </div>


                            <OrderSummary
                                subtotal={
                                    subtotal
                                }

                                discount={
                                    discount
                                }

                                shipping={
                                    shippingPrice
                                }

                                total={
                                    totalPrice
                                }

                                products={
                                    cartProducts
                                }
                            >

                                <button
                                    type="button"

                                    className="checkout-primary-button"

                                    onClick={
                                        handleContinueToShipping
                                    }
                                >

                                    CONTINUE TO SHIPPING

                                </button>

                            </OrderSummary>

                        </section>
                    )}


                {/* =====================================
                    STEP 3 — SHIPPING PAYMENT
                ====================================== */}

                {currentStep ===
                    3 && (

                        <section className="checkout-main-layout">


                            <div className="checkout-form-section">


                                <div className="checkout-section-header">

                                    <h2>
                                        SHIPPING SERVICE
                                    </h2>

                                    <p>
                                        Choose one shipping
                                        service for your order.
                                    </p>

                                </div>


                                <div className="shipping-options">

                                    {shippingOptions.map(
                                        (
                                            option,
                                        ) => (

                                            <label
                                                key={
                                                    option.id
                                                }

                                                className={
                                                    selectedShipping ===
                                                        option.id

                                                        ? "shipping-option active"

                                                        : "shipping-option"
                                                }
                                            >

                                                <input
                                                    type="radio"

                                                    name="shipping"

                                                    checked={
                                                        selectedShipping ===
                                                        option.id
                                                    }

                                                    onChange={() =>
                                                        setSelectedShipping(
                                                            option.id,
                                                        )
                                                    }
                                                />


                                                <div className="shipping-option-content">

                                                    <strong>
                                                        {
                                                            option.name
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            option.description
                                                        }
                                                    </span>

                                                </div>


                                                <strong className="shipping-price">

                                                    {option.price ===
                                                        0

                                                        ? "Free shipping"

                                                        : `$${option.price.toFixed(
                                                            2,
                                                        )}`}

                                                </strong>

                                            </label>
                                        ),
                                    )}

                                </div>


                                {/* =================================
                                    PAYMENT
                                ================================== */}

                                <div className="payment-section">


                                    <div className="checkout-section-header">

                                        <h2>
                                            PAYMENT METHOD
                                        </h2>

                                        <p>
                                            Choose your
                                            payment method.
                                        </p>

                                    </div>


                                    <div className="payment-methods">


                                        <button
                                            type="button"

                                            className={
                                                paymentMethod ===
                                                    "card"

                                                    ? "payment-option active"

                                                    : "payment-option"
                                            }

                                            onClick={() =>
                                                setPaymentMethod(
                                                    "card",
                                                )
                                            }
                                        >

                                            <span className="payment-radio" />


                                            <div>

                                                <strong>
                                                    Credit Card
                                                </strong>

                                                <small>
                                                    Mastercard / Visa
                                                </small>

                                            </div>


                                            <span className="card-symbol">
                                                ●●
                                            </span>

                                        </button>


                                        <button
                                            type="button"

                                            className={
                                                paymentMethod ===
                                                    "paypal"

                                                    ? "payment-option active"

                                                    : "payment-option"
                                            }

                                            onClick={() =>
                                                setPaymentMethod(
                                                    "paypal",
                                                )
                                            }
                                        >

                                            <span className="payment-radio" />


                                            <div>

                                                <strong>
                                                    Paypal
                                                </strong>

                                                <small>
                                                    Pay using PayPal
                                                </small>

                                            </div>


                                            <span className="paypal-symbol">
                                                P
                                            </span>

                                        </button>

                                    </div>


                                    {/* CARD INFO */}

                                    {paymentMethod ===
                                        "card" && (

                                            <div className="card-information">


                                                <CheckoutInput
                                                    label="Name on card"

                                                    value={
                                                        cardName
                                                    }

                                                    onChange={
                                                        setCardName
                                                    }
                                                />


                                                <CheckoutInput
                                                    label="Card number"

                                                    value={
                                                        cardNumber
                                                    }

                                                    onChange={
                                                        setCardNumber
                                                    }
                                                />


                                                <CheckoutInput
                                                    label="Expiry"

                                                    placeholder="MM/YY"

                                                    value={
                                                        cardExpiry
                                                    }

                                                    onChange={
                                                        setCardExpiry
                                                    }
                                                />


                                                <CheckoutInput
                                                    label="CVV"

                                                    value={
                                                        cardCvv
                                                    }

                                                    onChange={
                                                        setCardCvv
                                                    }
                                                />

                                            </div>
                                        )}


                                    {/* PAYPAL INFO */}

                                    {paymentMethod ===
                                        "paypal" && (

                                            <div className="paypal-information">

                                                <strong>
                                                    PayPal
                                                </strong>

                                                <p>
                                                    You will be
                                                    redirected to
                                                    PayPal after
                                                    confirming.
                                                </p>

                                            </div>
                                        )}

                                </div>


                                <div className="checkout-navigation">

                                    <button
                                        type="button"

                                        className="checkout-secondary-button"

                                        onClick={() => {

                                            setCurrentStep(
                                                2,
                                            );


                                            scrollToTop();
                                        }}
                                    >

                                        BACK

                                    </button>

                                </div>

                            </div>


                            <OrderSummary
                                subtotal={
                                    subtotal
                                }

                                discount={
                                    discount
                                }

                                shipping={
                                    shippingPrice
                                }

                                total={
                                    totalPrice
                                }

                                products={
                                    cartProducts
                                }
                            >

                                <button
                                    type="button"

                                    className="checkout-primary-button"

                                    onClick={
                                        handleReviewOrder
                                    }
                                >

                                    REVIEW YOUR ORDER

                                </button>

                            </OrderSummary>

                        </section>
                    )}


                {/* =====================================
                    STEP 4 — REVIEW
                ====================================== */}

                {currentStep ===
                    4 && (

                        <section className="checkout-main-layout review-layout">


                            <div className="review-left">


                                {/* =================================
                                    SHIPPING INFORMATION
                                ================================== */}

                                <div className="review-section">


                                    <div className="review-section-title">

                                        <div>

                                            <h2>
                                                SHIPPING INFORMATION
                                            </h2>

                                            <p>
                                                Please check before
                                                finalizing.
                                            </p>

                                        </div>


                                        <button
                                            type="button"

                                            onClick={() => {

                                                setCurrentStep(
                                                    2,
                                                );


                                                scrollToTop();
                                            }}
                                        >

                                            EDIT

                                        </button>

                                    </div>


                                    <div className="review-address-card">

                                        <strong>

                                            {
                                                customerInfo.firstName
                                            }{" "}

                                            {
                                                customerInfo.lastName
                                            }

                                        </strong>


                                        <span>
                                            {
                                                customerInfo.phone
                                            }
                                        </span>


                                        <span>

                                            {
                                                customerInfo.address
                                            },{" "}

                                            {
                                                customerInfo.city
                                            },{" "}

                                            {
                                                customerInfo.country
                                            }{" "}

                                            {
                                                customerInfo.zipCode
                                            }

                                        </span>


                                        <span>
                                            {
                                                customerInfo.email
                                            }
                                        </span>

                                    </div>


                                    <div className="review-shipping-card">

                                        <strong>

                                            {
                                                shippingOptions.find(
                                                    (
                                                        item,
                                                    ) =>
                                                        item.id ===
                                                        selectedShipping,
                                                )?.name
                                            }

                                        </strong>


                                        <span>

                                            {
                                                shippingOptions.find(
                                                    (
                                                        item,
                                                    ) =>
                                                        item.id ===
                                                        selectedShipping,
                                                )?.description
                                            }

                                        </span>


                                        <strong>

                                            {shippingPrice ===
                                                0

                                                ? "Free shipping"

                                                : `$${shippingPrice.toFixed(
                                                    2,
                                                )}`}

                                        </strong>

                                    </div>

                                </div>


                                {/* =================================
                                    PAYMENT INFORMATION
                                ================================== */}

                                <div className="review-section">


                                    <div className="review-section-title">

                                        <div>

                                            <h2>
                                                PAYMENT METHOD
                                            </h2>

                                            <p>
                                                Please check before
                                                finalizing.
                                            </p>

                                        </div>


                                        <button
                                            type="button"

                                            onClick={() => {

                                                setCurrentStep(
                                                    3,
                                                );


                                                scrollToTop();
                                            }}
                                        >

                                            EDIT

                                        </button>

                                    </div>


                                    <div className="review-payment-card">


                                        {paymentMethod ===
                                            "card"
                                            ? (

                                                <>

                                                    <div className="review-card-logo">
                                                        ●
                                                    </div>


                                                    <div>

                                                        <strong>
                                                            Credit Card
                                                        </strong>

                                                        <span>

                                                            •••• •••• ••••{" "}

                                                            {
                                                                cardNumber.slice(
                                                                    -4,
                                                                )
                                                            }

                                                        </span>

                                                    </div>

                                                </>

                                            )
                                            : (

                                                <>

                                                    <div className="review-card-logo">
                                                        P
                                                    </div>


                                                    <div>

                                                        <strong>
                                                            PayPal
                                                        </strong>

                                                        <span>
                                                            Payment via PayPal
                                                        </span>

                                                    </div>

                                                </>
                                            )}

                                    </div>

                                </div>


                                <button
                                    type="button"

                                    className="checkout-secondary-button"

                                    onClick={() => {

                                        setCurrentStep(
                                            3,
                                        );


                                        scrollToTop();
                                    }}
                                >

                                    BACK TO PAYMENT

                                </button>

                            </div>


                            <OrderSummary
                                subtotal={
                                    subtotal
                                }

                                discount={
                                    discount
                                }

                                shipping={
                                    shippingPrice
                                }

                                total={
                                    totalPrice
                                }

                                products={
                                    cartProducts
                                }
                            >

                                <button
                                    type="button"

                                    className="checkout-primary-button"

                                    onClick={
                                        handleConfirmOrder
                                    }
                                >

                                    CONFIRM MY ORDER

                                </button>

                            </OrderSummary>

                        </section>
                    )}


                {/* =====================================
                    WHY CHOOSE US
                ====================================== */}

                <WhyChooseUs />

            </div>

        </main>
    );
};


/* =====================================================
   CHECKOUT PROGRESS
===================================================== */

const CheckoutProgress = ({
    currentStep,
}: {
    currentStep: number;
}) => {

    const steps = [
        {
            number: 1,

            title: "ORDER",

            description:
                "Review products in your current order.",
        },

        {
            number: 2,

            title: "CUSTOMER INFORMATION",

            description:
                "Add your name, phone number and address.",
        },

        {
            number: 3,

            title: "SHIPPING & PAYMENT",

            description:
                "Choose shipping and payment method.",
        },

        {
            number: 4,

            title: "REVIEW",

            description:
                "Review all information before confirmation.",
        },
    ];


    return (

        <div className="checkout-progress">

            <div className="checkout-progress-line" />


            {steps.map(
                (
                    step,
                ) => (

                    <div
                        className="checkout-progress-step"

                        key={
                            step.number
                        }
                    >

                        <div
                            className={
                                currentStep >=
                                    step.number

                                    ? "checkout-progress-circle active"

                                    : "checkout-progress-circle"
                            }
                        >

                            {currentStep >
                                step.number

                                ? "✓"

                                : step.number}

                        </div>


                        <strong>
                            {
                                step.title
                            }
                        </strong>


                        <p>
                            {
                                step.description
                            }
                        </p>

                    </div>
                ),
            )}

        </div>
    );
};


/* =====================================================
   INPUT
===================================================== */

interface CheckoutInputProps {
    label: string;

    value: string;

    type?: string;

    placeholder?: string;

    onChange:
    (
        value: string,
    ) => void;
}


const CheckoutInput = ({
    label,

    value,

    type = "text",

    placeholder = "",

    onChange,
}: CheckoutInputProps) => {

    return (

        <div className="checkout-input">

            <label>
                {
                    label
                }
            </label>


            <input
                type={
                    type
                }

                value={
                    value
                }

                placeholder={
                    placeholder
                }

                onChange={(
                    event,
                ) =>
                    onChange(
                        event.target.value,
                    )
                }
            />

        </div>
    );
};


/* =====================================================
   ORDER SUMMARY
===================================================== */

interface OrderSummaryProps {
    subtotal: number;

    discount: number;

    shipping: number;

    total: number;

    products?: CheckoutProduct[];

    children?:
    ReactNode;
}


const OrderSummary = ({
    subtotal,

    discount,

    shipping,

    total,

    products,

    children,
}: OrderSummaryProps) => {

    return (

        <aside className="order-summary">


            <div className="order-summary-heading">

                <h2>
                    YOUR ORDER
                </h2>

                <p>
                    Review all products in your order.
                </p>

            </div>


            {/* =====================================
                PRODUCTS
            ====================================== */}

            {products &&
                products.length >
                0 && (

                    <div className="order-summary-products">

                        {products.map(
                            (
                                product,
                            ) => (

                                <div
                                    className="order-summary-product"

                                    key={
                                        product._id
                                    }
                                >

                                    <div>

                                        <img
                                            src={
                                                product.image
                                            }

                                            alt={
                                                product.productName
                                            }
                                        />

                                    </div>


                                    <section>

                                        <strong>
                                            {
                                                product.productName
                                            }
                                        </strong>


                                        <span>

                                            {
                                                product.quantity
                                            }{" "}

                                            item

                                        </span>


                                        <b>

                                            $

                                            {(
                                                product.productPrice *
                                                product.quantity
                                            ).toFixed(
                                                2,
                                            )}

                                        </b>

                                    </section>

                                </div>
                            ),
                        )}

                    </div>
                )}


            {/* =====================================
                VOUCHER
            ====================================== */}

            <div className="order-summary-voucher">

                <span>
                    Your voucher code
                </span>


                <input
                    type="text"

                    placeholder="Voucher"
                />

            </div>


            {/* =====================================
                PRICES
            ====================================== */}

            <div className="order-summary-prices">


                <div>

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ${subtotal.toFixed(2)}
                    </strong>

                </div>


                <div>

                    <span>
                        Shipping
                    </span>

                    <strong>

                        {shipping ===
                            0

                            ? "FREE"

                            : `$${shipping.toFixed(
                                2,
                            )}`}

                    </strong>

                </div>


                <div>

                    <span>
                        Discount 10%
                    </span>

                    <strong>
                        -${discount.toFixed(2)}
                    </strong>

                </div>


                <div className="summary-total">

                    <span>
                        Total Price
                    </span>

                    <strong>
                        ${total.toFixed(2)}
                    </strong>

                </div>

            </div>


            {children}

        </aside>
    );
};


/* =====================================================
   ORDER COMPLETED
===================================================== */

const OrderCompleted = ({
    orderNumber,

    total,

    customerName,
}: {
    orderNumber: string;

    total: number;

    customerName: string;
}) => {

    return (

        <section className="order-completed">


            <div className="order-completed-icon">
                ✓
            </div>


            <span className="order-completed-label">
                ORDER COMPLETED
            </span>


            <h1>
                THANK YOU FOR YOUR ORDER
            </h1>


            <p>

                {customerName
                    ? `Thank you, ${customerName}. `
                    : ""}

                Your order has been successfully
                confirmed.

                We will prepare your products
                for shipping.

            </p>


            <div className="order-completed-details">


                <div>

                    <span>
                        ORDER NUMBER
                    </span>

                    <strong>
                        #{orderNumber}
                    </strong>

                </div>


                <div>

                    <span>
                        ORDER STATUS
                    </span>

                    <strong className="order-status">
                        PROCESSING
                    </strong>

                </div>


                <div>

                    <span>
                        TOTAL
                    </span>

                    <strong>
                        ${total.toFixed(2)}
                    </strong>

                </div>

            </div>


            <div className="order-completed-message">

                <span>
                    ✓
                </span>


                <div>

                    <strong>
                        Your order is confirmed
                    </strong>

                    <p>
                        You can check your order
                        status from My Page.
                    </p>

                </div>

            </div>


            <div className="order-completed-actions">

                <Link
                    to="/mypage"

                    className="completed-orders-button"
                >
                    VIEW MY ORDERS
                </Link>


                <Link
                    to="/shop"

                    className="completed-shop-button"
                >
                    CONTINUE SHOPPING
                </Link>

            </div>

        </section>
    );
};


/* =====================================================
   WHY CHOOSE US
===================================================== */

const WhyChooseUs = () => {

    const items = [
        {
            icon:
                "◎",

            title:
                "GLOBAL DELIVERY",

            text:
                "Experience hassle-free shipping and seamless global connectivity with our trusted delivery service.",
        },

        {
            icon:
                "▣",

            title:
                "FREE SHIPPING",

            text:
                "Shop with confidence and enjoy free shipping services on selected products.",
        },

        {
            icon:
                "◯",

            title:
                "24/7 SUPPORTING",

            text:
                "Our customer support team is available to assist whenever you need help.",
        },

        {
            icon:
                "✉",

            title:
                "DAILY EMAIL",

            text:
                "Stay up-to-date with delivery information and new product announcements.",
        },

        {
            icon:
                "▤",

            title:
                "EASY PAYMENT",

            text:
                "Multiple secure payment options provide a simple checkout experience.",
        },

        {
            icon:
                "✥",

            title:
                "MONTHLY VOUCHER",

            text:
                "Receive special discounts, vouchers and exclusive offers every month.",
        },
    ];


    return (

        <section className="why-choose-section">


            <div className="checkout-section-center-title">

                <h2>
                    WHY CHOOSE US?
                </h2>

            </div>


            <div className="why-choose-grid">

                {items.map(
                    (
                        item,
                    ) => (

                        <article
                            key={
                                item.title
                            }
                        >

                            <div className="why-icon">
                                {
                                    item.icon
                                }
                            </div>


                            <strong>
                                {
                                    item.title
                                }
                            </strong>


                            <p>
                                {
                                    item.text
                                }
                            </p>

                        </article>
                    ),
                )}

            </div>

        </section>
    );
};


export default CartPage;
