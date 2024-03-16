import { useState, useEffect } from "react";
import { RustUsageLogData, UsageLogData } from "../types";
import { invoke } from '@tauri-apps/api/tauri'

export const useUpdateUsageLogData = (date:string):UsageLogData[] => {
    const [usageLogData, setUsageLogData] = useState<UsageLogData[]>([]);
    useEffect(() => {
        const getUsageLogData = () => {
            invoke<RustUsageLogData[]>("plugin:sqlite_connector|get_usage_log_data", { date: date })
                .then((res) => {
                    const usageLogDataObject = res.map(obj => ({
                        logId: obj.log_id,
                        windowName: obj.window_name,
                        executableName: obj.executable_name,
                        timeSpent: obj.time_spent,
                        date: obj.date,
                    }));
                    setUsageLogData(usageLogDataObject);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getUsageLogData();
        const interval = setInterval(getUsageLogData, 1000);
        return () => clearInterval(interval);
    }, [date]);
    return usageLogData;
}
