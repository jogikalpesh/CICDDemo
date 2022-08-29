import store from 'app/redux/store'
import { ordersAdded, ordersDeleted, ordersUpdated } from '../ordersSlice'

describe('testing orders redux store reducers', () => {
    test('add orders to store test', () => {
        let state = store.getState().orders
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            orderid: 91,
            description: 'description',
        }
        store.dispatch(ordersAdded(initialInput))
        state = store.getState().orders
        expect(state.entities).toHaveLength(1)
    })

    test('update orders from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            orderid: 24,
            description: 'description',
        }
        store.dispatch(ordersAdded(initialInput))
        let state = store.getState().orders
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            orderid: 59,
            description: 'description1',
        }
        store.dispatch(ordersUpdated(updatedInput))
        state = store.getState().orders
        let changedOrders = state.entities.find((p) => p.id === 2)
        expect(changedOrders).toStrictEqual(updatedInput)
    })

    test('delete orders from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            orderid: 9,
            description: 'description',
        }
        store.dispatch(ordersAdded(initialInput))
        let state = store.getState().orders
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            ordersDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().orders
        expect(state.entities).toHaveLength(2)
    })
})
