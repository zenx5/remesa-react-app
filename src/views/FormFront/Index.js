import { Button, Box, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'

import { ProviderWizard } from './Context'
import Wizard from './Wizard'

export default function Index(){
    

    return <Card>
        <CardHeader title="Nueva Remesa" />
        <CardContent>
            <ProviderWizard>
                <Wizard />
            </ProviderWizard>
        </CardContent>
    </Card>
}