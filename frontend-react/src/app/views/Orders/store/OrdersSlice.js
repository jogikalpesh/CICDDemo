import { createSlice } from '@reduxjs/toolkit'
import { fetchOrders } from './Orders.action'
import { addOrders } from './Orders.action'
import { editOrders } from './Orders.action'
import { deleteOrders } from './Orders.action'

const fetchOrdersExtraReducer = {
    [fetchOrders.pending]: (state, action) => {
        state.loading = true
    },
    [fetchOrders.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchOrders.rejected]: (state, action) => {
        state.loading = false
    },
}

const addOrdersExtraReducer = {
    [addOrders.pending]: (state, action) => {
        state.loading = true
    },
    [addOrders.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addOrders.rejected]: (state, action) => {
        state.loading = false
    },
}

const editOrdersExtraReducer = {
    [editOrders.pending]: (state, action) => {
        state.loading = true
    },
    [editOrders.fulfilled]: (state, action) => {
        const { id, orderid, description } = action.payload
        const existingOrders = state.entities.find(
            (Orders) => Orders.id.toString() === id.toString()
        )
        if (existingOrders) {
            existingOrders.orderid = orderid
            existingOrders.description = description
        }
        state.loading = false
    },
    [editOrders.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteOrdersExtraReducer = {
    [deleteOrders.pending]: (state, action) => {
        state.loading = true
    },
    [deleteOrders.fulfilled]: (state, action) => {
        const id = action.payload
        const existingOrders = state.entities.find(
            (Orders) => Orders.id.toString() === id.toString()
        )
        if (existingOrders) {
            state.entities = state.entities.filter((Orders) => Orders.id !== id)
        }
        state.loading = false
    },
    [deleteOrders.rejected]: (state, action) => {
        state.loading = false
    },
}
const OrdersSlice = createSlice({
    name: 'Orders',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        OrdersAdded(state, action) {
            state.entities.push(action.payload)
        },
        OrdersUpdated(state, action) {
            const { id, orderid, description } = action.payload
            const existingOrders = state.entities.find(
                (Orders) => Orders.id.toString() === id.toString()
            )
            if (existingOrders) {
                existingOrders.orderid = orderid
                existingOrders.description = description
            }
        },
        OrdersDeleted(state, action) {
            const { id } = action.payload
            const existingOrders = state.entities.find(
                (Orders) => Orders.id.toString() === id.toString()
            )
            if (existingOrders) {
                state.entities = state.entities.filter(
                    (Orders) => Orders.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchOrdersExtraReducer,
        ...addOrdersExtraReducer,
        ...editOrdersExtraReducer,
        ...deleteOrdersExtraReducer,
    },
})

export const { OrdersAdded, OrdersUpdated, OrdersDeleted } = OrdersSlice.actions

export default OrdersSlice.reducer
