import { useMemo, useState } from "react";

import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import { Link } from "react-router";

import heroImage from "../../../public/images/banner.png";

interface BasketProps {
    open: boolean;
    onClose: () => void;
}

interface BasketItem {
    _id: string;
    productName: string;
    productPrice: number;
    quantity: number;
    image: string;
}

const initialBasketItems: BasketItem[] = [
    {
        _id: "1",
        productName: "Urban Luxe Arm Chair",
        productPrice: 2688.15,
        quantity: 1,
        image: heroImage,
    },
    {
        _id: "2",
        productName: "Modern Black Hanging Light",
        productPrice: 1595.6,
        quantity: 1,
        image: heroImage,
    },
];

const Basket = ({
    open,
    onClose,
}: BasketProps) => {
    const [basketItems, setBasketItems] =
        useState<BasketItem[]>(initialBasketItems);

    /* ============================
       PLUS
    ============================ */

    const handleIncrease = (productId: string) => {
        setBasketItems((prev) =>
            prev.map((item) =>
                item._id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    /* ============================
       MINUS
    ============================ */

    const handleDecrease = (productId: string) => {
        setBasketItems((prev) =>
            prev.map((item) => {
                if (item._id !== productId) {
                    return item;
                }

                return {
                    ...item,
                    quantity:
                        item.quantity > 1
                            ? item.quantity - 1
                            : 1,
                };
            })
        );
    };

    /* ============================
       REMOVE ONE PRODUCT
    ============================ */

    const handleRemove = (productId: string) => {
        setBasketItems((prev) =>
            prev.filter(
                (item) => item._id !== productId
            )
        );
    };

    /* ============================
       CLEAR BASKET
    ============================ */

    const handleClearBasket = () => {
        setBasketItems([]);
    };

    /* ============================
       SUBTOTAL
    ============================ */

    const subtotal = useMemo(() => {
        return basketItems.reduce(
            (total, item) =>
                total +
                item.productPrice * item.quantity,
            0
        );
    }, [basketItems]);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        width: {
                            xs: "100%",
                            sm: 430,
                        },
                    },
                },
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* ============================
            HEADER
        ============================ */}

                <Box
                    sx={{
                        px: 3,
                        py: 2.5,

                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 19,
                                fontWeight: 700,
                            }}
                        >
                            Shopping Basket
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 11,
                                color: "#999",
                            }}
                        >
                            {basketItems.length} products
                        </Typography>
                    </Box>

                    {/* CLOSE / CANCEL */}

                    <IconButton
                        onClick={onClose}
                        sx={{
                            width: 38,
                            height: 38,
                            border: "1px solid #ddd",
                        }}
                    >
                        ✕
                    </IconButton>
                </Box>

                <Divider />

                {/* ============================
            PRODUCTS
        ============================ */}

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        px: 3,
                    }}
                >
                    {basketItems.length === 0 ? (
                        <Box
                            sx={{
                                minHeight: 300,

                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                }}
                            >
                                Your basket is empty
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    mb: 3,

                                    color: "#999",
                                    fontSize: 11,
                                }}
                            >
                                Add some furniture to your basket.
                            </Typography>

                            <Button
                                component={Link}
                                to="/shop"
                                onClick={onClose}
                                variant="contained"
                                sx={{
                                    borderRadius: 0,
                                    background: "#222",

                                    px: 4,
                                    py: 1.3,

                                    fontSize: 10,

                                    "&:hover": {
                                        background: "#000",
                                    },
                                }}
                            >
                                Go To Shop
                            </Button>
                        </Box>
                    ) : (
                        basketItems.map((item) => (
                            <Box
                                key={item._id}
                                sx={{
                                    py: 2.5,

                                    borderBottom:
                                        "1px solid #eeeeee",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                >
                                    {/* IMAGE */}

                                    <Box
                                        component={Link}
                                        to={`/product/${item._id}`}
                                        onClick={onClose}
                                        sx={{
                                            width: 95,
                                            height: 95,

                                            flexShrink: 0,

                                            background: "#f5f5f5",

                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt={item.productName}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Box>

                                    {/* INFO */}

                                    <Box
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            sx={{
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    component={Link}
                                                    to={`/product/${item._id}`}
                                                    onClick={onClose}
                                                    sx={{
                                                        color: "#222",
                                                        fontSize: 13,
                                                        fontWeight: 600,

                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    {item.productName}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        mt: 0.7,

                                                        color: "#999",

                                                        fontSize: 10,
                                                    }}
                                                >
                                                    Furniture
                                                </Typography>
                                            </Box>

                                            {/* REMOVE */}

                                            <IconButton
                                                onClick={() =>
                                                    handleRemove(item._id)
                                                }
                                                sx={{
                                                    width: 28,
                                                    height: 28,

                                                    color: "#999",

                                                    fontSize: 15,

                                                    "&:hover": {
                                                        color: "#d32f2f",
                                                    },
                                                }}
                                            >
                                                ✕
                                            </IconButton>
                                        </Stack>

                                        <Typography
                                            sx={{
                                                mt: 1,

                                                fontSize: 12,
                                                fontWeight: 600,
                                            }}
                                        >
                                            $
                                            {item.productPrice.toLocaleString(
                                                "en-US",
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </Typography>

                                        {/* QUANTITY */}

                                        <Stack
                                            direction="row"
                                            sx={{
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                mt: 1.5
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                sx={{
                                                    alignItems: "center",
                                                    border:
                                                        "1px solid #dddddd",
                                                }}
                                            >
                                                {/* MINUS */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDecrease(item._id)
                                                    }
                                                    style={{
                                                        width: "32px",
                                                        height: "30px",

                                                        border: "none",

                                                        background:
                                                            "transparent",

                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    −
                                                </button>

                                                <Box
                                                    sx={{
                                                        width: 35,

                                                        textAlign: "center",

                                                        fontSize: 11,
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Box>

                                                {/* PLUS */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleIncrease(item._id)
                                                    }
                                                    style={{
                                                        width: "32px",
                                                        height: "30px",

                                                        border: "none",

                                                        background:
                                                            "transparent",

                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </Stack>

                                            {/* ITEM TOTAL */}

                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                $
                                                {(
                                                    item.productPrice *
                                                    item.quantity
                                                ).toLocaleString(
                                                    "en-US",
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Stack>

                                {/* REMOVE TEXT */}

                                <Button
                                    onClick={() =>
                                        handleRemove(item._id)
                                    }
                                    sx={{
                                        mt: 1,

                                        p: 0,

                                        minWidth: "auto",

                                        color: "#999",

                                        fontSize: 9,

                                        textTransform: "none",

                                        textDecoration: "underline",

                                        "&:hover": {
                                            color: "#222",
                                            background: "transparent",
                                        },
                                    }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))
                    )}
                </Box>

                {/* ============================
            BOTTOM
        ============================ */}

                {basketItems.length > 0 && (
                    <>
                        <Divider />

                        <Box
                            sx={{
                                p: 3,
                            }}
                        >
                            {/* SUBTOTAL */}

                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        color: "#777",
                                    }}
                                >
                                    Subtotal
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                    }}
                                >
                                    $
                                    {subtotal.toLocaleString(
                                        "en-US",
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }
                                    )}
                                </Typography>
                            </Stack>

                            <Typography
                                sx={{
                                    mt: 1,

                                    color: "#aaa",

                                    fontSize: 9,
                                }}
                            >
                                Shipping and taxes will be
                                calculated at checkout.
                            </Typography>

                            {/* ORDER PAGE */}

                            <Button
                                fullWidth
                                component={Link}
                                to="/cart"
                                onClick={onClose}
                                sx={{
                                    mt: 2.5,

                                    height: 45,

                                    borderRadius: 0,

                                    color: "#fff",
                                    background: "#222",

                                    fontSize: 10,
                                    fontWeight: 600,

                                    letterSpacing: 1,

                                    "&:hover": {
                                        background: "#000",
                                    },
                                }}
                            >
                                VIEW ORDER
                            </Button>

                            {/* CONTINUE SHOPPING */}

                            <Button
                                fullWidth
                                component={Link}
                                to="/shop"
                                onClick={onClose}
                                sx={{
                                    mt: 1,

                                    height: 43,

                                    borderRadius: 0,

                                    color: "#222",
                                    background: "#fff",

                                    border: "1px solid #222",

                                    fontSize: 10,

                                    "&:hover": {
                                        background: "#f5f5f5",
                                    },
                                }}
                            >
                                CONTINUE SHOPPING
                            </Button>

                            {/* CLEAR */}

                            <Button
                                fullWidth
                                onClick={handleClearBasket}
                                sx={{
                                    mt: 1,

                                    color: "#999",

                                    fontSize: 9,

                                    textTransform: "none",

                                    "&:hover": {
                                        color: "#d32f2f",
                                        background: "transparent",
                                    },
                                }}
                            >
                                Clear Basket
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default Basket;