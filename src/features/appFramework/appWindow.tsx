import React from "react";
import { WatchDog } from "..";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

export const AppWindow: React.FC = () => {
    return(
        <div className="grow">
            <BrowserRouter>
                <Routes>                
                    <Route path="/" element={<Navigate to="/WatchDog"/>}/>
                    <Route path="/WatchDog" Component={WatchDog}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}