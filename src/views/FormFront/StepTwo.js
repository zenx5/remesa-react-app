import { Stack, TextField, Typography } from '@mui/material'

export default function StepTwo(){

    return <Stack spacing={1} sx={{width:'100%'}}>
        <Typography>
            Debe hacer el deposito a la siguiente cuenta #########
        </Typography>
        <TextField label="Id de Referencia"></TextField>

    </Stack>
}