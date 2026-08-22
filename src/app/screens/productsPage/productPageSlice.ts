import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../../libs/types/product';
import type { ProductPageState } from '../../../libs/types/screen';



const initialState: ProductPageState = {
    product: null,
    products: []
}

export const productPageSlice = createSlice({
    name: 'productPage',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.product = action.payload
        },
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        }
    },

    selectors: {
        selectProduct: (state: ProductPageState) => state.product,
        selectProducts: (state: ProductPageState) => state.products
    }

})

// Action creators are generated for each case reducer function
export const { setProduct, setProducts } = productPageSlice.actions
export const { selectProduct, selectProducts } = productPageSlice.selectors

const ProductPageReducer = productPageSlice.reducer

export default ProductPageReducer


