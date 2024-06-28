import React from "react";
import { CalendarButton, UsageGraph } from ".";
import { hexColors, formatTime, filterUsageLogData, formatDate } from "../../utils";
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { UsageList } from "./usageList";
import { WatchDogContextType, useWatchDog } from "../../context/watchDogContext";
import { UsageLogData } from "../../types";
import { useUpdateUsageLogData } from "../../hooks";

export const WatchDog: React.FC = () => {
    const {
        currentUsageData:currentUsageData, 
        currentDate:currentDate,
        openUsageDataDialog:openUsageDataDialog, 
        setOpenUsageDataDialog:handleSetOpenUsageDataDialog
    }:WatchDogContextType = useWatchDog()
    
    const today:Date = new Date();
    const filterAmount:number | null = 20;
    const usageLogDataList:UsageLogData[] = filterUsageLogData(
        useUpdateUsageLogData(
            formatDate(currentDate?.toDate() ?? today)
        ), 
        filterAmount
    );
    
    const handleCloseUsageDialog = () => {
        handleSetOpenUsageDataDialog(false);
    }

    return (
        <Box
            sx={{
                pt: 4,
                pr:1,
                display: 'flex',
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: 'flex-start', 
            }}
        >
            <UsageGraph colors={hexColors} usageLogDataList={usageLogDataList}/>
            <Box sx={{ pt: 6, flex: 1 }}>
                <CalendarButton date={currentDate}/>
                <UsageList colors={hexColors} usageLogDataList={usageLogDataList}/>
            </Box>
            <Dialog
                open={openUsageDataDialog}
                onClose={handleCloseUsageDialog}
                maxWidth='xs'
                fullWidth={true}
            >
                <DialogTitle>
                    {currentUsageData?.windowName}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {currentUsageData?.executableName}
                    </DialogContentText>
                    <DialogContentText>
                        {formatTime(currentUsageData?.timeSpent || 0)}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Box>
    )
}