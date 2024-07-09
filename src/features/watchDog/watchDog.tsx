import React from "react";
import { CalendarButton, UsageGraph } from ".";
import { hexColors, formatTime, formatDate } from "../../utils";
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Switch, Typography } from "@mui/material";
import { UsageList } from "./usageList";
import { WatchDogContextType, useWatchDog } from "../../context/watchDogContext";
import { UsageLogData } from "../../types";
import { useGetTotalTimeTracked, useManageTracking, useUpdateUsageLogData } from "../../hooks";

export const WatchDog: React.FC = () => {
    
    const {
        currentUsageData:currentUsageData, 
        currentDate:currentDate,
        openUsageDataDialog:openUsageDataDialog, 
        setOpenUsageDataDialog:handleSetOpenUsageDataDialog,
        loggingStatus:loggingStatus,
        setLoggingStatus:handleSetLoggingStatus,
    }:WatchDogContextType = useWatchDog()
    
    const today:Date = new Date();
    const limit:number = 20;

    const usageLogDataList:UsageLogData[] = useUpdateUsageLogData(
        formatDate(currentDate?.toDate() ?? today),
        limit
    )

    const totalTimeTracked = useGetTotalTimeTracked(
        formatDate(currentDate?.toDate() ?? today)
    )
    
    const handleCloseUsageDialog = () => {
        handleSetOpenUsageDataDialog(false);
    }

    const handleTracking = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSetLoggingStatus(event.target.checked);
    }

    useManageTracking(loggingStatus);

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
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Typography variant="h6">
                        Time Elapsed: {formatTime(totalTimeTracked)}
                    </Typography>
                    <Switch
                        checked={loggingStatus}
                        onChange={handleTracking}
                    />
                </Box>
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