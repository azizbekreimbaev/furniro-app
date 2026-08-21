import { OrderDelivery, OrderStatus } from "../enums/order.enum";

export interface OrderItemInput {
    itemQuantity: number
    itemPrice: number
    productId: string
    orderId?: string
}


export interface Order {
    _id: string
    orderTotal: number
    orderDelivery: OrderDelivery
    orderDeliveryAmount: number
    orderStatus: OrderStatus
    memberId: string
    createdAt: Date
    updatedAt: Date

    // AGGREGATE  coming soon

}



export interface OrderItem {
    itemQuantity: number
    itemPrice: number
    productId: string
    orderId: string
    createdAt: Date
    updatedAt: Date
}

export interface OrderInquiry {
    page: number
    limit: number
    orderStatus: OrderStatus
}

export interface OrderUpdateInput {
    orderId: string,
    orderStatus: OrderStatus
}