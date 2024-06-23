import { Box, List, ListItemButton, ListItemText } from "@mui/material"
import React from "react"
import { UsageLogData } from "../../types";
import { filterUsageLogData, formatDate, formatTime } from "../../utils";
import { useUpdateUsageLogData } from "../../hooks";

interface UsageListProps {
    colors:string[];
    filterAmount:number;
}

export const UsageList: React.FC<UsageListProps> = (props) => {
    const today:Date = new Date();
    const usageLogDataList:UsageLogData[] = filterUsageLogData(useUpdateUsageLogData(formatDate(today)), props.filterAmount);
    return (
        <Box sx={{ pt: 3, flex: 1 }}>
            <List>
                {usageLogDataList.map((logData, index) => (
                    <ListItemButton
                        key={logData.logId}
                        sx={{ 
                            bgcolor: props.colors[index],
                            borderRadius: 3,
                            margin: 1,
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
