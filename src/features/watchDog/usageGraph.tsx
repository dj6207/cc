import React, { useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, TooltipProps, Tooltip } from "recharts";
import { UsageLogData } from "../../types";
import { useUpdateUsageLogData } from "../../hooks";
import { formatDate, formatTime, truncateString } from "../../utils";

type UsageGraphProps = {
    colors:string[];
    filterAmount:number;
}

export const UsageGraph: React.FC<UsageGraphProps> = (props) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null); 
    const today:Date = new Date();
    const usageLogDataList:UsageLogData[] = filterUsageLogData(useUpdateUsageLogData(formatDate(today)), props.filterAmount);

    const handleHoverUsageLogItemEnter = (index:number) => {
        setHoverIndex(index);
    }

    const handleHoverUsageLogItemLeave = () => {
        setHoverIndex(null);
    }

    return (
        <div className="flex">
            <div className="flex-grow">
                <ResponsiveContainer width={"100%"} height={500}>
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                            dataKey={"timeSpent"}
                            nameKey={"windowName"}
                            isAnimationActive={false}
                            data={usageLogDataList}
                            labelLine={false}
                        >
                            {usageLogDataList.map((_, index) => (
                                <Cell key={index} fill={props.colors[index % props.colors.length]}/>
                            ))}
                        </Pie>
                        <Tooltip content={<UsageToolTip/>}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="w-1/3 p-4">
                <ul>
                    {usageLogDataList.map((logData, index) => (
                        <li 
                            onMouseEnter={() => handleHoverUsageLogItemEnter(index)} 
                            onMouseLeave={handleHoverUsageLogItemLeave}
                            className="flex bg-red-300 m-1 p-1 rounded-lg" 
                            key={logData.logId}
                        >
                            <div className="p-3 rounded-lg" style={{ backgroundColor: props.colors[index % props.colors.length] }} />
                            <div className="pl-2">
                                {hoverIndex === index ? (
                                    <div>
                                        <div>
                                            {logData.windowName}
                                        </div>
                                        <div>
                                            {formatTime(logData.timeSpent)}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {truncateString(logData.windowName, 15)}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const UsageToolTip = ({active, payload}:TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        const data:UsageLogData = payload[0].payload;
        return (
            <div className="bg-red-300 rounded-lg p-1">
                <div>
                    {data.windowName}
                </div>
                <div>
                    {formatTime(data.timeSpent)}
                </div>
            </div>
        )
    }
}

const filterUsageLogData = (usageLogDataList:UsageLogData[], amount:number):UsageLogData[] => {
    const filteredList = [...usageLogDataList].sort((a, b) => b.timeSpent - a.timeSpent);
    return filteredList.slice(0, amount);
}