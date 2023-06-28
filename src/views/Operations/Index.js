import { Stack, Divider, List, Select, Button, Card, CardContent, CardHeader, Box, TextField, ListItem, ListItemText, Typography, MenuItem, IconButton, ButtonBase } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OperationService from '../../services/OperationService'
import CurrencyService from '../../services/CurrencyService'
import { LoadingButton } from '@mui/lab'
import { Add, Check, Remove, Delete } from '@mui/icons-material'

import { handlerChange } from '../../tools/Common'

export default function Index() {
    const [ from, setFrom ] = useState('')
    const [ to, setTo ] = useState('')
    const [ price, setPrice ] = useState(1)
    const [ operations, setOperations ] = useState([])
    const [ currencies, setCurrencies ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ loaded, setLoaded ] = useState(false)


    useEffect(()=>{
        if( !loaded ) {
            (async ()=>{
                setLoading(true)
                const tempOperations = await OperationService.get()
                const tempCurrencies = await CurrencyService.get()
                console.log( tempOperations )
                setOperations( prev => tempOperations )
                setCurrencies( prev => tempCurrencies )
                setLoaded(true)
                setLoading(false)
            })()
        }
    },[loaded, operations])

    const saveChange = async () => {
        setLoading(true)
        const tempOperations = await OperationService.set({
            currency_from: from,
            currency_to: to,
            price: price,
            rules: []
        })
        setOperations( prev => tempOperations )
        setFrom('')
        setTo('')
        setPrice(1)
        setLoading(false)
    }

    const handlerDelete = (id) => async () => {
        setLoading(true)
        const result = await OperationService.delete({
            id
        })
        setOperations( prev => result )
        setLoading(false)
    }

    const clearAll = async () => {
        // const response = confirm("Borrar?")
        if( true ) {
            setLoading(true)
            for(const operation of operations ) {
                await OperationService.delete({
                    id:operation.id
                })
            }
            setOperations([])
            setLoading(false)
        }
    }

    const handlerVerify = async (id) => {
        setLoading(true)
        await OperationService.set({
            id,
            verify:true
        })
        setLoading(false)
    }

    return <Card>
        <CardHeader title="Operaciones" />
        <CardContent>
            <Button variant='outlined' onClick={clearAll}>Borrar</Button>
            <List>{operations.map( operation => <span key={operation.id}>
                <ListItem secondaryAction={<>
                        <IconButton onClick={()=>handlerVerify(operation.id)} disabled={operation.verify}><Check sx={{ color: operation.verify ? 'green' : 'gray' }}/></IconButton>
                        <IconButton onClick={handlerDelete}><Delete sx={{ color: 'red' }}/></IconButton>
                    </>}>
                    <ListItemText 
                        primary={<Stack spacing={1}>
                            <Typography><b>Referencia:</b> {operation.id}</Typography>
                            <Typography><b>Monto Depositado:</b> {operation.mount} {operation.currency_from}</Typography>
                            <Typography><b>Monto Esperado:</b> {operation.mount*operation.price} {operation.currency_to}</Typography>
                        </Stack>}
                    />
                </ListItem>
                <Divider />
            </span>)}</List>
        </CardContent>
    </Card>
}