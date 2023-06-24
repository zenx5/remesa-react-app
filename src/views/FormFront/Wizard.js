import { Box, Button, CircularProgress } from '@mui/material'
import { useWizard } from "./Context"
import StepOne from "./StepOne"
import StepTwo from './StepTwo'


export default function Wizard(){
    const { step, next, back, loading } = useWizard()

    return <>
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'200px' }}>
        { loading ?
            <CircularProgress />
         : <>
                {step===1 && <StepOne /> }
                {step===2 && <StepTwo /> }
           </>
        }
        </Box>
        <Box sx={{ display:'flex', gap:2, mt:2 }}>
            <Button variant="outlined" onClick={back} disabled={step===1}>Atras</Button>
            <Button variant="outlined" onClick={next}>{ step===2?'Guardar':'Siguiente'}</Button>
        </Box>
    </>
}