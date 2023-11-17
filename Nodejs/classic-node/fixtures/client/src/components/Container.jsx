import Nav from '../components/Nav';
import Footter from '../components/Footter';
import { Outlet } from "react-router-dom";

function Container() {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Footter/>
    </>
  )
}

export default Container