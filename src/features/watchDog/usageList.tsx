import { Box, List, ListItemButton, ListItemText } from "@mui/material"
import React from "react"
import { UsageLogData } from "../../types";
import { formatTime } from "../../utils";
import { WatchDogContextType, useWatchDog } from "../../context/watchDogContext";

interface UsageListProps {
    colors:string[];
    usageLogDataList:UsageLogData[];
}

export const UsageList: React.FC<UsageListProps> = (props) => {
    const {setCurrentUsageData:handleSetCurrentUsageData, setOpenUsageDataDialog:handleSetOpenUsageDataDialog}:WatchDogContextType = useWatchDog();
    return (
        <Box>
            <List
                sx={{
                    maxHeight: '100vh',
                    overflow: 'auto',
                }}
            >
                {props.usageLogDataList.map((logData, index) => (
                    <ListItemButton
                        key={logData.logId}
                        sx={{ 
                            bgcolor: props.colors[index],
                            borderRadius: 3,
                            margin: 1,
                        }}
                        onClick={() => {
                            handleSetCurrentUsageData(props.usageLogDataList[index]);
                            handleSetOpenUsageDataDialog(true);        
                        }}
                    >
                        <ListItemText
                            primary={logData.windowName}
                            secondary={formatTime(logData.timeSpent)}
                            primaryTypographyProps={{
                                color: 'black',
                                fontWeight: 'medium',
                                variant: 'body2',
                            }}  
                            secondaryTypographyProps={{
                                color: 'black',
                                fontWeight: 'small',
                                variant: 'body2',
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )
}
