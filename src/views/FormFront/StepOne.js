import { useState, useEffect } from 'react'
import { LoadingButton } from '@mui/lab'
import { Icon, Stack, FormControl, InputLabel, Select, MenuItem, Typography, TextField, IconButton} from '@mui/material'
import ChangeService from '../../services/ChangeService'
import { useWizard } from './Context'
import { Check, Close, Send } from '@mui/icons-material'

export default function StepOne() {
    const [loading, setloading] = useState(false)
    const [message, setMessage] = useState('')
    const {changes, avalaibility, checked, selected, setSelected, mount, setMount, isAvalaible } = useWizard()
    

    const relationCurrency = () => {
        const { currency_from, currency_to, price } = changes.find( change => change.id===selected ) ?? {}
        if( price ) {
            const fromPrice = price >= 1 ? 1 : parseFloat(1/price).toFixed(2)
            const toPrice = price >= 1 ? parseFloat(price).toFixed(2) : 1
            return `Precio ${fromPrice} ${currency_from} por ${toPrice} ${currency_to}`
        }
        return ''
    }

    const handlerCheck = async () => {
        setloading(true)
        const { currency_from, currency_to, price } = changes.find( change => change.id===selected ) ?? {}
        console.log(currency_from, currency_to, price)
        await isAvalaible(currency_from, currency_to, calculatePrice(parseFloat(mount)) )
        setloading(false)
    }

    const calculatePrice = (mount) => {
        const currentChange = changes.find( change => change.id===selected )
        if( !currentChange ) return 0
        const { price, rules, currency_to } = currentChange
        let newPrice = price
        rules.filter( rule => rule.deposit!==0 ).forEach( rule => {
            const { value, deposit, value_format, relation } = rule
            if( 
                (relation===">" && mount>parseFloat(deposit)) ||
                (relation===">=" && mount>=parseFloat(deposit)) ||
                (relation==="<" && mount<parseFloat(deposit)) ||
                (relation==="<=" && mount<=parseFloat(deposit)) ||
                (relation==="==" && mount===parseFloat(deposit))
            ) {
                newPrice = value_format ? newPrice - value : newPrice*(100-value)/100
            }
        })
        return `${mount*newPrice} ${currency_to}`
    }

    const sendMessage = () => {
        document.location.reload()
    }

    return <Stack spacing={1} sx={{width:'100%'}}>
        <FormControl fullWidth>
            <InputLabel sx={{ backgroundColor:'#fff' }}>Tipo de Cambio</InputLabel>
            <Select value={selected} onChange={ event => setSelected(event.target.value) }>
                {changes.map( change => <MenuItem key={change.id} value={change.id}>{change.currency_from} por {change.currency_to}</MenuItem>)}
                <MenuItem value={-1}>Otro</MenuItem>
            </Select>
        </FormControl>
        <Typography>{relationCurrency()}</Typography>
        {selected===-1 ?
            <TextField
                variant="outlined"
                multiline
                rows={2}
                value={message}
                onChange={ev=>setMessage(ev.target.value)}
                InputProps={{
                    endAdornment: <IconButton onClick={sendMessage}><Send sx={{color:'#44f'}} /></IconButton>
                }}    
            />:
            <TextField
                variant="outlined"
                type="number"
                value={mount}
                disabled={avalaibility}
                onChange={ev=>setMount(ev.target.value)}
                InputProps={{
                    endAdornment: avalaibility ? 
                        <Icon><Check sx={{color:'green'}} /></Icon> : 
                        <LoadingButton disabled={mount<=0} onClick={handlerCheck} loading={loading}>Check</LoadingButton>
                }}
                helperText={'Saldo a recibir: ' + calculatePrice(parseFloat(mount))}
            />
        }
    </Stack>
}