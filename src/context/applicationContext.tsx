import React, { ReactNode, createContext, useContext, useState } from "react";
import { CommandCenterApplicationEnum } from "../enums";

type ApplicationProviderProps = {
    children: ReactNode;
}

export type ApplicationContextType = {
    application: CommandCenterApplicationEnum | null;
    setApplication: (application: CommandCenterApplicationEnum) => void;
}

const ApplicationContext = createContext<ApplicationContextType>({application:null, setApplication:() => {}});

export const useApplication = () => {
    return useContext(ApplicationContext);
}

export const ApplicationProvider:React.FC<ApplicationProviderProps> = ({children}) => {
    const [currentApplication, setCurrentApplicatoin] = useState<CommandCenterApplicationEnum | null>(null);

    const handleSetCurrentApplication = (application:CommandCenterApplicationEnum) => {
        setCurrentApplicatoin(application);
    }

    return (
        <ApplicationContext.Provider value={{application:currentApplication, setApplication:handleSetCurrentApplication}}>
            {children}
        </ApplicationContext.Provider>
    )
}