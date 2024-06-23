import React, { ReactNode, createContext, useContext, useState } from "react";
import { UsageLogData } from "../types";

type UsageDataProviderProps = {
    children: ReactNode;
}

export type UsageDataContextType = {
    openUsageDataDialog: boolean;
    setOpenUsageDataDialog: (value:boolean) => void;
    currentUsageData:UsageLogData | null;
    setCurrentUsageData: (usageData:UsageLogData) => void;
}

const UsageDataContext = createContext<UsageDataContextType>({openUsageDataDialog: false, setOpenUsageDataDialog:() => {}, currentUsageData:null, setCurrentUsageData:() => {}});

export const useUsageData = () => {
    return useContext(UsageDataContext);
}

export const UsageDataProvider:React.FC<UsageDataProviderProps> = ({children}) => {
    const [currentUsageData, setCurrentUsageData] = useState<UsageLogData | null>(null);
    const [openUsageDataDialog, setOpenUsageDataDialog] = useState<boolean>(false);

    const handleSetCurrentUsageData = (usageData:UsageLogData) => {
        setCurrentUsageData(usageData);
    }

    const handleSetOpenUsageDataDialog = (value:boolean) => {
        setOpenUsageDataDialog(value);
    }

    return(
        <UsageDataContext.Provider value={{
            openUsageDataDialog:openUsageDataDialog, 
            setOpenUsageDataDialog:handleSetOpenUsageDataDialog, 
            currentUsageData:currentUsageData, 
            setCurrentUsageData:handleSetCurrentUsageData}}
        >
            {children}
        </UsageDataContext.Provider>
    )
}