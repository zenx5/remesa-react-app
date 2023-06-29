import { Box, Tab, Button, Typography } from '@mui/material'
import { NavLink, Route, Routes } from "react-router-dom";
import FormFront from "./views/FormFront/Index";
import Changes from "./views/Changes/Index";
import Currencies from "./views/Currencies/Index"
import Operations from "./views/Operations/Index"
import { TabList } from '@mui/lab';

export default function App(){

  return <Box>
    <Box sx={{ display:'flex', flexDirection:'row', gap:3, p:2 }}>
        <Button variant="outlined" to="/" LinkComponent={NavLink}>Principal</Button>
        <Button variant="outlined" to="/back/changes" LinkComponent={NavLink}>Cambios</Button>
        <Button variant="outlined" to="/back/currencies" LinkComponent={NavLink}>Monedas</Button>
        <Button variant="outlined" to="/back/operations" LinkComponent={NavLink}>Operaciones</Button>
          
    </Box>
    
  <Routes>
    <Route path="/" element={<FormFront />} />
    <Route path="/back/changes" element={<Changes />} />
    <Route path="/back/currencies" element={<Currencies />} />
    <Route path="/back/operations" element={<Operations />} />
  </Routes>
  </Box>
}