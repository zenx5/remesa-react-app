import { Stack, TextField, Typography } from '@mui/material'
import { useWizard } from './Context'

export default function StepTwo(){
    const { reference, setReference} = useWizard()

    return <Stack spacing={1} sx={{width:'100%'}}>
        <Typography>
            Debe hacer el deposito a la siguiente cuenta #########
        </Typography>
        <TextField label="Id de Referencia" value={reference} onChange={(event)=>setReference(event.target.value)}></TextField>

    </Stack>
}