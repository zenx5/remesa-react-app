import { Divider, List, Select, Button, Card, CardContent, CardHeader, Box, TextField, ListItem, ListItemText, Typography, MenuItem, IconButton, ButtonBase } from '@mui/material'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Add, Remove } from '@mui/icons-material'

import CurrencyService from '../../services/CurrencyService'
import { handlerChange } from '../../tools/Common'

export default function Index() {
    const [currencies, setCurrencies] = useState([])
    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [founds, setFounds] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        (async()=>{
            if( currencies.length===0 && !loaded ) {
                setCurrencies( await CurrencyService.get() )
                setLoaded(true)
            }
        })()
    }, [currencies])

    const saveCurrency = async () => {
        setLoading(true)
        const result = await CurrencyService.set({
            name,
            founds,
            symbol
        })
        setCurrencies( result )
        setName('')
        setSymbol('')
        setFounds(0)
        setLoading(false)
    }
    
    const clearAll = async () => {
        setLoading(true)
        for(const currency of currencies ) {
            await CurrencyService.delete({name: currency.name})
        }
        setCurrencies([])
        setLoading(false)
    }

    const removeCurrency = async (name) => {
        setLoading(true)
        const result = await CurrencyService.delete({ name })
        setCurrencies( result )
        setLoading(false)
    }

    return  <Card>
        <CardHeader title="Currencies" />
        <CardContent>
            <Box sx={{display:'flex', flexDirecction:'row', gap:2, justifyContent:'center', mb:2}}>
                <TextField size='small' value={name} onChange={handlerChange(setName)} label="Moneda" />
                <TextField size='small' value={symbol} onChange={handlerChange(setSymbol)} label="Simbolo"/>
                <TextField size='small' value={founds} onChange={handlerChange(setFounds)} label="Fondos" type="number" />
                <LoadingButton size='small' variant="contained" loading={loading} onClick={saveCurrency}>Guardar</LoadingButton>
                <LoadingButton size='small' variant="contained" color='error' loading={loading} onClick={clearAll}>Borrar Todo</LoadingButton>
            </Box>
            <Divider />
            <List>
                { currencies.map( item => <span key={item.name}><ListItem
                        secondaryAction={<IconButton onClick={()=>removeCurrency(item.name)}><Remove sx={{ color:'red'}} /></IconButton>}>
                        <ListItemText primary={item.name} secondary={`${item.founds} ${item.symbol}`}></ListItemText>
                    </ListItem>
                    <Divider />
                </span> ) }
            </List>
        </CardContent>
    </Card>
}