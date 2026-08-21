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