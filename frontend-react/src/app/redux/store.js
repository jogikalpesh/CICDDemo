import { configureStore } from '@reduxjs/toolkit'
import OrdersReducer from '../views/Orders/store/OrdersSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../services/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        Orders: OrdersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
