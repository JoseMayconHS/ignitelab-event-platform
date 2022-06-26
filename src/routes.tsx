import { Route, Routes } from "react-router-dom";
import { Events } from "./pages/Events";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={ (<h1>Home</h1>) } />
      <Route path="/events" element={ <Events /> } />
    </Routes>
  )
}
