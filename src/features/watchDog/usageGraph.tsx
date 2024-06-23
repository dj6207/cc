import React from "react";
import { UsageLogData } from "../../types";
import { useUpdateUsageLogData } from "../../hooks";
import { filterUsageLogData, formatDate, formatTime } from "../../utils";
import { Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { UsageDataContextType, useUsageData } from "../../context/usageDataContext";

interface UsageGraphProps {
    colors:string[];
    filterAmount:number;
}

export const UsageGraph: React.FC<UsageGraphProps> = (props) => {
    const today:Date = new Date();
    const usageLogDataList:UsageLogData[] = filterUsageLogData(useUpdateUsageLogData(formatDate(today)), props.filterAmount);
    const {setCurrentUsageData:handleSetCurrentUsageData, setOpenUsageDataDialog:handleSetOpenUsageDataDialog}:UsageDataContextType = useUsageData();
    return (
        <Box 
            sx={{ 
                pt: 3, 
                flex: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <PieChart
                series={[
                    {
                        data: usageLogDataList.map((data) => ({id:data.logId, value:data.timeSpent, label:data.windowName})),
                        valueFormatter: (value) => {
                            return formatTime(value.value);
                        },
                        outerRadius: 200,
                    }
                ]}
                onItemClick={(event, data) => {
                    handleSetCurrentUsageData(usageLogDataList[data.dataIndex]);
                    handleSetOpenUsageDataDialog(true);
                }}
                slotProps={{
                    legend: { hidden: true },
                }}
                width={400}
                height={400}
                colors={props.colors}
            />
        </Box>
    )
}