import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { WatchDogApplication } from "../watchDog";
import { WatchDogNetApplication } from "../watchDogNet";
import { AppSelectBar } from ".";
import { CommandCenterApplicationEnum } from "../../enums";
import { AppBarItem } from "../../types";

export const AppWindow: React.FC = () => {
    const applicationList:AppBarItem[] = [
        {id:0, application: CommandCenterApplicationEnum.WatchDog, route: '/WatchDogApplication'},
        {id:1, application: CommandCenterApplicationEnum.WatchDogNet, route: '/WatchDogNetApplication'},
    ]
    return(
        <div className="grow">
            <BrowserRouter>
                <AppSelectBar appItems={applicationList}/>
                <Routes>                
                    <Route path="/" element={<Navigate to="/WatchDogApplication"/>}/>
                    <Route path="/WatchDogApplication" Component={WatchDogApplication}/>
                    <Route path="/WatchDogNetApplication" Component={WatchDogNetApplication}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}