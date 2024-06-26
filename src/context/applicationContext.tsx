import React, { ReactNode, createContext, useContext, useState } from "react";
import { CommandCenterApplicationEnum } from "../enums";
import { Dayjs } from "dayjs";

type ApplicationProviderProps = {
    children: ReactNode;
}

export type ApplicationContextType = {
    currentApplication: CommandCenterApplicationEnum | null;
    setCurrentApplication: (application: CommandCenterApplicationEnum) => void;
}

const ApplicationContext = createContext<ApplicationContextType>({currentApplication:null, setCurrentApplication:() => {}});

export const useApplication = () => {
    return useContext(ApplicationContext);
}

export const ApplicationProvider:React.FC<ApplicationProviderProps> = ({children}) => {
    const [currentApplication, setCurrentApplicatoin] = useState<CommandCenterApplicationEnum | null>(CommandCenterApplicationEnum.WatchDog);

    const handleSetCurrentApplication = (application:CommandCenterApplicationEnum) => {
        setCurrentApplicatoin(application);
    }

    return (
        <ApplicationContext.Provider value={{currentApplication:currentApplication, setCurrentApplication:handleSetCurrentApplication}}>
            {children}
        </ApplicationContext.Provider>
    )
}