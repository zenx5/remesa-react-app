import { useState, useEffect } from 'react'
import { LoadingButton } from '@mui/lab'
import { Icon, Stack, FormControl, InputLabel, Select, MenuItem, Typography, TextField} from '@mui/material'
import ChangeService from '../../services/ChangeService'
import { useWizard } from './Context'
import { Check, Close } from '@mui/icons-material'

export default function StepOne() {
    const [loading, setloading] = useState(false)
    const [avalaibility, setAvalaibility] = useState(null)
    const {changes, checked, selected, setSelected, mount, setMount, isAvalaible } = useWizard()
    

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
        setAvalaibility( await isAvalaible(currency_from, currency_to, mount*price ) )
        setloading(false)
    }

    return <Stack spacing={1} sx={{width:'100%'}}>
        <FormControl fullWidth>
            <InputLabel sx={{ backgroundColor:'#fff' }}>Tipo de Cambio</InputLabel>
            <Select value={selected} onChange={ event => setSelected(event.target.value) }>
                {changes.map( change => <MenuItem key={change.id} value={change.id}>{change.currency_from} por {change.currency_to}</MenuItem>)}
            </Select>
        </FormControl>
        <Typography>{relationCurrency()}</Typography>
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
        ></TextField>
    </Stack>
}