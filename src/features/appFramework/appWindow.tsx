import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { WatchDogApplication } from "../watchDog";

export const AppWindow: React.FC = () => {
    return(
        <div className="grow">
            <BrowserRouter>
                <Routes>                
                    <Route path="/" element={<Navigate to="/WatchDogApplication"/>}/>
                    <Route path="/WatchDogApplication" Component={WatchDogApplication}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}