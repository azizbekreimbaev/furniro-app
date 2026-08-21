import { Link } from "react-router";
import type { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";


interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

    return (
        <article className="home-product-card">

            <Link
                to={`/product/${product._id}`}
                className="home-product-card-image"
            >
                <img
                    src={`${serverApi}/${product.productImages?.[0]}`}
                    alt={product.productName}
                />

                <div className="home-product-card-overlay">
                    <span>VIEW PRODUCT</span>
                    <strong>→</strong>
                </div>
            </Link>

            <div className="home-product-card-content">

                <div className="home-product-card-top">

                    <span className="home-product-category">
                        {product.productCategory}
                    </span>

                    <span className="home-product-views">
                        {product.productViews?.toLocaleString()} views
                    </span>

                </div>

                <Link
                    to={`/product/${product._id}`}
                    className="home-product-name"
                >
                    {product.productName}
                </Link>

                <strong className="home-product-price">
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

export default ProductCard;