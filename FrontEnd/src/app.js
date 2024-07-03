import React from "react"
import Tasks from "./Tasks";
import {BrowserRouter ,Routes,  Route } from 'react-router-dom'
import Home from "./home";
import RegistartionForm from "./RegistrationForm";
import OtpPage from "./otpPage";

function App(){

    
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/register" element={<RegistartionForm/>} />
                <Route path="/otp-page" element={<OtpPage />} />
                <Route path="/tasks" element={<Tasks/>}  />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;