import React, { ReactNode, createContext, useContext, useState } from "react";
import { UsageLogData } from "../types";
import dayjs, { Dayjs } from "dayjs";

type WatchDogProviderProps = {
    children: ReactNode;
}

export type WatchDogContextType = {
    openUsageDataDialog: boolean;
    setOpenUsageDataDialog: (value:boolean) => void;

    currentUsageData:UsageLogData | null;
    setCurrentUsageData: (usageData:UsageLogData) => void;

    currentDate: Dayjs | null;
    setCurrentDate: (date:Dayjs | null) => void;

    loggingStatus: boolean;
    setLoggingStatus: (status:boolean) => void;
}

const WatchDogContext = createContext<WatchDogContextType>({
    openUsageDataDialog: false, 
    setOpenUsageDataDialog:() => {}, 
    
    currentUsageData:null, 
    setCurrentUsageData:() => {},

    currentDate:null,
    setCurrentDate:() => {},

    loggingStatus:false,
    setLoggingStatus:() => {}, 
});

export const useWatchDog = () => {
    return useContext(WatchDogContext);
}

export const WatchDogProvider:React.FC<WatchDogProviderProps> = ({children}) => {
    const [currentUsageData, setCurrentUsageData] = useState<UsageLogData | null>(null);
    const [openUsageDataDialog, setOpenUsageDataDialog] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Dayjs | null>(dayjs());
    const [loggingStatus, setLoggingStatus] = useState<boolean>(false);

    const handleSetCurrentUsageData = (usageData:UsageLogData) => {
        setCurrentUsageData(usageData);
    }

    const handleSetOpenUsageDataDialog = (value:boolean) => {
        setOpenUsageDataDialog(value);
    }

    const handleSetCurrentDate = (date:Dayjs | null) => {
        setCurrentDate(date);
    }

    const handleSetLoggingStatus = (status:boolean) => {
        setLoggingStatus(status);
    }

    return(
        <WatchDogContext.Provider value={{
            openUsageDataDialog:openUsageDataDialog, 
            setOpenUsageDataDialog:handleSetOpenUsageDataDialog, 
            currentUsageData:currentUsageData, 
            setCurrentUsageData:handleSetCurrentUsageData,
            currentDate:currentDate,
            setCurrentDate:handleSetCurrentDate,
            loggingStatus:loggingStatus,
            setLoggingStatus:handleSetLoggingStatus,
        }}
        >
            {children}
        </WatchDogContext.Provider>
    )
}