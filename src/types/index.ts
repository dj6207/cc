export type AppBarItem = {
    id: number;
    name: string;
}

export type RustUsageLogData = {
    log_id: number,
    window_name: string,
    executable_name: string,
    time_spent: number,
    date: string,
}

export type UsageLogData = {
    logId: number;
    windowName: string;
    executableName: string;
    timeSpent: number;
    date: string;
}

export type CommandCenterApplication = {
    id: number;
    name: string;
}