const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import OrdersList from '../OrdersList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Orders rows when api response has data', async () => {
    const endPoint = 'orders'
    const getOrdersListResponse = [
        {
            id: 1,
            orderid: 50,
            description: 'description1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getOrdersListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <OrdersList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const ordersOrderidCell = await screen.findByText(/50/i)

    expect(ordersOrderidCell).toHaveTextContent(/50/i)
    mock.reset()
})
