import React from "react";
import { AppBarItem } from "../../types";
import { ApplicationContextType, useApplication } from "../../context/applicationContext";
import  { CommandCenterApplicationEnum } from "../../enums";

type AppBarProps = {
    appItems: AppBarItem[];
}

export const AppBar: React.FC<AppBarProps> = (props) => {
    const {application:_, setApplication:handleSetCurrentApplication}:ApplicationContextType = useApplication();
    return (
        <div className="flex flex-nowrap h-full items-center bg-red-300">
            {props.appItems.map((app) => (
                <button onClick={() => handleSetCurrentApplication(CommandCenterApplicationEnum.WatchDog)} className="h-3/4 w-16 m-3 bg-red-200 rounded-lg" key={app.id}>
                    {app.name}
                </button>
            ))}
        </div>
    )
}