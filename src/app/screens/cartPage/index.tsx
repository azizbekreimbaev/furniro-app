import { useMemo, useState } from "react";
import { Link } from "react-router";

import "../../css/cartpage.css";
import heroImage from "../../../../public/images/banner.png";

interface CartProduct {
    _id: string;
    productName: string;
    productPrice: number;
    quantity: number;
    color: string;
    size: string;
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

type PaymentMethod = "card" | "paypal";

const initialProducts: CartProduct[] = [
    {
        _id: "1",
        productName: "Modern Black Standing Metal Light",
        productPrice: 235.41,
        quantity: 1,
        color: "Black",
        size: "Large",
        image: heroImage,
    },
    {
        _id: "2",
        productName: "Modern Black Hanging Light",
        productPrice: 55.73,
        quantity: 1,
        color: "Gray",
        size: "Large",
        image: heroImage,
    },
    {
        _id: "3",
        productName: "Modern Black Standing Metal Light",
        productPrice: 352.41,
        quantity: 1,
        color: "Black",
        size: "Medium",
        image: heroImage,
    },
];

const shippingOptions: ShippingOption[] = [
    {
        id: "dhl",
        name: "DHL Express",
        description: "Estimated delivery time 1-2 days",
        price: 0,
    },
    {
        id: "fedex",
        name: "FedEx",
        description: "Estimated delivery time 2-3 days",
        price: 25,
    },
    {
        id: "expedition",
        name: "Express Expedition",
        description: "Estimated delivery time 2-3 days",
        price: 35,
    },
    {
        id: "jne",
        name: "JNE Express",
        description: "Estimated delivery time 3-4 days",
        price: 35,
    },
    {
        id: "pos",
        name: "POS Indonesia",
        description: "Estimated delivery time 3-5 days",
        price: 35,
    },
];

const CartPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [cartProducts, setCartProducts] =
        useState<CartProduct[]>(initialProducts);

    const [customerInfo, setCustomerInfo] =
        useState<CustomerInformation>({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "",
            city: "",
            zipCode: "",
            address: "",
        });

    const [selectedShipping, setSelectedShipping] =
        useState("dhl");

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("card");

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");

    const [orderNumber, setOrderNumber] = useState("");

    /* ==============================
       PRICE
    ============================== */

    const subtotal = useMemo(() => {
        return cartProducts.reduce(
            (total, product) =>
                total +
                product.productPrice * product.quantity,
            0
        );
    }, [cartProducts]);

    const discount = subtotal * 0.1;

    const shippingPrice =
        shippingOptions.find(
            (item) => item.id === selectedShipping
        )?.price ?? 0;

    const totalPrice =
        subtotal - discount + shippingPrice;

    /* ==============================
       CART
    ============================== */

    const increaseQuantity = (id: string) => {
        setCartProducts((products) =>
            products.map((product) =>
                product._id === id
                    ? {
                        ...product,
                        quantity: product.quantity + 1,
                    }
                    : product
            )
        );
    };

    const decreaseQuantity = (id: string) => {
        setCartProducts((products) =>
            products.map((product) =>
                product._id === id
                    ? {
                        ...product,
                        quantity:
                            product.quantity > 1
                                ? product.quantity - 1
                                : 1,
                    }
                    : product
            )
        );
    };

    const removeProduct = (id: string) => {
        setCartProducts((products) =>
            products.filter(
                (product) => product._id !== id
            )
        );
    };

    /* ==============================
       CUSTOMER INFORMATION
    ============================== */

    const handleContinueToShipping = () => {
        const requiredFields =
            customerInfo.firstName &&
            customerInfo.lastName &&
            customerInfo.email &&
            customerInfo.phone &&
            customerInfo.country &&
            customerInfo.city &&
            customerInfo.address;

        if (!requiredFields) {
            alert("Please complete your information.");
            return;
        }

        setCurrentStep(3);
        scrollToTop();
    };

    /* ==============================
       REVIEW
    ============================== */

    const handleReviewOrder = () => {
        if (
            paymentMethod === "card" &&
            (!cardName ||
                !cardNumber ||
                !cardExpiry ||
                !cardCvv)
        ) {
            alert("Please complete your card information.");
            return;
        }

        setCurrentStep(4);
        scrollToTop();
    };

    /* ==============================
       COMPLETE ORDER
    ============================== */

