import { Box, Button, CircularProgress } from '@mui/material'
import { useWizard } from "./Context"
import StepOne from "./StepOne"
import StepTwo from './StepTwo'
import StepThree from './StepThree'


export default function Wizard(){
    const { step, avalaibility, next, back, loading } = useWizard()

    const labelNext = [
        'Siguiente',
        'Guardar',
        ' - '
    ]

    const labelBack = [
        ' - ',
        'Atras',
        ' - '
    ]


    return <>
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'200px' }}>
        { loading ?
            <CircularProgress />
         : <>
                {step===1 && <StepOne /> }
                {step===2 && <StepTwo /> }
                {step===3 && <StepThree /> }
           </>
        }
        </Box>
        <Box sx={{ display:'flex', gap:2, mt:2 }}>
            <Button variant="outlined" sx={{ width:'150px' }} onClick={back} disabled={step===1||step===3}>{ labelBack[step-1]}</Button>
            <Button variant="outlined" sx={{ width:'150px' }} onClick={next} disabled={step===3||!avalaibility}>{ labelNext[step-1] }</Button>
            { step===3 && <Button variant="outlined" onClick={()=>document.location.reload()}>Nuevo</Button>}
        </Box>
    </>
}