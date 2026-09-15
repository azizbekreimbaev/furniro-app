import type {
    OrderDelivery,
    OrderStatus,
} from "../enums/order.enum";

import type {
    Product,
} from "./product";


/* =====================================================
   ORDER ITEM
===================================================== */

export interface OrderItem {

    _id?: string;

    itemQuantity: number;

    itemPrice: number;

    orderId?: string;

    productId: string;

    createdAt?: string;

    updatedAt?: string;
}


/* =====================================================
   ORDER
===================================================== */

export interface Order {

    _id: string;

    orderTotal?: number;

    orderDeliveryAmount?: number;

    orderDelivery?: OrderDelivery;

    orderStatus: OrderStatus;

    memberId?: string;

    userId?: string;

    /*
     * Backend aggregate $lookup:
     *
     * orders
     *   ↓
     * orderItems
     */
    orderItems?: OrderItem[];

    /*
     * Backend aggregate $lookup:
     *
     * orderItems.productId
     *   ↓
     * products
     */
    productData?: Product[];

    createdAt?: string;

    updatedAt?: string;
}


/* =====================================================
   CREATE ORDER ITEM INPUT
===================================================== */

export interface OrderItemInput {

    itemQuantity: number;

    itemPrice: number;

    productId: string;

    orderId?: string;
}


/* =====================================================
   ORDER INQUIRY
===================================================== */

export interface OrderInquiry {

    page: number;

    limit: number;

    orderStatus: OrderStatus;
}


/* =====================================================
   UPDATE ORDER
===================================================== */

export interface OrderUpdateInput {

    orderId: string;

    orderStatus: OrderStatus;
}