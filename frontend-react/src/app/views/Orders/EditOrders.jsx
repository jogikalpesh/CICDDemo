import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editOrders } from './store/Orders.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditOrders = () => {
    const { id: OrdersId } = useParams()

    const Orders = useSelector((state) =>
        state.Orders.entities.find(
            (Orders) => Orders.id.toString() === OrdersId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [orderid, setOrderid] = useState(Orders.orderid)
    const [description, setDescription] = useState(Orders.description)

    const handleOrderid = (e) => setOrderid(parseInt(e.target.value))
    const handleDescription = (e) => setDescription(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editOrders({
                id: OrdersId,
                orderid,
                description,
            })
        )
        navigate('/Orders')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditOrders', path: '/Orders' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="number"
                                name="orderid"
                                id="orderidInput"
                                onChange={handleOrderid}
                                value={orderid || ''}
                                validators={['required']}
                                label="Orderid"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="description"
                                id="descriptionInput"
                                onChange={handleDescription}
                                value={description}
                                validators={['required']}
                                label="Description"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditOrders
