import { UsageLogData } from "../types";

export const formatDate = (date:Date):string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`;
}

export const randomHexColors = (amount:number):string[] => {
    return Array.from({length: amount}, () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`);
}

export const hexColors: string[] = [
    "#FF5733", // Fiery Red
    "#33FF57", // Lime Green
    "#3357FF", // Electric Blue
    "#FF33A6", // Hot Pink
    "#57FF33", // Neon Green
    "#FFAF33", // Bright Orange
    "#5733FF", // Purple
    "#FF3357", // Deep Pink
    "#33FFF6", // Aqua Blue
    "#FF5733", // Coral
    "#57FFAF", // Sea Green
    "#FF33FF", // Magenta
    "#33FFAF", // Mint Green
    "#FFA533", // Tangerine
    "#33AFFF", // Sky Blue
    "#AF33FF", // Lavender
    "#FF3333", // Tomato
    "#FFFF33", // Yellow
    "#33FFFF", // Cyan
    "#3333FF"  // Navy Blue
  ];

export const truncateString = (string: string | undefined, length: number = 10): string => {
    if (string) {
        return string.length > length ? `${string.slice(0, length)}...` : string;
    }
    return "?";
};

export const formatTime = (seconds: number): string => {
    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;

    if (seconds >= secondsInWeek) {
        const weeks = Math.floor(seconds / secondsInWeek);
        const days = Math.floor((seconds % secondsInWeek) / secondsInDay);
        return `${weeks}w ${days}d`;
    } else if (seconds >= secondsInDay) {
        const days = Math.floor(seconds / secondsInDay);
        const hours = Math.floor((seconds % secondsInDay) / secondsInHour);
        return `${days}d ${hours}h`;
    } else if (seconds >= secondsInHour) {
        const hours = Math.floor(seconds / secondsInHour);
        const minutes = Math.floor((seconds % secondsInHour) / secondsInMinute);
        return `${hours}h ${minutes}m`;
    } else if (seconds >= secondsInMinute) {
        const minutes = Math.floor(seconds / secondsInMinute);
        const remainingSeconds = seconds % secondsInMinute;
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        return `${seconds}s`;
    }
}

export const filterUsageLogData = (usageLogDataList:UsageLogData[], amount:number | null):UsageLogData[] => {
    const filteredList = [...usageLogDataList].sort((a, b) => b.timeSpent - a.timeSpent);
    if (amount !== null) {
        return filteredList.slice(0, amount);
    } 
    return filteredList
}