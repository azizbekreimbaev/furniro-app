import { useState } from "react";
import type { CartItem } from "../../libs/types/search";

const useBasket = () => {
    const cartJson: string | null = localStorage.getItem("cartData");
    const currentCart = cartJson ? JSON.parse(cartJson) : []
    const [cartItems, setCartItems] = useState<CartItem[]>(currentCart)


    //** HANDLERS */

    const onAdd = (input: CartItem) => {
        const exist: any = cartItems.find((item: CartItem) => {
            return item._id === input._id                            // cartItems bizda mavjud savat b-b items mavjud ichidagiu productrlar input kirgizmoqachi bolgan product
        });

        if (exist) {
            const cartUpdate = cartItems.map((item: CartItem) => {
                return item._id === input._id ? { ...exist, quantity: exist.quantity + 1 } : item
            });

            setCartItems(cartUpdate)
            localStorage.setItem("cartData", JSON.stringify(cartUpdate));

        } else {
            const cartUpdate = [...cartItems, { ...input }];   // agar osha product savatchada bolmasa qoshmoqchi bolgan osha productni savatga qoshib yangi array beradi 
            setCartItems(cartUpdate);

            localStorage.setItem("cartData", JSON.stringify(cartUpdate));
        }
    }

    const onRemove = (input: CartItem) => {
        const exist: any = cartItems.find((item: CartItem) => {
            return item._id === input._id                            // cartItems bizda mavjud savat b-b items mavjud ichidagiu productrlar input kirgizmoqachi bolgan product
        });

        if (exist.quantity === 1) {
            const cartUpdate = cartItems.filter((item: CartItem) => {
                return item._id !== input._id
            })

            setCartItems(cartUpdate)
            localStorage.setItem("cartData", JSON.stringify(cartUpdate));
        } else {
            const cartUpdate = cartItems.map((item: CartItem) => {
                return item._id === input._id ? { ...exist, quantity: exist.quantity - 1 } : item
            });
            setCartItems(cartUpdate)
            localStorage.setItem("cartData", JSON.stringify(cartUpdate));
        }
    }


    const onDelete = (input: CartItem) => {
        const cartUpdate = cartItems.filter((item: CartItem) => {
            return item._id !== input._id
        })

        setCartItems(cartUpdate)
        localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }



    const onDeleteAll = () => {

        setCartItems([]);

        localStorage.removeItem("cartData");
    };


    return {
        cartItems,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll
    }
}

export default useBasket;