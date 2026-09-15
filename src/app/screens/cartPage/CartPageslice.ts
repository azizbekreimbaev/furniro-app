import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OrderPageState } from '../../../libs/types/screen';
import type { Order } from '../../../libs/types/order';



const initialState: OrderPageState = {
    pendingOrders: [],
    processingOrders: [],
    shippedOrders: [],
    deliveredOrders: [],
    cancelledOrders: []

}

export const ordersPageSlice = createSlice({
    name: 'ordersPage',
    initialState,
    reducers: {
        setPendingOrders: (state, action: PayloadAction<Order[]>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.pendingOrders = action.payload
        },
        setProcessingOrders: (state, action: PayloadAction<Order[]>) => {
            state.processingOrders = action.payload
        },
        setShippedOrders: (state, action: PayloadAction<Order[]>) => {
            state.shippedOrders = action.payload
        },
        setDeliveredOrders: (state, action: PayloadAction<Order[]>) => {
            state.deliveredOrders = action.payload
        },
        setCancelledOrders: (state, action: PayloadAction<Order[]>) => {
            state.cancelledOrders = action.payload
        },
    },

    selectors: {
        selectPendingOrders: (state: OrderPageState) => state.pendingOrders,
        selectProcessingOrders: (state: OrderPageState) => state.processingOrders,
        selectShippedOrders: (state: OrderPageState) => state.shippedOrders,
        selectDeliveredOrders: (state: OrderPageState) => state.deliveredOrders,
        selectCancelledOrders: (state: OrderPageState) => state.cancelledOrders,
    }

})

// Action creators are generated for each case reducer function
export const { setPendingOrders, setProcessingOrders, setShippedOrders, setDeliveredOrders, setCancelledOrders } = ordersPageSlice.actions
export const { selectPendingOrders, selectProcessingOrders, selectShippedOrders, selectDeliveredOrders, selectCancelledOrders } = ordersPageSlice.selectors

const OrdersPageReducer = ordersPageSlice.reducer

export default OrdersPageReducer