import ProductCard from "./ProductCard";

import type {
    ShopProduct,
} from "./shop.data";

interface ProductGridProps {
    products: ShopProduct[];

    onAddToCart: (
        product: ShopProduct
    ) => void;
}

const ProductGrid = ({
    products,
    onAddToCart,
}: ProductGridProps) => {
    if (products.length === 0) {
        return (
            <div className="shop-empty">
                <span>
                    NO RESULTS
                </span>

                <h2>
                    WE COULDN'T FIND
                    <br />
                    THAT PRODUCT.
                </h2>

                <p>
                    Try another search or
                    explore a different
                    category.
                </p>
            </div>
        );
    }

    return (
        <div className="shop-product-grid">
            {products.map(
                (product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onAddToCart={
                            onAddToCart
                        }
                    />
                )
            )}
        </div>
    );
};

export default ProductGrid;