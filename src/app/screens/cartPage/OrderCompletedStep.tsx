import { Link } from "react-router";
import "../../css/cartPage.css";
interface OrderCompletedStepProps {
    orderNumber: string;
    totalPrice: number;
}

const OrderCompletedStep = ({
    orderNumber,
    totalPrice,
}: OrderCompletedStepProps) => {
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
                Your order has been successfully received.
                We will prepare your products for shipping.
            </p>

            <div className="order-completed-details">
                <div>
                    <span>ORDER NUMBER</span>

                    <strong>
                        {orderNumber}
                    </strong>
                </div>

                <div>
                    <span>TOTAL</span>

                    <strong>
                        $
                        {totalPrice.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </strong>
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

export default OrderCompletedStep;
