import { Route, Routes } from "react-router-dom";
import FormFront from "./views/FormFront/Index";
import FormBack from "./views/FormBack";

export default function App(){

  return <Routes>
    <Route path="/" element={<FormFront />} />
    <Route path="/back" element={<FormBack />} />
  </Routes>
}