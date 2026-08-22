import type { CartItem } from "./search";


export interface BasketInterface {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void
    onRemove: (item: CartItem) => void
    onDelete: (item: CartItem) => void
    onDeleteAll: () => void
}