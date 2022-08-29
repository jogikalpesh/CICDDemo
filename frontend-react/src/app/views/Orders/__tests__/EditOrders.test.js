const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import EditOrders from '../EditOrders'
import { OrdersAdded } from '../store/OrdersSlice'
beforeAll(() => {
    store.dispatch(
        OrdersAdded({
            id: 1,
            orderid: 26,
            description: 'description',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Orders/edit/1" replace />
                                }
                            />
                            <Route
                                path="Orders/edit/:id"
                                element={<EditOrders />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of OrdersEdit Component', () => {
    test('should render EditOrders and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveOrdersButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const orderidElement = screen.getByLabelText(/Orderid/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        expect(saveOrdersButtonElement).toBeInTheDocument()

        expect(orderidElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Orders edit form', async () => {
        const orderidElement = screen.getByLabelText(/Orderid/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        fireEvent.change(orderidElement, { target: { value: 93 } })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })

        expect(orderidElement.value).toBe('93')
        expect(descriptionElement.value).toBe('description')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const orderidElement = screen.getByLabelText(/Orderid/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        fireEvent.change(orderidElement, { target: { value: '' } })
        fireEvent.change(descriptionElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveOrdersButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveOrdersButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
