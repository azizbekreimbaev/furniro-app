import type { Order } from "./order";
import type { Product } from "./product";




export interface AppRootState {
    homePage: HomePageState,
}


/**HOME PAGE */

export interface HomePageState {
    newProducts: Product[],
    popularProducts: Product[],
    trendingProducts: Product[]
}

export interface ProductPageState {
    product: Product | null;
    products: Product[]
}

export interface OrderPageState {
    pendingOrders: Order[]
    processingOrders: Order[]
    shippedOrders: Order[]
    deliveredOrders: Order[]
    cancelledOrders: Order[]
}