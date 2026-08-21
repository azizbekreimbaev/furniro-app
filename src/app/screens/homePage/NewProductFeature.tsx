import { Link } from "react-router";
import type { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";

interface NewProductFeatureProps {
    product: Product;
}

const NewProductFeature = ({
    product,
}: NewProductFeatureProps) => {
    return (
        <article className="home-new-feature">
            <Link
                to={`/product/${product._id}`}
                className="home-new-feature-image"
            >
                <img
                    src={`${serverApi}/${product.productImages?.[0]}`}
                    alt={product.productName}
                />

                <div className="home-new-feature-overlay" />

                <span className="home-new-feature-badge">
                    NEW COLLECTION
                </span>

                <div className="home-new-feature-view">
                    <span>DISCOVER</span>
                    <strong>↗</strong>
                </div>
            </Link>

            <div className="home-new-feature-content">
                <div>
                    <span className="home-new-feature-category">
                        {product.productCategory}
                    </span>

                    <Link
                        to={`/product/${product._id}`}
                        className="home-new-feature-name"
                    >
                        {product.productName}
                    </Link>
                </div>

                <strong className="home-new-feature-price">
                    $
                    {product.productPrice.toLocaleString(
                        "en-US",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}
                </strong>
            </div>
        </article>
    );
};

export default NewProductFeature;