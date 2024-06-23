import React from "react";
import { UsageGraph } from ".";
import { hexColors, formatTime } from "../../utils";
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { UsageList } from "./usageList";
import { UsageDataContextType, useUsageData } from "../../context/usageDataContext";

export const WatchDog: React.FC = () => {
    const {currentUsageData:currentUsageData, openUsageDataDialog:openUsageDataDialog, setOpenUsageDataDialog:handleSetOpenUsageDataDialog}:UsageDataContextType = useUsageData()
    const handleCloseUsageDialog = () => {
        handleSetOpenUsageDataDialog(false);
    }
    return (
        <Box
            sx={{
                pt: 4,
                display: 'flex',
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: 'flex-start', 
            }}
        >
            <UsageGraph colors={hexColors} filterAmount={10}/>
            <UsageList colors={hexColors} filterAmount={10}/>
            <Dialog
                open={openUsageDataDialog}
                onClose={handleCloseUsageDialog}
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