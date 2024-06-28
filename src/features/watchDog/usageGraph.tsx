import React from "react";
import { UsageLogData } from "../../types";
import { formatTime } from "../../utils";
import { Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { WatchDogContextType, useWatchDog } from "../../context/watchDogContext";

interface UsageGraphProps {
    colors:string[];
    usageLogDataList:UsageLogData[];
}

export const UsageGraph: React.FC<UsageGraphProps> = (props) => {

    const {setCurrentUsageData:handleSetCurrentUsageData, setOpenUsageDataDialog:handleSetOpenUsageDataDialog}:WatchDogContextType = useWatchDog();

    return (
        <Box 
            sx={{ 
                pt: 6, 
                flex: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <PieChart
                series={[
                    {
                        data: props.usageLogDataList.map((data) => ({id:data.logId, value:data.timeSpent, label:data.windowName})),
                        valueFormatter: (value) => {
                            return formatTime(value.value);
                        },
                        outerRadius: '100%',
                        cx: '60%',
                    }
                ]}
                onItemClick={(_, data) => {
                    handleSetCurrentUsageData(props.usageLogDataList[data.dataIndex]);
                    handleSetOpenUsageDataDialog(true);
                }}
                slotProps={{
                    legend: { hidden: true },
                }}
                width={600}
                height={600}
                colors={props.colors}
            />
        </Box>
    )
}