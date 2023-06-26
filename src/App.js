import { Route, Routes } from "react-router-dom";
import FormFront from "./views/FormFront/Index";
import Changes from "./views/Changes/Index";
import Currencies from "./views/Currencies/Index"

export default function App(){

  return <Routes>
    <Route path="/" element={<FormFront />} />
    <Route path="/back/changes" element={<Changes />} />
    <Route path="/back/currencies" element={<Currencies />} />
  </Routes>
}