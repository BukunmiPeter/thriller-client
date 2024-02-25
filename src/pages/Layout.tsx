
import { Outlet} from "react-router-dom";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import { useNavigate } from 'react-router-dom';
import React from "react";


export default function Layout() {
    const navigate = useNavigate();
     const isHomePage = window.location.pathname === '/';




  
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
      <Header />
      {isHomePage ? <Welcome/> : "" }
      <Outlet />
    </div>
  );
}
