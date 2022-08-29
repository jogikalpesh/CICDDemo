const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddOrders from '../AddOrders'

beforeEach(() => {
    const endPoint = 'Orders'
    const getStudentListResponse = [
        {
            id: 1,
            orderid: 39,
            description: 'description',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddOrders />
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

describe('testing view OrdersAdd Component', () => {
    test('should render AddOrders and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addOrdersButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const orderidElement = screen.getByLabelText(/Orderid/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        expect(addOrdersButtonElement).toBeInTheDocument()

        expect(orderidElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Orders add form', async () => {
        const orderidElement = screen.getByLabelText(/Orderid/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        fireEvent.change(orderidElement, { target: { value: 88 } })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })
    })

    test('should return error message when add Orders button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addOrdersButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addOrdersButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
