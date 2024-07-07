import { useState, useEffect } from "react";
import { RustUsageLogData, UsageLogData } from "../types";
import { invoke } from '@tauri-apps/api/tauri'

export const useUpdateUsageLogData = (date:string, limit:number):UsageLogData[] => {
    const [usageLogData, setUsageLogData] = useState<UsageLogData[]>([]);
    useEffect(() => {
        const getUsageLogData = () => {
            invoke<RustUsageLogData[]>("plugin:sqlite_connector|get_usage_log_data", { date: date, limit: limit })
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

export const useManageTracking = (loggingStatus:boolean) => {
    useEffect(() => {
        if (loggingStatus) {
            invoke("plugin:windows|start_tracker")
                .then((_) => {
                    console.log("Tracking Started")
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            invoke("plugin:windows|stop_tracker")
            .then((_) => {
                console.log("Tracking Paused")
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }, [loggingStatus]);
}

export const useGetTotalTimeTracked = (date:string):number => {
    const [totalTimeTracked, setTotalTimeTracked] = useState<number>(0);
    useEffect(() => {
        const getTotalTime = () => {
            invoke<number>("plugin:sqlite_connector|get_total_time_tracked", { date: date })
                .then((res) => {
                    setTotalTimeTracked(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getTotalTime();
        const interval = setInterval(getTotalTime, 1000);
        return () => clearInterval(interval);
    }, [date]);
    return totalTimeTracked;
}
