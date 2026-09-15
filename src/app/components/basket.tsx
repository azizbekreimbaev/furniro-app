import {
    useMemo,
    useState,
} from "react";

import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import {
    Link,
    useNavigate,
} from "react-router";

import {
    serverApi,
} from "../../libs/config";

import {
    useGlobals,
} from "../hooks/useGlobals";

import OrderService
    from "../services/OrderService";


interface BasketProps {
    open: boolean;

    onClose: () => void;
}


const Basket = ({
    open,
    onClose,
}: BasketProps) => {

    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navigate =
        useNavigate();


    /* =====================================================
       GLOBAL CONTEXT
    ===================================================== */

    const {
        authMember,
        basket,
        setOrderBuilder,
    } = useGlobals();


    const {
        cartItems,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll,
    } = basket;


    /* =====================================================
       STATE
    ===================================================== */

    const [
        creatingOrder,
        setCreatingOrder,
    ] = useState(false);


    /* =====================================================
       SUBTOTAL
    ===================================================== */

    const subtotal =
        useMemo(() => {

            return cartItems.reduce(
                (
                    total,
                    item,
                ) => {

                    return (
                        total +
                        item.price *
                        item.quantity
                    );
                },
                0,
            );

        }, [cartItems]);


    /* =====================================================
       VIEW ORDER / CREATE ORDER
    ===================================================== */

    const proceedOrderHandler =
        async () => {

            /*
             * User bir necha marta tez-tez
             * bosib duplicate order yaratmasligi uchun.
             */

            if (creatingOrder) {
                return;
            }


            try {

                /* ==============================
                   LOGIN CHECK
                ============================== */

                if (!authMember) {

                    alert(
                        "Please login first.",
                    );

                    return;
                }


                /* ==============================
                   EMPTY BASKET CHECK
                ============================== */

                if (
                    cartItems.length === 0
                ) {

                    alert(
                        "Your basket is empty.",
                    );

                    return;
                }


                setCreatingOrder(
                    true,
                );


                /* ==============================
                   ORDER SERVICE
                ============================== */

                const orderService =
                    new OrderService();


                /*
                 * cartItems:
                 *
                 * [
                 *   {
                 *      _id,
                 *      name,
                 *      price,
                 *      quantity,
                 *      image
                 *   }
                 * ]
                 *
                 *
                 * OrderService ichida:
                 *
                 * CartItem[]
                 *       ↓
                 * OrderItemInput[]
                 *
                 * {
                 *   productId,
                 *   itemQuantity,
                 *   itemPrice
                 * }
                 */


                const newOrder =
                    await orderService
                        .createOrder(
                            cartItems,
                        );


                console.log(
                    "NEW PENDING ORDER:",
                    newOrder,
                );


                /*
                 * MUHIM:
                 *
                 * Basket faqat backend order
                 * muvaffaqiyatli yaratilgandan
                 * keyin tozalanadi.
                 */

                onDeleteAll();


                /*
                 * CartPage / OrdersPage
                 * yangi PENDING orderni
                 * qayta fetch qilishi uchun.
                 */

                setOrderBuilder(
                    new Date(),
                );


                /*
                 * Basket drawerni yopamiz.
                 */

                onClose();


                /*
                 * Endi CartPage ochiladi.
                 *
                 * CartPage:
                 *
                 * getMyOrders(PENDING)
                 *
                 * orqali hozir yaratilgan
                 * orderni backenddan oladi.
                 */

                navigate(
                    "/cart",
                );


            } catch (err) {

                console.log(
                    "CREATE ORDER ERROR:",
                    err,
                );


                alert(
                    "Order could not be created. Please try again.",
                );


            } finally {

                setCreatingOrder(
                    false,
                );
            }
        };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Drawer
            anchor="right"

            open={
                open
            }

            onClose={
                onClose
            }

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
                    height:
                        "100%",

                    display:
                        "flex",

                    flexDirection:
                        "column",
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <Box
                    sx={{
                        px: 3,

                        py: 2.5,

                        display:
                            "flex",

                        justifyContent:
                            "space-between",

                        alignItems:
                            "center",
                    }}
                >

                    <Box>

                        <Typography
                            sx={{
                                fontSize:
                                    19,

                                fontWeight:
                                    700,
                            }}
                        >
                            Shopping Basket
                        </Typography>


                        <Typography
                            sx={{
                                mt: 0.5,

                                fontSize:
                                    11,

                                color:
                                    "#999",
                            }}
                        >

                            {
                                cartItems.length
                            }{" "}

                            products

                        </Typography>

                    </Box>


                    {/* CLOSE */}

                    <IconButton
                        onClick={
                            onClose
                        }

                        sx={{
                            width:
                                38,

                            height:
                                38,

                            border:
                                "1px solid #ddd",
                        }}
                    >
                        ✕
                    </IconButton>

                </Box>


                <Divider />


                {/* =================================================
                    PRODUCTS
                ================================================= */}

                <Box
                    sx={{
                        flex: 1,

                        overflowY:
                            "auto",

                        px: 3,
                    }}
                >

                    {cartItems.length ===
                        0
                        ? (

                            /* =========================================
                               EMPTY BASKET
                            ========================================== */

                            <Box
                                sx={{
                                    minHeight:
                                        300,

                                    display:
                                        "flex",

                                    flexDirection:
                                        "column",

                                    justifyContent:
                                        "center",

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontSize:
                                            18,

                                        fontWeight:
                                            600,
                                    }}
                                >
                                    Your basket is empty
                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 1,

                                        mb: 3,

                                        color:
                                            "#999",

                                        fontSize:
                                            11,
                                    }}
                                >
                                    Add some furniture
                                    to your basket.
                                </Typography>


                                <Button
                                    component={
                                        Link
                                    }

                                    to="/shop"

                                    onClick={
                                        onClose
                                    }

                                    variant="contained"

                                    sx={{
                                        borderRadius:
                                            0,

                                        background:
                                            "#222",

                                        px: 4,

                                        py: 1.3,

                                        fontSize:
                                            10,

                                        "&:hover": {
                                            background:
                                                "#000",
                                        },
                                    }}
                                >
                                    Go To Shop
                                </Button>

                            </Box>

                        )
                        : (

                            /* =========================================
                               CART ITEMS
                            ========================================== */

                            cartItems.map(
                                (
                                    item,
                                ) => (

                                    <Box
                                        key={
                                            item._id
                                        }

                                        sx={{
                                            py: 2.5,

                                            borderBottom:
                                                "1px solid #eeeeee",
                                        }}
                                    >

                                        <Stack
                                            direction="row"

                                            spacing={
                                                2
                                            }
                                        >

                                            {/* IMAGE */}

                                            <Box
                                                component={
                                                    Link
                                                }

                                                to={`/product/${item._id}`}

                                                onClick={
                                                    onClose
                                                }

                                                sx={{
                                                    width:
                                                        95,

                                                    height:
                                                        95,

                                                    flexShrink:
                                                        0,

                                                    background:
                                                        "#f5f5f5",

                                                    overflow:
                                                        "hidden",
                                                }}
                                            >

                                                <Box
                                                    component="img"

                                                    src={`${serverApi}/${item.image}`}

                                                    alt={
                                                        item.name
                                                    }

                                                    sx={{
                                                        width:
                                                            "100%",

                                                        height:
                                                            "100%",

                                                        objectFit:
                                                            "cover",
                                                    }}
                                                />

                                            </Box>


                                            {/* INFO */}

                                            <Box
                                                sx={{
                                                    width:
                                                        "100%",
                                                }}
                                            >

                                                <Stack
                                                    direction="row"

                                                    sx={{
                                                        justifyContent:
                                                            "space-between",

                                                        alignItems:
                                                            "flex-start",
                                                    }}
                                                >

                                                    <Box>

                                                        {/* NAME */}

                                                        <Typography
                                                            component={
                                                                Link
                                                            }

                                                            to={`/product/${item._id}`}

                                                            onClick={
                                                                onClose
                                                            }

                                                            sx={{
                                                                color:
                                                                    "#222",

                                                                fontSize:
                                                                    13,

                                                                fontWeight:
                                                                    600,

                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </Typography>


                                                        <Typography
                                                            sx={{
                                                                mt: 0.7,

                                                                color:
                                                                    "#999",

                                                                fontSize:
                                                                    10,
                                                            }}
                                                        >
                                                            Furniture
                                                        </Typography>

                                                    </Box>


                                                    {/* DELETE */}

                                                    <IconButton
                                                        onClick={() =>
                                                            onDelete(
                                                                item,
                                                            )
                                                        }

                                                        sx={{
                                                            width:
                                                                28,

                                                            height:
                                                                28,

                                                            color:
                                                                "#999",

                                                            fontSize:
                                                                15,

                                                            "&:hover": {
                                                                color:
                                                                    "#d32f2f",
                                                            },
                                                        }}
                                                    >
                                                        ✕
                                                    </IconButton>

                                                </Stack>


                                                {/* PRICE */}

                                                <Typography
                                                    sx={{
                                                        mt: 1,

                                                        fontSize:
                                                            12,

                                                        fontWeight:
                                                            600,
                                                    }}
                                                >

                                                    $

                                                    {
                                                        item.price
                                                            .toLocaleString(
                                                                "en-US",
                                                                {
                                                                    minimumFractionDigits:
                                                                        2,

                                                                    maximumFractionDigits:
                                                                        2,
                                                                },
                                                            )
                                                    }

                                                </Typography>


                                                {/* =================================
                                                    QUANTITY
                                                ================================== */}

                                                <Stack
                                                    direction="row"

                                                    sx={{
                                                        justifyContent:
                                                            "space-between",

                                                        alignItems:
                                                            "flex-start",

                                                        mt: 1.5,
                                                    }}
                                                >

                                                    <Stack
                                                        direction="row"

                                                        sx={{
                                                            alignItems:
                                                                "center",

                                                            border:
                                                                "1px solid #dddddd",
                                                        }}
                                                    >

                                                        {/* MINUS */}

                                                        <button
                                                            type="button"

                                                            onClick={() =>
                                                                onRemove(
                                                                    item,
                                                                )
                                                            }

                                                            style={{
                                                                width:
                                                                    "32px",

                                                                height:
                                                                    "30px",

                                                                border:
                                                                    "none",

                                                                background:
                                                                    "transparent",

                                                                cursor:
                                                                    "pointer",
                                                            }}
                                                        >
                                                            −
                                                        </button>


                                                        {/* QUANTITY */}

                                                        <Box
                                                            sx={{
                                                                width:
                                                                    35,

                                                                textAlign:
                                                                    "center",

                                                                fontSize:
                                                                    11,
                                                            }}
                                                        >
                                                            {
                                                                item.quantity
                                                            }
                                                        </Box>


                                                        {/* PLUS */}

                                                        <button
                                                            type="button"

                                                            onClick={() =>
                                                                onAdd(
                                                                    item,
                                                                )
                                                            }

                                                            style={{
                                                                width:
                                                                    "32px",

                                                                height:
                                                                    "30px",

                                                                border:
                                                                    "none",

                                                                background:
                                                                    "transparent",

                                                                cursor:
                                                                    "pointer",
                                                            }}
                                                        >
                                                            +
                                                        </button>

                                                    </Stack>


                                                    {/* ITEM TOTAL */}

                                                    <Typography
                                                        sx={{
                                                            fontSize:
                                                                12,

                                                            fontWeight:
                                                                700,
                                                        }}
                                                    >

                                                        $

                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits:
                                                                    2,

                                                                maximumFractionDigits:
                                                                    2,
                                                            },
                                                        )}

                                                    </Typography>

                                                </Stack>

                                            </Box>

                                        </Stack>


                                        {/* REMOVE */}

                                        <Button
                                            onClick={() =>
                                                onDelete(
                                                    item,
                                                )
                                            }

                                            sx={{
                                                mt: 1,

                                                p: 0,

                                                minWidth:
                                                    "auto",

                                                color:
                                                    "#999",

                                                fontSize:
                                                    9,

                                                textTransform:
                                                    "none",

                                                textDecoration:
                                                    "underline",

                                                "&:hover": {
                                                    color:
                                                        "#222",

                                                    background:
                                                        "transparent",
                                                },
                                            }}
                                        >
                                            Remove
                                        </Button>

                                    </Box>
                                ),
                            )
                        )}

                </Box>


                {/* =================================================
                    BOTTOM
                ================================================= */}

                {cartItems.length >
                    0 && (

                        <>

                            <Divider />


                            <Box
                                sx={{
                                    p: 3,
                                }}
                            >

                                {/* =====================================
                                    SUBTOTAL
                                ====================================== */}

                                <Stack
                                    direction="row"

                                    sx={{
                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center",
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            fontSize:
                                                12,

                                            color:
                                                "#777",
                                        }}
                                    >
                                        Subtotal
                                    </Typography>


                                    <Typography
                                        sx={{
                                            fontSize:
                                                18,

                                            fontWeight:
                                                700,
                                        }}
                                    >

                                        $

                                        {
                                            subtotal
                                                .toLocaleString(
                                                    "en-US",
                                                    {
                                                        minimumFractionDigits:
                                                            2,

                                                        maximumFractionDigits:
                                                            2,
                                                    },
                                                )
                                        }

                                    </Typography>

                                </Stack>


                                <Typography
                                    sx={{
                                        mt: 1,

                                        color:
                                            "#aaa",

                                        fontSize:
                                            9,
                                    }}
                                >
                                    Shipping and taxes
                                    will be calculated at
                                    checkout.
                                </Typography>


                                {/* =====================================
                                    VIEW ORDER
                                ====================================== */}

                                <Button
                                    fullWidth

                                    disabled={
                                        creatingOrder
                                    }

                                    onClick={
                                        proceedOrderHandler
                                    }

                                    sx={{
                                        mt: 2.5,

                                        height:
                                            45,

                                        borderRadius:
                                            0,

                                        color:
                                            "#fff",

                                        background:
                                            "#222",

                                        fontSize:
                                            10,

                                        fontWeight:
                                            600,

                                        letterSpacing:
                                            1,

                                        "&:hover": {
                                            background:
                                                "#000",
                                        },

                                        "&.Mui-disabled": {
                                            background:
                                                "#777",

                                            color:
                                                "#fff",
                                        },
                                    }}
                                >

                                    {creatingOrder
                                        ? "CREATING ORDER..."
                                        : "VIEW ORDER"}

                                </Button>


                                {/* =====================================
                                    CONTINUE SHOPPING
                                ====================================== */}

                                <Button
                                    fullWidth

                                    component={
                                        Link
                                    }

                                    to="/shop"

                                    onClick={
                                        onClose
                                    }

                                    sx={{
                                        mt: 1,

                                        height:
                                            43,

                                        borderRadius:
                                            0,

                                        color:
                                            "#222",

                                        background:
                                            "#fff",

                                        border:
                                            "1px solid #222",

                                        fontSize:
                                            10,

                                        "&:hover": {
                                            background:
                                                "#f5f5f5",
                                        },
                                    }}
                                >
                                    CONTINUE SHOPPING
                                </Button>


                                {/* =====================================
                                    CLEAR BASKET
                                ====================================== */}

                                <Button
                                    fullWidth

                                    disabled={
                                        creatingOrder
                                    }

                                    onClick={
                                        onDeleteAll
                                    }

                                    sx={{
                                        mt: 1,

                                        color:
                                            "#999",

                                        fontSize:
                                            9,

                                        textTransform:
                                            "none",

                                        "&:hover": {
                                            color:
                                                "#d32f2f",

                                            background:
                                                "transparent",
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