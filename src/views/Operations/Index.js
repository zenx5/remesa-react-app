import { Stack, Divider, List, Card, CardContent, CardHeader, ListItem, ListItemText, Typography, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OperationService from '../../services/OperationService'
import { LoadingButton } from '@mui/lab'
import { Check, Delete } from '@mui/icons-material'


export default function Index() {
    const [ operations, setOperations ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ loaded, setLoaded ] = useState(false)


    useEffect(()=>{
        if( !loaded ) {
            (async ()=>{
                setLoading(true)
                const tempOperations = await OperationService.get()
                setOperations( prev => tempOperations )
                setLoaded(true)
                setLoading(false)
            })()
        }
    },[loaded, operations])

    const handlerDelete = (id) => async () => {
        if( window.confirm("Seguro de borrar?") ) {
            setLoading(true)
            const result = await OperationService.delete({
                id
            })
            setOperations( prev => result )
            setLoading(false)
        }
    }

    const clearAll = async () => {
        if( window.confirm("Seguro de borrar?") ) {
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
        await OperationService.wpaction('validate',  { id })
        setLoading(false)
    }

    return <Card>
        <CardHeader title="Operaciones" />
        <CardContent>
            <LoadingButton variant='outlined' loading={loading} onClick={clearAll}>Borrar</LoadingButton>
            <List>{operations.map( operation => <span key={operation.id}>
                <ListItem secondaryAction={<>
                        <IconButton onClick={()=>handlerVerify(operation.id)} disabled={operation.verify}><Check sx={{ color: operation.verify ? 'green' : 'gray' }}/></IconButton>
                        <IconButton onClick={handlerDelete(operation.id)}><Delete sx={{ color: 'red' }}/></IconButton>
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