    const handleConfirmOrder = () => {
        const random = Math.floor(
            100000 + Math.random() * 900000
        );

        setOrderNumber(
            `FRN-${new Date().getFullYear()}-${random}`
        );

        setCurrentStep(5);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /* ==============================
       RENDER
    ============================== */

    return (
        <main className="cart-page">
            <div className="cart-page-container">
                {/* ==============================
            PAGE TITLE
        ============================== */}

                {currentStep !== 5 && (
                    <section className="checkout-heading">
                        <h1>
                            {currentStep === 1 &&
                                "SHOPPING CART"}

                            {currentStep === 2 &&
                                "SHIPPING & PAYMENT"}

                            {currentStep === 3 &&
                                "CUSTOMER INFORMATION"}

                            {currentStep === 4 &&
                                "REVIEW AND CONFIRMATION"}
                        </h1>

                        <p>
                            {currentStep === 1 &&
                                "THIS IS YOUR CART BASED ON WHAT YOU WANTED TO BUY"}

                            {currentStep === 2 &&
                                "CHOOSE THE PAYMENT AND SHIPPING METHOD YOU WANT"}

                            {currentStep === 3 &&
                                "PROVIDE YOUR REQUIRED INFORMATION TO COMPLETE THE PROCESS"}

                            {currentStep === 4 &&
                                "LOOKBACK ONE MORE TIME TO CONFIRM YOUR ADDRESS AND ALL YOUR PRODUCTS"}
                        </p>
                    </section>
                )}

                {/* ==============================
            PROGRESS
        ============================== */}

                {currentStep !== 5 && (
                    <CheckoutProgress
                        currentStep={currentStep}
                    />
                )}

                {/* ==============================
            STEP 1 - CART
        ============================== */}

                {currentStep === 1 && (
                    <section className="checkout-main-layout">
                        <div className="cart-products-column">
                            {cartProducts.length > 0 ? (
                                cartProducts.map((product) => (
                                    <div
                                        className="checkout-cart-product"
                                        key={product._id}
                                    >
                                        <div className="checkout-product-image">
                                            <img
                                                src={product.image}
                                                alt={product.productName}
                                            />
                                        </div>

                                        <div className="checkout-product-body">
                                            <div className="checkout-product-top">
                                                <div>
                                                    <h3>
                                                        {product.productName}
                                                    </h3>

                                                    <div className="checkout-stars">
                                                        ★★★★★
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="checkout-remove"
                                                    onClick={() =>
                                                        removeProduct(product._id)
                                                    }
                                                >
                                                    REMOVE
                                                </button>
                                            </div>

                                            <div className="checkout-product-options">


                                                <div className="checkout-color-list">
                                                    <span className="cart-color-blue" />
                                                    <span className="cart-color-gray" />
                                                    <span className="cart-color-black" />
                                                    <span className="cart-color-purple" />
                                                </div>
                                            </div>

                                            <div className="checkout-product-bottom">
                                                <div className="checkout-quantity">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                product._id
                                                            )
                                                        }
                                                    >
                                                        −
                                                    </button>

                                                    <span>
                                                        {product.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                product._id
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <strong>
                                                    $
                                                    {(
                                                        product.productPrice *
                                                        product.quantity
                                                    ).toFixed(2)}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="cart-empty">
                                    <h2>Your cart is empty</h2>

                                    <Link to="/shop">
                                        GO TO SHOP
                                    </Link>
                                </div>
                            )}
                        </div>

                        <OrderSummary
                            subtotal={subtotal}
                            discount={discount}
                            shipping={shippingPrice}
                            total={totalPrice}
                        >
                            <button
                                type="button"
                                className="checkout-primary-button"
                                disabled={
                                    cartProducts.length === 0
                                }
                                onClick={() => {
                                    setCurrentStep(2);
                                    scrollToTop();
                                }}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </OrderSummary>
                    </section>
                )}

                {/* ==============================
            STEP 2 - INFORMATION
        ============================== */}

                {currentStep === 2 && (
                    <section className="checkout-main-layout">
                        <div className="checkout-form-section">
                            <div className="checkout-section-header">
                                <h2>YOUR INFORMATION</h2>

                                <p>
                                    Add your name, phone number and
                                    address.
                                </p>
                            </div>

                            <div className="customer-information-grid">
                                <CheckoutInput
                                    label="Your first name"
                                    value={customerInfo.firstName}
                                    onChange={(value) =>
                                        setCustomerInfo((prev) => ({
                                            ...prev,
                                            firstName: value,
                                        }))
                                    }
                                />

                                <CheckoutInput
                                    label="Your last name"
                                    value={customerInfo.lastName}
                                    onChange={(value) =>
                                        setCustomerInfo((prev) => ({
                                            ...prev,
                                            lastName: value,
                                        }))
                                    }
                                />

                                <CheckoutInput
                                    label="Your email"
                                    type="email"
                                    value={customerInfo.email}
                                    onChange={(value) =>
                                        setCustomerInfo((prev) => ({
                                            ...prev,
                                            email: value,
                                        }))
                                    }
                                />

                                <CheckoutInput
                                    label="Phone number"
                                    value={customerInfo.phone}
                                    onChange={(value) =>
                                        setCustomerInfo((prev) => ({
                                            ...prev,
                                            phone: value,
                                        }))
                                    }
                                />

                                <CheckoutInput
                                    label="Country"
                                    value={customerInfo.country}
                                    onChange={(value) =>
                                        setCustomerInfo((prev) => ({
                                            ...prev,
                                            country: value,
                                        }))
                                    }
                                />

                                <CheckoutInput
                                    label="City"
                                    value={customerInfo.city}
                                    onChange={(value) =>
                                        setCustomerInfo((prev) => ({
                                            ...prev,
                                            city: value,
                                        }))
                                    }
                                />

                                <CheckoutInput
                                    label="ZIP Code"
                                    value={customerInfo.zipCode}
                                    onChange={(value) =>
                                        setCustomerInfo((prev) => ({
                                            ...prev,
                                            zipCode: value,
                                        }))
                                    }
                                />

                                <div className="checkout-input-full">
                                    <CheckoutInput
                                        label="Address details"
                                        value={customerInfo.address}
                                        onChange={(value) =>
                                            setCustomerInfo((prev) => ({
                                                ...prev,
                                                address: value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="checkout-navigation">
                                <button
                                    type="button"
                                    className="checkout-secondary-button"
                                    onClick={() => {
                                        setCurrentStep(1);
                                        scrollToTop();
                                    }}
                                >
                                    BACK TO CART
                                </button>
                            </div>
                        </div>

                        <OrderSummary
                            subtotal={subtotal}
                            discount={discount}
                            shipping={shippingPrice}
                            total={totalPrice}
                            products={cartProducts}
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

                {/* ==============================
            STEP 3 - SHIPPING + PAYMENT
        ============================== */}

                {currentStep === 3 && (
                    <section className="checkout-main-layout">
                        <div className="checkout-form-section">
                            <div className="checkout-section-header">
                                <h2>SHIPPING SERVICE</h2>

                                <p>
                                    Choose one best shipping service
                                    for your needs.
                                </p>
                            </div>

                            <div className="shipping-options">
                                {shippingOptions.map((option) => (
                                    <label
                                        key={option.id}
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
                                                    option.id
                                                )
                                            }
                                        />

                                        <div className="shipping-option-content">
                                            <strong>
                                                {option.name}
                                            </strong>

                                            <span>
                                                {option.description}
                                            </span>
                                        </div>

                                        <strong className="shipping-price">
                                            {option.price === 0
                                                ? "Free shipping"
                                                : `$${option.price.toFixed(
                                                    2
                                                )}`}
                                        </strong>
                                    </label>
                                ))}
                            </div>

                            <div className="payment-section">
                                <div className="checkout-section-header">
                                    <h2>PAYMENT METHOD</h2>

                                    <p>
                                        Choose what service you want for
                                        your transaction.
                                    </p>
                                </div>

                                <div className="payment-methods">
                                    <button
                                        type="button"
                                        className={
                                            paymentMethod === "card"
                                                ? "payment-option active"
                                                : "payment-option"
                                        }
                                        onClick={() =>
                                            setPaymentMethod("card")
                                        }
                                    >
                                        <span className="payment-radio" />

                                        <div>
                                            <strong>Credit Card</strong>
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
                                            paymentMethod === "paypal"
                                                ? "payment-option active"
                                                : "payment-option"
                                        }
                                        onClick={() =>
                                            setPaymentMethod("paypal")
                                        }
                                    >
                                        <span className="payment-radio" />

                                        <div>
                                            <strong>Paypal</strong>
                                            <small>
                                                Pay using your Paypal account
                                            </small>
                                        </div>

                                        <span className="paypal-symbol">
                                            P
                                        </span>
                                    </button>
                                </div>

                                {paymentMethod === "card" && (
                                    <div className="card-information">
                                        <CheckoutInput
                                            label="Name on card"
                                            value={cardName}
                                            onChange={setCardName}
                                        />

                                        <CheckoutInput
                                            label="Card number"
                                            value={cardNumber}
                                            onChange={setCardNumber}
                                        />

                                        <CheckoutInput
                                            label="Expiry"
                                            placeholder="MM/YY"
                                            value={cardExpiry}
                                            onChange={setCardExpiry}
                                        />

                                        <CheckoutInput
                                            label="CVV"
                                            value={cardCvv}
                                            onChange={setCardCvv}
                                        />
                                    </div>
                                )}

                                {paymentMethod === "paypal" && (
                                    <div className="paypal-information">
                                        <strong>PayPal</strong>

                                        <p>
                                            You will be redirected to PayPal
                                            after confirming your order.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="checkout-navigation">
                                <button
                                    type="button"
                                    className="checkout-secondary-button"
                                    onClick={() => {
                                        setCurrentStep(2);
                                        scrollToTop();
                                    }}
                                >
                                    BACK
                                </button>
                            </div>
                        </div>

                        <OrderSummary
                            subtotal={subtotal}
                            discount={discount}
                            shipping={shippingPrice}
                            total={totalPrice}
                            products={cartProducts}
                        >
                            <button
                                type="button"
                                className="checkout-primary-button"
                                onClick={handleReviewOrder}
                            >
                                REVIEW YOUR ORDER
                            </button>
                        </OrderSummary>
                    </section>
                )}

                {/* ==============================
            STEP 4 - REVIEW
        ============================== */}

                {currentStep === 4 && (
                    <section className="checkout-main-layout review-layout">
                        <div className="review-left">
                            <div className="review-section">
                                <div className="review-section-title">
                                    <div>
                                        <h2>SHIPPING INFORMATION</h2>

                                        <p>
                                            Please check before you finalize
                                            your order.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCurrentStep(2);
                                            scrollToTop();
                                        }}
                                    >
                                        EDIT
                                    </button>
                                </div>

                                <div className="review-address-card">
                                    <strong>
                                        {customerInfo.firstName}{" "}
                                        {customerInfo.lastName}
                                    </strong>

                                    <span>
                                        {customerInfo.phone}
                                    </span>

                                    <span>
                                        {customerInfo.address},{" "}
                                        {customerInfo.city},{" "}
                                        {customerInfo.country}{" "}
                                        {customerInfo.zipCode}
                                    </span>

                                    <span>
                                        {customerInfo.email}
                                    </span>
                                </div>

                                <div className="review-shipping-card">
                                    <strong>
                                        {
                                            shippingOptions.find(
                                                (item) =>
                                                    item.id ===
                                                    selectedShipping
                                            )?.name
                                        }
                                    </strong>

                                    <span>
                                        {
                                            shippingOptions.find(
                                                (item) =>
                                                    item.id ===
                                                    selectedShipping
                                            )?.description
                                        }
                                    </span>

                                    <strong>
                                        {shippingPrice === 0
                                            ? "Free shipping"
                                            : `$${shippingPrice.toFixed(
                                                2
                                            )}`}
                                    </strong>
                                </div>
                            </div>

                            <div className="review-section">
                                <div className="review-section-title">
                                    <div>
                                        <h2>PAYMENT METHOD</h2>

                                        <p>
                                            Please check before you finalize
                                            your order.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCurrentStep(3);
                                            scrollToTop();
                                        }}
                                    >
                                        EDIT
                                    </button>
                                </div>

                                <div className="review-payment-card">
                                    {paymentMethod === "card" ? (
                                        <>
                                            <div className="review-card-logo">
                                                ●
                                            </div>

                                            <div>
                                                <strong>Credit Card</strong>

                                                <span>
                                                    •••• •••• ••••{" "}
                                                    {cardNumber.slice(-4)}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="review-card-logo">
                                                P
                                            </div>

                                            <div>
                                                <strong>PayPal</strong>

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
                                    setCurrentStep(3);
                                    scrollToTop();
                                }}
                            >
                                BACK TO PAYMENT
                            </button>
                        </div>

                        <OrderSummary
                            subtotal={subtotal}
                            discount={discount}
                            shipping={shippingPrice}
                            total={totalPrice}
                            products={cartProducts}
                        >
                            <button
                                type="button"
                                className="checkout-primary-button"
                                onClick={handleConfirmOrder}
                            >
                                CONFIRM MY ORDER
                            </button>
                        </OrderSummary>
                    </section>
                )}

                {/* ==============================
            STEP 5 - COMPLETED
        ============================== */}

                {currentStep === 5 && (
                    <OrderCompleted
                        orderNumber={orderNumber}
                        total={totalPrice}
                        customerName={`${customerInfo.firstName} ${customerInfo.lastName}`}
                    />
                )}

                {/* ==============================
            WHY CHOOSE US
        ============================== */}

                <WhyChooseUs />
            </div>
        </main>
    );
};

/* =====================================================
   PROGRESS
===================================================== */

const CheckoutProgress = ({
    currentStep,
}: {
    currentStep: number;
}) => {
    const steps = [
        {
            number: 1,
            title: "CART",
            description:
                "Review all your products and edit the number.",
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
                "With secure payment method.",
        },
        {
            number: 4,
            title: "REVIEW",
            description:
                "View all your information before confirmation.",
        },
    ];

    return (
        <div className="checkout-progress">
            <div className="checkout-progress-line" />

            {steps.map((step) => (
                <div
                    className="checkout-progress-step"
                    key={step.number}
                >
                    <div
                        className={
                            currentStep >= step.number
                                ? "checkout-progress-circle active"
                                : "checkout-progress-circle"
                        }
                    >
                        {currentStep > step.number
                            ? "✓"
                            : step.number}
                    </div>

                    <strong>
                        {step.title}
                    </strong>

                    <p>
                        {step.description}
                    </p>
                </div>
            ))}
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
    onChange: (value: string) => void;
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
                {label}
            </label>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(event) =>
                    onChange(event.target.value)
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
    products?: CartProduct[];
    children?: React.ReactNode;
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
                <h2>YOUR ORDER</h2>

                <p>
                    Review all the products you want to buy.
                </p>
            </div>

            {products && (
                <div className="order-summary-products">
                    {products.map((product) => (
                        <div
                            className="order-summary-product"
                            key={product._id}
                        >
                            <div>
                                <img
                                    src={product.image}
                                    alt={product.productName}
                                />
                            </div>

                            <section>
                                <strong>
                                    {product.productName}
                                </strong>

                                <span>
                                    {product.quantity} item
                                </span>

                                <b>
                                    $
                                    {(
                                        product.productPrice *
                                        product.quantity
                                    ).toFixed(2)}
                                </b>
                            </section>
                        </div>
                    ))}
                </div>
            )}

            <div className="order-summary-voucher">
                <span>
                    Your voucher code
                </span>

                <input
                    type="text"
                    placeholder="Voucher"
                />
            </div>

            <div className="order-summary-prices">
                <div>
                    <span>Subtotal</span>

                    <strong>
                        ${subtotal.toFixed(2)}
                    </strong>
                </div>

                <div>
                    <span>Shipping</span>

                    <strong>
                        {shipping === 0
                            ? "FREE"
                            : `$${shipping.toFixed(2)}`}
                    </strong>
                </div>

                <div>
                    <span>Discount 10%</span>

                    <strong>
                        -${discount.toFixed(2)}
                    </strong>
                </div>

                <div className="summary-total">
                    <span>Total Price</span>

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
   COMPLETED
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
                Your order has been successfully received.
                We will prepare your products for shipping.
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
                <span>✓</span>

                <div>
                    <strong>
                        Your order is confirmed
                    </strong>

                    <p>
                        You can check your order status from My
                        Page.
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
            icon: "◎",
            title: "GLOBAL DELIVERY",
            text: "Experience hassle-free shipping and seamless global connectivity with our trusted delivery service.",
        },
        {
            icon: "▣",
            title: "FREE SHIPPING",
            text: "Shop with confidence and enjoy free shipping services on selected products.",
        },
        {
            icon: "◯",
            title: "24/7 SUPPORTING",
            text: "Our customer support team is available to assist whenever you need help.",
        },
        {
            icon: "✉",
            title: "DAILY EMAIL",
            text: "Stay up-to-date with delivery information and new product announcements.",
        },
        {
            icon: "▤",
            title: "EASY PAYMENT",
            text: "Multiple secure payment options provide a simple checkout experience.",
        },
        {
            icon: "✥",
            title: "MONTHLY VOUCHER",
            text: "Receive special discounts, vouchers and exclusive offers every month.",
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
                {items.map((item) => (
                    <article key={item.title}>
                        <div className="why-icon">
                            {item.icon}
                        </div>

                        <strong>
                            {item.title}
                        </strong>

                        <p>
                            {item.text}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default CartPage;