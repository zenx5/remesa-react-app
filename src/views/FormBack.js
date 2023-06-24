import { Divider, List, Select, Button, Card, CardContent, CardHeader, Box, TextField, ListItem, ListItemText, Typography, MenuItem, IconButton, ButtonBase } from '@mui/material'
import { useEffect, useState } from 'react'
import { Request } from '../tools/Request'
import ChangeService from '../services/Changes'
import { LoadingButton } from '@mui/lab'
import { Add, Remove } from '@mui/icons-material'

export default function FormBack() {
    const [ from, setFrom ] = useState('')
    const [ to, setTo ] = useState('')
    const [ price, setPrice ] = useState(1)
    const [ changes, setChanges ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ loaded, setLoaded ] = useState(false)


    useEffect(()=>{
        if( changes.length === 0 && !loaded) {
            (async ()=>{
                setLoading(true)
                const tempChanges = await ChangeService.get()
                console.log( tempChanges )
                setChanges( prev => tempChanges )
                setLoaded(true)
                setLoading(false)
            })()
        }
    },[changes])

    const saveChange = async () => {
        setLoading(true)
        const tempChanges = await ChangeService.set(price, from, to)
        setChanges( prev => tempChanges )
        setFrom('')
        setTo('')
        setPrice(1)
        setLoading(false)
    }

    const handlerDelete = (id) => async () => {
        setLoading(true)
        const result = await ChangeService.delete(id)
        setChanges( prev => result )
        setLoading(false)
    }

    const clearAll = async () => {
        setLoading(true)
        for(const change of changes ) {
            await ChangeService.delete(change.id)
        }
        setChanges([])
        setLoading(false)
        
    }

    const handlerChange = (setter) => (event) => {
        setter( prev => event.target.value )
    }

    const mainLabelCurrency = (currency_from, currency_to, price) => {
        const fromPrice = price >= 1 ? '1.00' : parseFloat(1/price).toFixed(2)
        const toPrice = price >= '1.00' ? parseFloat(price).toFixed(2) : 1
        return <>
            {fromPrice}
            <b> {currency_from} </b>
            <span> por </span>
            {toPrice}
            <b> {currency_to} </b>
        </>
    }

    const handlerChangeRule = (ChangeId, RuleIndex, target) => (event) => {
        const index = changes.findIndex( change => change.id === ChangeId )
        if( index!==-1 ) { 
            const tempChange = {
                ...changes[index],
                rules: changes[index].rules.toSpliced(RuleIndex,1,{
                    ...changes[index].rules[RuleIndex],
                    [target]: event.target.value
                })
            }
            setChanges( prev => prev.toSpliced(index, 1, tempChange))
        }
    }

    const handlerToggle = (ChangeId, RuleIndex, value) => (event) => {
        handlerChangeRule(ChangeId, RuleIndex, 'value_format')({
            ...event,
            target: {
                ...event.target,
                value:value
            }
        })
    }

    const handlerRemoveRule = (ChangeId, index) => async () => {
        setLoading(true)
        const result = await ChangeService.removeRule(ChangeId, index)
        setChanges(prev => result)
        setLoading(false)
    }

    const handlerAddRule = (ChangeId) => async () =>  {
        setLoading(true)
        const rule = changes.find( change => change.id === ChangeId )?.rules.slice(-1)[0]
        const result = await ChangeService.addRule(ChangeId, rule)
        setChanges(prev => result)
        setLoading(false)
    }

    return <Card>
        <CardHeader title="Nueva Remesa" />
        <CardContent>
            <Box sx={{display:'flex', flexDirecction:'row', gap:2, justifyContent:'center', mb:2}}>
                <TextField size='small' value={from} onChange={handlerChange(setFrom)} label="Moneda de Origen" />
                <TextField size='small' value={to} onChange={handlerChange(setTo)} label="Moneda de Destino" />
                <TextField size='small' value={price} onChange={handlerChange(setPrice)} label="Precio" type="number" />
                <LoadingButton size='small' variant="contained" loading={loading} onClick={saveChange}>Guardar</LoadingButton>
                <LoadingButton size='small' variant="contained" color='error' loading={loading} onClick={clearAll}>Borrar Todo</LoadingButton>
            </Box>
            <Divider />
            <List>{changes.map( change => <>
                <ListItem key={change.id}>
                    <ListItemText 
                        primary={<Box sx={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                            <Typography>{mainLabelCurrency(change.currency_from, change.currency_to, change.price)}</Typography>
                            <LoadingButton variant='outlined' color='error' loading={loading} onClick={handlerDelete(change.id)}>Borrar</LoadingButton>
                        </Box>}
                        secondary={<List>
                            { change.rules.map( (rule, index) => <ListItem key={index} sx={{ display:'flex', flexDirection:'row', gap:2 }}>
                                <Typography>Deposito</Typography>
                                <Select
                                    size='small'
                                    sx={{ width:'200px' }}
                                    value={rule.relation}
                                    disabled={change.rules.length!==index+1}
                                    onChange={handlerChangeRule(change.id, index, 'relation')}>
                                    <MenuItem value='<'>Menor a</MenuItem>
                                    <MenuItem value='<='>Menor o Igual a</MenuItem>
                                    <MenuItem value='>'>Mayor a</MenuItem>
                                    <MenuItem value='>='>Mayor o Igual a</MenuItem>
                                    <MenuItem value='=='>Igual a</MenuItem>
                                </Select>
                                <TextField
                                    sx={{ width:'200px' }}
                                    size='small'
                                    value={rule.deposit}
                                    onChange={handlerChangeRule(change.id, index, 'deposit')}
                                    disabled={change.rules.length!==index+1}
                                    ></TextField>
                                <TextField
                                    sx={{ width:'200px', textAlign:'right' }}
                                    size='small'
                                    value={rule.value}
                                    onChange={handlerChangeRule(change.id, index, 'value')}
                                    disabled={change.rules.length!==index+1}
                                    InputProps={{
                                        endAdornment: <ButtonBase disabled={change.rules.length!==index+1} onClick={handlerToggle(change.id, index, !rule.value_format)}>
                                            <Typography>{rule.value_format ? change.currency_to : "%" }</Typography>
                                        </ButtonBase>
                                    }}
                                    ></TextField>
                                {
                                    (change.rules.length!==index+1) ?
                                    <IconButton onClick={handlerRemoveRule(change.id, index)}><Remove sx={{color:'red'}} /></IconButton> :
                                    <IconButton onClick={handlerAddRule(change.id)}><Add sx={{color:'blue'}} /></IconButton> }
                            </ListItem> )}
                        </List>}
                    />
                </ListItem>
                <Divider />
            </>)}</List>
        </CardContent>
    </Card>
}