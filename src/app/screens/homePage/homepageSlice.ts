import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { HomePageState } from '../../../libs/types/screen';
import type { Product } from '../../../libs/types/product';



const initialState: HomePageState = {
    newProducts: [],
    popularProducts: [],
    trendingProducts: []

}

export const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setNewProducts: (state, action: PayloadAction<Product[]>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.newProducts = action.payload
        },
        setPopularProducts: (state, action: PayloadAction<Product[]>) => {
            state.popularProducts = action.payload
        },
        setTrendingProducts: (state, action: PayloadAction<Product[]>) => {
            state.trendingProducts = action.payload
        },
    },

    selectors: {
        selectNewProducts: (state: HomePageState) => state.newProducts,
        selectPopularProducts: (state: HomePageState) => state.popularProducts,
        selectTrendingProducts: (state: HomePageState) => state.trendingProducts,
    }

})

// Action creators are generated for each case reducer function
export const { setNewProducts, setPopularProducts, setTrendingProducts } = homePageSlice.actions
export const { selectNewProducts, selectPopularProducts, selectTrendingProducts } = homePageSlice.selectors

const HomePageReducer = homePageSlice.reducer

export default HomePageReducer