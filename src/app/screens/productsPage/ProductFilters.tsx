interface ProductFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (
        category: string
    ) => void;
}

const ProductFilters = ({
    categories,
    activeCategory,
    onCategoryChange,
}: ProductFiltersProps) => {
    return (
        <div className="shop-filters">
            {categories.map(
                (category) => (
                    <button
                        key={category}
                        type="button"
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
    );
};

export default ProductFilters;