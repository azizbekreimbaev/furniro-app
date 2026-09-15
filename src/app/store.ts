import { configureStore } from '@reduxjs/toolkit'
import HomePageReducer from './screens/homePage/homepageSlice';
import ProductPageReducer from './screens/productsPage/productPageSlice';
import OrdersPageReducer from './screens/cartPage/CartPageslice';

export const store = configureStore({
    reducer: {
        homePage: HomePageReducer,
        productPage: ProductPageReducer,
        ordersPage: OrdersPageReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch